import { useContext, useState } from "react";
import Heading from "@/components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { productsHeader } from "@/constants";
import { productsContext } from "@/context/ProductsContext";
import Search from "@/components/shared/Search";
import ProductsForm from "@/components/products/ProductsForm";

const Products = () => {
  const [searchValue, setSearchValue] = useState("");
  const { products, isError, isLoading } = useContext(productsContext);

  const filteredProducts = products?.data?.products?.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Heading>ارصدة المخزن</Heading>
      <div className="flex items-center justify-between max-sm:flex-wrap gap-5 sm:gap-10 mb-5">
        <Search
          setSearchValue={setSearchValue}
          placeholder="يمكنك البحث عن الصنف بالأسم والكود"
        />
        <div className="max-sm:w-full">
          <ProductsForm />
        </div>
      </div>
      <DynamicTable
        headers={productsHeader}
        data={filteredProducts?.reverse()}
        error={isError}
        tableAction
        loading={isLoading}
      />
    </>
  );
};

export default Products;
