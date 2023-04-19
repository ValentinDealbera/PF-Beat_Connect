import { SellerDashboardLayout, IslandDashboard, FaqsGrid } from "@/components";
import { useRouter } from "next/router";

export default function SellerDashboardOverview() {
  const router = useRouter();
  return (
    <>
      <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage="Reviews de la pagina"
          topBarButtonLabel="Crear review"
          onClick={() => {
            router.push("/admin/reviews/create");
          }}
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 "></IslandDashboard>
        </SellerDashboardLayout>
      </main>
    </>
  );
}
