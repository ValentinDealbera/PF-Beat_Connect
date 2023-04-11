import {
    Main,
    Input,
    BuyerProfileLayout,
    Head,
  } from "@/components";
  
  export default function BuyerPassword() {
    return (
      <>
        <Head title="Perfil" />
        <Main>
          <BuyerProfileLayout>
            <div className="gap-estilo3 flex flex-col">
              <Input placeholder="Nueva contraseña" label="Nueva contraseña" />
              <Input placeholder="Contraseña anterior" label="Contraseña anterior" />
              <button className="background-primary-red-700 color-neutral-white border-radius-estilo1 text-base-semibold w-max px-5 py-3">
                Guardar
              </button>
            </div>
          </BuyerProfileLayout>
        </Main>
      </>
    );
  }
  