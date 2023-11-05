import { fetchProducts } from "./actions";
import InfinityComponent from "@/components/InfinityScroll";

export default async function Home() {
  const { formatedProducts } = await fetchProducts({});

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        <InfinityComponent initialProducts={formatedProducts} />
      </div>
    </div>
  );
}
