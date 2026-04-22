import { Calendar, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Issue } from "@/types";
import { cn } from "@/lib/utils";
import { IssuePriority, IssueStatus } from "@myapp/shared";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface IssueCardProps {
  data: Issue;
  onView: (issue: Issue) => void;
  onEdit: (issue: Issue) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: IssueStatus) => void;
}

const STATUS_MAP: Record<IssueStatus, { label: string; color: string }> = {
  [IssueStatus.OPEN]: { label: "Open", color: "bg-slate-500" },
  [IssueStatus.IN_PROGRESS]: { label: "In Progress", color: "bg-indigo-500" },
  [IssueStatus.RESOLVED]: { label: "Resolved", color: "bg-emerald-500" },
};

const PRIORITY_MAP: Record<IssuePriority, { label: string; color: string }> = {
  [IssuePriority.LOW]: { label: "Low", color: "bg-blue-500" },
  [IssuePriority.MEDIUM]: { label: "Medium", color: "bg-amber-500" },
  [IssuePriority.HIGH]: { label: "High", color: "bg-rose-500" },
};

const IssueCard = ({ data, onView, onEdit, onDelete, onStatusChange }: IssueCardProps) => {
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus | null>(null);

  const handleStatusSelect = (status: IssueStatus) => {
    setSelectedStatus(status);
  };

  const handleConfirm = () => {
    if (selectedStatus) {
      onStatusChange(data._id, selectedStatus);
      setSelectedStatus(null);
    }
  };

  const statusInfo = STATUS_MAP[data.status as keyof typeof STATUS_MAP] || { label: data.status, color: "bg-gray-400" };
  const priorityInfo = PRIORITY_MAP[data.priority as keyof typeof PRIORITY_MAP] || {
    label: data.priority,
    color: "bg-gray-400",
  };

  return (
    <div className="bg-white rounded-[32px] p-4 md:p-6 shadow-sm w-full flex flex-col justify-between gap-1 min-h-[180px] md:min-h-[220px] lg:min-h-[200px]">
      {/* Badges for status and priority */}
      <div className="flex justify-between items-center">
        <Badge
          className={cn(
            "text-white rounded-full px-3 md:px-4 py-1 text-[0.625rem] md:text-xs font-bold uppercase tracking-wider",
            priorityInfo.color,
          )}
        >
          {priorityInfo.label}
        </Badge>
        <div className="flex">
          <Badge
            className={cn(
              "text-white rounded-full px-3 md:px-4 py-1 text-[0.625rem] md:text-xs font-bold uppercase tracking-wider",
              statusInfo.color,
            )}
          >
            {statusInfo.label}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-black/20 text-black rotate-90 justify-start hover:opacity-70 cursor-pointer"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              {Object.values(IssueStatus)
                .filter((s) => s !== data.status)
                .map((s) => (
                  <DropdownMenuItem key={s} onClick={() => handleStatusSelect(s)} className="cursor-pointer">
                    <span className={cn("h-2 w-2 rounded-full mr-2 inline-block", STATUS_MAP[s].color)} />
                    {STATUS_MAP[s].label}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Title and description */}
      <div className="space-y-1 my-2 grow">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800">{data.title}</h3>
        <p className="text-slate-400 text-sm md:text-base font-medium line-clamp-2">{data.description}</p>
      </div>

      {/* Due date, created date and actions */}
      <div className="flex items-center justify-between">
        {data.dueDate && (
          <div className="flex items-center gap-2 text-slate-500 font-semibold">
            <Calendar className="h-3.5 w-3.5 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Due: {new Date(data.dueDate).toISOString().split("T")[0]}</span>
          </div>
        )}

        <div className="flex gap-2 ml-auto">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onView(data)}
            className="rounded-full h-6 w-6 md:h-9 md:w-9 bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            <Eye className="h-2 w-2 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onEdit(data)}
            className="rounded-full h-6 w-6 md:h-9 md:w-9 bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onDelete?.(data._id)}
            className="rounded-full h-6 w-6 md:h-9 md:w-9 bg-slate-100 text-red-500 hover:bg-red-50 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>

      {selectedStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[28px] p-6 shadow-2xl max-w-sm w-full mx-4 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-slate-800">Change Status</h2>
            <p className="text-slate-500 text-sm">
              Change status to <span className="font-semibold text-slate-700">{STATUS_MAP[selectedStatus].label}</span>?
            </p>
            <div className="flex gap-3 pt-1">
              <Button
                variant="outline"
                className="flex-1 rounded-xl border-slate-200 text-slate-600 cursor-pointer"
                onClick={() => setSelectedStatus(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueCard;
