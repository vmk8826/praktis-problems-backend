import axios from "axios";

export const languageIdMap = {
  C: 50,
  "C++": 54,
  JAVA: 62,
  PYTHON: 71,
  JAVASCRIPT: 63,
};

export const getJudge0LanguageId = (language: string) => {
  return languageIdMap[language as keyof typeof languageIdMap];
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const pollBatchResults = async (tokens: string[]) => {
  while (true) {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        tokens: tokens.join(","),
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "06f87fff90msh3281da62eefbee3p1dd18djsn4b00aee98bc2",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };

    const { data } = await axios.request(options);
    const results = data.submissions;

    const allDone = results.every(
      (result: { status: { id: number } }) =>
        result.status.id !== 2 && result.status.id !== 1
    );

    if (allDone) {
      return results;
    }

    await sleep(1000);
  }
};

export const submitBatch = async (submissions: any[]) => {
  // Format submissions according to Judge0 API expectations
  const formattedSubmissions = submissions.map((submission) => ({
    language_id: submission.language_id,
    source_code: Buffer.from(submission.source_code).toString("base64"),
    stdin: Buffer.from(submission.stdin).toString("base64"),
    expected_output: Buffer.from(submission.expected_output).toString("base64"),
  }));

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": "06f87fff90msh3281da62eefbee3p1dd18djsn4b00aee98bc2",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      submissions: formattedSubmissions,
    },
  };

  const { data } = await axios.request(options);
  console.log('Batch Submitted Successfully')
  return data;
};
