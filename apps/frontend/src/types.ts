import type { IssuePriority, IssueStatus } from "@myapp/shared";

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueFormValues {
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate: string;
}

export interface IssueStats {
  high: number;
  medium: number;
  low: number;
  total: number;
}

export interface PaginatedIssues {
  issues: Issue[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export type Mode = "add" | "view" | "edit";
