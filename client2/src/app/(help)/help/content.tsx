"use client";
import { FaqsGrid, ChatbotWindow } from "@/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Content() {
  const [t] = useTranslation("global");
  const [modal, setModal] = useState(false);

  const handleCloseChat = () => {
    setModal(false);
  };

  return (
    <>
      <div className="gap-estilo1 flex flex-col ">
        <h1 className="text-titulo3-semibold text-red-700 ">
          {t("helpCenterIndex.t1")}
        </h1>
        <FaqsGrid mode="user" />
        <div
          className="flex w-full justify-center"
          onClick={() => setModal(true)}
        >
          <p className="mt-6 w-full cursor-pointer text-center font-light">
            {t("helpCenterIndex.t2")}{" "}
            <span className="font-medium text-red-700">
              {t("helpCenterIndex.t3")}
            </span>
          </p>
        </div>
      </div>
      {modal && <ChatbotWindow closeChatBot={handleCloseChat} />}
    </>
  );
}
