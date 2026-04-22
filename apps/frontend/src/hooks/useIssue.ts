import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import { issueApi } from "@/api/issueApi";
import type { PaginatedIssues } from "@/types";
import { useEffect, useState } from "react";
import type { IssueFormValues } from "@/schemas/IssueSchema";
import { toast } from "sonner";
import type { ApiResponse, IssuePriority, IssueSortOption, IssueStatus } from "@myapp/shared";

// Get all issues
export const useIssues = (
  page: number = 1,
  size: number = 10,
  search: string = "",
  status?: IssueStatus,
  priority?: IssuePriority,
  sortBy?: IssueSortOption,
) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isPlaceholderData, isFetching, isError, error } = useQuery<ApiResponse<PaginatedIssues>>({
    queryKey: ["issues", page, size, debouncedSearch, status, priority, sortBy],
    queryFn: () =>
      issueApi.getIssues({
        page,
        limit: size,
        search: debouncedSearch,
        status,
        priority,
        sortBy,
      }),
    placeholderData: keepPreviousData,
  });

  return {
    issues: data?.data?.issues ?? [],

    pagination: {
      total: data?.data?.pagination.total ?? 0,
      totalPages: data?.data?.pagination.totalPages ?? 0,
      hasNextPage: data?.data?.pagination.hasNextPage ?? false,
      hasPrevPage: data?.data?.pagination.hasPrevPage ?? false,
      currentPage: data?.data?.pagination.page ?? 1,
      limit: data?.data?.pagination.limit ?? 10,
    },

    isLoading,
    isFetching,
    isPlaceholderData,
    isError,
    error,
  };
};

// Get issue by id
export const useIssueDetail = (issueId: string | null) => {
  return useQuery({
    queryKey: ["issue", issueId],
    queryFn: () => issueApi.getIssueById(issueId!),
    enabled: !!issueId,
    staleTime: 0,
  });
};

// Create, update and delete
export const useIssueMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newIssue: IssueFormValues) => issueApi.create(newIssue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Issue created successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Could not create issue";
      toast.error("Error", { description: message });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IssueFormValues }) => issueApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["issue", variables.id] }); // To show updated data
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Issue updated");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Update failed";
      toast.error("Error", { description: message });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: IssueStatus }) =>
      issueApi.update(id, { status } as unknown as IssueFormValues),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["issue", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Status updated");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Status update failed";
      toast.error("Error", { description: message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => issueApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.removeQueries({ queryKey: ["issue", id] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Issue deleted permanently");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Server error";
      toast.error("Error", { description: message });
    },
  });

  return {
    createIssue: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateIssue: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateIssueStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
    deleteIssue: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

export const useIssueStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => issueApi.fetchIssueStats(),
    staleTime: 1000 * 60 * 5,
  });
};
