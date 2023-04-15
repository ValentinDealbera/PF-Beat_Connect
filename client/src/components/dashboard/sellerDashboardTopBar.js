export default function SellerDashboardTopBar(props) {
  return (
    <>
      <div className="padding-x-dashboard-estilo1 py-10">
        {props.mode === "action" && (
          <div className="flex items-center gap-8" >
            <h3 className="text-titulo3-medium">{props.message}</h3>
            <button className="background-primary-red-700 color-neutral-white px-5 py-3 rounded-full text-sm font-semibold" onClick={props.onClick}>
              {props.buttonLabel}
            </button>
          </div>
        )}
        {props.mode === "message" && (
          <div>
            <h3 className="text-titulo3-medium" >{props.message}</h3>
          </div>
        )}
      </div>
    </>
  );
}
