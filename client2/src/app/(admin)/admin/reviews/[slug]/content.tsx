"use client";
import {
  SellerDashboardLayout,
  IslandDashboard,
  AdminCreateReviewForm,
} from "@/components";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

export default function SellerDashboardOverview() {
  const [t] = useTranslation("global");
  const childRef = useRef<any>();

  const handleExternalSubmit = () => {
    childRef.current.submit();
  };

  return (
    <>
      <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage={t("adminBeatsCreate.title3")}
          topBarButtonLabel={t("adminBeatsCreate.t1")}
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
