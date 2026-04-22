import { exportToCSV, exportToJSON } from "@/lib/exportIssues";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import type { Issue } from "@/types";

interface ExportButtonProps {
  issues: Issue[];
}

const ExportButton = ({ issues }: ExportButtonProps) => {
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="rounded-2xl h-10 bg-white/90 border-none shadow-sm hover:opacity-70 text-xs md:text-sm"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-xl">
          <DropdownMenuItem onClick={() => exportToCSV(issues)} className="cursor-pointer">
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportToJSON(issues)} className="cursor-pointer">
            Export as JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ExportButton;
