import ProductList from "@/components/shared/product/product-list";
// import sampleData from "@/db/sample-data";
import { getLatestProducts } from "@/lib/actions/product.actions";

const Homepage = async () => {
  // console.log(sampleData);
  const products = await getLatestProducts(); // get the latest Data from the database
  const safeProducts = products.map(p => ({
    ...p,
    numReviews: p.numReviews ?? 0
  }));
  return (
    <>
      <ProductList data={safeProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
