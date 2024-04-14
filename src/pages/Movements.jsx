import { useContext, useState } from "react";
import Heading from "../components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { movementsHeader } from "@/constants";
import { movementsContext } from "@/context/MovmentsContext";
import Search from "@/components/shared/Search";

const Movements = () => {
  const [searchValue, setSearchValue] = useState("");
  const { movements, isError, isLoading } = useContext(movementsContext);

  const filteredMovements = movements?.data?.products?.filter((product) =>
    product.productName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Heading>حركة الاصناف</Heading>

      <div className="mb-5">
        <Search
          setSearchValue={setSearchValue}
          placeholder="يمكنك البحث عن الصنف بالأسم"
        />
      </div>

      <DynamicTable
        headers={movementsHeader}
        error={isError}
        loading={isLoading}
        data={filteredMovements?.reverse()}
      />
    </>
  );
};

export default Movements;
