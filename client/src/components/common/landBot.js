import { useState } from "react";

const LandBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatBot = () => {
    setIsOpen(true);
  };

  const closeChatBot = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={openChatBot}
        className="fixed bottom-0 right-0 p-3 bg-blue-500 text-white rounded-full mr-4 mb-4"
      >
        Abrir chatbot
      </button>
      {isOpen && (
        <div className="fixed bottom-0 right-0 w-96 h-5/6">
          <button
            onClick={closeChatBot}
            className="absolute top-0 right-0 p-3 bg-blue-500 text-white rounded-full mr-4 mt-4"
          >
            Cerrar chatbot
          </button>
          <iframe
            src="https://landbot.online/v3/H-1574271-FEG9MHL1FPUII1AS/index.html"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default LandBot;