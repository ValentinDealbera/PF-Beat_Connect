export default function Input(props) {
  return (
    <label
      htmlFor={props.name}
      className={`text-sm-medium flex min-w-0 flex-col gap-1 ${props.labelClass}`}
    >
      {props.label}
      <input
        defaultValue={props.defaultValue}
        type={props.type}
        step={props.step}
        name={props.name}
        value={props.value}
        prefix={props.prefix}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={`${props.className} text-sm-regular border-radius-estilo2 dark:text-white color-neutral-black-950 placeholder:text-sm-light placeholder:color-neutral-gray-400 dark:placeholder:text-white border-slate-200 dark:border-none dark:bg-customDark-700 bg-white px-4 py-2`}
        style={{ borderWidth: "1px" }}
      />
      {props.error && (
        <p className="gap-estilo4 text-sm-medium color-primary-red-500 dark:text-red-800 ml-2 flex">
          {props.error}
        </p>
      )}
    </label>
  );
}
