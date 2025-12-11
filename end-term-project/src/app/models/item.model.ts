export interface Rating {
  rate: number;
  count: number;
}

export interface Item {
  id: number; // 1. id
  title: string; // 2. title
  price: number; // 3. price
  description: string; // 4. description
  category: string; // 5. category
  image: string; // 6. image
  rating: Rating; // 7. rating (объект, содержащий rate и count)
}
