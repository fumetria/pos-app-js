import { useEffect, useState } from "react";
import { PosContext } from "./PosContext.jsx";
// import { useFetchArticles } from "../../hooks/useFetchArticles.jsx";

export function PosProvider({ children }) {
  const apiURL =
    "https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/articles";
  const [articles, setArticles] = useState([]);
  const [reloadArticles, setReloadArticles] = useState(false);
  /**
   * Fetch de articulos en nuestra API
   */
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(apiURL);
        if (!res.ok) throw new Error("Error al obtener datos");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
        setArticles([]);
      }
    };
    fetchArticles();
  }, [reloadArticles]);
  const [articlesLines, setArticlesLines] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [articlesList, setArticlesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedArticleLine, setSelectedArticleLine] = useState(null);

  useEffect(() => console.log("Articles", articles), [articles]);

  useEffect(() => {
    if (articles.length > 0) {
      setSelectedCategory(articles[0].category.toLowerCase());
    }
  }, [articles]);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <PosContext.Provider
      value={{
        apiURL,
        articles,
        setArticles,
        reloadArticles,
        setReloadArticles,
        articlesList,
        setArticlesList,
        selectedCategory,
        setSelectedCategory,
        handleCategorySelect,
        articlesLines,
        setArticlesLines,
        totalBill,
        setTotalBill,
        selectedArticleLine,
        setSelectedArticleLine,
      }}
    >
      {children}
    </PosContext.Provider>
  );
}
