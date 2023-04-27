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
            <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
            </IslandDashboard>
          </SellerDashboardLayout>
        </main>
      </>
    );
  }
  