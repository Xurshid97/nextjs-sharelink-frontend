interface AccessToken {
  access_token: string;
}

export async function setAccessToken(value: AccessToken | null) {
      if (value && value.access_token) {
          localStorage.setItem("Access token Sharelink", value.access_token);
      }
}

export function getAccessToken(): string | null {
  const token = localStorage.getItem("Access token Sharelink");
  return token !== null ? token : null;
}

export function getStoredCategories(): any[] {
  const categoriesArray = localStorage.getItem("Sharelink Stored categories");
  return categoriesArray !== null ? JSON.parse(categoriesArray) : [];
}

export async function setStoredCategories(value: any[] | null) {
  if (value) {
    const storedCategories = getStoredCategories();
    if (storedCategories) {
      const uniqueCategories = [...new Set([...storedCategories, ...value])]; // Remove duplicates
      localStorage.setItem(
        "Sharelink Stored categories",
        JSON.stringify(uniqueCategories)
      );
    } else {
      localStorage.setItem(
        "Sharelink Stored categories",
        JSON.stringify(value)
      );
    }

  } else {
    localStorage.removeItem("Sharelink Stored categories");
  }
}