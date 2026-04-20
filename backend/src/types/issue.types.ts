export enum IssueStatus {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  RESOLVED = "Resolved",
}

export enum IssuePriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High"
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  priority?: IssuePriority;
  status?: IssueStatus;
}

export interface QueryFilters {
  status?: string;
  priority?: string;
  search?: string;
  page?: number;
  limit?: number;
}