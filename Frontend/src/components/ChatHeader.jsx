import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 h-[64px] min-h-[64px] px-4 w-full shrink-0">
      
      {/* User info */}
      <div className="flex items-center space-x-3 min-w-0">
        <div className={`avatar ${isOnline ? "online" : "offline"} shrink-0`}>
          <div className="w-10 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-slate-200 font-medium truncate">{selectedUser.fullName}</h3>
          <p className="text-slate-400 text-sm">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      {/* Close button — larger tap target on mobile */}
      <button
        onClick={() => setSelectedUser(null)}
        className="shrink-0 ml-2 p-2 rounded-full hover:bg-slate-700/50 transition-colors"
      >
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors" />
      </button>

    </div>
  );
}

export default ChatHeader;