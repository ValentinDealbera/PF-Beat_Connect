import { Logo, SellerDashboardNav } from "@/components";

export default function SellerDashboardSidebar() {
  return (
    <>
      <section
        className="padding-x-dashboard-estilo1 background-neutral-white flex h-full flex-col items-start justify-start py-10 align-middle dark:bg-neutral-900"
        style={{ borderRadius: "0px 40px 40px 0px" }}
      >
        <div className="mb-6">
          <Logo/>
        </div>
        <SellerDashboardNav />
      </section>
    </>
  );
}
