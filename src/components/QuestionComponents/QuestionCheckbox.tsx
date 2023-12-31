import React, { FC, useEffect, useState } from "react";
import styles from "./QuestionCheckbox.module.scss";
type PropsType = {
  fe_id: string;
  props: {
    title: string;
    isVertical?: boolean;
    list: Array<{ value: string; text: string; checked: boolean }>;
  };
};

const QuestionCheckbox: FC<PropsType> = ({ fe_id, props }) => {
  const { title, isVertical, list = [] } = props;
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  useEffect(() => {
    list.forEach((item) => {
      const { value, checked } = item;
      if (checked) {
        setSelectedValues((selectedValues) => selectedValues.concat(value));
      }
    });
  }, [list]);
  function toggleChecked(value: string) {
    if (selectedValues.includes(value)) {
      // 已经选中
      setSelectedValues(selectedValues.filter((item) => item != value));
    } else {
      setSelectedValues(selectedValues.concat(value));
    }
  }
  return (
    <>
      <p>{title}</p>
      <input type="hidden" name={fe_id} value={selectedValues.toString()} />
      <ul className={styles.list}>
        {list.map((item) => {
          const { value, text, checked } = item;
          let liClassName = "";
          if (isVertical) liClassName = styles.verticalItem;
          else liClassName = styles.horizontalItem;
          return (
            <li key={value} className={liClassName}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleChecked(value)}
                  checked={selectedValues.includes(value)}
                />
                {text}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionCheckbox;
