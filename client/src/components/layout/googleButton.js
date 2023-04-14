import Image from "next/image";
import Link from "next/link";

export default function GoogleButton(){
    return(
        <Link href="/client" className="w-full" >
        <button
          className="text-base-medium flex w-full  justify-center items-center gap-2 rounded-full border px-8 py-2 text-black"
          style={{ background: "#fff" }}
        >
          <div className="rounded-full bg-white p-2">
            <Image
              src="/icon/google.png"
              alt="Google"
              width={15}
              height={15}
              className="aspect-square"
            />
          </div>
          <span>Continuar con Google</span>
        </button>
      </Link>
    )
}