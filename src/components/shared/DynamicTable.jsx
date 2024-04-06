import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";

const DynamicTable = ({ headers, data, error, loading }) => {
  const renderTableHeader = () => (
    <TableHeader className="bg-muted dark:bg-muted/50">
      <TableRow>
        {headers.map((header, index) => (
          <TableCell
            className={`${index === headers.length - 1 ? "" : "border-l"}`}
            key={index}
          >
            {header.label}
          </TableCell>
        ))}
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
    data.map((item, index) => (
      <TableRow key={index} className={`${index % 2 ? "bg-muted/50" : ""}`}>
        {headers.map((header, idx) => (
          <TableCell
            key={idx}
            className={`${idx === headers.length - 1 ? "" : "border-l"}`}
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
      </TableRow>
    ));

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        {headers && renderTableHeader()}
        <TableBody>
          {loading || error || !data.length
            ? renderLoadingOrEmptyState()
            : renderTableRows()}
        </TableBody>
      </Table>
    </div>
  );
};

export default DynamicTable;
