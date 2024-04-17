import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import ShareDropdown from "./ShareDropdown";

const DynamicTable = ({ headers, data, error, loading, tableAction }) => {
  const renderTableHeader = () => (
    <TableHeader className="bg-muted dark:bg-muted/50">
      <TableRow>
        {headers.map((header, index) => (
          <TableCell
            className={`${
              tableAction
                ? "border-l"
                : index === headers.length - 1
                ? ""
                : "border-l"
            }`}
            key={index}
          >
            {header.label}
          </TableCell>
        ))}
        {tableAction && <TableCell>إجراءات</TableCell>}
      </TableRow>
    </TableHeader>
  );

  const renderLoadingOrEmptyState = () => (
    <TableRow>
      <TableCell className="p-8" colSpan={100}>
        {loading ? "جاري التحميل..." : "لا يوجد بيانات"}
      </TableCell>
    </TableRow>
  );

  const renderTableRows = () =>
    data?.map((item, index) => (
      <TableRow key={index} className={`${index % 2 ? "bg-muted/30" : ""}`}>
        {headers.map((header, idx) => (
          <TableCell
            key={idx}
            className={`${
              tableAction
                ? "border-l"
                : idx === headers.length - 1
                ? ""
                : "border-l"
            }`}
          >
            {header.key === "typeMovement" ? (
              <Badge variant={item.typeMovement === "شراء" ? "secondary" : ""}>
                {item[header.key]}
              </Badge>
            ) : item[header.key] === undefined ? (
              <span>-</span>
            ) : (
              item[header.key]
            )}
          </TableCell>
        ))}
        {tableAction && (
          <TableCell className="p-2">
            <ShareDropdown rowEditData={item} />
          </TableCell>
        )}
      </TableRow>
    ));

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        {headers && renderTableHeader()}
        <TableBody>
          {loading || error || data?.length === 0 || !data
            ? renderLoadingOrEmptyState()
            : renderTableRows()}
        </TableBody>
      </Table>
    </div>
  );
};

export default DynamicTable;
