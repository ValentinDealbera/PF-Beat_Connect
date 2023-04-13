import { Main, Head, BeatRightSheet, ModalOnHover } from "@/components";
import { useEffect, useRef, useState } from "react";

export default function Test() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      <Head title={"Test"} description={"Head from test"} />
      <Main>
        <button onClick={()=>setIsDropdownOpen(!isDropdownOpen)}>abrir sidebar</button>
        {isDropdownOpen&&<BeatRightSheet setIsDropdownOpen={setIsDropdownOpen}/>}

       </Main>
    </>
  );
}
