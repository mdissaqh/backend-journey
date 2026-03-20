import { addMessages, createNewChat, createNewMessage, setChats, setCurrentChatId, setLoading } from "../chat.slice";
import { getChats, getMessages, sendMessage } from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket";
import {useDispatch} from "react-redux"


export const useChat = () => {
    const dispatch=useDispatch()

    async function handleSendMessage({message,chatId}) {
        dispatch(setLoading(true))
        const data=await sendMessage({message,chatId})
        const {chat,aiMessage}=data
        const activeChatId = chat ? chat._id : chatId;
        if(chat){
            dispatch(createNewChat({
            chatId:activeChatId,
            title:chat.title
        }))
        }
        dispatch(createNewMessage({
            chatId:activeChatId,
            role:"user",
            content:message
        }))
        dispatch(createNewMessage({
            chatId:activeChatId,
            role:aiMessage.role,
            content:aiMessage.content
        }))
        dispatch(setCurrentChatId(activeChatId))
        dispatch(setLoading(false))
    }
    async function handleGetChats() {
        dispatch(setLoading(true))
        const data=await getChats()
        const {chats}=data
        dispatch(setChats(chats.reduce((acc,chat)=>{
            acc[chat._id]={
                id:chat._id,
                title:chat.title,
                messages:[],
                lastUpdated:chat.updatedAt
            }
            return acc
        },{})))
        dispatch(setLoading(false))
    }
    async function handleOpenChat(chatId,chats) {
        if (!chatId) {
            dispatch(setCurrentChatId(null))
            return
        }
        if(chats[chatId].messages.length==0){
            const data=await getMessages(chatId)
        const {messages}=data
        const formattedMessages=messages.map(msg=>({
            content:msg.content,
            role:msg.role
        }))
        dispatch(addMessages({
            chatId,
            messages:formattedMessages
        }))
        }
        dispatch(setCurrentChatId(chatId))
    }
    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }

}