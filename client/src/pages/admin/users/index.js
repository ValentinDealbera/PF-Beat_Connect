import {
    SellerDashboardLayout,
    IslandDashboard,
    FaqsGrid,
    DynamicTable,
    ModalTables
  } from "@/components";
  import * as React from "react";
  import Image from "next/image";
  import { useRouter } from "next/router";
  
  import { usuariosDos } from "../../../data/fakeDB";
  
  export default function SellerDashboardOverview() { 

    const usersData = usuariosDos;

    const router = useRouter();
    const [elementToDelete, setElementToDelete] = React.useState(null);
    const headers = ["User", "Id", "Email", "IsSeller", "SoftDelete", "Edit", "Delete" ];

    const rows = usersData.map((item) => {
      return {
          id: item.id,
          user: (
              <div className="flex items-center gap-4">
                  <Image
                      src={item.image}
                      width={50}
                      height={50}
                      className="rounded-full aspect-square object-cover"
                  />
                  <h3 className="text-base-medium">{item.username}</h3>
              </div>
          ),           
          email: item.email,
          isseller : item.isSeller?"Yes":"No",
          softdelete: item.softDelete? "Banned":"Ok",
          edit: (<button
            onClick={() => router.push(`/admin/users/${item.id}`)}
            className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
            text-sm-semibold py-2 px-4 border-radius-estilo2"
            >Edit</button>),          
          delete:( <button
            onClick={() => setElementToDelete(item)}
            className="background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
            text-sm-semibold py-2 px-4 border-radius-estilo2"
            >Eliminar</button>)
      } 
  })   
  
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
              <DynamicTable headers={headers} rows={rows} />              
            </IslandDashboard>
          </SellerDashboardLayout>          
        </main>
        {elementToDelete && 
        (<ModalTables 
          label="User" 
          name ={"username"} 
          element={elementToDelete} 
          onClose={() => setElementToDelete(null)} 
          onConfirm={() => console.log(`Eliminando User con id ${elementToDelete.id}`)} />)}
      </>
    );
  }