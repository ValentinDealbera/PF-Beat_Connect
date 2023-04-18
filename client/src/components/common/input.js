export default function Input(props) {
  console.log(props.error);
  return (
    <label
      htmlFor={props.name}
      className={`gap-1 text-sm-medium flex min-w-0 flex-col ${props.labelClass}`}
    >
      {props.label}
      <input
        defaultValue={props.defaultValue}
        type={props.type}
        name={props.name}
        value={props.value}
        prefix={props.prefix}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={`${props.className} text-sm-regular border-radius-estilo2 color-neutral-black-950 placeholder:text-sm-light placeholder:color-neutral-gray-400 border-slate-200 bg-white px-4 py-2`}
        style={{ borderWidth: "1px" }}
      />
            {props.error && (
        <p className="gap-estilo4 text-sm-medium color-primary-red-500 ml-2 flex">
          {props.error}
        </p>
      )}
    </label>
  );
}
