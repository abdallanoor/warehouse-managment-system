import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
const Search = ({ placeholder }) => {
  return (
    <div className="relative w-full sm:max-w-sm">
      <SearchIcon className="absolute right-2.5 top-2/4 translate-y-[-50%] h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full rounded-lg pr-8"
      />
    </div>
  );
};

export default Search;
