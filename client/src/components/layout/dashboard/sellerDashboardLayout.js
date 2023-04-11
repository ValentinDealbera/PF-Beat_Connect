import {
  SellerDashboardSidebar,
  SellerDashboardTopBar,
  SellerDashboardHeader,
} from "@/components";

export default function SellerDashboardLayout({
  children,
  topBarMode,
  topBarMessage,
  topBarButtonLabel,
}) {
  return (
    <>
      <section className="background-neutral-slate-100 flex h-screen flex-col items-stretch xl:flex-row ">
        <div id="col1" className=" hidden w-[20%] xl:flex">
          <SellerDashboardSidebar />
        </div>
        <div id="col1" className=" flex w-full xl:hidden">
          <SellerDashboardHeader />
        </div>
        <div className="flex w-full flex-col pt-[105px] xl:pt-0">
          <SellerDashboardTopBar
            mode={topBarMode}
            message={topBarMessage}
            buttonLabel={topBarButtonLabel}
          />
          <div className="padding-x-dashboard-estilo1  w-full">{children}</div>
        </div>
      </section>
    </>
  );
}
