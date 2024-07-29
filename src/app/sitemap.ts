import { MetadataRoute } from 'next';
import { getGlobalCategories } from './api/categoriesAPI';

// Mock function to fetch dynamic routes
// Replace this with your actual implementation
async function fetchDynamicRoutes() {
    const globalCategories = await getGlobalCategories();

    // Check if globalCategories is an array
    if (!Array.isArray(globalCategories)) {
        console.error('getGlobalCategories did not return an array', globalCategories);
        throw new TypeError('Expected getGlobalCategories to return an array');
    }

    const dynamicRoutes = globalCategories.map((category: { username: string, globalcategory: string, name: string }) =>
        `/global/${category.username}/${category.globalcategory}/${category.name}`
    );

    return dynamicRoutes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const dynamicRoutes = await fetchDynamicRoutes();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: 'https://sharelinc.store',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://sharelinc.store/global',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    const dynamicSitemapEntries: MetadataRoute.Sitemap = dynamicRoutes.map((route: string) => ({
        url: `https://sharelinc.store${route}`,
        lastModified: new Date(),
        changeFrequency: 'hourly', // This value is allowed
        priority: 1,
    }));

    return [
        ...staticRoutes,
        ...dynamicSitemapEntries
    ];
}
