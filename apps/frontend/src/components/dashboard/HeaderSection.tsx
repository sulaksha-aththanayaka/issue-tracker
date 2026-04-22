import AddIssueButton from "../AddIssueButton";
import SearchBar from "../SearchBar";
import FilterDropDown from "../FilterDropDown";
import type { IssuePriority, IssueSortOption, IssueStatus } from "@myapp/shared";

interface HeaderSectionProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  status: IssueStatus | "all";
  priority: IssuePriority | "all";
  sortBy: IssueSortOption;
  onFilterChange: (field: "status" | "priority" | "sortBy", value: string) => void;
  onView: () => void;
}

const HeaderSection = ({ search, setSearch, onView, status, priority, sortBy, onFilterChange }: HeaderSectionProps) => {
  return (
    <div className="w-full max-w-6xl p-2 md:p-4 rounded-[28px] bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 w-full">
        <div className="w-full md:w-auto flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-between md:justify-end gap-2 md:gap-4">
          <div className="flex-1 md:flex-none w-full md:w-auto">
            <FilterDropDown status={status} priority={priority} sortBy={sortBy} onFilterChange={onFilterChange} />
          </div>

          <div className="flex-1 md:flex-none flex justify-end w-full sm:w-auto">
            <AddIssueButton onClick={onView} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
