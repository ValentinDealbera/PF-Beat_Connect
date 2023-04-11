import Image from "next/image";

export default function BeatCategoryCard(props) {
  console.log(props);
  return (
    <>
      <div className={`relative ${props.className} `} >
        <div
          id="image-box"
          className={`relative h-full w-full basis-full `}
          style={{ aspectRatio: "3/4" }}
        >
          <div
            className="border-radius-estilo1 absolute  bottom-0 top-0 flex w-full flex-row items-center justify-center bg-black bg-opacity-50 text-center"
            style={{ zIndex: 1 }}
          >
            <h3 className="color-neutral-white text-titulo3-semibold text-center">
              {props.title}
            </h3>
          </div>
          <Image
            src={props.image}
            alt="Beat Category"
            layout="fill"
            objectFit="cover"
            className="border-radius-estilo1"
            style={{ zIndex: 0 }}
          />
        </div>
      </div>
    </>
  );
}
