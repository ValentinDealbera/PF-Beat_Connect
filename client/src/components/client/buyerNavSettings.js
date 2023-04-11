import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const buyerGeneralNav = [
  {
    title: "Perfil",
    index: 0,
    link: "/client/buyer/profile",
  },
  {
    title: "Contraseña",
    index: 1,
    link: "/client/buyer/profile/password",
  },
  {
    title: "Facturación",
    index: 2,
    link: "/client/buyer/profile/billing",
  },
];

export default function BuyerNavSettings() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentSlug = useRouter().pathname;

  useEffect(() => {
    if (currentSlug === "/client/buyer/profile") {
      setActiveIndex(0);
    } else if (currentSlug === "/client/buyer/profile/password") {
      setActiveIndex(1);
    } else if (currentSlug === "/client/buyer/profile/billing") {
      setActiveIndex(2);
    }
  }, [currentSlug]);

  return (
    <>
      <div className="gap-estilo4 flex flex-col">
        {buyerGeneralNav.map((item, index) => (
          <Link href={item.link} key={index}>
            <h5
              className={`cursor-pointer ${
                index === activeIndex
                  ? "text-base-semibold"
                  : "text-base-regular"
              }`}
            >
              {item.title}
            </h5>
          </Link>
        ))}
      </div>
    </>
  );
}
