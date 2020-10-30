import React, {useState, useEffect, useContext} from "react";
import {AppContext} from "../../contexts/AppContext";
import {useHistory} from "react-router-dom";
import {ConnectionsResponse, Message, User} from "../../interfaces/interfaces";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import WelcomeScreen from "./WelcomeScreen/WelcomeScreen";
import Chat from "./Chat/Chat";
import "./Main.scss";
import axios from 'axios';
import URLS from "../../constants/Urls";

const Main = (options?: PushSubscriptionOptionsInit) => {

    const history = useHistory();
    const loggedInUser: User = JSON.parse(localStorage.loggedInUser);
    const {handleErrors, clearError} = useContext(AppContext);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [connections, setConnections] = useState<User[]>([]);
    const [stompClient, setStompClient] = useState<any>(null);
    const [newMessage, setNewMessage] = useState<Message | null>(null);

    console.log("selectedUser : " + selectedUser + " loggedInUser : " + JSON.stringify(loggedInUser));
    useEffect(() => {
        const getConnections = () => {
            const headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.token};
            axios.get<ConnectionsResponse>(URLS.GET_CONNECTIONS_URL, {headers}).then(response => setConnections(response.data.connections.filter(connection => connection.id != loggedInUser.id)));
        }
        const connectSocket = () => {
            const SockJS = require('sockjs-client')
            const Stomp = require('stompjs');
            console.log("opening socket : " + URLS.SOCKET_CONNECT_URL)
            const sockJs = new SockJS(URLS.SOCKET_CONNECT_URL)
            const stompClient = Stomp.over(sockJs);
            const headers = {Authorization: 'Bearer ' + localStorage.token};
            stompClient.connect(headers, (frame: any) => {
                console.log("websocket connected..!");
                setStompClient(stompClient);
                stompClient.subscribe("/user/reply", (message: any) => {
                    setNewMessage(JSON.parse(message.body));
                });
            }, (error: any) => {
                console.log("error connecting websocket : " + error)
                setStompClient(null);
            })
        }
        getConnections();
        connectSocket();
    }, []);




    return (
        <div className="main">
            <LeftSidebar connections={connections} setSelectedUser={setSelectedUser}/>
            {selectedUser ?
                <Chat selectedConnection={selectedUser} newMessage={newMessage} stompClient={stompClient}/> :
                <WelcomeScreen/>}
        </div>
    )
};

export default Main;
