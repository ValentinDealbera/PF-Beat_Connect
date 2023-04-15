export default function IslandDashboard(props) {
    return(
        <>
        <div className={`padding-island-estilo1  border-radius-estilo1 background-neutral-white w-full ${props.className} `}>
            {props.children}
        </div>
        </>
    )
}