import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import DateBox from '@/components/date'
import Layout, { siteTitle } from '@/components/layout/layout'
import { getSortedPostsData } from '@/lib/posts'
import utilStyles from '@/styles/utils.module.css'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel='canonical' href='https://blog.zenkie.cn/' />
        <meta property='og:title' content={siteTitle} />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          <Shake>👋🏼</Shake> Hi there! I am Zenkie Bear, a{' '}
          <strong>Full-Stack Development Engineer</strong> work in China.
          <br />I like programming, contribute for opensource community, I will
          share useful imformations here.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateBox dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      {/* <SassDemo /> */}
    </Layout>
  )
}

interface ShakeProps {
  children: ReactNode
}
const Shake = ({ children }: ShakeProps) => {
  return (
    <motion.span
      style={{ display: 'inline-block' }}
      animate={{
        x: [8, 0],
        y: [-10, 0],
        transition: {
          type: 'spring',
          stiffness: 1000
        }
      }}
    >
      {children}
    </motion.span>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
