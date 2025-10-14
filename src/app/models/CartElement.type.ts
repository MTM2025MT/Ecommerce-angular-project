
export type CartElement = {
  id: number;
  quantity: number;
  title: string;
  price: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
  description?: string;
  images?: string[]
}
/**export type Product = {
 id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: { rate: number; count: number; };
  stock: number;
  brand: string;

} */

export type Cart={
  products: CartElement[],
  total:number,
  id:string,
  userId:number,
  totalProducts: number,
  totalQuantity: number
}
/**
 *
 *
 *       "id": 1,
      "products": [
        {
          "id": 168,
          "title": "Charger SXT RWD",
          "price": 32999.99,
          "quantity": 3,
          "total": 98999.97,
          "discountPercentage": 13.39,
          "discountedTotal": 85743.87,
          "thumbnail": "https://cdn.dummyjson.com/products/images/vehicle/Charger%20SXT%20RWD/thumbnail.png"
        },
 *
 * "total": 103774.85,
      "discountedTotal": 89686.65,
      "userId": 33,
      "totalProducts": 4,
      "totalQuantity": 15
 *
 */
