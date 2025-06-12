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
    for (const [language, referenceCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res.status(400).json({ message: "Invalid language" });
      }
      
      const submissions = testcases.map(({ input, output }: { input: string, output: string }) => {
        return {
          source_code: referenceCode,
          language_id: languageId,
          stdin: input,
          expected_output: output,
        };
      });

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map(({ token }: { token: string }) => token);

      console.log('submissionResults',submissionResults)

      const results = await pollBatchResults(tokens);

      // console.log('results',results);
      
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log(result.status_id,'statusId',result.status_id,'languageId')
        if (result.status_id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }
    console.log('here')
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
