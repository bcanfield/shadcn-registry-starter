import { Metadata } from "next";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { ThemesTabs } from "./tabs";
import { themes } from "@/registry/registry-themes";
import { ThemesSwitcher } from "@/components/themes-selector";

export const metadata: Metadata = {
  title: "Themes",
  description: "Hand-picked themes that you can copy and paste into your apps.",
};

export default function ThemesPage() {
  return (
    <div className="container flex flex-col gap-4">
      <ThemeWrapper
        defaultTheme="zinc"
        className="relative flex w-full flex-col items-start md:flex-row"
      >
        <PageHeader className="w-full">
          <PageHeaderHeading className="hidden md:block">
            Themes
          </PageHeaderHeading>
          <PageHeaderDescription>
            Hand-crafted themes that you can copy and paste into your apps.
          </PageHeaderDescription>
        </PageHeader>
      </ThemeWrapper>
      <ThemesSwitcher
        themes={themes}
        className="  flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 "
      />
      <div className="mt-6">
        <ThemesTabs />
      </div>
    </div>
  );
}
