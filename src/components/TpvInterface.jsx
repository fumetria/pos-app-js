import ArticlesLineTable from "./ArticleLinesTable.jsx";
import ArticlesSection from "./ArticlesSection.jsx";
import CategorySection from "./CategorySection.jsx";
import { useEffect, useState } from "react";
import { articles } from "../utils/data.js";
import ArticleLinesTableAsideBtns from "./ArticleLinesTableAsideBtns.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faPrint } from "@fortawesome/free-solid-svg-icons";
import UpdateForm from "./UpdateForm.jsx";
// import { ArticleProvider } from "./context/ArticleProvider.tsx";
// import { useFetchArticles } from "../hooks/useFetchArticles.tsx";

export default function TpvInterface() {
  // const url =
  //   "https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/articles";
  // const [query, setQuery] = useState("");
  // const [reloadArticles, setReloadArticles] = useState(false);
  // const articles = useFetchArticles({ url, query, reloadArticles });
  const [articlesList, setArticlesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    articles[0].category
  );
  const [articlesLines, setArticlesLines] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  const URL = "http://localhost:6500";

  const [selectedArticleLine, setSelectedArticleLine] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleNewArticleLine = (article) => {
    setArticlesLines((prevLines) => {
      // Si el articulo ya esta en pantalla, nos dará el indice de este
      const existingIndex = prevLines.findIndex(
        (line) => line.id === article.id
      );

      if (existingIndex !== -1) {
        const updatedLines = [...prevLines];
        // Accedemos al articulo usando el indice que hemos obtenido anteriormente
        const existingLine = { ...updatedLines[existingIndex] };
        // Actualizamos las cantidades y totales
        existingLine.quantity = Number(existingLine.quantity) + 1;
        existingLine.total =
          Number(existingLine.quantity) * Number(existingLine.price);
        // Actualizamos la linea y devolvemos el array actualizado para
        // que se actualize en la función setArticlesLines
        updatedLines[existingIndex] = existingLine;
        return updatedLines;
      } else {
        const newLine = {
          id: article.id,
          name: article.name,
          quantity: 1,
          price: Number(article.pvp),
          total: Number(article.pvp),
        };
        return [...prevLines, newLine];
      }
    });
  };

  const handleUpdateArticleLine = (formData) => {
    setArticlesLines((prevLines) => {
      const existingIndex = prevLines.findIndex(
        (line) => line.id === formData.id
      );
      if (existingIndex != -1) {
        const updatedLines = [...prevLines];
        // Accedemos al articulo usando el indice que hemos obtenido anteriormente
        const existingLine = { ...updatedLines[existingIndex] };
        // Actualizamos las cantidades y totales
        existingLine.details = formData.details;
        existingLine.quantity = formData.quantity;
        existingLine.price = formData.price;
        existingLine.total = existingLine.quantity * existingLine.price;
        // Actualizamos la linea y devolvemos el array actualizado para
        // que se actualize en la función setArticlesLines
        updatedLines[existingIndex] = existingLine;
        return updatedLines;
      }
      return prevLines;
    });
    setSelectedArticleLine(null);
  };
  useEffect(() => {
    const updateArticleList = () => {
      const aList = articles.filter(
        (article) => article.category === selectedCategory
      );
      setArticlesList(aList);
    };
    updateArticleList();
  }, [selectedCategory]);

  useEffect(() => {
    const updateTotalBill = () => {
      const total = articlesLines.reduce(
        (totals, articleLine) => totals + articleLine.total,
        0
      );
      setTotalBill(total);
    };
    updateTotalBill();
  }, [articlesLines]);

  const handleSendData = async (articlesLines) => {
    await fetch(URL + "/print", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ articlesLines }),
    }).then(() => {
      setArticlesLines([]);
    });
  };

  const handleOpenDrawer = async () => {
    await fetch(URL + "/open-drawer", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        console.log("¿Funcionó?");
      }
    });
  };

  const handleSelectArticleLine = async (article) => {
    setSelectedArticleLine(article);
  };

  const handleDeleteLine = (selectedArticleLine) => {
    const newArticlesLines = articlesLines.filter(
      (articleLine) => articleLine.id != selectedArticleLine.id
    );
    setArticlesLines(newArticlesLines);
    setSelectedArticleLine(null);
  };

  return (
    <>
      <section
        id="tpv-interface"
        className="h-screen bg-stone-100 grid grid-cols-7 grid-rows-[1fr_auto_auto_auto_auto] text-black"
      >
        <div className="col-start-1 col-end-5 row-start-1 row-end-2 justify-start items-center pb-4 overflow-y-scroll">
          <ArticlesLineTable
            articlesLines={articlesLines}
            selectedArticleLine={selectedArticleLine}
            handleSelectArticleLine={handleSelectArticleLine}
          />
        </div>
        <div className="col-start-1 col-end-5  row-start-2 row-end-3 bg-stone-600 text-stone-100 flex justify-end text-3xl py-4">
          <h3>
            Total:{" "}
            <span className="font-semibold text-4xl">
              {Number(totalBill).toFixed(2).toString().replace(".", ",")}
            </span>{" "}
            €
          </h3>
        </div>
        <div className="col-start-1 col-end-3 row-start-3 row-end-6 bg-stone-300 m-2 rounded">
          {/* <ArticleProvider> */}
          <CategorySection
            articles={articles}
            handleCategorySelect={handleCategorySelect}
            categorySelect={selectedCategory}
          />
          {/* </ArticleProvider> */}
        </div>
        <div className="col-start-5 col-end-6 row-start-1 row-end-3">
          <ArticleLinesTableAsideBtns
            selectedArticleLine={selectedArticleLine}
            handleDeleteLine={handleDeleteLine}
          />
        </div>
        <div className="col-start-6 col-end-7 row-start-1 row-end-3 bg-stone-300 rounded border border-stone-300">
          <UpdateForm
            selectedArticleLine={selectedArticleLine}
            handleUpdateArticleLine={handleUpdateArticleLine}
          />
        </div>
        <div className="col-start-3 col-end-7 row-start-3 row-end-6 bg-stone-300 m-2 rounded">
          <ArticlesSection
            articles={articlesList}
            handleNewArticleLine={handleNewArticleLine}
            handleSelectArticleLine={handleSelectArticleLine}
          />
        </div>
        <div className="bg-grey-300 col-start-7 col-end-8 row-start-1 row-end-7 bg-stone-100 grid grid-rows-[auto_1fr] gap-2 border-s border-stone-300">
          <div className="grid grid-cols-2 justify-items-center gap-2">
            {" "}
            <button
              type="button"
              className="px-2 py-1 size-30 rounded bg-gray-400 cursor-pointer"
              onClick={handleOpenDrawer}
            >
              Abrid cajón
            </button>
            <button
              type="button"
              className="px-2 py-1 size-30 rounded bg-gray-400 cursor-pointer"
              onClick={() => handleSendData(articlesLines)}
            >
              Imprimir
            </button>
            <button
              type="button"
              className="px-2 py-1 size-30 rounded bg-gray-400 cursor-pointer"
            >
              <FontAwesomeIcon icon={faPrint} size="2x" />
              Configurar Impresora
            </button>
            <button
              type="button"
              className="px-2 py-1 size-30 rounded bg-red-700 cursor-pointer"
            >
              <FontAwesomeIcon icon={faDoorOpen} size="2x" />
              <p>Salir</p>
            </button>
          </div>
        </div>
        <div className="row-start-6 row-end-7 bg-stone-100 col-start-1 col-end-8 border-t border-stone-300">
          <div className="flex gap-2 odd:border-e border-stone-300">
            <div className="border-e border-stone-300 px-2">
              <p>
                Usuario: <span>Usuario1</span>
              </p>
            </div>
            <div className="border-e border-stone-300 px-2">
              <p>
                Último ticket: <span>00000</span>
              </p>
            </div>
            <div className="border-e border-stone-300 px-2">
              Importe: <span>0,00</span>€
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
