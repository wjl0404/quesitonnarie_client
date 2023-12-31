import Head from "next/head";
import QuestionInput from "@/components/QuestionComponents/QuestionInput";
import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";
import "@/app/globals.css";
import styles from "../../styles/Question.module.scss";
import PageWrapper from "@/components/PageWrapper";
import { getQuestionById } from "@/service/question";
import { genComponent } from "@/components/QuestionComponents";
type PropsType = {
  // id: string;
  errno: number;
  data?: {
    id: string;
    title: string;
    desc?: string;
    css?: string;
    js?: string;
    isDeleted: boolean;
    isPublished: boolean;
    componentList: Array<any>;
  };
  msg?: string;
};
export default function question(props: PropsType) {
  const { errno, data, msg = "" } = props;

  if (errno != 0) {
    return (
      <PageWrapper title="error">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }
  const {
    id,
    title = "",
    isDeleted,
    desc,
    isPublished,
    componentList,
  } = data || {};
  if (isDeleted) {
    return (
      <PageWrapper title="error" desc={desc}>
        <h1>错误</h1>
        <p>问卷被删除</p>
      </PageWrapper>
    );
  }
  if (!isPublished) {
    return (
      <PageWrapper title="error" desc={desc}>
        <h1>错误</h1>
        <p>问卷未发布</p>
      </PageWrapper>
    );
  }
  const ComponentListElem = componentList?.map((c) => {
    const ComponentElem = genComponent(c);
    return (
      <div key={c.fe_id} className={styles.componentWrapper}>
        {ComponentElem}
      </div>
    );
  });
  return (
    <PageWrapper title={title}>
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" defaultValue={id} />
        {ComponentListElem}
        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  );
}
export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const data = await getQuestionById(id);

  return {
    props: data,
  };
}
