"use client";
import { ChatInput } from "@/components/chat-input";
import { ChatMessages } from "@/components/messages/chat-messages";

import Spinner from "@/components/ui/loading-spinner";
import { useSessionsContext } from "@/context";

const ChatSessionPage = () => {
  const { isCurrentSessionLoading, isAllSessionLoading } = useSessionsContext();

  const renderLoader = () => (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );

  const isLoading = isCurrentSessionLoading || isAllSessionLoading;

  return (
    <div className="">
      {isLoading && renderLoader()}
      {!isLoading && (
        <>
          <ChatMessages />
          <ChatInput />
        </>
      )}
    </div>
  );
};

export default ChatSessionPage;
