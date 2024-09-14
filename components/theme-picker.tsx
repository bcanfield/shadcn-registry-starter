"use client";

import { useTheme } from "next-themes";
import { themes } from "@/registry/registry-themes";
import { Button } from "@/registry/ui/button";
import { useConfig } from "@/hooks/use-config";
import { CustomThemeWrapper } from "./custom-theme-wrapper";

export default function ThemePicker() {
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();
  console.log({ themes, mode });
  const [config, setConfig] = useConfig();

  return (
    <CustomThemeWrapper
      defaultTheme="zinc"
      className="flex flex-col space-y-4 md:space-y-6"
    >
      {themes.map((theme) => (
        <Button
          onClick={() =>
            setConfig((config) => ({
              ...config,
              theme: theme.name as any,
              cssVars: theme.cssVars as any,
              style: "default",
            }))
          }
        >
          {theme.name}
        </Button>
      ))}
    </CustomThemeWrapper>
  );
}
