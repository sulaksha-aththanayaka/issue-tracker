import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { IssuePriority, IssueSortOption, IssueStatus } from "@myapp/shared";

interface FilterDropDownProps {
  status: IssueStatus | "all";
  priority: IssuePriority | "all";
  sortBy: IssueSortOption;
  onFilterChange: (field: "status" | "priority" | "sortBy", value: string) => void;
}

const STATUS_LABELS: Record<string, string> = {
  all: "All Statuses",
  [IssueStatus.OPEN]: "Open",
  [IssueStatus.IN_PROGRESS]: "In Progress",
  [IssueStatus.RESOLVED]: "Resolved",
};

const PRIORITY_LABELS: Record<string, string> = {
  all: "All Priorities",
  [IssuePriority.LOW]: "Low",
  [IssuePriority.MEDIUM]: "Medium",
  [IssuePriority.HIGH]: "High",
};

const SORT_LABELS: Record<IssueSortOption, string> = {
  [IssueSortOption.RECENT]: "Newest First",
  [IssueSortOption.OLDEST]: "Oldest First",
  [IssueSortOption.DUE_SOON]: "Due Soonest",
  [IssueSortOption.DUE_LATE]: "Due Furthest",
};

const FilterDropDown = ({ status, priority, sortBy, onFilterChange }: FilterDropDownProps) => {
  return (
    <div className="flex gap-2">
      <Select
        value={status as string}
        onValueChange={(value) => {
          if (!value) return;
          onFilterChange("status", value);
        }}
      >
        <SelectTrigger className="md:max-w-none w-full md:w-[120px] bg-white/90 px-1 sm:px-2 border-none shadow-sm rounded-2xl sm:!h-10 hover:cursor-pointer hover:opacity-70">
          <div className="w-full truncate text-left">
            <span className="text-xs md:text-sm">{STATUS_LABELS[status]}</span>
          </div>
        </SelectTrigger>
        <SelectContent sideOffset={4}>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value={IssueStatus.OPEN}>Open</SelectItem>
          <SelectItem value={IssueStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={IssueStatus.RESOLVED}>Resolved</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={priority as string}
        onValueChange={(value) => {
          if (!value) return;
          onFilterChange("priority", value);
        }}
      >
        <SelectTrigger className="md:max-w-none w-full md:w-[120px] bg-white/90 px-1 sm:px-2 border-none shadow-sm rounded-2xl sm:!h-10 hover:cursor-pointer hover:opacity-70">
          <div className="w-full truncate text-left">
            <span className="text-xs md:text-sm">{PRIORITY_LABELS[priority]}</span>
          </div>
        </SelectTrigger>
        <SelectContent sideOffset={4}>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value={IssuePriority.LOW}>Low</SelectItem>
          <SelectItem value={IssuePriority.MEDIUM}>Medium</SelectItem>
          <SelectItem value={IssuePriority.HIGH}>High</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortBy as string}
        onValueChange={(value) => {
          if (!value) return; // ← add this null guard
          onFilterChange("sortBy", value);
        }}
      >
        <SelectTrigger className="md:max-w-none w-full md:w-[120px] bg-white/90 px-1 sm:px-2 border-none shadow-sm rounded-2xl sm:!h-10 hover:cursor-pointer hover:opacity-70">
          <div className="w-full truncate text-left">
            <span className="text-xs md:text-sm">{SORT_LABELS[sortBy]}</span>
          </div>
        </SelectTrigger>
        <SelectContent sideOffset={4}>
          <SelectItem value={IssueSortOption.RECENT}>Newest First</SelectItem>
          <SelectItem value={IssueSortOption.OLDEST}>Oldest First</SelectItem>
          <SelectItem value={IssueSortOption.DUE_SOON}>Due Soonest</SelectItem>
          <SelectItem value={IssueSortOption.DUE_LATE}>Due Furthest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterDropDown;
