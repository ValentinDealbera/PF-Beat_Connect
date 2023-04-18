import {
    SellerDashboardLayout,
    IslandDashboard,
    FaqsGrid,
  } from "@/components";
  import TableAdminUsers from "@/components/tables/tableAdminUsers";
  import { usuariosDos } from "../../../data/fakeDB";
  
  export default function SellerDashboardOverview() {

  const usuariosDosJson = JSON.stringify(usuariosDos);
  
 
    return (
      <>
        <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage="Usuarios de la pagina"
          topBarButtonLabel="Crear usuario"
          onClick={() => {
            console.log("Click");
          }}
        >
            <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
              <div className="flex">
              <TableAdminUsers data={usuariosDosJson} />
              </div>
            </IslandDashboard>
          </SellerDashboardLayout>
        </main>
      </>
    );
  }
  