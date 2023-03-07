export interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  status: ItemStatus;
}

const ITEM_STATUS = {
  ON_SALE: 'ON_SALE',
  SOLD_OUT: 'SOLD_OUT',
} as const;

export type ItemStatus = (typeof ITEM_STATUS)[keyof typeof ITEM_STATUS];
