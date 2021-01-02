import path, { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import glob from "glob";
import Link from "next/link";

const Test = ({ posts, params }) => {
  return (
    <>
      <h1>test</h1>
      {params.directory}の記事一覧
      <ul>
        {posts.map((v, index) => (
          <li className="item" key={index}>
            <Link href={v.path} as={v.path}>
              <a href="">{v.meta.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const postsDirectory = join(process.cwd(), "src/_posts");

export async function getStaticProps({ params }) {
  const entries = glob.sync(`${postsDirectory}/${params.directory}/*.md`);
  const posts = [...entries]
    .filter((name) => {
      return name.match(/\.md$/);
    })
    .map((v) => {
      const paths = v
        .split(postsDirectory)
        .pop()
        .replace(/(\.md$)/, "");
      const fileData = fs.readFileSync(v, "utf-8");
      const { data } = matter(fileData);
      return {
        meta: data,
        path: `/posts${paths}`,
      };
    });
  return {
    props: {
      params: params,
      posts: posts,
    },
  };
}

export async function getStaticPaths() {
  const entryPaths = fs.readdirSync(postsDirectory);
  const paths = [...entryPaths]
    .filter((name) => {
      return !name.match(/\.md$/);
    })
    .map((v) => {
      return { params: { directory: v } };
    });
  return {
    paths: paths,
    fallback: false,
  };
}

export default Test;
