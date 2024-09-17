"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Theme, useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import "@/styles/mdx.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import template from "lodash.template";
import { CheckIcon, CopyIcon } from "lucide-react";
import { CopyButton, copyToClipboardWithMeta } from "./copy-button";
import { ThemeWrapper } from "./theme-wrapper";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import RegistryAdd from "./registry-add";
import { ComponentSource } from "./component-source";

export function ThemesSwitcher({
  themes = [],
  className,
}: React.ComponentProps<"div"> & { themes?: Theme[] }) {
  const { theme: mode } = useTheme();
  const [mounted, setMounted] = React.useState(false);
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
            key={theme.name}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-transparent"
          >
            <Skeleton className="h-6 w-6 rounded-sm" />
          </div>
        ))}
      </div>
    );
  }

  const activeTheme = themes.find((theme) => theme.name === config.theme);

  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        type="single"
        value={config.theme}
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
        }}
        className={cn(
          "flex items-center justify-start gap-4  w-full",
          className
        )}
      >
        {themes.map((theme) => {
          const isActive = config.theme === theme.name;
          const cssVars =
            mounted && mode === "dark"
              ? theme.cssVars?.dark
              : theme.cssVars?.light;
          if (!cssVars) return null;

          return (
            <Tooltip key={theme.name}>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value={theme.name}
                  className={cn(
                    "group flex  shrink-0 items-center justify-center rounded-lg border-2 border-transparent p-2 hover:bg-transparent focus-visible:bg-transparent aria-checked:border-border",
                    mounted && mode !== "dark" ? "invert-[1]" : ""
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
                  <div className="flex flex-row w-full h-full">
                    <div className="h-6 w-6 overflow-hidden rounded-sm">
                      <div
                        className={cn(
                          "grid h-12 w-12 -translate-x-1/4 -translate-y-1/4 grid-cols-2 overflow-hidden rounded-md transition-all ease-in-out group-hover:rotate-45",
                          isActive
                            ? "rotate-45 group-hover:rotate-0"
                            : "rotate-0"
                        )}
                      >
                        <span className="flex h-6 w-6 bg-[--color-1]" />
                        <span className="flex h-6 w-6 bg-[--color-2]" />
                        <span className="flex h-6 w-6 bg-[--color-3]" />
                        <span className="flex h-6 w-6 bg-[--color-4]" />
                        <span className="sr-only">{theme.name}</span>
                      </div>
                    </div>
                  </div>
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side={"top"} className=" capitalize">
                {formatThemeName(theme.name)}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </ToggleGroup>
      {activeTheme && (
        <div className="flex flex-col">
          <h2
            className={cn(
              "font-heading scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
            )}
          >
            Installation
          </h2>
          <Tabs defaultValue="account" className="relative mt-6 w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="account"
              >
                CLI
              </TabsTrigger>
              <TabsTrigger
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                value="password"
              >
                Manual
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
              value="account"
            >
              <RegistryAdd componentName={config.theme} />
            </TabsContent>
            <TabsContent
              className="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
              value="password"
            >
              <ComponentSource src="">
                {/* {getThemeCode(activeTheme, config.radius)} */}
                <CustomizerCode theme={activeTheme} />
              </ComponentSource>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

function formatThemeName(name: string) {
  return name.split("-")[1];
}

function CustomizerCode({ theme }: { theme: Theme }) {
  const [config] = useConfig();
  const cssVars = theme.cssVars;
  const lightVars = cssVars?.light;
  const darkVars = cssVars?.dark;
  if (!cssVars || !lightVars || !darkVars) {
    return;
  }
  return (
    <ThemeWrapper defaultTheme="zinc" className="relative space-y-4">
      <div data-rehype-pretty-code-fragment="">
        <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            <span className="line text-white">@layer base &#123;</span>
            <span className="line text-white">&nbsp;&nbsp;:root &#123;</span>
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
                  {lightVars[prefix as keyof typeof lightVars]};
                </span>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                  {lightVars[`${prefix}-foreground` as keyof typeof lightVars]};
                </span>
              </>
            ))}
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--border: {lightVars["border"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--input: {lightVars["input"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--ring: {lightVars["ring"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--radius: {config.radius}rem;
            </span>
            {["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"].map(
              (prefix) => (
                <>
                  <span className="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                    {lightVars[prefix as keyof typeof lightVars]};
                  </span>
                </>
              )
            )}
            <span className="line text-white">&nbsp;&nbsp;&#125;</span>
            <span className="line text-white">&nbsp;</span>
            <span className="line text-white">&nbsp;&nbsp;.dark &#123;</span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--background: {darkVars["background"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--foreground: {darkVars["foreground"]};
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
                  {darkVars[prefix as keyof typeof darkVars]};
                </span>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                  {darkVars[`${prefix}-foreground` as keyof typeof darkVars]};
                </span>
              </>
            ))}
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--border: {darkVars["border"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--input: {darkVars["input"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--ring: {darkVars["ring"]};
            </span>
            {["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"].map(
              (prefix) => (
                <>
                  <span className="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                    {darkVars[prefix as keyof typeof darkVars]};
                  </span>
                </>
              )
            )}
            <span className="line text-white">&nbsp;&nbsp;&#125;</span>
            <span className="line text-white">&#125;</span>
          </code>
          <CopyButton
            value={getThemeCode(theme, config.radius)}
            className={"absolute right-4 top-4"}
          />
        </pre>
      </div>
    </ThemeWrapper>
  );
}

function getThemeCode(theme: Theme, radius: number) {
  if (!theme) {
    return "";
  }

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
