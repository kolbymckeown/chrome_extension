export type CartItem = {
  readonly id: number;
  readonly dateAdded: string;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  category: string;
  purchased: boolean;
};
