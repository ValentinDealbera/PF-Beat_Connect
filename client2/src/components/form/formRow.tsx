type FormRowProps = {
  children: React.ReactNode;
};

export default function FormRow({ children }: FormRowProps) {
  return (
    <div className="flex flex-col lg:flex-row  gap-4 w-full">{children}</div>
  );
}
