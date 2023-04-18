import {
    SellerDashboardLayout,
    IslandDashboard,
    FaqsGrid,
  } from "@/components";
  import TableAdminBeats from "@/components/tables/tableAdminBeats";
  import { beatsDos } from "@/data/fakeDB";
  const beatsDosJson = JSON.stringify(beatsDos);
  
  export default function SellerDashboardOverview() {
    return (
      <>
        <main>
          <SellerDashboardLayout
            topBarMode="action"
            topBarMessage="Beats de la pagina"
            topBarButtonLabel="Crear beat"
            onClick={() => {
                console.log("Click");
            }
            }
          >
            <IslandDashboard className="flex flex-col gap-5 xl:gap-8">
              <TableAdminBeats data ={ beatsDosJson } />
            </IslandDashboard>
          </SellerDashboardLayout>
        </main>
      </>
    );
  }
  