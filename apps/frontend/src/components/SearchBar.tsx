import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full lg:max-w-sm flex items-center">
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        placeholder="Search by issue name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-white/90 border-none shadow-sm focus-visible:ring-indigo-400 rounded-2xl h-10"
      />
    </div>
  );
};

export default SearchBar;
