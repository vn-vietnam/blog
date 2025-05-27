import { MetadataRoute } from 'next';
import { getPostsData } from './[locale]/server-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blog-puce-one-75.vercel.app';
  const locales = ['en', 'vi']; // Add your supported languages
  const currentDate = new Date();

  // Base routes that don't need localization
  const baseRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // Get all blog posts for each locale
  const blogPosts = locales.flatMap((locale) => {
    const posts = getPostsData(locale);
    return posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  });

  // Localized routes
  const localizedRoutes = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${locale}/project`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${locale}/tags`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]);

  return [...baseRoutes, ...localizedRoutes, ...blogPosts];
}
