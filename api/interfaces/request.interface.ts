import { Request } from "express";
import { User } from "src/user/entities/user.entity";

export type AuthenticatedRequest = Request & {
  user?: User;
};
