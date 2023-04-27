import { ModalOnHover } from "@/components";

export default function NavModalItem(props) {
  return (
    <>
      <ModalOnHover label={props.label} iconStatus={props.iconStatus} id={props.id} labelClass={` ${props.labelClass}`}>
        {props.children}
      </ModalOnHover>
    </>
  );
}
