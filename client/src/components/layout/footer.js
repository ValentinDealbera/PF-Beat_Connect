import { Logo } from "@/components";

export default function Footer(props) {
  return (
    <>
      <footer
        className={`${
          props.mode === "light" ? "background-neutral-white" : "background-neutral-gray-400"
        } flex flex-row items-center  justify-center align-middle`}
      >
        <div className="padding-x-estilo2 padding-y-estilo1 flex flex-row items-center justify-start align-middle">
          <Logo mode={props.mode} />
        </div>
      </footer>
    </>
  );
}
