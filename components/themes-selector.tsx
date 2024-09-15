"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { THEMES, Theme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useThemesConfig } from "@/hooks/use-themes-config";
import { Skeleton } from "@/registry/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip";
import { useConfig } from "@/hooks/use-config";

export function ThemesSwitcher({
  themes = THEMES,
  className,
}: React.ComponentProps<"div"> & { themes?: Theme[] }) {
  const { theme: mode } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { themesConfig, setThemesConfig } = useThemesConfig();
  const activeTheme = themesConfig.activeTheme;
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [config, setConfig] = useConfig();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-0.5 py-4 lg:flex-col lg:justify-start lg:gap-1",
          className
        )}
      >
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-transparent"
          >
            <Skeleton className="h-6 w-6 rounded-sm" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ToggleGroup
      type="single"
      value={activeTheme.name}
      onValueChange={(value) => {
        const theme = themes.find((theme) => theme.name === value);
        if (!theme) {
          return;
        }

        setConfig((config) => ({
          ...config,
          theme: theme.name as any,
          cssVars: theme.cssVars as any,
          style: "default",
        }));

        setThemesConfig({ ...themesConfig, activeTheme: theme });
      }}
      className={cn(
        "flex items-center justify-center  py-4 flex-col lg:justify-start gap-4  w-full",
        className
      )}
    >
      {themes.map((theme) => {
        const isDarkTheme = ["Midnight"].includes(theme.name);
        const cssVars =
          mounted && mode === "dark" ? theme.cssVars.dark : theme.cssVars.light;

        console.log({ themeName: theme.name, css: cssVars });
        return (
          <ToggleGroupItem
            value={theme.name}
            className={cn(
              "group flex  h-32 w-full shrink-0 items-center justify-center rounded-lg border-2 border-transparent p-0 hover:bg-transparent focus-visible:bg-transparent aria-checked:border-[--color-1]",
              mounted && isDarkTheme && mode !== "dark" ? "invert-[1]" : ""
            )}
            style={
              {
                "--color-1": `hsl(${cssVars["primary"]})`,
                "--color-2": `hsl(${cssVars["secondary"]})`,
                "--color-3": `hsl(${cssVars["card"]})`,
                "--color-4": `hsl(${cssVars["accent"]})`,
              } as React.CSSProperties
            }
          >
            <div className="flex flex-col w-full h-full">
              <div className="flex-1 pl-1 text-sm font-medium">
                <h2 className="capitalize">{theme.name}</h2>
              </div>
              <div className="flex flex-row h-full gap-1 p-2  w-full">
                <div className="w-full flex-1 rounded-md bg-[--color-1] md:rounded-lg" />
                <div className="w-full flex-1 rounded-md bg-[--color-2] md:rounded-lg" />
                <div className="w-full flex-1 rounded-md bg-[--color-3] md:rounded-lg" />
                <div className="w-full flex-1 rounded-md bg-[--color-4] md:rounded-lg" />
              </div>
            </div>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
