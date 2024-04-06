import { useContext, useState } from "react";
import Heading from "@/components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { productsHeader } from "@/constants";
import { productsContext } from "@/context/ProductsContext";
import Search from "@/components/shared/Search";
import Dialog from "@/components/shared/Dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AllProducts = () => {
  const { allproducts, isError, isLoading } = useContext(productsContext);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Heading>ارصدة المخزن</Heading>
      <div className="flex items-center max-sm:flex-wrap gap-5 sm:gap-10 mb-5">
        <Search placeholder="يمكنك البحث عن الصنف بالأسم" />

        <Dialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          dialogTrigger="اضافه صنف"
          dialogTitle="اضافه صنف"
          dialogDescription="هنا يمكنك اضافة صنف جديد"
        >
          <div className="max-h-96 overflow-y-scroll scroll">
            <div className="grid gap-4 py-4 w-[99%]">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="namee" className="text-right">
                  اسم الصنف
                </Label>
                <Input
                  id="namee"
                  defaultValue="بستم دبابة ايطالي STD"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="PN" className="text-right">
                  PN
                </Label>
                <Input id="PN" defaultValue="INV001" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  الماركة
                </Label>
                <Input
                  id="brand"
                  defaultValue="الماني"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contry" className="text-right">
                  بلد المنشـأ
                </Label>
                <Input
                  id="contry"
                  defaultValue="ايطالي"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="place" className="text-right">
                  المكان
                </Label>
                <Input
                  id="place"
                  defaultValue="اوضه السبايك"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="num" className="text-right">
                  العدد
                </Label>
                <Input id="num" defaultValue="20" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  سعر الوحده
                </Label>
                <Input
                  id="price"
                  defaultValue="300.00"
                  className="col-span-3"
                />
              </div>
            </div>
          </div>
        </Dialog>
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
