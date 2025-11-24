import ArticlesLineTable from "./ArticleLinesTable.jsx";
import ArticlesSection from "./ArticlesSection.jsx";
import CategorySection from "./CategorySection.jsx";
import { useEffect, useContext } from "react";
import ArticleLinesTableAsideBtns from "./ArticleLinesTableAsideBtns.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faPrint } from "@fortawesome/free-solid-svg-icons";
import UpdateForm from "./ArticleLineUpdateForm.jsx";
import { PosContext } from "./context/PosContext.jsx";
import AsideButton from "./AsideButton.jsx";
import ArticleLineUpdateForm from "./ArticleLineUpdateForm.jsx";
import ArticleCreateForm from "./ArticleCreateForm.jsx";

export default function TpvInterface() {
  const {
    articles,
    articlesList,
    setArticlesList,
    selectedCategory,
    handleCategorySelect,
    articlesLines,
    setArticlesLines,
    totalBill,
    setTotalBill,
    selectedArticleLine,
    setSelectedArticleLine,
  } = useContext(PosContext);

  const printerURL = "http://localhost:6500";

  const handleNewArticleLine = (article) => {
    setArticlesLines((prevLines) => {
      // Si el articulo ya esta en pantalla, nos dará el indice de este
      const existingIndex = prevLines.findIndex(
        (line) => line.id === article.cod_art
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
          id: article.cod_art,
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
        (article) => article.category.toLowerCase() === selectedCategory
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
    await fetch(printerURL + "/print", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ articlesLines, totalBill }),
    }).then(() => {
      setArticlesLines([]);
    });
  };

  const handleOpenDrawer = async () => {
    await fetch(printerURL + "/open-drawer", {
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
        className="h-screen bg-stone-100 grid grid-cols-7 grid-rows-[1fr_1fr_auto_1fr_1fr_auto] text-black"
      >
        <div className="col-start-1 col-end-5 row-start-1 row-end-3 justify-start items-center pb-4 overflow-y-scroll">
          <ArticlesLineTable
            articlesLines={articlesLines}
            selectedArticleLine={selectedArticleLine}
            handleSelectArticleLine={handleSelectArticleLine}
          />
        </div>
        <div className="col-start-1 col-end-5  row-start-3 row-end-4 bg-stone-600 text-stone-100 flex justify-between text-3xl px-2 py-1 xl:py-4">
          <div className="row-start-1 row-end-2">
            <AsideButton
              label="Eliminar"
              selectedArticleLine={selectedArticleLine}
              handleDeleteLine={handleDeleteLine}
              style={"danger"}
            />
          </div>
          <h3>
            Total:{" "}
            <span className="font-semibold text-4xl">
              {Number(totalBill).toFixed(2).toString().replace(".", ",")}
            </span>{" "}
            €
          </h3>
        </div>
        <div className="col-start-1 col-end-3 row-start-4 row-end-5 bg-stone-300 m-2 rounded overflow-y-scroll">
          <CategorySection
            articles={articles}
            handleCategorySelect={handleCategorySelect}
            categorySelect={selectedCategory}
          />
        </div>
        {/* <div className="col-start-5 col-end-6 row-start-1 row-end-4">
          <ArticleLinesTableAsideBtns
            selectedArticleLine={selectedArticleLine}
            handleDeleteLine={handleDeleteLine}
          />
        </div> */}
        <div className="col-start-5 col-end-7 row-start-1 row-end-4 xl:row-end-3 bg-stone-300 rounded border-s border-stone-300">
          <ArticleLineUpdateForm
            selectedArticleLine={selectedArticleLine}
            handleUpdateArticleLine={handleUpdateArticleLine}
          />
        </div>
        <div className="col-start-5 col-end-7 row-start-4 xl:row-start-3 row-end-6 bg-stone-300 rounded border-s border-t border-stone-300">
          <ArticleCreateForm />
        </div>
        <div className="col-start-3 col-end-5 row-start-4 row-end-5 bg-stone-300 m-2 rounded overflow-y-scroll">
          <ArticlesSection
            articles={articlesList}
            handleNewArticleLine={handleNewArticleLine}
            handleSelectArticleLine={handleSelectArticleLine}
          />
        </div>
        <div className="bg-grey-300 col-start-7 col-end-8 row-start-1 row-end-6 bg-stone-100 py-2 flex flex-col justify-between border-s border-stone-300">
          <div className="flex flex-col justify-center justify-items-center items-center">
            <img
              src="/iestacio_logo.png"
              alt="ies estació logo"
              className="w-[100px] h-20 xl:w-[153px] xl:h-[100px]"
            />
            <p className="text-center font-semibold text-lg xl:text-2xl">
              Cafeteria L'Estació
            </p>
          </div>
          <div className="grid xl:grid-cols-2 justify-items-center gap-1 xl:gap-2">
            <button
              type="button"
              className="px-2 py-1 size-20 xl:size-28 rounded bg-gray-400 text-stone-100 text-sm xl:text-base cursor-pointer"
              onClick={handleOpenDrawer}
            >
              Abrir cajón
            </button>
            <button
              type="button"
              className="px-2 py-1 size-20 xl:size-28 rounded bg-gray-400 text-stone-100 text-sm xl:text-base cursor-pointer"
              onClick={() => handleSendData(articlesLines)}
            >
              <FontAwesomeIcon icon={faPrint} size="2x" />
              Imprimir
            </button>
            <button
              type="button"
              className="px-2 py-1 size-20 xl:size-28 rounded bg-gray-400 text-stone-100 text-sm xl:text-base cursor-pointer"
            >
              Configurar Impresora
            </button>
            <button
              type="button"
              className="px-2 py-1 size-20 xl:size-28 rounded bg-red-700 text-stone-100 text-sm xl:text-base cursor-pointer"
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
