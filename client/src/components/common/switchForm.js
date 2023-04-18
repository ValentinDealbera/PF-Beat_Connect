export default function SwitchForm({ nameInput, label, arrayButtons }) {
  return (
    <label
      htmlFor={nameInput}
      className="font-britanicaBold text-sm-medium flex min-w-0 flex-grow flex-col"
    >
      {label}
      <div className="border-radius-estilo2 flex flex-row items-start justify-start gap-0 overflow-hidden">
        <div className="border-radius-estilo2 overflow-hidden border border-slate-200">
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

function SwitchButton({ handleAction, active, text }) {
  return (
    <button
      onClick={handleAction}
      className={` text-sm-semibold  px-4 py-2 ${
        active
          ? "background-primary-red-700 color-neutral-white"
          : "color-neutral-black-900 bg-white"
      }`}
    >
      {text}
    </button>
  );
}
