import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            disallow: ['/*.svg$'],
        },
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
        host: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    }
}