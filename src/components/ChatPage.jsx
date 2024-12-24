import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { Input } from "postcss";
import { getMessagess } from "../services/RoomService";
import {timeAgo} from "../config/helper";

const ChatPage = () => {
  const { roomId, currentUser, connected,setConnected,setRoomId,setCurrentUser } = useChatContext();
  // console.log(roomId);
  // console.log(currentUser);
  // console.log(connected);
  const navigate = useNavigate(); // Correctly call useNavigate
  useEffect(() => {
    if (!connected) {
      navigate("/"); // Redirect if not connected
    }
  }, [connected,roomId,currentUser, navigate]); // Add navigate to the dependency array

  const [messages, setMessages] = useState([
   
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  //Page Init
  //Will load messages here
  useEffect(()=>{
    async function loadMessages() {
      try{
        const messages = await getMessagess(roomId);
        console.log(messages);
        setMessages(messages)
        
      }catch(error){

      }

    }
    if(connected){
      loadMessages();
    }
  },[]);

  //Scrolldown
  useEffect(()=> {
    if(chatBoxRef.current){
      chatBoxRef.current.scroll({
        top:chatBoxRef.current.scrollHeight,
        behavior:"smooth",
      });
    }
  },[messages])
  //Stomp client ku bi init kariba
  //Subscribe kariba so that amaku server ru direct message miliba
  useEffect(() => {
    const connectWebSocket = () => {
      //SockJs
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };
    if(connected){
      connectWebSocket();
    }
    //Stop Client
  }, [roomId]);
  //send message handel

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);
      const message={
        sender:currentUser,
        content:input,
        roomId:roomId
      }
      stompClient.send(`/app/sendMessage/${roomId}`,{},JSON.stringify(message));
      setInput("")
    }
  };

  function handleLogout() {
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }

  return (
    <div>
      <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
        {/* Room Name Container */}
        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>{roomId}</span>
          </h1>
        </div>
        {/* User Container */}
        <div>
          <h1 className="text-xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>
        {/* Leave Room */}
        <div>
          <button onClick={handleLogout} className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full">
            Leave Room
          </button>
        </div>
      </header>
      {/* Chat Area */}
      <main ref={chatBoxRef} className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${
            message.sender === currentUser ? "justify-end" : "justify-start"
          } `}>
            <div className={`my-2 p-2 max-w-xs rounded ${
          message.sender === currentUser ? "bg-green-600" : "bg-blue-600"
        }`}>
              <div className="flex flex-row gap-2">
                <img
                  className="h-10 w-10"
                  src={"https://avatar.iran.liara.run/public/23"}
                  alt="avatar"
                />
                <div className=" flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text=xs text-gray-200">{timeAgo(message.timeStamp)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input message container */}
      <div className="fixed bottom-4 w-full h-16">
        <div className="h-full pr-10 gap-4 flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type your message here..."
            className="w-full dark:border-gray-600 dark:bg-gray-800 px-5 py-2 rounded-full h-full focus:outline-none"
          />
          <button className="dark:bg-purple-600 h-10 w-10 flex justify-center items-center rounded-full">
            <MdAttachFile size={20} />
          </button>
          <button
            onClick={sendMessage}
            className="dark:bg-green-600 h-10 w-10 flex justify-center items-center rounded-full"
          >
            <MdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
