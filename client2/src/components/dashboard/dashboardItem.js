import Link from "next/link";
import Image from "next/image";
import { ReactSVG } from 'react-svg'

export default function DashboardItem({ title, link, icon }) {
  return (
    <Link href={link}>
      <div className="gap-estilo4 flex flex-row">
        {/* <img
          src={icon}
          alt="icon"
          width={18}
          height={18}
          className="dashboard-item__icon text-white fill-current dark:text-white"
        /> */}
        <ReactSVG src={icon} className="dashboard-item__icon text-black fill-current dark:text-white" />
        <div className="text-base-medium dark:text-white">{title}</div>
      </div>
    </Link>
  );
}
