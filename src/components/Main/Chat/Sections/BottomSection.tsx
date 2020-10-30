import React, {useState, useEffect, SyntheticEvent, useContext, Dispatch, SetStateAction} from "react";
import {AppContext} from "../../../../contexts/AppContext";
import {Message, User} from "../../../../interfaces/interfaces";
import {IconButton, InputBase} from "@material-ui/core";
import MoodIcon from "@material-ui/icons/Mood";
import AttachmentIcon from "@material-ui/icons/Attachment";
import MicIcon from "@material-ui/icons/Mic";

interface Props {
    selectedUser: User;
    stompClient: any;
    updateMessagesHandler: Dispatch<SetStateAction<Message[]>>;
    messages: Message[]
}

const BottomSection: React.FC<Props> = ({selectedUser, stompClient, updateMessagesHandler, messages}) => {

    console.log('BottomSection : ' + selectedUser);

    const loggedInUser: User = JSON.parse(localStorage.loggedInUser);
    const {handlerErrors} = useContext(AppContext);
    const initialMessageObj = {content: "", recipientId: selectedUser.id};
    const [messageInput, setMessageInput] = useState(initialMessageObj);
    const sendMessage = (recipientId: Number, content: string) => {
        const message = {from: loggedInUser.id, to: recipientId, message: content, timestamp: Date.now()};
        stompClient.send("/app/send", {}, JSON.stringify(message));
        updateMessagesHandler([...messages, message]);
    };

    useEffect(() => {
        setMessageInput(initialMessageObj);
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const {content, recipientId} = messageInput;

        if (content && recipientId) {
            const newMessage = {recipientId, content};
            try {
                sendMessage(newMessage.recipientId, newMessage.content);
                setMessageInput(initialMessageObj);
            } catch (err) {
                handlerErrors(err);
            }
        }
    };

    return (
        <div className="bottom-section">
            {[MoodIcon, AttachmentIcon].map((Icon, index) => (
                <IconButton key={index}>
                    <Icon/>
                </IconButton>
            ))}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-wrapper">
                    <InputBase
                        onChange={(e) => setMessageInput({...messageInput, content: e.target.value})}
                        value={messageInput.content}
                        className="input-base"
                        placeholder={"Type a message"}
                        inputProps={{"aria-label": "create message"}}
                    />
                </div>
            </form>
            <IconButton>
                <MicIcon/>
            </IconButton>
        </div>
    );
};

export default BottomSection;
