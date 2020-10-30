import React, {useState, useEffect, useRef, useContext} from "react";
import {AppContext} from "../../../contexts/AppContext";
import {User, Message} from "../../../interfaces/interfaces";
import TopSection from "./Sections/TopSection";
import MiddleSection from "./Sections/MiddleSection";
import BottomSection from "./Sections/BottomSection";
import "./Chat.scss";

interface Props {
    selectedConnection: User;
    newMessage: Message | null;
    stompClient: any;
}

const Chat: React.FC<Props> = ({selectedConnection, newMessage, stompClient}) => {

    const chatBottomRef = useRef<HTMLHeadingElement>(null);
    const {loggedInUser, handleErrors, clearError} = useContext(AppContext);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (messages.length > 0) {
            chatBottomRef.current?.scrollIntoView();
        }
    }, [messages]);

    useEffect(() => {
        if (newMessage) {
            const {from, to} = newMessage;
            if (from === selectedConnection.id || (to === loggedInUser.id && to === selectedConnection.id)) {
                setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
                chatBottomRef.current?.scrollIntoView({behavior: "smooth"});
            }
        }
        // eslint-disable-next-line
    }, [newMessage]);

    console.log('chat : selectedConnection -> ' + selectedConnection + " newMessage -> " + JSON.stringify(newMessage) + " messages : " + messages);

    return (
        <div className="chat">
            <TopSection selectedUser={selectedConnection} newMessage={newMessage}/>
            <MiddleSection messages={messages} chatBottomRef={chatBottomRef}/>
            <BottomSection selectedUser={selectedConnection} stompClient={stompClient}
                           updateMessagesHandler={setMessages} messages={messages}/>
        </div>
    );
};

export default Chat;
