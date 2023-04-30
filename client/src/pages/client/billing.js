import {
  Main,
  Input,
  BuyerProfileLayout,
  Head,
  SettingsHero,
  EditClientForm,
  EditPasswordForm,
  Section,
  DynamicTableLight,
} from "@/components";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState, useEffect  } from "react";

export default function BuyerProfile() {
  const [t] = useTranslation("global");
  const activeIndex = useSelector((state) => state.profile.settingsActiveIndex);
  const beats = useSelector((state) => state.client.orders.orders);
const state = useSelector((state) => state.client);
console.log("STATE", state.orders.orders);
  //obtenemos los beats
  const headers = ["Beat", t("billing.t2"), t("billing.t3"), t("billing.t4")];
//revisamoa que beats tenga una propieadad de beat y si no la tiene lo borramos

const beatsFiltered = beats.filter((item) => item.beat);

const [montoVar, setMontoVar] = useState("");
const [operacionVar, setOperacionVar] = useState("");
const [fechaVar, setFechaVar] = useState("");
  useEffect(() => {
    setMontoVar(t("billing.t2").toLocaleLowerCase());
    setOperacionVar(t("billing.t3").toLocaleLowerCase());
    setFechaVar(t("billing.t4").toLocaleLowerCase());
  }, [t("billing.t2"), t("billing.t3"), t("billing.t4")]);


  const rows = beatsFiltered.map((item) => {
 console.log("ITEM", item);
    return {

      beat: (
        <div className="flex items-center gap-4 ">
          <Image
            src={item.beat.image}
            width={70}
            height={70}
            className="aspect-square rounded-xl object-cover"
          />
          <div className="flex flex-col">
            <h3 className="text-base-medium">{item.beat.name}</h3>
            <p className="text-sm-light">
              {item.beat.userCreator.firstName} {item.beat.userCreator.lastName}
            </p>
          </div>
        </div>
      ),
      [montoVar]: <p className="text-sm-medium">${item.beat.priceAmount}</p>,
      [operacionVar]: <p className="text-sm-medium">{item.operationType} </p>,
      [fechaVar]: <p className="text-sm-medium">{item.date}</p>,
    };
  });

  return (
    <>
      <Head title="Facturación" />
      <Main mode="transparent">
        <SettingsHero title={t("billing.t1")} />
        <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-estilo2 flex flex-col">
          <DynamicTableLight headers={headers} rows={rows} />
        </Section>
      </Main>
    </>
  );
}
