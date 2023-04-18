export default function FormContainer({children}) {
    return (
        <div className="flex flex-col gap-4" >
        {children}
        </div>
    );
    }