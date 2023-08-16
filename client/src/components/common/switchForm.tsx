type SwitchFormProps = {
  nameInput: string;
  label: string;
  arrayButtons: Array<{
    handleAction: () => void;
    active: boolean;
    text: string;
  }>;
};

export default function SwitchForm({
  nameInput,
  label,
  arrayButtons,
}: SwitchFormProps) {
  return (
    <label
      htmlFor={nameInput}
      className="font-britanicaBold text-sm-medium flex min-w-0 flex-col gap-1"
    >
      {label}
      <div className="border-radius-estilo2 flex flex-row items-start justify-start gap-0 overflow-hidden">
        <div className="border-radius-estilo2 overflow-hidden border dark:border-none  border-slate-200">
          {arrayButtons.map((button) => (
            <SwitchButton
              handleAction={button.handleAction}
              active={button.active}
              text={button.text}
            />
          ))}
        </div>
      </div>
    </label>
  );
}

type SwitchButtonProps = {
  handleAction: () => void;
  active: boolean;
  text: string;
};

function SwitchButton({ handleAction, active, text }: SwitchButtonProps) {
  return (
    <button
      onClick={handleAction}
      type="button"
      className={` text-sm-semibold  px-4 py-2 ${
        active
          ? "color-neutral-black-900 bg-white dark:bg-customDark-700 dark:text-white"
          : "background-primary-red-700 color-neutral-white "
      }`}
    >
      {text}
    </button>
  );
}
