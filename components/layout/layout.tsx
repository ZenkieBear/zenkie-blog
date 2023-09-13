import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '@/styles/utils.module.css';
import Link from 'next/link';
import { ReactNode } from 'react';
import Footer from '@/components/footer/footer';
import { Analytics } from '@vercel/analytics/react';

const name = 'Zenkie Bear';
export const siteTitle = `Zenkie Bear's Blog`;

export default function Layout({ children, home }: {
  children: ReactNode,
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.jpg" />
        <meta name="description" content="This is Zenkie Bear’s Blog. I write about programming, design and life~" />
        <meta property="og:description" content="This is Zenkie Bear’s Blog. I write about programming, design and life~" />
        <meta property='og:image' content='https://blog.zenkie.cn/_next/image?url=%2Fimages%2Fprofile.jpg&w=384&q=75' />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <Footer />
      <Analytics />
    </div>
  );
}