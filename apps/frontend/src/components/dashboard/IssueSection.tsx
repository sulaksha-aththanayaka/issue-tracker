import type { Mode, Issue } from "@/types";
import IssueCard from "./IssueCard";
import EmptyState from "@/components/common/EmptyState";
import Loading from "../common/Loading";
import type { IssueStatus } from "@myapp/shared";

interface IssueSectionProps {
  isFetching: boolean;
  issues: Issue[];
  handleAction: (mode: Mode, issue?: Issue) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: IssueStatus) => void;
  isUpdating: boolean;
}

const IssueSection = ({
  isFetching,
  issues,
  handleAction,
  onDelete,
  onStatusChange,
  isUpdating,
}: IssueSectionProps) => {
  const showUpdatingOverlay = isFetching && issues.length > 0;

  return (
    <div className="relative w-full max-w-6xl">
      {showUpdatingOverlay && <Loading fullScreen={false} message="Updating Issues..." />}
      <div className={`${issues.length > 0 ? "grid sm:grid-cols-2 w-full max-w-6xl gap-4 md:gap-6" : ""}`}>
        {issues.length > 0
          ? issues.map((issue) => (
              <IssueCard
                data={issue}
                key={issue._id}
                onView={() => handleAction("view", issue)}
                onEdit={() => handleAction("edit", issue)}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
                isUpdating={isUpdating}
              />
            ))
          : !isFetching && <EmptyState onAdd={() => handleAction("add")} />}
      </div>
    </div>
  );
};

export default IssueSection;
