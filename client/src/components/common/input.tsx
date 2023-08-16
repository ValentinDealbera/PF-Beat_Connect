import { usePathname } from "next/navigation";

type InputProps = {
  label: string;
  labelClass?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  type?: string;
  step?: string;
  prefix?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  error?: string;
  id?: string;
  min?: string;
  max?: string;
  className?: string;
};

export default function Input({
  labelClass,
  label,
  error,
  name,
  value,
  defaultValue,
  type,
  step,
  prefix,
  onChange,
  placeholder,
  id,
  min,
  max,
  className,
}: InputProps) {
  const pathname = usePathname();
  const extraClassName = `${
    pathname.startsWith("/admin")
      ? " dark:text-white   dark:placeholder:text-white border-slate-200 dark:border-none dark:bg-customDark-700"
      : "placeholder:text-sm-light placeholder:color-neutral-gray-400   color-neutral-black-950"
  }`;

  return (
    <label
      htmlFor={name}
      className={`text-sm-medium flex min-w-0 flex-col gap-1 ${labelClass}`}
    >
      {label}
      <input
        defaultValue={defaultValue}
        type={type}
        id={id}
        step={step}
        name={name}
        value={value}
        prefix={prefix}
        min={min}
        max={max}
        onChange={onChange}
        placeholder={placeholder}
        className={`${extraClassName} ${className} text-sm-regular border-radius-estilo2 px-4 py-2`}
        style={{ borderWidth: "1px" }}
      />
      {error && (
        <p className="gap-estilo4 text-sm-medium color-primary-red-500 ml-2 flex dark:text-red-800">
          {error}
        </p>
      )}
    </label>
  );
}
