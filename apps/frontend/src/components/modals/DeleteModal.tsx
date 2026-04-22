import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useIssueMutations } from "@/hooks/useIssue";

interface DeleteModalProps {
  issueId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteModal = ({ issueId, isOpen, onClose }: DeleteModalProps) => {
  const { deleteIssue, isDeleting } = useIssueMutations();

  const handleDelete = () => {
    if (issueId) {
      deleteIssue(issueId, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-[32px] bg-white border-none shadow-2xl p-8">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-rose-50 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-rose-500" />
          </div>

          <DialogTitle className="text-2xl font-bold text-slate-800 text-center">Delete Issue?</DialogTitle>

          <DialogDescription className="text-center text-slate-500 text-base leading-relaxed">
            Are you sure you want to delete this issue? This action cannot be undone and will remove all associated
            data.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-xl h-12 border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-xl h-12 shadow-lg shadow-rose-100 transition-all active:scale-95 cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
