import mongoose from "mongoose";
import Issue from "../models/issue";
import { CreateIssueRequest, IssueSortOption, QueryFilters } from "@myapp/shared";
import { ApiError } from "../utils/apiError";
import { IssueStatus } from "@myapp/shared";
import { buildMatchQuery, buildSortPipeline } from "../utils/issueQueryBuilder";

export const getIssuesService = async (filters: QueryFilters) => {
  const { status, priority, search, sortBy = IssueSortOption.RECENT, page = 1, limit = 10 } = filters;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const matchQuery = buildMatchQuery({ status, priority, search });
  const sortPipeline = buildSortPipeline(sortBy);

  const [issues, total] = await Promise.all([
    Issue.aggregate([{ $match: matchQuery }, ...sortPipeline, { $skip: skip }, { $limit: limitNum }]),
    Issue.countDocuments(matchQuery),
  ]);

  return {
    issues,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNextPage: pageNum < Math.ceil(total / limitNum),
      hasPrevPage: pageNum > 1,
    },
  };
};

export const createIssueService = async (data: CreateIssueRequest) => {
  const existing = await Issue.findOne({ title: data.title });
  if (existing) throw new ApiError(409, "An issue with this title already exists");
  const newIssue = new Issue(data);
  return await newIssue.save();
};

export const getIssueService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID format");
  }

  const issue = await Issue.findById(id);

  return issue;
};

export const updateIssueService = async (id: string, data: Partial<CreateIssueRequest>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID format");
  }

  const updated = await Issue.findByIdAndUpdate(
    id,
    { $set: data }, // TODO: check the update strategy for additional fields and confirmation dialogues
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updated) {
    throw new ApiError(404, "Issue not found");
  }

  return updated;
};

export const deleteIssueService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID format");
  }

  const issue = await Issue.findByIdAndDelete(id);

  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  return issue;
};

export const getIssueStatsService = async () => {
  const [total, open, inProgress, resolved] = await Promise.all([
    Issue.countDocuments(),
    Issue.countDocuments({ status: IssueStatus.OPEN }),
    Issue.countDocuments({ status: IssueStatus.IN_PROGRESS }),
    Issue.countDocuments({ status: IssueStatus.RESOLVED }),
  ]);

  return { total, open, inProgress, resolved };
};
