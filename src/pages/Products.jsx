import { useContext, useEffect, useState } from "react";
import Heading from "@/components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { getProductsHeader } from "@/constants";
import { productsContext } from "@/context/ProductsContext";
import Search from "@/components/shared/Search";
import ProductsForm from "@/components/products/ProductsForm";
import ProductsActions from "@/components/products/ProductsActions";
import { useTranslation } from "react-i18next";

const Products = () => {
  const [searchValue, setSearchValue] = useState("");
  const { products, isError, isLoading, setFetchProducts } =
    useContext(productsContext);

  const filteredProducts = products?.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.productBarCode
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    setFetchProducts(true);
  }, []);

  const [t] = useTranslation("global");

  const productsHeader = getProductsHeader(t);

  return (
    <>
      <Heading>{t("products.title")}</Heading>

      <div className="flex items-center justify-between max-sm:flex-wrap gap-5 sm:gap-10 mb-5">
        <Search
          setSearchValue={setSearchValue}
          placeholder={t("search.name-code")}
        />

        <div className="max-sm:w-full">
          <ProductsForm />
        </div>
      </div>

      <DynamicTable
        headers={productsHeader}
        data={filteredProducts?.reverse() || []}
        error={isError}
        loading={isLoading}
        ActionsComponent={ProductsActions}
      />
    </>
  );
};

export default Products;
