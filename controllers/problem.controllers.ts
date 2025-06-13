import { Request, Response } from "express";
import Problem from "../models/Problem.model";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib";

export const createProblem = async (req: Request, res: Response) => {
  const {
    name,
    description,
    input,
    output,
    constraints,
    difficulty,
    tags,
    referenceSolutions,
    testcases,
  } = req.body;
  try {
    // if (
    //   !name ||
    //   !description ||
    //   !input ||
    //   !output ||
    //   !constraints ||
    //   !difficulty ||
    //   !tags
    // ) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }
    for (const [language, referenceCode] of Object.entries(
      referenceSolutions
    )) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res.status(400).json({ message: "Invalid language" });
      }

      const submissions = testcases.map(
        ({ input, output }: { input: string; output: string }) => {
          return {
            source_code: referenceCode,
            language_id: languageId,
            stdin: input,
            expected_output: output,
          };
        }
      );

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map(
        ({ token }: { token: string }) => token
      );

      console.log("submissionResults", submissionResults);

      const results = await pollBatchResults(tokens);

      // console.log('results',results);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log(
          result.status_id,
          "statusId",
          result.status_id,
          "languageId"
        );
        if (result.status_id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }
    console.log("here");
    const problem = await Problem.create({
      // createdBy: req.body.userId || "placeholder-user-id",
      name,
      description,
      input,
      output,
      constraints,
      difficulty,
      tags,
      referenceSolutions,
      testcases,
    });

    return res.status(201).json({
      success: true,
      message: "Problem created successfully",
      problem,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e,
    });
  }
};

export const updateProblem = async (req: Request, res: Response) => {
 //implement this
};

export const getAllProblems = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string;

    let query = {};
    if (cursor) {
      query = { _id: { $gt: cursor } };
    }

    const problems = await Problem.find(query)
      .sort({ _id: 1 })
      .limit(limit + 1); // Fetch one extra to determine if there are more results

    const hasMore = problems.length > limit;
    const results = hasMore ? problems.slice(0, -1) : problems;

    if (!results.length) {
      return res.status(404).json({
        success: false,
        message: "No problems found",
      });
    }

    // Request format -> First page: /api/problems
    // Next page: /api/problems?cursor=last_item_id&limit=20
    return res.status(200).json({
      success: true,
      problems: results,
      pagination: {
        hasMore,
        nextCursor: hasMore ? results[results.length - 1]._id : null,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};


export const getProblemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findOne({ _id: id });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    return res.status(200).json({
      success: true,
      problem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const deleteProblem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findOneAndDelete({ _id: id });
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
      problem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getAllProblemsSolvedByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string;

    let query: any = {
      submissions: {
        $elemMatch: {
          userId,
        },
      },
    };

    if (cursor) {
      query = { ...query, _id: { $gt: cursor } };
    }
  //      // First page
  //  GET /api/problems/solved/:userId
   
  //  // Next page
  //  GET /api/problems/solved/:userId?cursor=last_problem_id&limit=20
    const problems = await Problem.find(query)
      .sort({ _id: 1 })
      .limit(limit + 1); // Fetch one extra to determine if there are more results

    const hasMore = problems.length > limit;
    const results = hasMore ? problems.slice(0, -1) : problems;

    if (!results.length) {
      return res.status(404).json({
        success: false,
        message: "No problems found",
      });
    }

    return res.status(200).json({
      success: true,
      problems: results,
      pagination: {
        hasMore,
        nextCursor: hasMore ? results[results.length - 1]._id : null,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
