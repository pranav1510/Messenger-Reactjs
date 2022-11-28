import React, { useState, useEffect } from "react";

function Chat({socket, username, room}) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
        await socket.emit("send_message", messageData);
        setMessageList(list => [...list, messageData])
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (messageList.includes(data) === false) {
                setMessageList(list => [...list,data]);
            }
        })
    }, [socket,messageList])


    return(
        <div className="chat-container">
            <div className="chat-header">
                <h2>Live Chat</h2>
            </div>
            <div className="chat-box">
                {
                    messageList.map(list => {
                        return (
                            <div className="message" id={username === list.author? "other" : "you"}>
                                <div>
                                    <div className="message-content">
                                        <p>{list.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{list.time}</p>
                                        <p id="author">{list.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="New Message" onChange={e => {setCurrentMessage(e.target.value)}}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat