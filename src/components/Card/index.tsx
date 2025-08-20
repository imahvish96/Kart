import "./Card.css";
import Button from "../Button";
import { useEffect, useState } from "react";
import { fetchData } from "../../api/httpClient";
import { useStore } from "../../zustand/store";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function Card() {
  const [data, setData] = useState<Product[]>([]);

  //zustand store
  const setCartItem = useStore((state) => state.setCartItem);

  const getData = async () => {
    const result = await fetchData("/products");
    setData(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-image-container">
            <img src={product.image} alt="Product 1" />
          </div>
          <div className="product-details-container">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">$ {product.price}</p>
            <Button onClick={() => setCartItem(product)} />
          </div>
        </div>
      ))}
    </>
  );
}
