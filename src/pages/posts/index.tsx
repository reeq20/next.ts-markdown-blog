import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { join } from "path";
import glob from "glob";
import fs from "fs";
import matter from "gray-matter";
interface Props {
  posts: any;
}

const PostIndexList: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>indexList</title>
      </Head>
      <div className={"p-8"}>
        <ul>
          {posts.map((v, index) => (
            <li className="item" key={index}>
              <Link href={v.path}>
                <a href="">{v.meta.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
const postsDirectory = join(process.cwd(), "src/_posts");

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const entries = glob.sync(`${postsDirectory}/**/*.md`);
  const posts = entries.map((v) => {
    const paths = v
      .split(postsDirectory)
      .pop()
      .replace(/(\.md$)/, "");
    const fileData = fs.readFileSync(v, "utf-8");
    const { data } = matter(fileData);
    return {
      meta: data,
      path: `posts${paths}`,
    };
  });
  return {
    props: { posts: posts },
  };
};

export default PostIndexList;
