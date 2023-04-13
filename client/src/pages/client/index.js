import { Main, Hero, BeatsShopSection, ProfileCard, Head } from "@/components";

export default function BuyerProfile() {
  return (
    <>
      <Head title="Buyer Profile" />
      <Main mode="transparent">
        <Hero
          style={{ height: "45vh" }}
          image="/images/category3.jpg"
          className="align-middle items-center justify-center"
        >
          <div
            id="contenido"
            className="padding-x-estilo2 flex h-full w-full flex-col justify-end pb-8"
          >
            <div>
              <ProfileCard
                profilePhoto="/images/aleksandr-surnin-uV07XhI2m7o-unsplash.jpg"
                profileName="Jhon Doe"
                profileMessage="Lorem ipsum dolor sit "
              />
            </div>
          </div>
        </Hero>
        <BeatsShopSection mode="profile" />
      </Main>
    </>
  );
}
