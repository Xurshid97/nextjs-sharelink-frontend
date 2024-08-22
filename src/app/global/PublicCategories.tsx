import PublicCategoriesList from './PublicCategoriesList'; // Import the client component
import { getGlobalCategories } from "../api/categoriesAPI";

type Category = {
    id: number;
    name: string;
    globalcategory: string,
    isPublic: boolean;
    username: string;
};

export default async function PublicCategories() {
  try {
      const categoriesData = await getGlobalCategories();
      const categories: Category[] = categoriesData.categories || [];

      return (
          <PublicCategoriesList categories={categories} /> // Pass data to client component
      );
  } catch (error) {
      console.error("Error fetching categories:", error);
      return <div>Error loading categories</div>;
  }
}
