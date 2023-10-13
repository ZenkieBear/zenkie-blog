import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkRehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import rehypeFormat from 'rehype-format'
import rehypeDocument from 'rehype-document'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from the file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Parse metadata section
    const matterResult = matter(fileContents)

    // Combine the data and the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/.md/, '')
    }
  }))
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    // todo remove this if there's a new adaptered plugin version
    // @ts-expect-error
    .use(remarkParse)
    // @ts-expect-error
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeFormat)
    .use(rehypeDocument)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content)
  const contentHtml = processedContent
    .toString()
    .replaceAll('<pre>', '<pre class="codebox">')
    .replaceAll('<code>', '<code class="inline">')

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
