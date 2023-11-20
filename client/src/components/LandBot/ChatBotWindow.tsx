interface ChatbotWindowProps {
  closeChatBot: () => void
}

const ChatbotWindow = ({ closeChatBot }: ChatbotWindowProps) => (
  <div className='border-radius-estilo2 fixed bottom-0 right-0 h-5/6 w-96 ' style={{ zIndex: 9999 }}>
    <img
      src='/icon/cross.svg'
      alt='cerrar chat'
      onClick={closeChatBot}
      className='absolute right-0 top-0 mr-4 mt-4 w-[40px] cursor-pointer p-3 hover:w-[45px]'
    />
    <iframe
      src='https://landbot.online/v3/H-1574271-FEG9MHL1FPUII1AS/index.html'
      width='100%'
      height='100%'
      frameBorder='0'
    />
  </div>
)

export default ChatbotWindow
