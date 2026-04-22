import { ClipboardList } from "lucide-react";
import AddIssueButton from "@/components/AddIssueButton";

interface EmptyStateProps {
  onAdd: () => void;
}

const EmptyState = ({ onAdd }: EmptyStateProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="h-24 w-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <ClipboardList className="h-12 w-12 text-white/20" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No issues found</h3>
      <p className="text-white/50 max-w-xs mb-8">
        It looks like you haven't created any issues yet. Start organizing your day now!
      </p>
      <AddIssueButton onClick={onAdd} />
    </div>
  );
};

export default EmptyState;
