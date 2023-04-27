import {
  Main,
  Input,
  BuyerProfileLayout,
  Head,
  SettingsHero,
  EditClientForm,
  EditPasswordForm,
  Section,
  DynamicTable,
} from "@/components";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function BuyerProfile() {
  const activeIndex = useSelector((state) => state.profile.settingsActiveIndex);
  const beats = useSelector((state) => state.client.orders.orders);

  //obtenemos los beats
  const headers = ["Beat", "Monto", "Operacion", "Fecha"];

  const rows = beats.map((item) => {
    return {
      beat: (
        <div className="flex items-center gap-4 ">
          <Image
            src={item.beat.image}
            width={70}
            height={70}
            className="aspect-square rounded-xl"
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
      operacion: <p className="text-sm-medium">PENDIENTE DE BACKEND</p>,
      fecha: <p className="text-sm-medium">{item.date}</p>,
    };
  });

  return (
    <>
      <Head title="Facturación" />
      <Main mode="transparent">
        <SettingsHero title="Facturación" />
        <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-estilo2 flex flex-col">
          <DynamicTable headers={headers} rows={rows} />
        </Section>
      </Main>
    </>
  );
}
