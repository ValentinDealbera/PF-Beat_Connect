import ModalPopUp from "./modalPopup";
import { useTranslation } from "react-i18next";

type Props = {
  label: string;
  element: any;
  onClose: () => void;
  onConfirm: (id: string) => void;
  name: string;
};

export default function ModalTables({
  label,
  element,
  onClose,
  onConfirm,
}: Props) {
  const [t] = useTranslation("global");

  const handleClick = async () => {
    await onConfirm(element._id);
    onClose();
  };

  return (
    <ModalPopUp>
      <div className="background-neutral-white border-radius-estilo2 w-96 bg-customDark-700 p-8">
        <h2 className="mb-4 text-xl font-bold dark:text-white">
          {t("delete.b")} {label}
        </h2>
        <p className="mb-4 text-sm dark:text-white">
          {t("delete.b1")} {label}?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => onClose()}
            className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
              text-sm-semibold border-radius-estilo2 px-4 py-2 dark:bg-customDark-900"
          >
            {t("delete.b2")}
          </button>
          <button
            onClick={handleClick}
            className="background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
              text-sm-semibold border-radius-estilo2 px-4 py-2 dark:bg-red-800"
          >
            {t("delete.b3")}
          </button>
        </div>
      </div>
    </ModalPopUp>
  );
}
