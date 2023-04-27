export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={` ${props.className}`}
      type={props.type}
      onClick={props.onClick}
    >
      {children}
      {props.label}
    </button>
  );
}
