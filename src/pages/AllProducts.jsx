import { useContext, useState } from "react";
import Heading from "@/components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { productsHeader } from "@/constants";
import { productsContext } from "@/context/ProductsContext";
import Search from "@/components/shared/Search";
import ProductsForm from "@/components/products/ProductsForm";

const AllProducts = () => {
  const { allproducts, isError, isLoading } = useContext(productsContext);

  return (
    <>
      <Heading>ارصدة المخزن</Heading>
      <div className="flex items-center max-sm:flex-wrap gap-5 sm:gap-10 mb-5">
        <Search placeholder="يمكنك البحث عن الصنف بالأسم" />

        <div className="mr-auto max-sm:w-full">
          <ProductsForm />
        </div>
      </div>

      <DynamicTable
        headers={productsHeader}
        error={isError}
        loading={isLoading}
        data={allproducts?.data?.products.reverse()}
      />
    </>
  );
};

export default AllProducts;
