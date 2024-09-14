"use client";

import { useTheme } from "next-themes";
import { themes } from "@/registry/registry-themes";
import { Button } from "@/registry/ui/button";
import { CssVars, Theme, useConfig } from "@/hooks/use-config";
import { CustomThemeWrapper } from "./custom-theme-wrapper";
import { useMemo } from "react";
import { ThemesSwitcher } from "./themes-selector";

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
    <>
      <ThemesSwitcher
        themes={typedThemes}
        className="fixed inset-x-0 bottom-0 z-40 mt-12 flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:sticky lg:bottom-auto lg:top-20"
      />
      <CustomThemeWrapper
        defaultTheme="zinc"
        className="flex flex-col space-y-4 md:space-y-6"
      >
        {typedThemes.map((theme) => (
          <>
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
            {/* <div
            className="w-12 h-12 border border-red-500"
            style={getStyle(
              theme.cssVars?.light.accent as keyof CssVars["light"],
              mode
            )}
          ></div> */}
            {/* {[
            "card",
            "popover",
            "primary",
            "secondary",
            "muted",
            "accent",
            "destructive",
          ].map((prefix) => (
            <>
              <span className="text-white line">
                &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                {
                  theme?.cssVars.light[
                    prefix as keyof typeof activeTheme.cssVars.light
                  ]
                }
                ;
              </span>
              <span className="text-white line">
                &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                {
                  theme?.cssVars.light[
                    `${prefix}-foreground` as keyof typeof activeTheme.cssVars.light
                  ]
                }
                ;
              </span>
            </>
          ))} */}
            {/* <span className="text-white line">
            &nbsp;&nbsp;&nbsp;&nbsp;--border: {theme?.cssVars.light["border"]};
          </span>
          <span className="text-white line">
            &nbsp;&nbsp;&nbsp;&nbsp;--input: {theme?.cssVars.light["input"]};
          </span>
          <span className="text-white line">
            &nbsp;&nbsp;&nbsp;&nbsp;--ring: {theme?.cssVars.light["ring"]};
          </span>
          <span className="text-white line">
            &nbsp;&nbsp;&nbsp;&nbsp;--radius: {config.cssVars.light?.radius}
            rem;
          </span>
          <span className="text-white line">&nbsp;&nbsp;&#125;</span>
          <span className="text-white line">&nbsp;</span>
          <span className="text-white line">&nbsp;&nbsp;.dark &#123;</span>
          <span className="text-white line">
            &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
            {theme?.cssVars.dark["background"]};
          </span>
          <span className="text-white line">
            &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
            {theme?.cssVars.dark["foreground"]};
          </span>
          {[
            "card",
            "popover",
            "primary",
            "secondary",
            "muted",
            "accent",
            "destructive",
          ].map((prefix) => (
            <>
              <span className="text-white line">
                &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                {theme?.cssVars.dark[prefix as keyof typeof theme.cssVars.dark]}
                ;
              </span>
              <span className="text-white line">
                &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                {
                  theme?.cssVars.dark[
                    `${prefix}-foreground` as keyof typeof theme.cssVars.dark
                  ]
                }
                ;
              </span>
            </>
          ))} */}
          </>
        ))}
      </CustomThemeWrapper>
    </>
  );
}
