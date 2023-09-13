# NestJS

## 測試

可以利用替換的方式，將原本的模組替換成測試用的模組。像是下面的例子，將原本的 `TypeOrmModule` 替換成 `TypeOrmModule.forRoot()`，這樣就可以在測試時，使用不同的資料庫。

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