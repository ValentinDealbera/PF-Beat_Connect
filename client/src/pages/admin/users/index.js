import {
    SellerDashboardLayout,
    IslandDashboard,
    FaqsGrid,
    DynamicTable
  } from "@/components";
  import * as React from "react";
  import Image from "next/image";
  import { useRouter } from "next/router";
  
  import { usuariosDos } from "../../../data/fakeDB";
  
  export default function SellerDashboardOverview() { 

    const usersData = usuariosDos;

    const router = useRouter();
    const [userToDelete, setUserToDelete] = React.useState(null);
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
            onClick={() => setUserToDelete(item)}
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
              <div className="flex">
              <DynamicTable headers={headers} rows={rows} />
              </div>
            </IslandDashboard>
          </SellerDashboardLayout>
        </main>
        {userToDelete && (
  <div
    className="fixed inset-0 z-50 flex justify-center items-center"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    <div className="background-neutral-white w-96 p-8 border-radius-estilo2">
      <h2 className="text-xl font-bold mb-4">Delete User</h2>
      <p className="text-sm mb-4">
        Are you sure you want to delete Beat {userToDelete.id} -{" "}
        {userToDelete.name}?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setUserToDelete(null)}
          className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
                  text-sm-semibold py-2 px-4 border-radius-estilo2"
        >
          Cancel
        </button>
        <button
          onClick={() => console.log(`Eliminando Beat con id ${userToDelete.id}`)}
          className="background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
                  text-sm-semibold py-2 px-4 border-radius-estilo2"
        >
          Yes, I'm sure
        </button>
      </div>
    </div>
  </div>
)}
      </>
    );
  }