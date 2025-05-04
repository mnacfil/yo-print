import { SearchIcon } from "lucide-react";
import { Input } from "~/components/ui/input";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center rounded-md border px-4 py-1.5">
      <SearchIcon className="size-5 text-muted-foreground b" />
      <Input
        value={value}
        onChange={onChange}
        placeholder="Search you're favorite anime..."
        className="border-none shadow-none"
      />
    </div>
  );
};

export default Search;
