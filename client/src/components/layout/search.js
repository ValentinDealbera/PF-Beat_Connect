import Image from "next/image";

export default function Search({ colorMode, sizeMode, className }) {
  return (
    <>
      <div
        className={`${
          colorMode === "light"
            ? "background-neutral-white"
            : "background-primary-red-700"
        } ${
          sizeMode === "small" ? "px-6 py-2" : "px-8 py-3"
        } border-radius-estilo1 gap-estilo4 flex flex-row  items-center justify-start ${className}`}
      >
        <Image
          src={
            colorMode === "light"
              ? "/icon/search-red.svg"
              : "/icon/search-white.svg"
          }
          alt="Search"
          width={sizeMode === "small" ? 13 : 24}
          height={sizeMode === "small" ? 13 : 24}
          className="aspect-square"
        />
        <input
          type="text"
          placeholder="Search"
          className={`border-none bg-transparent outline-none ${
            colorMode === "light"
              ? "color-primary-red-700 placeholder:color-primary-red-700"
              : "color-neutral-white placeholder:color-neutral-white"
          } text-paragraph1-regular w-full`}
        />
      </div>
    </>
  );
}
