import { selectors as messagesSelectors } from '../../../store/slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../../../store/slices/channelsSlice.js';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

const renderMessages = (messages, currentChannelId) => {
    return (
        messages
            .filter((message) => message.channelId === currentChannelId)
            .map((message) => (
                <div className="text-break mb-2" key={message.id}>
                    <b>{message.username}</b>
                    : {message.body}
                </div>
            ))
    )
}

export const Messages = () => {
    const bottomChatRef = useRef(null);
    const messages = useSelector(messagesSelectors.selectAll);
    const { currentChannelId } = useSelector((state) => state.channels);

    useEffect(() => {
        bottomChatRef.current?.scrollIntoView();
    }, [messages.length, currentChannelId])

    const GetNumberOfMessages = () => (
        useSelector(messagesSelectors.selectAll)
            .filter((msg) => msg.channelId === currentChannelId)
            .length
    )

    const GetCurrentChannelName = () => (
        useSelector(channelsSelectors.selectAll)
            .find((channel) => channel.id === currentChannelId)
            ?.name
    )

    return (
        <>
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b># {GetCurrentChannelName()}</b>
                </p>
                <span className="text-muted">{GetNumberOfMessages()} mesages</span>
            </div>
            <div className="overflow-auto px-5">
                {renderMessages(messages, currentChannelId)}
                <div ref={bottomChatRef} />
            </div>
        </>
    )
}
