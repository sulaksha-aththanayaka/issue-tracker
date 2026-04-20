import { NextFunction, Request, Response } from "express";
import {
  createIssueService,
  deleteIssueService,
  getIssueService,
  getIssuesService,
  updateIssueService,
} from "../services/issueService";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

const getAllIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status, priority, search, page, limit } = req.query;

    const result = await getIssuesService({
      status: status as string,
      priority: priority as string,
      search: search as string,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 10,
    });

    res
      .status(200)
      .json(new ApiResponse(result, "Issues fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, priority, status } = req.body;

    if (!title || !description) {
      return next(new ApiError(400, "Title and description are required"));
    }

    const savedIssue = await createIssueService({
      title,
      description,
      priority,
      status,
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
    next(error);
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

export { getAllIssues, createIssue, getIssue, updateIssue, deleteIssue };
