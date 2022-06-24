// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseDataBase = Record<string, any> | undefined;

export interface ResponseData<T extends ResponseDataBase = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Item {
  id?: string;
  createdAt: string;
  name: string;
  description: string;
  price: number;
  email: string;
  images: string[];
}

export interface AddItemRequestData {
  item: Item;
}

export interface AddItemResponseData {
  item: Item;
  imagesUpload: { url: string; fields: Record<string, string> }[];
}

export interface RemoveItemRequestData {
  itemId: string;
}
