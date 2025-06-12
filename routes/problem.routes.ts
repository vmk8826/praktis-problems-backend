import { RequestHandler, Router } from "express";
import { createProblem } from "../controllers/problem.controllers";

const problemRoutes = Router();

problemRoutes.post("/createProblem", createProblem as unknown as RequestHandler);

export default problemRoutes;
