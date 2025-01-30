import ProductCard from "./product-card";

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: unknown;
  title?: string;
  limit?: number;
}) => {
  if (!Array.isArray(data)) {
    return <div className="text-center">Invalid data</div>;
  }

  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      {title && <h2 className="h2-bold mb-4">{title}</h2>}
      {limitedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product: any) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center">No products found</div>
      )}
    </div>
  );
};

export default ProductList;
