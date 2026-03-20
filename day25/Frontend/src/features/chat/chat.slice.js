import {createSlice} from "@reduxjs/toolkit"

const chatSlice=createSlice({
    name:"chat",
    initialState:{
        chats:{},
        currentChatId:null,
        isLoading:false,
        error:null
    },
    reducers:{
        createNewChat:(state,action)=>{
            const {title,chatId}=action.payload
            state.chats[chatId]={
                id:chatId,
                title,
                messages:[],
                lastUpdated: new Date().toISOString()
            }
        },
        createNewMessage:(state,action)=>{
            const {chatId,role,content}=action.payload
            state.chats[chatId].messages.push({content,role})
        },
        addMessages:(state,action)=>{
            const { chatId, messages } = action.payload
            state.chats[ chatId ].messages.push(...messages)
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const {createNewChat,createNewMessage,addMessages,setChats,setCurrentChatId,setLoading,setError}=chatSlice.actions

export default chatSlice.reducer