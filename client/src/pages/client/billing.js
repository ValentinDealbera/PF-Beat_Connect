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


export default function BuyerProfile() {
  const activeIndex = useSelector((state) => state.profile.settingsActiveIndex);
  const beats = useSelector((state) => state.client.orders.orders);
const state = useSelector((state) => state.client);
console.log("STATE", state.orders.orders);
  //obtenemos los beats
  const headers = ["Beat", "Monto", "Operacion", "Fecha"];
//revisamoa que beats tenga una propieadad de beat y si no la tiene lo borramos

const beatsFiltered = beats.filter((item) => item.beat);

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
      monto: <p className="text-sm-medium">${item.beat.priceAmount}</p>,
      operacion: <p className="text-sm-medium">{item.operationType} </p>,
      fecha: <p className="text-sm-medium">{item.date}</p>,
    };
  });

  return (
    <>
      <Head title="Facturación" />
      <Main mode="transparent">
        <SettingsHero title="Facturación" />
        <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-estilo2 flex flex-col">
          <DynamicTableLight headers={headers} rows={rows} />
        </Section>
      </Main>
    </>
  );
}
