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

type Props = {
  post: {
    date: string;
    title: string;
    content: string[];
    data: any;
    test: any;
  };
};

const Post: NextPage<Props> = ({ post }: Props) => {
  console.log(post.test);
  return (
    <>
      <article>
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
        date: "2020",
        title: data,
        content: postContent,
        test: fileContents,
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
