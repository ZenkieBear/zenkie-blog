import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Date from "../../components/date";
import Layout, { siteTitle } from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }: {
  postData: {
    id: string,
    title: string,
    date: string,
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{`${postData.title} - ${siteTitle}`}</title>
        <link rel='canonical' href={`https://blog.zenkie.cn/posts/${postData.id}`} />
        <meta property="og:title" content={`${postData.title} - ${siteTitle}`} />
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{ postData.title }</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }: {
  params: {
    id: string
  }
}) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}
