import { Main, Head, Search, Switch, Input } from "@/components";
import { usuariosDos } from "../data/fakeDB";
import { beats } from "../data/fakeDB";
import TableBody from "./admin/tableTest";
import FormCreateBeat from "@/components/client/formCreateBeat";
import TableAdminUsers from "@/components/tables/tableAdminUsers";
import TableAdminBeats from "@/components/tables/tableAdminBeats";

export default function TestForm() {

  const usuariosDosJson = JSON.stringify(usuariosDos);
  console.log(usuariosDosJson)
 

  return (
    <>
      <Head title={"Test"} description={"Head from test"} />
      <Main>

        <div className="bg-slate-500"> 
      <TableBody data={usuariosDosJson} /> 
      </div>
      <br />

      <TableAdminUsers data={usuariosDosJson} />
      <br />
      <TableAdminBeats data={usuariosDosJson} />
      <br />
      <FormCreateBeat />
                  
      </Main>    
            
    </>
  );
}