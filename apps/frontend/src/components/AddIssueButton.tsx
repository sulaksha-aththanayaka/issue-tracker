import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddIssueButtonProps {
  onClick: () => void;
}

const AddIssueButton = ({ onClick }: AddIssueButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="h-10 rounded-2xl text-xs md:text-sm px-6 font-semibold shadow-lg transition-all bg-indigo-500 hover:bg-indigo-600 text-white border-none hover:cursor-pointer w-full sm:w-auto"
    >
      <Plus /> Add New <span className="sm:hidden lg:block">Issue</span>
    </Button>
  );
};

export default AddIssueButton;
