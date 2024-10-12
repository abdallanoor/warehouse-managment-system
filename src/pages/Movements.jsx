import { useContext, useEffect, useState } from "react";
import Heading from "../components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { getMovementsHeader } from "@/constants";
import { movementsContext } from "@/context/MovmentsContext";
import Search from "@/components/shared/Search";
import { useTranslation } from "react-i18next";

const Movements = () => {
  const [searchValue, setSearchValue] = useState("");
  const { movements, isError, isLoading, setFetchMovements } =
    useContext(movementsContext);

  const [t] = useTranslation("global");

  const movementsHeader = getMovementsHeader(t);

  const filteredMovements = movements?.filter((product) =>
    product.productName.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    setFetchMovements(true);
  }, []);

  return (
    <>
      <Heading>{t("movements.title")}</Heading>

      <div className="mb-5">
        <Search
          setSearchValue={setSearchValue}
          placeholder={t("search.name")}
        />
      </div>

      <DynamicTable
        headers={movementsHeader}
        error={isError}
        loading={isLoading}
        data={filteredMovements?.reverse() || []}
      />
    </>
  );
};

export default Movements;
