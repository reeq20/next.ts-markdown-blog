import path, { join } from "path";
import fs from "fs";

const Test = (props) => {
  return (
    <>
      <h1>test</h1>
      {props.params.directory}
    </>
  );
};

const postsDirectory = join(process.cwd(), "src/_posts");

export async function getStaticProps({ params }) {
  const entryPaths = fs.readdirSync(postsDirectory);
  const paths = [...entryPaths]
    .filter((name) => {
      return !name.match(/\.md$/);
    })
    .map((v) => {
      return { params: { directory: v } };
    });
  return {
    props: {
      params: params,
      paths: paths,
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
