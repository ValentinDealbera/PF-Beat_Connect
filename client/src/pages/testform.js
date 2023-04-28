import { Main, Head, Search, Switch, Input } from "@/components";
import SetUser from "@/components/common/setUser";
import Landbot from "@/components/common/landBot";

export default function TestForm() {  

  return (
    <>
      <Head title={"Test"} description={"Head from test"} />
      <Main>
        
        
        <SetUser />  

        <Landbot />   
                  
      </Main>    
            
    </>
  );
}