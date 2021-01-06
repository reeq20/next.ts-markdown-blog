import Document, { Html, Main, NextScript } from "next/document";
import Head from "next/head";

class AppDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <title>BlogName</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default AppDocument;
