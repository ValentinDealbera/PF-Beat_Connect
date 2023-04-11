import {
  Head,
  Main,
  Section,
  Search,
  BeatsSpecialSection,
  BeatCategoryCard,
} from "@/components";
import { categories } from "@/data/data";

export default function Home() {
  return (
    <>
      <Head title={"Home"} description={"Head from home"} />
      <Main>
        <Section subClassName="padding-x-estilo2">
          <div
            id="grid"
            className="border-radius-estilo1 lg:background-primary-red-100 lg:padding-y-estilo3 lg:padding-x-estilo2 gap-estilo1 flex grid-cols-2 flex-col align-middle lg:grid lg:gap-20"
          >
            <div
              id="col1 "
              className="gap-estilo2 flex flex-col justify-center"
            >
              <div id="text-box">
                <h1 className="text-titulo1-regular">
                  The World's #1 Marketplace to{" "}
                  <span className="text-titulo1-semibold">
                    buy & sell beats
                  </span>
                </h1>
                <p className="text-paragraph1-regular text-base-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  odio nunc, volutpat et lobortis vel, vehicula a mi. Nullam in
                  malesuada orci. Mauris in tortor nec justo luctus lacinia.
                </p>
              </div>
              <Search colorMode="dark" sizeMode="long" />
            </div>
            <div
              id="col2"
              className="gap-estilo1 flex h-full flex-1 flex-row items-stretch justify-start overflow-x-scroll"
            >
              {categories.map((category, index) => (
                <BeatCategoryCard
                  key={index}
                  a
                  title={category.title}
                  image={category.image}
                  className="min-w-[70vw] md:min-w-[45vw] lg:min-w-[240px] "
                />
              ))}
            </div>
          </div>
        </Section>
        <BeatsSpecialSection title="Destacados" />
      </Main>
    </>
  );
}
