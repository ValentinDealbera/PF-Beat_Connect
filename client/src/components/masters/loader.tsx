import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex justify-center items-center  min-h-[150px] ">
      <Image src="/icon/loader.svg" alt="loader" width={50} height={50} />
    </div>
  );
}
