import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // ✅ Load messages only when user selected
  useEffect(() => {
    if (!selectedUser) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser]);

  // ✅ Auto scroll to latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Hide completely if no user selected
  if (!selectedUser) return null;

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id
                    ? "chat-end"
                    : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-40 object-cover"
                    />
                  )}

                  {msg.text && <p className="mt-1">{msg.text}</p>}

                  <p className="text-xs mt-1 opacity-70">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
}

export default ChatContainer;