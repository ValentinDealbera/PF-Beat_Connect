export default function Input(props) {
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <label htmlFor={props.name} 
        className="flex min-w-0 gap-estilo4 font-britanicaBold text-sm-medium">
          {props.label}
        </label>
        {props.error && (
          <p className="flex gap-estilo4 font-britanicaBold text-sm-medium color-primary-red-500 ml-2">
            {props.error}
          </p>
        )}
      </div>
      <input
        defaultValue={props.defaultValue}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className="border-radius-estilo2 border-slate-200 bg-white px-4 py-2 color-neutral-black-900 placeholder:color-neutral-gray-400"
        style={{ borderWidth: "1px" }}
      />
    </div>
  );
}
  