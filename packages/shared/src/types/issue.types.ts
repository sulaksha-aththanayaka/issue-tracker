export enum IssueStatus {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  RESOLVED = "Resolved",
}

export enum IssuePriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export enum IssueSortOption {
  RECENT = "recent",
  OLDEST = "oldest",
  DUE_SOON = "dueSoon",
  DUE_LATE = "dueLate",
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  priority?: IssuePriority;
  status?: IssueStatus;
  dueDate?: Date | string;
}

export interface QueryFilters {
  status?: IssueStatus | "all";
  priority?: IssuePriority | "all";
  search?: string;
  sortBy?: IssueSortOption;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface IssueStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
}
