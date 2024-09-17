import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { themes } from "@/registry/registry-themes";

export type Theme = (typeof themes)[number];
export type CssVars = {
  light: {
    background: string;
    foreground: string;
    card: string;
    "card-foreground": string;
    popover: string;
    "popover-foreground": string;
    primary: string;
    "primary-foreground": string;
    secondary: string;
    "secondary-foreground": string;
    muted: string;
    "muted-foreground": string;
    accent: string;
    "accent-foreground": string;
    destructive: string;
    "destructive-foreground": string;
    border: string;
    input: string;
    ring: string;
    radius: number;
  };
  dark: {
    background: string;
    foreground: string;
    card: string;
    "card-foreground": string;
    popover: string;
    "popover-foreground": string;
    primary: string;
    "primary-foreground": string;
    secondary: string;
    "secondary-foreground": string;
    muted: string;
    "muted-foreground": string;
    accent: string;
    "accent-foreground": string;
    destructive: string;
    "destructive-foreground": string;
    border: string;
    input: string;
    ring: string;
    radius: number;
  };
};


type Config = {
  // style: Style["name"]
  theme: Theme['name']
  radius: number
  cssVars: {
    light: Partial<CssVars["light"]>;
    dark: Partial<CssVars["dark"]>;
  };
}

const configAtom = atomWithStorage<Config>("config", {
  // style: "default",
  theme: "zinc",
  radius: 0.5,
  cssVars: {
    light: themes.find((theme) => theme.name === "zinc")?.cssVars?.light as Partial<CssVars["light"]>,
    dark: themes.find((theme) => theme.name === "zinc")?.cssVars?.dark as Partial<CssVars["dark"]>,
  },
})

export function useConfig() {
  return useAtom(configAtom)
}
