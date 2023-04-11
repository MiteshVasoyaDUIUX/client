import ProductCard from "./ProductCard";
import "./ProductCardGrid.css";

export function ProductCardsGrid({ products }) {
  return (
    <>
      <div className="product-card-grid">
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </>
  );
}
