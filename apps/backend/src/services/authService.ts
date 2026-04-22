import User from "../models/user";
import { signToken } from "../utils/jwt";
import { ApiError } from "../utils/apiError";
import type { RegisterBody, LoginBody } from "../types/auth.types";

export const registerService = async ({ name, email, password }: RegisterBody) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, "Email already in use");

  const user = await User.create({ name, email, password });

  const token = signToken({ id: user._id.toString(), email: user.email });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
};

export const loginService = async ({ email, password }: LoginBody) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  const token = signToken({ id: user._id.toString(), email: user.email });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
};
