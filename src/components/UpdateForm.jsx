import { useEffect, useState } from "react";

export default function UpdateForm({
  selectedArticleLine,
  handleUpdateArticleLine,
}) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    details: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    const updateFormData = () => {
      if (selectedArticleLine) {
        setFormData(selectedArticleLine);
      } else {
        setFormData({
          id: "",
          name: "",
          details: "",
          quantity: "",
          price: "",
        });
      }
    };

    updateFormData();
  }, [selectedArticleLine]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <>
      <div className="bg-stone-100 rounded h-full border-b border-stone-300">
        <form action="">
          <div className="xl:py-3 xl:px-2 grid">
            <label htmlFor="details" className="font-semibold uppercase">
              Nombre Articulo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              className="bg-stone-300 border rounded md:py-1 xl:py-2 ps-3"
              disabled={true}
            />
          </div>
          <div className="xl:py-3 xl:px-2 grid">
            <label htmlFor="details" className="font-semibold uppercase">
              Detalles
            </label>
            <input
              type="text"
              id="details"
              name="details"
              value={formData.details}
              className="bg-stone-300 border rounded md:py-1 xl:py-2 ps-3"
              onChange={handleChange}
            />
          </div>
          <div className="xl:py-3 xl:px-2 grid">
            <label htmlFor="quantity" className="font-semibold uppercase">
              Cantidad
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              className="bg-stone-300 border rounded md:py-1 xl:py-2 ps-3"
              onChange={handleChange}
            />
          </div>
          <div className="xl:py-3 xl:px-2 grid">
            <label htmlFor="price" className="font-semibold uppercase">
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              className="bg-stone-300 border rounded md:py-1 xl:py-2 ps-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid justify-items-center my-1 xl:my-3">
            <button
              type="button"
              className="xl:text-xl bg-blue-400 text-stone-100 font-semibold px-2 py-1 rounded"
              onClick={() => handleUpdateArticleLine(formData)}
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
