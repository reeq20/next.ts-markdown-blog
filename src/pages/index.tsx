import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetStaticProps, NextPage } from "next";

interface Props {
  testData: string;
}

const Home: NextPage<Props> = ({ testData }) => {
  return <div className={"p-8"}>{testData}</div>;
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: { testData: "testData" },
  };
};

export default Home;
