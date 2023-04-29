import ModalPopUp from "./modalPopup";

export default function ModalTables(props) {
  const { label, element, onClose, onConfirm, name } = props;

  const handleClick = async () => {
    await onConfirm(element._id);
    onClose();
  };

  return (
    <ModalPopUp>
      <div className="background-neutral-white border-radius-estilo2 w-96 bg-customDark-700 p-8">
        <h2 className="mb-4 text-xl font-bold dark:text-white">
          Borrar {label}
        </h2>
        <p className="mb-4 text-sm dark:text-white">
          ¿Seguro que quieres borrar este item de {label}?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => onClose()}
            className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
              text-sm-semibold border-radius-estilo2 px-4 py-2 dark:bg-customDark-900"
          >
            Cancelar
          </button>
          <button
            onClick={handleClick}
            className="background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
              text-sm-semibold border-radius-estilo2 px-4 py-2 dark:bg-red-800"
          >
            Si, estoy seguro
          </button>
        </div>
      </div>
    </ModalPopUp>
  );
}
