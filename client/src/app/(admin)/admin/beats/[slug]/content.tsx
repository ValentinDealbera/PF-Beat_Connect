"use client";
import {
  SellerDashboardLayout,
  IslandDashboard,
  AdminCreateBeatForm,
} from "@/components";

import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Content() {
  const [t] = useTranslation("global");
  const childRef = useRef<any>();

  const handleExternalSubmit = () => {
    childRef.current.submit();
  };

  return (
    <main>
      <SellerDashboardLayout
        topBarMode="action"
        topBarMessage={t("adminBeatsCreate.title")}
        topBarButtonLabel={t("adminBeatsCreate.t1")}
        onClick={handleExternalSubmit}
      >
        <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
          <AdminCreateBeatForm mode="edit" ref={childRef} />
        </IslandDashboard>
      </SellerDashboardLayout>
    </main>
  );
}
