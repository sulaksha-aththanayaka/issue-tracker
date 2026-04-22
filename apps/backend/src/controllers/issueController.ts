import { NextFunction, Request, Response } from "express";
import {
  createIssueService,
  deleteIssueService,
  getIssueService,
  getIssuesService,
  getIssueStatsService,
  updateIssueService,
} from "../services/issueService";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { IssuePriority, IssueSortOption, IssueStatus } from "@myapp/shared";

const getAllIssues = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;

    const { status, priority, search, sortBy, page, limit } = req.query as Record<string, string | undefined>;

    const result = await getIssuesService(
      {
        status: status === "all" || !status ? "all" : (status as IssueStatus),
        priority: priority === "all" || !priority ? "all" : (priority as IssuePriority),
        search: search || "",
        sortBy: (sortBy as IssueSortOption) || IssueSortOption.RECENT,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
      },
      userId,
    );

    res.status(200).json(new ApiResponse(result, "Issues fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;

    const { title, description } = req.body;

    const trimedTitle = title.trim();

    if (!trimedTitle || !description) {
      return next(new ApiError(400, "Title and description are required"));
    }

    const savedIssue = await createIssueService(req.body, userId);

    res.status(201).json(new ApiResponse(savedIssue, "Issue created successfully"));
  } catch (error) {
    next(error);
  }
};

const getIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;

    const { id } = req.params;

    const issue = await getIssueService(id, userId);

    if (!issue) {
      return next(new ApiError(404, "Issue with given id not found"));
    }

    res.status(200).json(new ApiResponse(issue, "Issue fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const updateIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;

    const { id } = req.params;

    const issue = await updateIssueService(id, req.body, userId);

    res.status(200).json(new ApiResponse(issue, "Issue updated successfully"));
  } catch (error) {
    next(error);
  }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;

    const { id } = req.params;

    const issue = await deleteIssueService(id, userId);

    res.status(200).json(new ApiResponse(issue, "Issue deleted successfully"));
  } catch (error) {
    next(error);
  }
};

const getIssueStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;
    const stats = await getIssueStatsService(userId);
    res.status(200).json(new ApiResponse(stats, "Issue stats fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export { getAllIssues, createIssue, getIssue, updateIssue, deleteIssue, getIssueStats };
