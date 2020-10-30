import React, {useContext, useEffect} from "react";
import {AppContext} from "../../../../contexts/AppContext";
import {User, Message} from "../../../../interfaces/interfaces";
import {Avatar, Typography, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";

interface Props {
    selectedUser: User;
    newMessage: Message | null;
}

const TopSection: React.FC<Props> = ({selectedUser, newMessage}) => {

    console.log('TopSection : newMessage -> ' + JSON.stringify(newMessage));

    const {displayMessageTime} = useContext(AppContext);

    useEffect(() => {
        if (newMessage) {
            const {from, to} = newMessage;
            if (selectedUser.id === from || selectedUser.id === to) {
                selectedUser.latestMessage = newMessage;
            }
            ;
        }
        // eslint-disable-next-line
    }, [newMessage]);

    return (
        <div className="top-section">
            <div className="left-side">
                <Avatar className="user-picture" alt="avatar" src={selectedUser.image}/>
                <div className="text-wrapper">
                    <Typography className="fullname"
                                component="span">{`${selectedUser.firstname} ${selectedUser.lastname}`}</Typography>
                    <Typography
                        component="small">{displayMessageTime(selectedUser.latestMessage?.timestamp)}</Typography>
                </div>
            </div>
            <div className="right-side">
                {[SearchIcon, MoreVertIcon].map((Icon, index) => (
                    <IconButton key={index}>
                        <Icon/>
                    </IconButton>
                ))}
            </div>
        </div>
    );
};

export default TopSection;
