import { MetadataRoute } from 'next';
import { getGlobalCategories } from './api/categoriesAPI';

// Mock function to fetch dynamic routes
// Replace this with your actual implementation
async function fetchDynamicRoutes() {
    const response = await getGlobalCategories();

    // Check if the response contains a categories array
    if (!response || !Array.isArray(response.categories)) {
        console.error('getGlobalCategories did not return an array', response);
        throw new TypeError('Expected getGlobalCategories to return an object with a categories array');
    }

    const globalCategories = response.categories;

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
        changeFrequency: 'hourly',
        priority: 1,
    }));

    return [
        ...staticRoutes,
        ...dynamicSitemapEntries
    ];
}
