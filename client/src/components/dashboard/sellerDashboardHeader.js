import {Logo} from "@/components"

export default function SellerDashboardHeader() {
  return (
    <>
      <header
        className={`"background-neutral-white" fixed z-50 flex  w-full flex-row justify-center py-8 background-neutral-white`}
      >
        <div
          className={`padding-x-dashboard-estilo1 w-full flex items-center  justify-between align-middle `}
        >
          <Logo mode={"light"} />
        </div>
      </header>
    </>
  );
}
