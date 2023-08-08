export default function FormContainer({children}) {
    return (
        <div className="flex flex-col gap-3" >
        {children}
        </div>
    );
    }