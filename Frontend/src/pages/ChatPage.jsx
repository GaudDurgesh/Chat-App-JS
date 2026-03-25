import { useChatStore } from '../store/useChatStore'
import BorderAnimatedContainer from "../components/BorderAnimatedContainer"
import ChatList from '../components/ChatList'
import ContactList from '../components/ContactList'
import ChatContainer from '../components/ChatContainer'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ProfileHeader from '../components/ProfileHeader'

function ChatPage() {
    const { activeTab, selectedUser } = useChatStore()

    return (
        <div className='relative w-full max-w-6xl min-h-screen'>
            <BorderAnimatedContainer>

                <div className="flex w-full h-full">

                    {/* LEFT SIDE (Chats / Contacts) */}
                    <div className={`w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col 
                        ${selectedUser ? "hidden md:flex" : "flex"}`}>

                        <ProfileHeader />
                        <ActiveTabSwitch />

                        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
                            {activeTab === "chat" ? <ChatList /> : <ContactList />}
                        </div>

                    </div>

                    {/* RIGHT SIDE (Chat) */}
                    <div className={`flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm
                        ${selectedUser ? "flex" : "hidden md:flex"}`}>

                        {selectedUser ? (
                            <ChatContainer />
                        ) : (
                            <NoConversationPlaceholder />
                        )}

                    </div>

                </div>

            </BorderAnimatedContainer>
        </div>
    )
}

export default ChatPage