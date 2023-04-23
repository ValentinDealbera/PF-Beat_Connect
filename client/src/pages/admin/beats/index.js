import {
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
  DynamicTable,
  ModalTables
} from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetBeats, setCurrentEditBeat, adminDeleteBeat, setCurrentPage } from "@/redux/slices/admin";

export default function SellerDashboardOverview() {  
    const dispatch = useDispatch();
    const beatData = useSelector((state) => state.admin.beats);    
    const router = useRouter();
    const [beatToDelete, setBeatToDelete] = useState(null);
   
        
    useEffect(()=>{
      dispatch(adminGetBeats());
      console.log("beats truchos", beatData);     
    },[]);

    const handleCloseModal = async() => {
      dispatch(adminGetBeats());
      setBeatToDelete(null);
   };

    const handleEdit = async(data) => {
    console.log("handleEdit", data);
    await dispatch(setCurrentEditBeat(data));
    router.push(`/admin/beats/${data._id}`);
    };
  

    const headers = [
      "Item", 
      "AudioMP3", 
      "Id", 
      "Creator", 
      "State", 
      "Price", 
      "Edit", 
      "Delete" 
    ];

    const rows = beatData.map((item) => {
      return {
          id: item._id,
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
          creator: item.userCreator ? item.userCreator.username : "",
          state: item.softDelete? "Paused":"Ok",
          edit: (<button
            onClick={() => handleEdit(item)}
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
      onClose={handleCloseModal} 
      onConfirm={() => 
      dispatch(adminDeleteBeat(beatToDelete))} />)}
      </>
    );
  }