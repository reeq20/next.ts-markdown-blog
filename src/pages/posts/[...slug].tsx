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
import glob from "glob";
import { Params } from "next/dist/next-server/server/router";
import matter from "gray-matter";
import { Head } from "next/document";

type Props = {
  post: {
    meta: { title: string; date: string };
    content: any;
  };
};

const Post: NextPage<Props> = ({ post }: Props) => {
  return (
    <>
      <Head>
        <title>{post.meta.title}</title>
      </Head>
      <article>
        <h1>{post.meta.title}</h1>
        <time>{post.meta.date}</time>
        <div dangerouslySetInnerHTML={createMarkup(post.content)} />
      </article>
    </>
  );
};
const postsDirectory = join(process.cwd(), "src/_posts");

function createMarkup(htmlContents) {
  if (!htmlContents) {
    return;
  }
  return { __html: htmlContents };
}

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const fullPath = join(postsDirectory, `${params.slug.join("/")}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);
  const postContent = await markdownToHtml((content as string) || "");
  return {
    props: {
      post: {
        meta: data,
        content: postContent,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const entries = glob.sync(`${postsDirectory}/**/*.md`);
  const paths = entries
    .map((v) => {
      return v
        .split(postsDirectory)
        .pop()
        .replace(/(\.md$)/, "")
        .slice(1);
    })
    .map((v) => {
      return { params: { slug: v.split("/") } };
    });
  return {
    paths: paths,
    fallback: false,
  };
};

export default Post;
