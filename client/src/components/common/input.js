import { useRouter } from "next/router";

export default function Input(props) {
  const router = useRouter();
  const className = `${
    router.pathname.startsWith("/admin")
      ? " dark:text-white   dark:placeholder:text-white border-slate-200 dark:border-none dark:bg-customDark-700"
      : "placeholder:text-sm-light placeholder:color-neutral-gray-400   color-neutral-black-950"
  }`;

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
        className={`${props.className} text-sm-regular border-radius-estilo2 px-4 py-2 ${className}`}
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
