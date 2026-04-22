import type { Issue } from "@/types";

export const exportToJSON = (issues: Issue[]) => {
  const cleaned = issues.map(({ _id, title, description, status, priority, dueDate, createdAt }) => ({
    id: _id,
    title,
    description,
    status,
    priority,
    dueDate: dueDate ? new Date(dueDate).toLocaleDateString() : "N/A",
    createdAt: new Date(createdAt).toLocaleDateString(),
  }));

  const blob = new Blob([JSON.stringify(cleaned, null, 2)], { type: "application/json" });
  triggerDownload(blob, "issues.json");
};

export const exportToCSV = (issues: Issue[]) => {
  const headers = ["ID", "Title", "Description", "Status", "Priority", "Due Date", "Created At"];

  const rows = issues.map(({ _id, title, description, status, priority, dueDate, createdAt }) => [
    _id,
    `"${title.replace(/"/g, '""')}"`,
    `"${description.replace(/"/g, '""')}"`,
    status,
    priority,
    dueDate ? new Date(dueDate).toLocaleDateString() : "N/A",
    new Date(createdAt).toLocaleDateString(),
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  triggerDownload(blob, "issues.csv");
};

const triggerDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
