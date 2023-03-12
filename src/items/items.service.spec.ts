import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { NotFoundError } from 'rxjs';
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service';

// DBと切り離してテストをするため、アイテムのモックを用意
const mockItemRepository = () => ({
  //
  find: jest.fn(),
  findOne: jest.fn(),
  createItem: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const mockUser1 = {
  id: '1',
  username: 'test1',
  password: '1234',
  status: 'PREMIUM',
};

const mockUser2 = {
  id: '2',
  username: 'test1',
  password: '2345',
  status: 'FREE',
};

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

  // findByID
  describe('findById', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        username: 'PC',
        price: 1500000,
        description: '',
        status: 'ON_SALE',
        createdAt: '',
        udpatedAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };
      itemRepository.findOne.mockResolvedValue(expected);
      const result = await itemsService.getById('test-id');
      expect(result).toEqual(expected);
    });

    // 例外処理もテストする
    it('異常系: 商品が存在しない', async () => {
      // ここでは null を渡す
      itemRepository.findOne.mockResolvedValue(null);
      await expect(itemsService.getById('test-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // createItem
  describe('create', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        username: 'PC',
        price: 1500000,
        description: '',
        status: 'ON_SALE',
        createdAt: '',
        udpatedAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };
      itemRepository.createItem.mockResolvedValue(expected);
      const result = await itemsService.create(
        { name: 'MacbookAir', price: 140000, description: '' },
        mockUser1,
      );
      expect(result).toEqual(expected);
    });
  });

  describe('updateStatus', () => {
    const mockItem = {
      id: 'test-id',
      username: 'PC',
      price: 1500000,
      description: '',
      status: 'ON_SALE',
      createdAt: '',
      udpatedAt: '',
      userId: mockUser1.id,
      user: mockUser1,
    };
    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await itemsService.updateStatus('test-id', mockUser2);
      // 呼び出されたら成功となる
      expect(itemRepository.save).toHaveBeenCalled();
    });

    it('異常系: 自分の商品を購入する', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await expect(
        itemsService.updateStatus('test-id', mockUser1),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    const mockItem = {
      id: 'test-id',
      username: 'PC',
      price: 1500000,
      description: '',
      status: 'ON_SALE',
      createdAt: '',
      udpatedAt: '',
      userId: mockUser1.id,
      user: mockUser1,
    };
    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await itemsService.delete('test-id', mockUser1);
      // 呼び出されたら成功となる
      expect(itemRepository.delete).toHaveBeenCalled();
    });

    it('異常系: 他人の商品を削除する', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await expect(itemsService.delete('test-id', mockUser2)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
