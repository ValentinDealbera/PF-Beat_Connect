'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ChatbotWindow from './XChatBotWindow'

const LandBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [t] = useTranslation('global')

  const handleMouseEnter = () => {
    setShowModal(true)
  }

  const handleMouseLeave = () => {
    setShowModal(false)
  }

  const openChatBot = () => {
    setIsOpen(true)
    setShowModal(false)
  }

  const closeChatBot = () => {
    setIsOpen(false)
  }

  return (
    <>
      {!isOpen && (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img
            src='/icon/chatbot.png'
            alt='Botón de abrir chatbot'
            onClick={openChatBot}
            className='border-radius-full background-neutral-white fixed bottom-0 left-[20px] mb-4 mr-4 w-[30px] cursor-pointer hover:w-[40px]'
          />
          {showModal && (
            <div className='text-sm-regular fixed bottom-[60px] left-[10px] flex w-auto rounded-xl bg-slate-100 p-1 shadow-2xl'>
              <span>{t('bot')}</span>
            </div>
          )}
        </div>
      )}
      {isOpen && <ChatbotWindow closeChatBot={closeChatBot} />}
    </>
  )
}

export default LandBot
