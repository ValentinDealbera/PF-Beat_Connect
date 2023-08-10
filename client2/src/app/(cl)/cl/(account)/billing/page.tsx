"use client";
import { Section, DynamicTableLight } from "@/components";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/redux/hooks";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import { rowsBuilder } from "./operation";

export const metadataSettings: Metadata = {
  title: "Settings",
  description: "Settings",
};

export default function BuyerProfile() {
  const [t] = useTranslation("global");
  const [montoVar, setMontoVar] = useState("");
  const [operacionVar, setOperacionVar] = useState("");
  const [fechaVar, setFechaVar] = useState("");

  const beats = useAppSelector((state) => state.client.orders.orders) as any;
  const beatsFiltered = beats.filter((item: any) => item.beat);

  useEffect(() => {
    setMontoVar(t("billing.t2").toLocaleLowerCase());
    setOperacionVar(t("billing.t3").toLocaleLowerCase());
    setFechaVar(t("billing.t4").toLocaleLowerCase());
  }, [t("billing.t2"), t("billing.t3"), t("billing.t4")]);

  const headers = ["Beat", t("billing.t2"), t("billing.t3"), t("billing.t4")];
  const rows = rowsBuilder(
    beatsFiltered,
    t,
    montoVar,
    operacionVar,
    fechaVar,
  ) as any;

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-estilo2 flex flex-col">
      {rows.length > 0 ? (
        <DynamicTableLight headers={headers} rows={rows} />
      ) : (
        <p className="text-base-medium">{t("billing.empty")} </p>
      )}
    </Section>
  );
}
