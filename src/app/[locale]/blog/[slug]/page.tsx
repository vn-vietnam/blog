import { getPostsData } from '@/app/[locale]/server-utils';
import { notFound } from 'next/navigation';
import BlogPost from '@/app/[locale]/blog/[slug]/BlogPost';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkNormalizeHeadings from 'remark-normalize-headings';
import remarkFlexibleToc from 'remark-flexible-toc';
import { remark } from 'remark';
import { Metadata } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface Post {
  id: string;
  title: string;
  summary?: string;
  content: string;
  date: string;
  draft?: boolean;
  locale: string;
  stats: {
    words: number;
    text: string;
  };
  mdxSource: MDXRemoteSerializeResult;
  toc: {
    items: TocItem[];
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'vi'];
  const params = [];
  
  for (const locale of locales) {
    const posts = getPostsData(locale);
    params.push(...posts.map((post) => ({
      slug: post.id,
      locale
    })));
  }
  
  return params;
}

type Props = {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale)
  if (!post) return notFound()
  return {
    title: post.title,
    description: post.summary,
  }
}

async function getPost(slug: string, locale: string): Promise<Post | null> {
  const post = getPostsData(locale).find((post) => post.id === slug)
  if (!post || post?.draft) return null

  // Generate TOC
  const file = await remark()
    .use(remarkNormalizeHeadings)
    .use(remarkFlexibleToc)
    .process(post.content);

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [
        remarkNormalizeHeadings,
        remarkGfm,
      ],
      rehypePlugins: [
        [rehypeSlug],
        [rehypeStringify],
        [rehypeAutolinkHeadings],
      ],
      remarkRehypeOptions: {
        allowDangerousHtml: true
      }
    }
  });

  return {
    ...post,
    mdxSource,
    toc: {
      items: (file.data.toc as { items: TocItem[] }).items || []
    }
  }
}

export default async function BlogPage({ params }: Props) {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale)
  if (!post) notFound()
  return <BlogPost post={post} />
}