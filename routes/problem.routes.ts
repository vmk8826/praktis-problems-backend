import { RequestHandler, Router } from "express";
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById } from "../controllers/problem.controllers";
import { authMiddleware, isAdminMiddleware } from "../middleware/auth.middleware";

const problemRoutes = Router();

problemRoutes.post(
  "/createProblem",
  authMiddleware as unknown as RequestHandler,
  isAdminMiddleware as unknown as RequestHandler,
  createProblem as unknown as RequestHandler
);

problemRoutes.get(
  "/getAllProblems",
  authMiddleware as unknown as RequestHandler,
  getAllProblems as unknown as RequestHandler
);

problemRoutes.get(
  "/getAllProblemsSolvedByUser/:userId",
  authMiddleware as unknown as RequestHandler,
  getAllProblemsSolvedByUser as unknown as RequestHandler
);

problemRoutes.get(
  "/getProblemById/:id",
  authMiddleware as unknown as RequestHandler,
  getProblemById as unknown as RequestHandler
);

problemRoutes.delete(
  "/deleteProblem/:id",
  authMiddleware as unknown as RequestHandler,
  isAdminMiddleware as unknown as RequestHandler,
  deleteProblem as unknown as RequestHandler
);

export default problemRoutes;
