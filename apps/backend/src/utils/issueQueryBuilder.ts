import { IssuePriority, IssueSortOption, IssueStatus } from "@myapp/shared";
import type { PipelineStage, FilterQuery } from "mongoose";
import mongoose from "mongoose";

interface IssueQueryFilters {
  status?: IssueStatus | "all";
  priority?: IssuePriority | "all";
  search?: string;
}

export const buildMatchQuery = (filters: IssueQueryFilters, userId: string): FilterQuery<unknown> => {
  const query: FilterQuery<unknown> = {
    user: new mongoose.Types.ObjectId(userId),
  };

  if (filters.status && filters.status !== "all") {
    query.status = filters.status;
  }

  if (filters.priority && filters.priority !== "all") {
    query.priority = filters.priority;
  }

  if (filters.search?.trim()) {
    query.title = { $regex: filters.search.trim(), $options: "i" };
  }

  return query;
};

export const buildSortPipeline = (sortBy: IssueSortOption): PipelineStage[] => {
  switch (sortBy) {
    case IssueSortOption.DUE_SOON:
      return [
        {
          $addFields: {
            _sortDate: {
              $ifNull: ["$dueDate", new Date("9999-12-31T23:59:59.999Z")],
            },
          },
        } as PipelineStage,
        { $sort: { _sortDate: 1 } } as PipelineStage,
        { $unset: "_sortDate" } as PipelineStage,
      ];

    case IssueSortOption.DUE_LATE:
      return [
        {
          $addFields: {
            _sortDate: {
              $ifNull: ["$dueDate", new Date("0001-01-01T00:00:00.000Z")],
            },
          },
        } as PipelineStage,
        { $sort: { _sortDate: -1 } } as PipelineStage,
        { $unset: "_sortDate" } as PipelineStage,
      ];

    case IssueSortOption.OLDEST:
      return [{ $sort: { createdAt: 1 } }];

    case IssueSortOption.RECENT:
    default:
      return [{ $sort: { createdAt: -1 } }];
  }
};
