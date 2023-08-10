import { MiniModalBox } from "@/components";
import Button from "./button";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/redux/hooks";
import { setActiveItemDetail } from "@/redux/slices/beats";
import {
  deleteClientBeat,
  setActiveEditingBeat,
} from "@/redux/slices/client/beats";
import { BeatsClass } from "@/types";

type ModalBeatManageProps = {
  fromClient: boolean;
  visibilityOwnedModal: boolean;
  beat: BeatsClass;
  setVisibilityEditBeat: (visibility: boolean) => void;
};

export default function ModalBeatManage({
  fromClient,
  visibilityOwnedModal,
  beat,
  setVisibilityEditBeat,
}: ModalBeatManageProps) {
  const [t] = useTranslation("global");
  const dispatch = useAppDispatch();

  const handleEdit = async () => {
    await dispatch(setActiveEditingBeat(beat));
    setVisibilityEditBeat(true);
  };

  const handleDelete = () => {
    dispatch(deleteClientBeat(beat._id));
  };

  const fromClientBtns = [
    {
      text: "beatCar.edit",
      action: handleEdit,
    },
    {
      text: "beatCar.delete",
      action: handleDelete,
    },
  ];

  console.log("ModalBeatManage: ", visibilityOwnedModal, fromClient, beat._id);

  return (
    <>
      {fromClient && visibilityOwnedModal && (
        <div>
          <MiniModalBox className="right-1 top-1  ">
            <div className="flex flex-col gap-1">
              {fromClientBtns.map((btn: any, index: number) => (
                <Button key={index} text={t(btn.text)} action={btn.action} />
              ))}
            </div>
          </MiniModalBox>
        </div>
      )}
    </>
  );
}
