"use client";

import { CommonSettings } from "@/components/settings/common";
import { Data } from "@/components/settings/data";
import { MemorySettings } from "@/components/settings/memory";
import { ModelSettings } from "@/components/settings/models";
import { PluginSettings } from "@/components/settings/plugins";
import { VoiceInput } from "@/components/settings/voice-input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  BrainIcon,
  DashboardCircleIcon,
  Database02Icon,
  Settings03Icon,
  SparklesIcon,
  VoiceIcon,
} from "hugeicons-react";
import { useState, createContext, useContext } from "react";

export type TSettingsContext = {
  open: (menu?: string) => void;
  dismiss: () => void;
};
export const SettingsContext = createContext<undefined | TSettingsContext>(
  undefined
);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export type TSettingsProvider = {
  children: React.ReactNode;
};

export type TSettingMenuItem = {
  name: string;
  key: string;
  icon: () => React.ReactNode;
  component: React.ReactNode;
};

export const SettingsProvider = ({ children }: TSettingsProvider) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("common");

  const open = (key?: string) => {
    setIsSettingOpen(true);
    setSelectedMenu(key || "common");
  };

  const dismiss = () => setIsSettingOpen(false);

  const settingMenu: TSettingMenuItem[] = [
    {
      name: "Common",
      icon: () => <Settings03Icon size={18} strokeWidth="2" />,
      key: "common",
      component: <CommonSettings />,
    },
    {
      name: "Models",
      icon: () => <SparklesIcon size={18} strokeWidth="2" />,
      key: "models",
      component: <ModelSettings />,
    },
    {
      name: "Plugins",
      icon: () => <DashboardCircleIcon size={18} strokeWidth="2" />,
      key: "plugins",
      component: <PluginSettings />,
    },
    {
      name: "Memory",
      icon: () => <BrainIcon size={18} strokeWidth="2" />,
      key: "memory",
      component: <MemorySettings />,
    },
    {
      name: "Voice Input",
      icon: () => <VoiceIcon size={18} strokeWidth="2" />,
      key: "voice-input",
      component: <VoiceInput />,
    },
    {
      name: "Data",
      icon: () => <Database02Icon size={18} strokeWidth="2" />,
      key: "data",
      component: <Data />,
    },
  ];

  const selectedMenuItem = settingMenu.find(
    (menu) => menu.key === selectedMenu
  );

  return (
    <SettingsContext.Provider value={{ open, dismiss }}>
      {children}

      <Dialog open={isSettingOpen} onOpenChange={setIsSettingOpen}>
        <DialogContent className="rounded-2xl gap-0 flex flex-col overflow-hidden border border-white/5 p-0 py-5 ">
          {/* Header */}
          <div className=" flex items-center justify-between gap-4 px-4 py-3 border-b border-zinc-500/20  w-[99%] max-w-4xl">
            <p className="text-md font-medium">Settings</p>
            <div className="flex gap-1">
              {settingMenu.map((menu) => (
                <Button
                  variant={selectedMenu === menu.key ? "secondary" : "ghost"}
                  key={menu.key}
                  onClick={() => setSelectedMenu(menu.key)}
                  className={cn(
                    "flex items-center justify-center gap-1",
                    "text-xs"
                  )}
                  size="default"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    {menu.icon()}
                  </div>
                  {selectedMenu === menu.key && (
                    <span
                      className={cn(
                        "hidden md:block text-sm font-medium",
                        "transition-opacity duration-300"
                      )}
                    >
                      {menu.name}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="flex-grow w-full overflow-y-auto no-scrollbar">
              {selectedMenuItem?.component}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SettingsContext.Provider>
  );
};
