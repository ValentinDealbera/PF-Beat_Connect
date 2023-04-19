import ModalPopUp from "./modalPopup";

export default function ModalTables(props) {
    
    const { label, element, onClose, onConfirm, name } = props;
  
    return (
      <ModalPopUp>
        <div className="background-neutral-white w-96 p-8 border-radius-estilo2">
          <h2 className="text-xl font-bold mb-4">Delete {label}</h2>
          <p className="text-sm mb-4">
            Are you sure you want to delete {label} {element.id} - {element[name]}?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => onClose()}
              className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
              text-sm-semibold py-2 px-4 border-radius-estilo2"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(element.id)}
              className="background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
              text-sm-semibold py-2 px-4 border-radius-estilo2"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </ModalPopUp>
    );
  }