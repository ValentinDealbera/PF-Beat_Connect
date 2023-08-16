import { Nav, NavigationModal } from "@/components";
import { navClient } from "@/data/data";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  navClient: any;
};

export default function ProfileBox({ navClient }: Props) {
  const [t] = useTranslation("global");
  const [visible, setVisible] = useState<boolean>(false);
  const client = useAppSelector(
    (state) => state.client.authSession.session.current
  );

  const handleAction = () => {
    if (window.innerWidth < 1024) {
      setVisible(!visible);
    }
  };

  return (
    <div
      className="relative"
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
      onClick={() => handleAction()}
    >
      <div className="flex gap-2 rounded-full border items-center bg-white pb-1 pl-1 pr-1 pt-1 lg:pr-4">
        <Image
          src={client?.image}
          width={35}
          height={35}
          alt="Profile photo"
          className="aspect-square rounded-full object-cover  "
        />
        <div className="hidden lg:flex">
          <p className="text-sm-regular text-black ">{`${client.firstName}`}</p>
        </div>
      </div>
      {visible && (
        <NavigationModal>
          <Nav
            items={navClient}
            center={false}
            withModal={false}
            currentMode="light"
            modalLabel={t("navModalItem.label")}
            navClassName="flex !gap-2"
            horizontal={false}
          />
        </NavigationModal>
      )}
    </div>
  );
}
