import {
    SellerDashboardLayout,
    IslandDashboard,
    FaqsGrid,
    AdminCreateReviewForm,
  } from "@/components";

  import { useState, useEffect, useRef } from "react";
  
  export default function SellerDashboardOverview() {

    const childRef = useRef(null);

    const handleExternalSubmit = () => {
      childRef.current.submit();
    };

    return (
      <>
        <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage="Editar review"
          topBarButtonLabel="Guardar cambios"
          onClick={handleExternalSubmit}
          >
            <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
            <AdminCreateReviewForm mode="edit" ref={childRef} />
            </IslandDashboard>
          </SellerDashboardLayout>
        </main>
      </>
    );
  }
  