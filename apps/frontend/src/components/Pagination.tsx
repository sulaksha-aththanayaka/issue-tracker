import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-6 py-10">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-full !px-2 md:px-3 gap-0 md:gap-2 h-11 bg-white border-slate-200 text-slate-600 cursor-pointer disabled:!cursor-not-allowed hover:bg-slate-50 hover:text-indigo-600 disabled:text-slate-600 transition-all disabled:opacity-50 shadow-sm active:scale-95"
      >
        <ChevronLeft size={10} />
        <span className="font-semibold">Previous</span>
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-slate-400 text-sm md:text-base font-medium">Page</span>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-bold text-sm">{currentPage + 1}</span>
        <span className="text-slate-400 text-sm md:text-base font-medium">of {totalPages}</span>
      </div>

      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-full px-2 md:px-3 gap-0 md:gap-2 h-11 bg-white border-slate-200 text-slate-600 cursor-pointer disabled:!cursor-not-allowed hover:bg-slate-50 hover:text-indigo-600 disabled:text-slate-600 transition-all disabled:opacity-50 shadow-sm active:scale-95"
      >
        <span className="font-semibold">Next</span>
        <ChevronRight size={10} />
      </Button>
    </div>
  );
};
