export default function Input(props) {
    return (
      <label
        htmlFor={props.name}
        className="flex min-w-0 flex-grow flex-col gap-2 font-britanicaBold text-sm"
      >
        {props.label}
        <input
          defaultValue={props.defaultValue}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className="rounded-xl border-violet-200 bg-violet-100 px-4 py-1 text-violet-800 placeholder:text-violet-800"
          style={{ borderWidth: "1px" }}
        />
      </label>
    );
  }
  