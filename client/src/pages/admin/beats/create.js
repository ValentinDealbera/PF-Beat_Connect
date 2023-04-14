import { SellerDashboardLayout, IslandDashboard, FaqsGrid } from "@/components";

export default function SellerDashboardOverview() {
  return (
    <>
      <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage="Editar beat"
          topBarButtonLabel="Guardar cambios"
          onClick={() => {
            console.log("Click");
          }}
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 "></IslandDashboard>
        </SellerDashboardLayout>
      </main>
    </>
  );
}
