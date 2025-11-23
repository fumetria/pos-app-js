import { useState, useEffect } from "react";

function ArticleButton({ article, handleNewArticleLine }) {
  return (
    <>
      <div
        key={article.id}
        onClick={() => handleNewArticleLine(article)}
        title={article.name}
        className="grid grid_row_[1fr_auto] bg-stone-100 justify-items-center items-center size-20 md:size-24 xl:size-30 cursor-pointer px-1 rounded shadow overflow-scroll"
      >
        <div>
          <h3 className="text-base xl:text-3xl text-center font-semibold text-red-600">
            {article.cod_art}
          </h3>
        </div>
        <div>
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
            />
          ))}
      </section>
    </>
  );
}
