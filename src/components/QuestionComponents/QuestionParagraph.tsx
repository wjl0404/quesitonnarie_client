import React, { FC, CSSProperties } from "react";

type PropsType = {
  text: string;
  isCenter: string;
};

const QuestionParagraph: FC<PropsType> = ({ text, isCenter }) => {
  const style: CSSProperties = {};
  if (isCenter) style.textAlign = "center";
  const textList = text.split("\n");
  return (
    <p>
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br></br>}
          {t}
        </span>
      ))}
    </p>
  );
};

export default QuestionParagraph;
