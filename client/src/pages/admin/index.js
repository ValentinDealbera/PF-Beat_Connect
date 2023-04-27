import {
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
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 dark:bg-neutral-900">
            <h1 className="text-subtitulo-semibold dark:text-white ">
              Frequent answered questions
            </h1>
            <FaqsGrid />
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
    </>
  );
}
