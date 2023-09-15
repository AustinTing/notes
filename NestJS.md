# NestJS

## 測試

### Mock Database data

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

### Check Module save data

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

```typescript

