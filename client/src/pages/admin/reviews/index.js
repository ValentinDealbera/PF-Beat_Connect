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

  import { reviews } from "@/data/fakeDB";
  
  export default function SellerDashboardOverview() {

    const reviewsData = reviews;

    const router = useRouter();
    const [reviewToDelete, setReviewToDelete] = React.useState(null);
    const headers = ["Beat", "Id", "Title", "Rating", "Comment", "DateCreated", "CreatedBy", "Edit", "Delete" ];

    const rows = reviewsData.map((item) => {
      return {
        title: item.title,  
        id: item.id,
        rating: item.rating,
        comment: item.comment,
        datecreated: item.dateCreated,
        createdby: item.createdBy.username,
        beat: (
              <div className="flex items-center gap-4 w-2/5">
                  <Image
                      src={item.beat.image}
                      width={50}
                      height={50}
                      className="rounded-full aspect-square object-cover"
                  />
                  <h3 className="text-base-medium">{item.beat.name}</h3>
              </div>
          ),       
          edit: (<button
            onClick={() => router.push(`/admin/reviews/${item.id}`)}
            className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
            text-sm-semibold py-2 px-4 border-radius-estilo2"
            >Edit</button>),          
          delete:( <button
            onClick={() => setReviewToDelete(item)}
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
          topBarMessage="Reviews de la pagina"
          topBarButtonLabel="Crear review"
          onClick={() => {
            router.push("/admin/reviews/create");
          }}
        >
            <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
              <DynamicTable headers={headers} rows={rows} />
            </IslandDashboard>
          </SellerDashboardLayout>
        </main>
        {reviewToDelete && 
        (<ModalTables
          label="Review" 
          name ={"title"} 
          element={reviewToDelete} 
          onClose={() => setReviewToDelete(null)} 
          onConfirm={() => console.log(`Eliminando Review con id ${reviewToDelete.id}`)}          
          />)}
      </>
    );
  }
