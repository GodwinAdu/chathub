import {
  usePromptsContext,
  useSessionsContext,
  useSettingsContext,
} from "@/context";
import {
  Moon02Icon,
  MoreHorizontalIcon,
  NoteIcon,
  PlusSignIcon,
  Settings03Icon,
  Sun01Icon,
} from "hugeicons-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { HistorySidebar } from "../history/history-side-bar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Flex } from "../ui/flex";
import { Tooltip } from "../ui/tooltip";
import { AboutModal } from "./about-modal";
import { FeedbackModal } from "./feedback-modal";
import { SupportModal } from "./support-modal";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { open: openSettings } = useSettingsContext();
  const { open: openPrompts } = usePromptsContext();
  const [isOpen, setIsOpen] = useState(false);
  const { createSession } = useSessionsContext();

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const renderNewSession = () => {
    return (
      <Tooltip content="New Session" side="left" sideOffset={4}>
        <Button
          size="icon"
          variant={"ghost"}
          className="min-w-8 h-8"
          onClick={() => {
            createSession({
              redirect: true,
            });
          }}
        >
          <PlusSignIcon size={20} strokeWidth="2" />{" "}
        </Button>
      </Tooltip>
    );
  };

  return (
    <>
      <div className="absolute z-[50] flex flex-col  justify-center items-center gap-3 pb-6 md:p-3 top-0 bottom-0 left-0 border-r border-zinc-50 dark:border-white/5">
        <div className="flex flex-row gap-2 items-center">
          {renderNewSession()}
        </div>

        <div className="flex flex-col gap-2 items-center">
          <HistorySidebar />
        </div>
        <Tooltip content="Prompts" side="left" sideOffset={4}>
          <Button
            size="iconSm"
            variant="ghost"
            onClick={() => {
              openPrompts();
            }}
          >
            <NoteIcon size={20} strokeWidth="2" />
          </Button>
        </Tooltip>
        <Flex className="flex-1" />
        <Tooltip content="Preferences" side="left" sideOffset={4}>
          <Button
            size="iconSm"
            variant="ghost"
            onClick={() => {
              openSettings();
            }}
          >
          <Settings03Icon size={20} strokeWidth="2" />  
          </Button>
        </Tooltip>
        <DropdownMenu
          open={isOpen}
          onOpenChange={(open) => {
            document.body.style.pointerEvents = "auto";
            setIsOpen(open);
          }}
        >
          <Tooltip content="More" side="left" sideOffset={4}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="iconSm">
                <MoreHorizontalIcon size={20} />
              </Button>
            </DropdownMenuTrigger>
          </Tooltip>
          <DropdownMenuContent
            className="min-w-[250px] text-sm md:text-base mr-20"
            align="end"
            side="left"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={() => setIsAboutModalOpen(true)}>About</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsFeedbackModalOpen(true)}>Feedback</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsSupportModalOpen(true)}>Support</DropdownMenuItem>
            <div className="my-1 h-[1px] bg-black/10 dark:bg-white/10 w-full" />

            <DropdownMenuItem
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              {theme === "light" ? (
                <Moon02Icon size={18} strokeWidth="2" />
              ) : (
                <Sun01Icon size={18} strokeWidth="2" />
              )}
              Switch to {theme === "light" ? "dark" : "light"} mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </>
  );
};

