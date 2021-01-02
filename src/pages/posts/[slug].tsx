import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  NextPage,
} from "next";
import fs from "fs";
import { join } from "path";
import { useRouter } from "next/router";
import remark from "remark";
import html from "remark-html";
import { Params } from "next/dist/next-server/server/router";

type Props = {
  post: {
    date: string;
    title: string;
    content: string;
  };
};

const Post: NextPage<Props> = ({ post }: Props) => {
  return (
    <>
      <article>
        <h1>{post.title}</h1>
      </article>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  return {
    props: {
      post: {
        date: "2020",
        title: params.slug,
        content: "content",
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const postsDirectory = join(process.cwd(), "src/_posts");
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs.map((slug) => {
    return {
      params: {
        slug: slug.replace(/\.md$/, ""),
      },
    };
  });
  return {
    paths: posts,
    fallback: false,
  };
};

export default Post;
