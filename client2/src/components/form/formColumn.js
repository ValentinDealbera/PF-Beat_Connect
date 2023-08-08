export default function FormColumn({ children, className }) {
  return <div className={`flex flex-col gap-4 ${className}`}>{children}</div>;
}
