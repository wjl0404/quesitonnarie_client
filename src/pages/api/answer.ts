import { NextApiRequest, NextApiResponse } from "next";
import { postAnswer } from "@/service/answer";
function genAnswerInfo(reqBody: any) {
  const answerList: any[] = [];
  Object.keys(reqBody).forEach((key) => {
    if (key == "questionId") return;
    answerList.push({
      componentId: key,
      value: reqBody[key],
    });
  });
  return {
    questionId: reqBody.questionId || "",
    answerList: answerList,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST")
    res.status(200).json({ errno: -1, msg: "method error" });
  const answerList = genAnswerInfo(req.body);
  // 把回答提交到服务端
  try {
    const resData = await postAnswer(answerList);

    if (resData.errno == 0) {
      res.redirect("/success");
    } else {
      res.redirect("/fail");
    }
  } catch (err) {
    res.redirect("/fail");
  }
}
