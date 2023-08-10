import { useState } from "react";
import { NavigationModal } from "@/components";

type NavModalItemProps = {
  label: string;
  labelClass: string;
  children: React.ReactNode;
  currentMode: "light" | "dark";
};

export default function NavModalItem({
  labelClass,
  label,
  children,
  currentMode,
}: NavModalItemProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const itemStyles = ` ${
    currentMode === "light" ? "color-neutral-black-950" : "color-neutral-white"
  }`;

  return (
    <div
      className="relative"
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
    >
      <p className={` ${labelClass} ${itemStyles} cursor-pointer`}>{label}</p>
      {visible && <NavigationModal>{children}</NavigationModal>}
    </div>
  );
}
