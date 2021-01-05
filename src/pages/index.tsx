import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface Props {
  testData: string;
}

const Home: NextPage<Props> = () => {
  return (
    <Link href={"/posts"} as={"/posts"}>
      投稿記事一覧
    </Link>
  );
};
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   return {
//     props: { testData: "testData" },
//   };
// };

export default Home;
