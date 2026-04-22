import api from "@/lib/axios";
import type { ApiResponse, IssueStats, QueryFilters } from "@myapp/shared";
import type { Issue, PaginatedIssues } from "@/types";
import type { IssueFormValues } from "@/schemas/IssueSchema";

export const issueApi = {
  getIssues: async (filters: QueryFilters) => {
    const { data } = await api.get<ApiResponse<PaginatedIssues>>(`/issues`, {
      params: {
        status: filters.status,
        priority: filters.priority,
        sortBy: filters.sortBy,
        search: filters.search,
        page: filters.page,
        limit: filters.limit,
      },
    });
    return data;
  },

  getIssueById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Issue>>(`/issues/${id}`);
    console.log("fetched issue: ", data);

    return data;
  },

  create: async (issue: IssueFormValues) => {
    console.log("issue frontff: ", issue);

    const { data } = await api.post<ApiResponse<Issue>>("/issues", issue);
    return data;
  },

  update: async (id: string, issue: Partial<IssueFormValues>) => {
    const { data } = await api.put<ApiResponse<Issue>>(`/issues/${id}`, issue);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete<ApiResponse<Issue>>(`/issues/${id}`);
    return data;
  },

  fetchIssueStats: async () => {
    const { data } = await api.get<ApiResponse<IssueStats>>("/issues/stats");
    return data;
  },
};
