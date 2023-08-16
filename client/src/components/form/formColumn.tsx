type FormColumnProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FormColumn({ children, className }: FormColumnProps) {
  return <div className={`flex flex-col gap-4 ${className}`}>{children}</div>;
}
