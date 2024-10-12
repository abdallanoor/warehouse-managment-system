import { Skeleton } from "../ui/skeleton";
export default function TableLoader() {
  const skeletoCount = 35;
  return (
    <div className="w-full table-h p-1 overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1">
        {Array.from({ length: skeletoCount }).map((_, index) => (
          <Skeleton key={index} className="w-auto h-[62.5px]" />
        ))}
      </div>
    </div>
  );
}
