# NestJS

# 環境變數

只要 module 有用到環境變數，就要在 `app.module.ts` 的 `@Module`裡面加入 `ConfigModule.forRoot()`。並且可以用 `Joi` 套件來驗證環境變數的格式。

```typescript
// XXX.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('test', 'local_dev', 'stage', 'production', 'stage')
          .default('local_dev'),
        PORT: Joi.number().default(6000),
        MONGO_CONNECTION_STRING: Joi.string().required(),
        MONGO_USR: Joi.string().required(),
        MONGO_PASS: Joi.string().required(),
         ],
})
export class XXXModule {}
// ... 省略 ...
```

# 測試

## Mock Database data

可以利用替換的方式，將原本的模組替換成測試用的模組。像是下面的例子，將原本的 `TypeOrmModule` 替換成 `TypeOrmModule.forRoot()`，這樣就可以在測試時，不用真的連接資料庫提供資料。

```typescript
// ... 省略 ...
describe('Testing description', () => {

  let testingModule: TestingModule;
  beforeEach(async () => {
    class mockUserModel {
      public async findOne() {
        return new Promise((resolve) => {
          const mockUser: Partial<UserDocument> = {
            firstName: 'mockFirstName',
            lastName: 'mockLastName',
          };
          resolve(mockUser);
        });
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // ... 省略 ...
      ],
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: new mockUserModel(),
        },
      ],
    }).compile();

    testingModule = module.get<testingModule>(
      testingModule,
    );
  });

});
```

要注意當使用這種方法時，mock 的模組有用到其他模組時，要將其他模組也一併 mock ，不然會出現錯誤。

## Check Module save data

可以用 Jest 去模擬一個 DB document，然後檢查模組是否有正確的存入資料。下面例子是 Module 預期會先從 DB `findOne` 拿到 document，更新 document 後，再 `save` 資料存入 DB。所以可以先 mock `findOne` 回傳的 document，然後檢查 mock `save` (將儲存的資料存回 document)，最後再檢查 document 是否正確。

```typescript
// ... 省略 ...
let savedModelDocument;

beforeEach(async () => {
  savedModelDocument = null;
  const mockModelDocument = {
    ...data,
    save: jest.fn().mockImplementation(function () {
      savedModelDocument = this;
    }),
  };
  const mockModel = {
    findOne: jest.fn().mockResolvedValue(mockModelDocument),
  };
  const module: TestingModule = await Test.createTestingModule({
      imports: [
        // ... 省略 ...
      ],
      providers: [
        {
          provide: getModelToken(Model.name),
          useValue: mockModel,
        },
      ],
    }).compile();
// ... 省略 ...
it('should update something', async () => {
  await targetModule.updateSomething();
  expect(savedModelDocument).toEqual({
    ...data,
    something: 'something',
  });
});
```

# Mongo

## Discriminator

Mongo 的 Discriminator 可以讓一個 collection 中，儲存不同 schema 的 document。Mongoose 是用 `discriminatorKey` 區別不同的 document。

在 Nestjs 設定 Mongoos discriminator 後，開發時就可以當作不同的 class 來使用。

設定範例：

1. 在 collection 註記共用的 schema，以及設定 `discriminatorKey`。

```typescript
@Schema({
  collection: 'devices',
  discriminatorKey: 'type' // 有各種 device 都儲存在 device 這個 collection，並用 type 區分不同的 device
}) 
export class device {
 @Prop({
    type: mongoose.Schema.Types.String, // 要指定 type 為 String，不然會出錯
    enum: $enum(DeviceTypeEnum).getKeys(), // 用 enum 來限制 type 的值
  })
  type: DeviceTypeEnum; // device 種類

  @Prop({ type: Date, required: true })
  time: Date;
}

export const deviceSchema = SchemaFactory.createForClass(device);
```

2. 宣告不同種的 device 

```typescript

// phone device
@Schema()
export class PhoneDevice {
  @Prop({ type: String, required: true })
  type: DeviceTypeEnum;

  @Prop({ type: String, required: true })
  phoneNumber: string;
}

export const phoneDeviceSchema = SchemaFactory.createForClass(PhoneDevice);

// computer device
@Schema()
export class ComputerDevice {
  @Prop({ type: String, required: true })
  type: DeviceTypeEnum;

  @Prop({ type: String, required: true })
  os: string;
}

export const computerDeviceSchema = SchemaFactory.createForClass(ComputerDevice);
```

3. 在 module 中設定 discriminator

```typescript
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Device.name,
        schema: deviceSchema,
      },
      {
        name: 'PhoneDevice',
        schema: phoneDeviceSchema,
        discriminators: [
          { name: DeviceTypeEnum.PHONE, schema: phoneDeviceSchema },
        ],
      },
      {
        name: 'ComputerDevice',
        schema: computerDeviceSchema,
        discriminators: [
          { name: DeviceTypeEnum.COMPUTER, schema: computerDeviceSchema },
        ],
      },
    ]),
  ],
  providers: [DeviceService],
  controllers: [DeviceController],
})
```
4. 開發時使用

```typescript
@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel('PhoneDevice') private phoneDeviceModel: Model<PhoneDeviceDocument>,
    @InjectModel('ComputerDevice') private computerDeviceModel: Model<ComputerDeviceDocument>,
  ) {}

  async createPhoneDevice(phoneNumber: string) {
    const phoneDevice = new this.phoneDeviceModel({ type: DeviceTypeEnum.PHONE, phoneNumber });
    return phoneDevice.save();
  }

  async createComputerDevice(os: string) {
    const computerDevice = new this.computerDeviceModel({ type: DeviceTypeEnum.COMPUTER, os });
    return computerDevice.save();
  }
}
```


# Others

## 臨時 Script

如果要在執行一些臨時的 script ，可以用 `ts-node` 來執行。例如：

```bash
yarn ts-node ./src/scripts/XXX.ts
```


