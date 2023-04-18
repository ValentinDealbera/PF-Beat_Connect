export default function FormColumn (props) {
    return (
        <div className={`flex flex-col gap-estilo2 ${props.className}`}>
            {props.children}
        </div>
    );
}