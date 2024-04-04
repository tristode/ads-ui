import {
  Chat,
  useChatCreator,
  useChatDeleter,
  useChatRenamer,
  useChats,
} from "@/lib/chat";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import ChatComponent from "./chat";

function ChatPreview({
  chat,
  activeChat,
  setActiveChat,
}: {
  chat: Chat;
  activeChat: Chat | null;
  setActiveChat: (chat: Chat | null) => void;
}) {
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(chat.name || "");

  const renameChat = useChatRenamer(chat.id);
  const deleteChat = useChatDeleter(chat.id);

  return (
    <span
      key={chat.id}
      onClick={() => setActiveChat(chat)}
      onDoubleClick={() => {
        setRenaming(true);
        document.addEventListener("click", () => setRenaming(false), {
          once: true,
        });
      }}
      className={`group flex flex-row justify-around gap-8 items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap ${
        chat.id === activeChat?.id ? "bg-gray-100 dark:bg-gray-800" : ""
      }`}
    >
      {renaming ? (
        <input
          value={newName}
          autoFocus
          className="bg-transparent w-16 border-none outline-none focus:ring-0 focus:ring-transparent"
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              renameChat(newName);
              setRenaming(false);
            }
          }}
        />
      ) : (
        chat.name || "Unnamed Chat"
      )}
      <FaTrash
        className="text-transparent group-hover:text-gray-500 group-hover:dark:text-gray-400"
        onClick={(e) => {
          e.stopPropagation();
          deleteChat();
          setActiveChat(null);
        }}
      />
    </span>
  );
}

export default function Chats() {
  const { chats } = useChats();
  const createChat = useChatCreator();
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <span className="text-2xl font-bold">Chats</span>
      <div className="flex flex-row gap-4 w-full h-full">
        <div className="flex flex-col gap-4">
          {chats
            .sort((a, b) => (a.name || a.id).localeCompare(b.name || b.id))
            .map((chat) => (
              <ChatPreview
                key={chat.id}
                chat={chat}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
              />
            ))}
          <span
            onClick={() => createChat(null)}
            className="p-2 pr-16 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap"
          >
            New Chat
          </span>
        </div>
        {activeChat && <ChatComponent chat={activeChat} />}
      </div>
    </div>
  );
}
