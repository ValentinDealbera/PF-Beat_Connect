import {
  Main,
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
} from "@/components";

export default function SellerDashboardOverview() {
  return (
    <>
      <main>
        <SellerDashboardLayout
          topBarMode="message"
          topBarMessage="Hey, welcome back Sofia"
        >
          <IslandDashboard className="gap-5 xl:gap-8 flex flex-col ">
            <h1 className="text-subtitulo-semibold">
              Frequent answered questions
            </h1>
            <FaqsGrid />
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
    </>
  );
}
