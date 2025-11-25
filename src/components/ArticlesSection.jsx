import { useContext } from "react";
import { useState, useEffect } from "react";
import { PosContext } from "./context/PosContext";

function ArticleButton({ article, handleNewArticleLine, handleDeleteArticle }) {
  return (
    <>
      <div
        key={article.id}
        title={article.name}
        className="grid grid_row_[auto_1fr] bg-stone-100 size-20 md:size-24 xl:size-30 cursor-pointer px-1 rounded shadow overflow-scroll"
      >
        <div className="flex flex-col">
          <div
            className="text-end text-sm text-red-800 hover:text-red-500"
            onClick={() => handleDeleteArticle(article.id)}
          >
            X
          </div>
          <h3 className="text-base xl:text-3xl text-center font-semibold text-red-600">
            {article.cod_art}
          </h3>
        </div>
        <div onClick={() => handleNewArticleLine(article)}>
          <p className="uppercase text-wrap text-sm text-center text-blue-950">
            {article.name}
          </p>
        </div>
      </div>
    </>
  );
}

export default function ArticlesSection({
  articles,
  handleNewArticleLine,
  isSelected,
}) {
  const { handleDeleteArticle } = useContext(PosContext);
  const [articlesList, setArticlesList] = useState([]);
  useEffect(() => {
    setArticlesList(articles);
  }, [articles]);
  return (
    <>
      <section
        id="articles-section"
        className="flex flex-wrap gap-2 m-2 justify-start items-center"
      >
        {articlesList.length > 0 &&
          articlesList.map((article) => (
            <ArticleButton
              key={article.id}
              article={article}
              handleNewArticleLine={() => handleNewArticleLine(article)}
              isSelected={isSelected}
              handleDeleteArticle={handleDeleteArticle}
            />
          ))}
      </section>
    </>
  );
}
