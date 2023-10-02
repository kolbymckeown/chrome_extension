export type CartItem = {
  readonly id: number;
  readonly dateAdded: string;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  categoryId: number;
  purchased: boolean;
  store: string;
  url: string;
};
