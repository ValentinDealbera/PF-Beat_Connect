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

import { beatsDos } from "@/data/fakeDB";

export default function SellerDashboardOverview() {
  const beatData = beatsDos;
    
    const router = useRouter();
    const [beatToDelete, setBeatToDelete] = React.useState(null);
    const headers = ["Item", "AudioMP3", "Id", "Creator", "State", "Price", "Edit", "Delete" ];

    const rows = beatData.map((item) => {
      return {
          id: item.id,
          item: (
              <div className="flex items-center gap-4">
                  <Image
                      src={item.image}
                      width={50}
                      height={50}
                      className="rounded-full aspect-square object-cover"
                  />
                  <h3 className="text-base-medium">{item.name}</h3>
              </div>
          ),
           audiomp3:(
             <div className="flex items-center w-max-[30px]">
               <audio controls className="w-full">
               <source src={item.audioMP3} type="audio/mpeg" />
               </audio>                               
             </div>
           ),
          price: item.priceAmount,
          creator : `${item.userCreator}`,
          state: item.softDelete? "Paused":"Ok",
          edit: (<button
            onClick={() => router.push(`/admin/beats/${item.id}`)}
            className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
            text-sm-semibold py-2 px-4 border-radius-estilo2"
            >Edit</button>),          
          delete:( <button
            onClick={() => setBeatToDelete(item)}
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
          topBarMessage="Beats de la pagina"
          topBarButtonLabel="Crear beat"
          onClick={() => {
            router.push("/admin/beats/create");
          }}
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8">
          <DynamicTable headers={headers} rows={rows} />
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
      {beatToDelete && (<ModalTables 
      label="Beat" 
      name ={"name"} 
      element={beatToDelete} 
      onClose={() => setBeatToDelete(null)} 
      onConfirm={() => console.log(`Eliminando Beat con id ${beatToDelete.id}`)} />)}
      </>
    );
  }