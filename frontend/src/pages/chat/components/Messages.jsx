import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { selectors as messagesSelectors } from '../../../store/slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../../../store/slices/channelsSlice.js';

const renderMessages = (messages, currentChannelId) => (
  messages
    .filter((message) => message.channelId === currentChannelId)
    .map((message) => (
      <div className="text-break mb-2" key={message.id}>
        <b>{message.username}</b>
        :
        {message.body}
      </div>
    ))
);

const Messages = () => {
  const { t } = useTranslation();
  const bottomChatRef = useRef(null);
  const messages = useSelector(messagesSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);

  useEffect(() => {
    bottomChatRef.current?.scrollIntoView();
  }, [messages.length, currentChannelId]);

  const numberOfMessages = useSelector(messagesSelectors.selectAll)
    .filter((msg) => msg.channelId === currentChannelId)
    .length;

  const GetCurrentChannelName = () => (
    useSelector(channelsSelectors.selectAll)
      .find((channel) => channel.id === currentChannelId)
      ?.name
  );

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {GetCurrentChannelName()}
          </b>
        </p>
        <span className="text-muted">{t('chat.numberMessages.number', { count: numberOfMessages })}</span>
      </div>
      <div className="overflow-auto px-5">
        {renderMessages(messages, currentChannelId)}
        <div ref={bottomChatRef} />
      </div>
    </>
  );
};

export default Messages;
