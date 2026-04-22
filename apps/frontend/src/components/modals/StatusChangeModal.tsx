import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { IssueStatus } from "@myapp/shared";

interface StatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  newStatus: IssueStatus | null;
  isUpdating: boolean;
}

const STATUS_LABELS: Record<string, string> = {
  [IssueStatus.OPEN]: "Open",
  [IssueStatus.IN_PROGRESS]: "In Progress",
  [IssueStatus.RESOLVED]: "Resolved",
};

export const StatusChangeModal = ({ isOpen, onClose, onConfirm, newStatus, isUpdating }: StatusChangeModalProps) => {
  if (!newStatus) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-[32px] bg-white border-none shadow-2xl p-8">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center">
            <Info className="h-8 w-8 text-indigo-500" />
          </div>

          <DialogTitle className="text-2xl font-bold text-slate-800 text-center">Update Status</DialogTitle>

          <DialogDescription className="text-center text-slate-500 text-base leading-relaxed">
            Are you sure you want to change the status to{" "}
            <span className="font-semibold text-slate-700">{STATUS_LABELS[newStatus]}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isUpdating}
            className="flex-1 rounded-xl h-12 border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isUpdating}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 shadow-lg shadow-indigo-100 transition-all active:scale-95 cursor-pointer"
          >
            {isUpdating ? "Updating..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
