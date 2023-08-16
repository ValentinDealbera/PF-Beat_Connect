import { EditClientForm, EditPasswordForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js",
};

export default function BuyerProfile() {
  const activeIndex = 0;

  return (
    <>
      {activeIndex === 0 ? (
        <EditClientForm mode="edit" />
      ) : (
        <EditPasswordForm  />
      )}
    </>
  );
}
