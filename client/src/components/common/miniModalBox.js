export default function MiniModalBox(props){
    return(
        <div className="absolute flex flex-col gap-2 p-5 bg-white rounded-xl shadow-2xl" >
            {props.children}
        </div>
    )
}