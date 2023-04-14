import { Main, Hero, BeatsShopSection, ProfileCard, Head } from "@/components";

export default function AuthorProfile() {
  return (
    <>
      <Head title="Buyer Profile" />
      <Main mode="transparent">
        <Hero
          style={{ height: "45vh" }}
          image="/images/category2.jpg"
        >
          <div
            id="contenido"
            className="padding-x-estilo2 flex h-full w-full flex-col justify-end pb-8"
          >
            <div>
              <ProfileCard
                profilePhoto="/images/zulmaury-saavedra - Keh6vLM7w0-unsplash.jpg"
                profileName="Maria Doe"
                profileMessage="Lorem ipsum dolor sit "
              />
            </div>
          </div>
        </Hero>
        <BeatsShopSection mode="shop" />
      </Main>
    </>
  );
}
