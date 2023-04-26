import Link from "next/link";
import Image from "next/image";

export default function DashboardItem({ title, link, icon }) {
  return (
    <Link href={link}>
      <div className="gap-estilo4 flex flex-row">
        <Image
          src={icon}
          alt="icon"
          width={18}
          height={18}
          className="dashboard-item__icon"
        />
        <div className="text-base-medium">{title}</div>
      </div>
    </Link>
  );
}
