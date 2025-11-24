export default function Button({
  label,
  handleClick,
  categorySelect,
  btnTitle,
}) {
  return (
    <>
      <button
        type="button"
        title={btnTitle}
        className={`text-base font-light md:size-24 xl:size-30 xl:font-semibold uppercase ${
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
