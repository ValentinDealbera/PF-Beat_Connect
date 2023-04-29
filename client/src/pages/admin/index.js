import {
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
  Head,
} from "@/components";

export default function SellerDashboardOverview() {
  return (
    <>
      <Head title="Panel de control" />
      <main>
        <SellerDashboardLayout
          topBarMode="message"
          topBarMessage="Hola, bienvenido a tu panel de control."
          
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
            <h1 className="text-subtitulo-semibold dark:text-white ">
              Preguntas frecuentes
            </h1>
            <FaqsGrid />
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
    </>
  );
}
