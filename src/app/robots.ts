import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
		sitemap: "https://blog-puce-one-75.vercel.app/sitemap.xml",
	};
}
