export default function Button({ label, handleClick, categorySelect }) {
  return (
    <>
      <button
        type="button"
        className={`text-base font-light md:text-lg md:size-24 xl:size-30 xl:font-semibold ${
          label == categorySelect
            ? "bg-blue-400 text-stone-100"
            : "bg-stone-100 text-stone-900"
        }  shadow cursor-pointer rounded`}
        key={label}
        onClick={handleClick}
      >
        {label}
      </button>
    </>
  );
}
