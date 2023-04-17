export default function IslandDashboard(props) {
    return(
        <>
        <div className={`padding-island-estilo1  border-radius-estilo1 background-neutral-white ${props.className ? "" : "w-full"} ${props.className} `}>
            {props.children}
        </div>
        </>
    )
}