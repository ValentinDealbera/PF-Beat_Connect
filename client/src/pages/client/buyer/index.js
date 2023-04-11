import { Main, Hero, BeatsShopSection, ProfileCard, Head } from "@/components";

export default function BuyerProfile() {
  return (
    <>
      <Head title="Buyer Profile" />
      <Main mode="transparent">
        <Hero
          style={{ height: "45vh" }}
          image="https://images.unsplash.com/photo-1620279653041-26b259287fc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
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
