"use client";

import { useTheme } from "next-themes";
import { themes } from "@/registry/registry-themes";
import { Button } from "@/registry/ui/button";
import { CssVars, Theme, useConfig } from "@/hooks/use-config";
import { CustomThemeWrapper } from "./custom-theme-wrapper";
import { useMemo } from "react";
import { ThemesSwitcher } from "./themes-selector";
import { ThemeWrapper } from "./theme-wrapper";

export default function ThemePicker() {
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();
  console.log({ themes, mode });
  const [config, setConfig] = useConfig();

  const typedThemes = themes as Theme[];

  const getStyle = (
    key: keyof CssVars["light"],
    mode: string | undefined
  ): React.CSSProperties => {
    if (!mode) return {};
    return {
      "--theme-primary": `hsl(${
        config.cssVars[mode as keyof typeof config.cssVars][
          key as keyof (typeof config.cssVars)["light"]
        ]
      })`,
    } as React.CSSProperties;
  };

  //   const cardColor = useMemo(() => theme.cssVars?.light.card, [typedThemes])
  return (
    <ThemesSwitcher
      themes={typedThemes}
      className="  flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 "
    />
  );
}
