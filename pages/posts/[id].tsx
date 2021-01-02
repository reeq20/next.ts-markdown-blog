import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  NextPage,
} from "next";

interface Props {
  data: any;
}

const Post: NextPage<Props> = ({ data }) => {
  return (
    <>
      <div>{data}</div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1", name: "test1" } },
      { params: { id: "2", name: "test2" } },
      { params: { id: "3", name: "test3" } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      data: params?.id,
    },
  };
};

export default Post;
