"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Moon02Icon, MoreHorizontalIcon, Sun01Icon } from "hugeicons-react"
import { AboutModal } from "../about-modal"
import { FeedbackModal } from "../feedback-modal"
import { SupportModal } from "../support-modal"
import { Tooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function NavUser() {
    const { state,isMobile } = useSidebar();

    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);


    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <>
                    <DropdownMenu
                        open={isOpen}
                        onOpenChange={(open) => {
                            document.body.style.pointerEvents = "auto";
                            setIsOpen(open);
                        }}
                    >
                        <Tooltip content="More" side="left" sideOffset={4}>
                            <DropdownMenuTrigger asChild>
                                <Button className="w-full" variant="ghost" size="iconSm">
                                    <MoreHorizontalIcon size={20} />
                                    {state !== 'collapsed' && <span className="ml-2 font-bold text-sm">More</span>}
                                </Button>
                            </DropdownMenuTrigger>
                        </Tooltip>
                        <DropdownMenuContent
                            className="min-w-[250px] text-sm md:text-base mr-20"
                            align="end"
                            side={isMobile ? 'top' : 'left'}
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
            </SidebarMenuItem >
        </SidebarMenu >
    )
}
