import "./globals.scss";
import React from "react";
import Provider from "@/services/provider";
import Querier from "@/services/querier";

export default function RootLayout(props: any) {
  return (
    <html lang="es">
      <head></head>
      <body className="">
        <Provider>
          <Querier> 
          {props.children}
          </Querier>
          </Provider>
      </body>
    </html>
  );
}
