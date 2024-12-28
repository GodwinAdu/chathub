"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Tooltip } from "@/components/ui/tooltip";
import { usePromptsContext, useSessionsContext, useSettingsContext } from "@/context";
import { NoteIcon, Settings03Icon } from "hugeicons-react";
import React from "react";

const Navbar = () => {
    const { open: openSettings } = useSettingsContext();
    const { isMobile } = useSidebar()
    const { createSession } = useSessionsContext();
    const { open: openPrompts } = usePromptsContext();

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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                        <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>{" "}
                </Button>
            </Tooltip>
        );
    };

    return (
        <header className="sticky top-0 shrink-0 border-b-2 z-50 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between px-4 py-2">
                {/* Left Section */}
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="h-4" />
                    <div className="">
                        {isMobile && (
                            <div className="flex gap-6">
                                {renderNewSession()}
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
                            </div>
                        )}
                    </div>
                </div>

                {/* Right-Aligned Button */}
                <Tooltip content="Preferences" side="bottom" sideOffset={4}>
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
            </div>
        </header>
    );
};

export default Navbar;
