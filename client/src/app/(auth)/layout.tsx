import React from "react";
import { Section } from "@/components";

export default function AuthLayout(props: any) {
  return (
    <Section subClassName="w-full justify-center align-middle items-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center align-middle md:h-full md:min-h-screen md:flex-row">
        <div
          className="h-[300px] w-full bg-red-950 sm:h-full "
          style={{
            backgroundImage:
              "url(/images/glenn-van-de-wiel-ySfXlAqg8QQ-unsplash.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "20vh",
          }}
        ></div>
        <div
          className=" flex h-full min-w-full flex-col items-start justify-center bg-white px-4 xs:px-8 py-10 align-middle sm:px-14 md:min-w-[50%] lg:min-w-[40%] xl:min-w-[35%] 2xl:min-w-[30%]"
          id="login"
        >
          {props.children}
        </div>
      </div>
    </Section>
  );
}
