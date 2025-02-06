import React, { useEffect } from 'react'
import { useChatContext } from '../context/ChatContext'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessagesPreview from './MessagesPreview'

const ChatContainer = () => {
  const {messages, selectedUser, getMessages, isMessagesLoading,subscribeToMessages,unsubscribeToMessages} = useChatContext()

  useEffect(()=>{
       if(selectedUser){
        getMessages(selectedUser?._id)
        subscribeToMessages()
       }

       return ()=>{
        unsubscribeToMessages()
       }
  },[selectedUser])


  if(isMessagesLoading){
    return <div>Loading Messages</div>
  }

  return (
    <div className="flex-1 flex flex-col rounded-3xl bg-white overflow-hidden pb-2">
      {selectedUser ? <>
        <ChatHeader />
        <MessagesPreview />
        <MessageInput />
      </> : <div className='w-full h-full flex justify-center items-center text-6xl'>No Chat Selected</div>}
    </div>
  )
}

export default ChatContainer
