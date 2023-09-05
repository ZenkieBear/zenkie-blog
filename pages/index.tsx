import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import DateBox from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export default function Home({ allPostsData }: {
  allPostsData: {
    date: string,
    title: string,
    id: string
  }[]
}) {
  const now = new Date();
  const birthday = new Date('2004')
  const age =  now.getFullYear() - birthday.getFullYear();
  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel='canonical' href='https://blog.zenkie.cn/' />
        <meta property="og:title" content={siteTitle} />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I’m Zenkie Bear, {age} years. I’m a <strong>Full-Stack Develope Engineer</strong> work in China.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateBox dateString={date}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
      {/* <SassDemo /> */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

