export default function TextArea(props) {
  return (
    <label
      htmlFor={props.name}
      className="gap-estilo4 text-sm-medium flex min-w-0 flex-col"
    >
      {props.label}
      <textarea
        defaultValue={props.defaultValue}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={`${props.className} ttext-sm-regular border-radius-estilo2 color-neutral-black-950 placeholder:text-sm-light placeholder:color-neutral-gray-400 border-slate-200 bg-white px-4 py-2 dark:border-none dark:bg-customDark-700 dark:text-white dark:placeholder:text-white`}
        style={{ borderWidth: "1px" }}
      />
      {props.error && (
        <p className="gap-estilo4 text-sm-medium color-primary-red-500 ml-2 flex dark:text-red-800">
          {props.error}
        </p>
      )}
    </label>
  );
}
