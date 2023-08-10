type FormContainerProps = {
    children: React.ReactNode;
  };

export default function FormContainer({children}:FormContainerProps) {
    return (
        <div className="flex flex-col gap-3" >
        {children}
        </div>
    );
    }