import {
    SellerDashboardLayout,
    IslandDashboard,
    FaqsGrid,
  } from "@/components";
  import TableAdminUsers from "@/components/tables/tableAdminUsers";
  import { usuariosDos } from "../../../data/fakeDB";
  import { useRouter } from "next/router";
  
  export default function SellerDashboardOverview() {

  const usuariosDosJson = JSON.stringify(usuariosDos);
    const router = useRouter();
  
 
    return (
      <>
        <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage="Usuarios de la pagina"
          topBarButtonLabel="Crear usuario"
          onClick={() => {
            router.push("/admin/users/create");
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
  