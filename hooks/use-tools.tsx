// import { TavilySearchResults } from "@langchain/community/tools/tavily_search";

import { FC, ReactNode, RefAttributes } from "react";
import { TApiKeys, TPreferences } from "./use-preferences";
import { usePreferenceContext } from "@/context/preferences";
import { googleSearchTool } from "@/tools/google";
import { duckduckGoTool } from "@/tools/duckduckgo";
import { dalleTool } from "@/tools/dalle";
import { useSettingsContext } from "@/context";
import {
  GlobalSearchIcon,
  HugeiconsProps,
  Image01Icon,
  BrainIcon,
} from "hugeicons-react";
import { TToolResponse } from ".";
import { memoryTool } from "@/tools/memory";
import Image from "next/image";

export const toolKeys = ["calculator", "web_search"];
export type TToolKey = (typeof toolKeys)[number];
export type IconSize = "sm" | "md" | "lg";

export type TToolArg = {
  updatePreferences: ReturnType<
    typeof usePreferenceContext
  >["updatePreferences"];
  preferences: TPreferences;
  apiKeys: TApiKeys;
  sendToolResponse: (response: TToolResponse) => void;
};

export type TTool = {
  key: TToolKey;
  description: string;
  renderUI?: (args: { image: string }) => ReactNode;
  name: string;
  loadingMessage?: string;
  resultMessage?: string;
  tool: (args: TToolArg) => Promise<void> | void;
  icon: FC<Omit<HugeiconsProps, "ref"> & RefAttributes<SVGSVGElement>>;
  smallIcon: FC<Omit<HugeiconsProps, "ref"> & RefAttributes<SVGSVGElement>>;
  validate?: () => Promise<boolean>;
  validationFailedAction?: () => void;
  showInMenu?: boolean;
};

export const useTools = () => {
  const { preferences } = usePreferenceContext();
  const { open } = useSettingsContext();
  const tools: TTool[] = [
    {
      key: "web_search",
      description: "Search on web",
      tool: async (args: TToolArg) => {
        if (preferences?.defaultWebSearchEngine === "google") {
          await googleSearchTool(args);
        } else {
          await duckduckGoTool(args);
        }
      },
      name: "Web Search",
      showInMenu: true,
      loadingMessage:
        preferences?.defaultWebSearchEngine === "google"
          ? "Searching on Google..."
          : "Searching on DuckDuckGo...",
      resultMessage:
        preferences?.defaultWebSearchEngine === "google"
          ? "Results from Google Search"
          : "Result from DuckDuckGo Search",
      icon: GlobalSearchIcon,
      smallIcon: GlobalSearchIcon,
      validate: async () => {
        if (
          preferences?.defaultWebSearchEngine === "google" &&
          (!preferences?.googleSearchApiKey ||
            !preferences?.googleSearchEngineId)
        ) {
          return false;
        }
        return true;
      },
      validationFailedAction: () => {
        open("web-search");
      },
    },
    {
      key: "image_generation",
      description: "Generating images",
      tool: async (args: TToolArg) => {
        await dalleTool(args);
      },
      showInMenu: true,
      name: "Image Generation",
      loadingMessage: "Generating Image",
      resultMessage: "Generated Image",
      icon: Image01Icon,
      smallIcon: Image01Icon,
      validationFailedAction: () => {
        open("web-search");
      },
      renderUI: ({ image }) => {
        return (
          <Image
            src={image}
            alt=""
            width={400}
            height={400}
            className="rounded-2xl border"
          />
        );
      },
      validate: async () => {
        return true;
      },
    },
    {
      key: "memory",
      description: "AI will remeber things about you",
      tool: async (args: TToolArg) => {
        await memoryTool(args);
      },
      name: "Memory",
      showInMenu: true,
      validate: async () => {
        return true;
      },
      validationFailedAction: () => {
        open("web-search");
      },
      renderUI: ({ image }) => {
        return (
          <Image
            src={image}
            alt=""
            width={400}
            height={400}
            className="rounded-2xl border"
          />
        );
      },
      loadingMessage: "Saving to the memory...",
      resultMessage: "Updated memory",
      icon: BrainIcon,
      smallIcon: BrainIcon,
    },
  ];

  // const searchTool = new TavilySearchResults({
  //   maxResults: 5,
  //   apiKey: "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",
  // });

  const getToolByKey = (key: TToolKey) => {
    return tools.find((tool) => tool.key.includes(key));
  };

  const getToolInfoByKey = (key: TToolKey) => {
    return tools.find((tool) => tool.key.includes(key));
  };

  return {
    tools,
    getToolByKey,
    getToolInfoByKey,
  };
};
