import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";
import TableLoader from "../loading/TableLoader";

const DynamicTable = ({
  headers,
  data,
  error,
  loading,
  ActionsComponent,
  ActionsComponentProps,
}) => {
  const [t] = useTranslation("global");

  const renderTableHeader = () => (
    <TableHeader className="sticky top-0 right-0 left-0 w-full bg-muted backdrop-blur">
      <TableRow>
        {headers.map((header, index) => (
          <TableCell
            className={`${
              ActionsComponent
                ? "rtl:border-l ltr:border-r"
                : index === headers.length - 1
                ? ""
                : "rtl:border-l ltr:border-r"
            }`}
            key={index}
          >
            {header.label}
          </TableCell>
        ))}
        {ActionsComponent && (
          <TableCell className="print:hidden">{t("share.actions")}</TableCell>
        )}
      </TableRow>
    </TableHeader>
  );

  const renderLoadingOrEmptyState = () => (
    <TableRow>
      <TableCell className="p-8 " colSpan={100}>
        {loading ? t("loading") : t("noData")}
      </TableCell>
    </TableRow>
  );

  const renderTableRows = () =>
    data?.map((item, index) => (
      <TableRow key={index} className={` ${index % 2 ? "" : ""}`}>
        {headers.map((header, idx) => (
          <TableCell
            key={idx}
            className={`${
              ActionsComponent
                ? "rtl:border-l ltr:border-r"
                : idx === headers.length - 1
                ? ""
                : "rtl:border-l ltr:border-r"
            }`}
          >
            {header.key === "typeMovement" ? (
              <Badge
                variant={
                  item.typeMovement === "buy"
                    ? "default"
                    : item.typeMovement === "sold"
                    ? "secondary"
                    : "destructive"
                }
              >
                {item[header.key] === "buy"
                  ? t("movements.add")
                  : item[header.key] === "sold"
                  ? t("movements.sell")
                  : t("movements.return")}
              </Badge>
            ) : item[header.key] === null ||
              item[header.key] === "" ||
              item[header.key] === undefined ? (
              <span>-</span>
            ) : (
              item[header.key]
            )}
          </TableCell>
        ))}
        {ActionsComponent && (
          <TableCell className="p-2 print:hidden">
            <ActionsComponent
              rowData={item}
              ActionsComponentProps={ActionsComponentProps}
            />
          </TableCell>
        )}
      </TableRow>
    ));

  return (
    <div
      className={`rounded-md border ${
        data && data?.length !== 0 && !loading && "overflow-auto scroll"
      }  table-h dark:bg-black`}
    >
      {loading ? (
        <TableLoader />
      ) : (
        <Table>
          {headers &&
            data &&
            !error &&
            data?.length !== 0 &&
            renderTableHeader()}
          <TableBody>
            {loading || error || data?.length === 0 || !data
              ? renderLoadingOrEmptyState()
              : renderTableRows()}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default DynamicTable;
