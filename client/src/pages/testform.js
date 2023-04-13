import { Main, Head, Search, Switch, Input } from "@/components";

import { beats } from "../data/fakeDB";

export default function TestForm() {
    const props = beats[0];
    const error = {};
    const errorDos= {message:"Corrige los elementos cargados"};
  return (
    <>
      <Head title={"Test"} description={"Head from test"} />
      <Main>
      <div className="flex">
      <Search colorMode="dark" sizeMode="small" />
      </div>
      <div className="flex bg-blue-500">
      <Search colorMode="light" sizeMode="long" />
      </div>
      <div className="flex gap-4 w-screen">
      <Input name={"name"} label={"Name"} placeholder={"Bizarrap Session 55"} value={""} type={"name"} error={error.message}  />
      <Input name={"name"} label={"Name"} placeholder={"Bizarrap Session 55"} value={""} type={"name"} error={errorDos.message}  />
      </div>
      <Switch state={props.state} />
                  
      </Main>           
    </>
  );
}


// {
//     id: 1,
//     name: "BZR Session 55",
//     BPM: 120,
//     price: 29.99,
//     license: "",
//     author: usuarios[0],
//     genres: genres[0],
//     image: foto1,
//     label:"BZR Session 55",
//     state: "active"
//   },