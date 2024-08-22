<<<<<<< HEAD
import PublicCategoriesList from './PublicCategoriesList'; // Import the client component
import { getGlobalCategories } from "../api/categoriesAPI";
=======
import { Card, Skeleton, Typography, Divider, List } from "antd";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { getGlobalCategories } from "../api/categoriesAPI"; // Update path as necessary

const Text = Typography.Text;
>>>>>>> c8911d849b65f34b3dff7be61f5e9636ae65aa32

type Category = {
  id: number;
  name: string;
  globalcategory: string;
  isPublic: boolean;
  username: string;
};

export default async function PublicCategories() {
<<<<<<< HEAD
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
=======
  // Fetch data server-side within the component
  let categories: Category[] = [];
  
  try {
    const categoriesData = await getGlobalCategories();
    categories = categoriesData.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "70vh",
        overflow: "auto",
        padding: "0 16px",
      }}
    >
      <InfiniteScroll
        dataLength={categories.length}
        next={() => {}} // Add client-side fetching logic for infinite scroll here
        hasMore={false} // Update this based on your logic
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={categories}
          renderItem={(category: Category) => (
            <Card key={category.id} className="category-card" style={{ marginBottom: "16px" }}>
              <Link href={`global/${category.username}/${category.globalcategory}/${category.name}`}>
                <Text style={{ color: "blue", fontWeight: "bold" }}>{category.name}</Text>
              </Link>
            </Card>
          )}
        />
      </InfiniteScroll>
    </div>
  );
>>>>>>> c8911d849b65f34b3dff7be61f5e9636ae65aa32
}
