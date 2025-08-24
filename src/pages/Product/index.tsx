import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { useStore } from "../../zustand/store";
import { fetchData } from "../../api/httpClient";

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

const PRODUCTS_PER_PAGE = 10;
function Product() {
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const onAddToCart = useStore((state) => state.setCartItem);

  const getData = async () => {
    const result = await fetchData("/products?limit=100");
    setData(result.data.products);
  };

  useEffect(() => {
    getData();
  }, []);

  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = PRODUCTS_PER_PAGE + startIdx;
  const currentProduct = data.slice(startIdx, endIdx);

  return (
    <>
      <Header />
      <main style={{ padding: "20px" }}>
        <div className="product-grid">
          <Card data={currentProduct} onAddToCart={onAddToCart} />
        </div>
        <Pagination
          totalProduct={data.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </>
  );
}

export default Product;
