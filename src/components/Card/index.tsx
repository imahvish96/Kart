import "./Card.css";
import Button from "../Button";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: Array<string>;
  rating: {
    rate: number;
    count: number;
  };
}
interface CardProps {
  data: Product[];
  onAddToCart: (product: Product) => void;
}

export default function Card({ data, onAddToCart }: CardProps) {
  return (
    <>
      {data.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-image-container">
            <img src={product.images[0]} alt="Product 1" />
          </div>
          <div className="product-details-container">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">$ {product.price}</p>
            <Button onClick={() => onAddToCart(product)} />
          </div>
        </div>
      ))}
    </>
  );
}
