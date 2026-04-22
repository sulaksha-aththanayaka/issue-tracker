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
    const { status, priority, search, sortBy, page, limit } = req.query as Record<string, string | undefined>;

    const result = await getIssuesService({
      status: status === "all" || !status ? "all" : (status as IssueStatus),
      priority: priority === "all" || !priority ? "all" : (priority as IssuePriority),
      search: search || "",
      sortBy: (sortBy as IssueSortOption) || IssueSortOption.RECENT,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
    });

    res.status(200).json(new ApiResponse(result, "Issues fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    console.log("title: ", title);
    console.log("description: ", description);

    const trimedTitle = title.trim(); // TODO: REFACTOR

    if (!trimedTitle || !description) {
      return next(new ApiError(400, "Title and description are required"));
    }

    const savedIssue = await createIssueService({
      title: trimedTitle,
      description,
      priority,
      status,
      dueDate, // TODO: check time zone
    });

    res.status(201).json(new ApiResponse(savedIssue, "Issue created successfully"));
  } catch (error) {
    next(error);
  }
};

const getIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const issue = await getIssueService(id);

    console.log("issue: ", issue);

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
    const { id } = req.params;

    const issue = await updateIssueService(id, req.body);

    res.status(200).json(new ApiResponse(issue, "Issue updated successfully"));
  } catch (error) {
    next(error); // TODO: check handling of error
  }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const issue = await deleteIssueService(id);

    res.status(200).json(new ApiResponse(issue, "Issue deleted successfully"));
  } catch (error) {
    next(error);
  }
};

const getIssueStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await getIssueStatsService();
    res.status(200).json(new ApiResponse(stats, "Issue stats fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export { getAllIssues, createIssue, getIssue, updateIssue, deleteIssue, getIssueStats };
