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
import "@/styles/mdx.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";
import { Button } from "@/registry/ui/button";
import { ThemeWrapper } from "./theme-wrapper";
import { copyToClipboardWithMeta } from "./copy-button";
import { BaseColor } from "@/registry/registry-base-colors";
import template from "lodash.template";
import { CheckIcon, CopyIcon } from "lucide-react";

export function ThemesSwitcher({
  themes = THEMES,
  className,
}: React.ComponentProps<"div"> & { themes?: Theme[] }) {
  const { theme: mode } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { themesConfig, setThemesConfig } = useThemesConfig();
  const theme = themesConfig.theme;
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [config, setConfig] = useConfig();
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);
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
      value={theme?.name}
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

        setThemesConfig({ ...themesConfig, theme: theme });
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
              "group flex  h-32 w-full shrink-0 items-center justify-center rounded-lg border-2 border-transparent p-2 hover:bg-transparent focus-visible:bg-transparent aria-checked:border-border",
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
              <div className="flex justify-between flex-1 pl-1 text-sm font-medium">
                <h2 className="capitalize">{theme.name}</h2>
                <CopyCodeButton theme={theme} />
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

function CustomizerCode({ theme }: { theme: Theme }) {
  const [config] = useConfig();
  // const theme = baseColors.find((theme) => theme.name === config.theme)

  return (
    <ThemeWrapper defaultTheme="zinc" className="relative space-y-4">
      <div data-rehype-pretty-code-fragment="">
        <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            <span className="line text-white">@layer base &#123;</span>
            <span className="line text-white">&nbsp;&nbsp;:root &#123;</span>
            {/* <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
              {theme?.cssVars.light["background"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
              {theme?.cssVars.light["foreground"]};
            </span> */}
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
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                  {
                    theme?.cssVars.light[
                      prefix as keyof typeof theme.cssVars.light
                    ]
                  }
                  ;
                </span>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                  {
                    theme?.cssVars.light[
                      `${prefix}-foreground` as keyof typeof theme.cssVars.light
                    ]
                  }
                  ;
                </span>
              </>
            ))}
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--border: {theme?.cssVars.light["border"]}
              ;
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--input: {theme?.cssVars.light["input"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--ring: {theme?.cssVars.light["ring"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--radius: {config.radius}rem;
            </span>
            {["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"].map(
              (prefix) => (
                <>
                  <span className="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                    {
                      theme?.cssVars.light[
                        prefix as keyof typeof theme.cssVars.light
                      ]
                    }
                    ;
                  </span>
                </>
              )
            )}
            <span className="line text-white">&nbsp;&nbsp;&#125;</span>
            <span className="line text-white">&nbsp;</span>
            <span className="line text-white">&nbsp;&nbsp;.dark &#123;</span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
              {theme?.cssVars.dark["background"]};
            </span>
            <span className="line text-white">
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
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                  {
                    theme?.cssVars.dark[
                      prefix as keyof typeof theme.cssVars.dark
                    ]
                  }
                  ;
                </span>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                  {
                    theme?.cssVars.dark[
                      `${prefix}-foreground` as keyof typeof theme.cssVars.dark
                    ]
                  }
                  ;
                </span>
              </>
            ))}
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--border: {theme?.cssVars.dark["border"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--input: {theme?.cssVars.dark["input"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--ring: {theme?.cssVars.dark["ring"]};
            </span>
            {["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"].map(
              (prefix) => (
                <>
                  <span className="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                    {
                      theme?.cssVars.dark[
                        prefix as keyof typeof theme.cssVars.dark
                      ]
                    }
                    ;
                  </span>
                </>
              )
            )}
            <span className="line text-white">&nbsp;&nbsp;&#125;</span>
            <span className="line text-white">&#125;</span>
          </code>
        </pre>
      </div>
    </ThemeWrapper>
  );
}

function getThemeCode(theme: BaseColor, radius: number) {
  if (!theme) {
    return "";
  }
  console.log({ brandin: theme.cssVars });

  return template(BASE_STYLES_WITH_VARIABLES)({
    colors: theme.cssVars,
    radius,
  });
}
const BASE_STYLES_WITH_VARIABLES = `
@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: <%- radius %>rem;
    --chart-1: <%- colors.light["chart-1"] %>;
    --chart-2: <%- colors.light["chart-2"] %>;
    --chart-3: <%- colors.light["chart-3"] %>;
    --chart-4: <%- colors.light["chart-4"] %>;
    --chart-5: <%- colors.light["chart-5"] %>;
  }

  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
    --chart-1: <%- colors.dark["chart-1"] %>;
    --chart-2: <%- colors.dark["chart-2"] %>;
    --chart-3: <%- colors.dark["chart-3"] %>;
    --chart-4: <%- colors.dark["chart-4"] %>;
    --chart-5: <%- colors.dark["chart-5"] %>;
  }
}
`;

function CopyCodeButton({
  className,
  theme,
  ...props
}: React.ComponentProps<typeof Button> & { theme: Theme }) {
  const [config] = useConfig();
  // const theme = baseColors.find((theme) => theme.name === config.theme)
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <>
      {theme && (
        <Button
          onClick={() => {
            copyToClipboardWithMeta(getThemeCode(theme, config.radius), {
              name: "copy_theme_code",
              properties: {
                theme: theme.name,
                radius: config.radius,
              },
            });
            setHasCopied(true);
          }}
          className={cn("md:hidden", className)}
          {...props}
        >
          {hasCopied ? (
            <CheckIcon className="mr-2 h-4 w-4" />
          ) : (
            <CopyIcon className="mr-2 h-4 w-4" />
          )}
          Copy code
        </Button>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn("hidden md:flex", className)}
            {...props}
            size={"sm"}
          >
            Copy code
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl outline-none overflow-hidden">
          <DialogHeader>
            <DialogTitle>Theme</DialogTitle>
            <DialogDescription>
              Copy and paste the following code into your CSS file.
            </DialogDescription>
          </DialogHeader>
          <ThemeWrapper
            defaultTheme="zinc"
            className="relative w-full overflow-hidden"
          >
            <CustomizerCode theme={theme} />
            {theme && (
              <Button
                size="sm"
                onClick={() => {
                  copyToClipboardWithMeta(getThemeCode(theme, config.radius), {
                    name: "copy_theme_code",
                    properties: {
                      theme: theme.name,
                      radius: config.radius,
                    },
                  });
                  setHasCopied(true);
                }}
                className="absolute right-4 top-4 bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground"
              >
                {hasCopied ? (
                  <CheckIcon className="mr-2 h-4 w-4" />
                ) : (
                  <CopyIcon className="mr-2 h-4 w-4" />
                )}
                Copy
              </Button>
            )}
          </ThemeWrapper>
        </DialogContent>
      </Dialog>
    </>
  );
}
