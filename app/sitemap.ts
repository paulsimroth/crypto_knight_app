export const revalidate = 600000; //revalidate this page every 300000 seconds; 1 week = 604800 sec.

type Sitemap = Array<{
    url: string
    lastModified?: string | Date
    changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
    priority?: number
}>

export default async function sitemap() {

    /** 
     * @notice Regular routes added manually
     * @dev add permanent routes here 
    */
    const routes: Sitemap = [
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
            lastModified: new Date('2025-03-27T19:12:09.498Z'),
            changeFrequency: 'monthly',
            priority: 1.0,
        }
    ];

    /**
     * @notice All routes get returned; output at /sitemap.xml
     * @dev add routes here and define above!
     */
    return [...routes];
}