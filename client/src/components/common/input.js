export default function Input(props) {
    return (
      <label
        htmlFor={props.name}
        className="flex min-w-0 flex-grow flex-col gap-2 text-sm"
      >
        {props.label}
        <input
          defaultValue={props.defaultValue}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className="rounded-xl border-slate-200 bg-white px-4 py-2 text-black placeholder:text-gray-400"
          style={{ borderWidth: "1px" }}
        />
      </label>
    );
  }
  