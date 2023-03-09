import { Test } from '@nestjs/testing';
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service';

// DBと切り離してテストをするため、アイテムのモックを用意
const mockItemRepository = () => ({
  //
  find: jest.fn(),
});

// アイテムサービスのユニットテストを書く前の下ごしらえ
describe('ItemsServiceTest', () => {
  // モジュールからサービスとリポジトリのインスタンスを受け取るための箱2つ
  let itemsService;
  let itemRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemRepository,
          useFactory: mockItemRepository,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<ItemRepository>(ItemRepository);
  });

  // 各テストを追加
  describe('findAll', () => {
    it('正常系', async () => {
      const expected = [];
      itemRepository.find.mockResolvedValue(expected);
      const result = await itemsService.findAll();

      expect(result).toEqual(expected);
    });
  });
});
