import { useSessionsContext } from "@/context/sessions";
import { sortSessions } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { SidebarLeftIcon } from "hugeicons-react";
import { ClockCounterClockwise, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Drawer } from "vaul";
import { Button } from "../ui/button";
import { Flex } from "../ui/flex";
import { Tooltip } from "../ui/tooltip";
import { HistoryItem } from "./history-item";

export const HistorySidebar = () => {
  const { sessions, createSession, currentSession } = useSessionsContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-800  dark:border dark:border-white/5 flex flex-row rounded-2xl flex-1 p-2 ">
      <div className="flex flex-col w-full overflow-y-auto no-scrollbar">
        <div className="flex flex-row justify-between">
          <div className="p-2">
            <Flex
              className="text-sm text-zinc-500"
              items="center"
              gap="sm"
            >
              <ClockCounterClockwise size={18} weight="bold" /> Recent
              History
            </Flex>
          </div>

        </div>

        {sortSessions(sessions, "updatedAt")?.map((session) => (
          <HistoryItem
            session={session as any}
            key={session.id}
            dismiss={() => {
              setOpen(false);
            }}
          />
        ))}
      </div>
      <div className="flex flex-col h-full justify-center items-center absolute right-[-20px] w-4">
        <div className="w-1 h-4 flex-shrink-0 rounded-full bg-white/50 mb-4" />
      </div>
    </div>
  );
};
