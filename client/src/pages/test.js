
import { Main, Head, BeatRightSheet, Switch, FormAdmin , ModalOnHover} from "@/components";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";


  export default function Test(props){
    const router = useRouter()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const mpHandler = async (e) => {
      const data = await axios.get('http://localhost:3001/api/cart/toseller')
      router.push(data.data.link)
    }
  return (
    <>
    <Main>
{/* <FormAdmin /> */}
<button onClick={mpHandler}>MERCADOPAGOOOOOOOOOOOO VENDEEEEEE</button>
    </Main>
     
    </>
  );
}
