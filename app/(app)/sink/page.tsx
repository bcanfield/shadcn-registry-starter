import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import AccordionDemo from "@/registry/example/accordion-demo"
import AlertDialogDemo from "@/registry/example/alert-dialog-demo"
import AspectRatioDemo from "@/registry/example/aspect-ratio-demo"
import AvatarDemo from "@/registry/example/avatar-demo"
import BadgeDemo from "@/registry/example/badge-demo"
import BadgeDestructive from "@/registry/example/badge-destructive"
import BadgeOutline from "@/registry/example/badge-outline"
import BadgeSecondary from "@/registry/example/badge-secondary"
import ButtonDemo from "@/registry/example/button-demo"
import ButtonDestructive from "@/registry/example/button-destructive"
import ButtonGhost from "@/registry/example/button-ghost"
import ButtonLink from "@/registry/example/button-link"
import ButtonLoading from "@/registry/example/button-loading"
import ButtonOutline from "@/registry/example/button-outline"
import ButtonSecondary from "@/registry/example/button-secondary"
import ButtonWithIcon from "@/registry/example/button-with-icon"
import CardDemo from "@/registry/example/card-demo"
import CheckboxDemo from "@/registry/example/checkbox-demo"
import CollapsibleDemo from "@/registry/example/collapsible-demo"
import CommandDemo from "@/registry/example/command-demo"
import ContextMenuDemo from "@/registry/example/context-menu-demo"
import DatePickerDemo from "@/registry/example/date-picker-demo"
import DialogDemo from "@/registry/example/dialog-demo"
import DropdownMenuDemo from "@/registry/example/dropdown-menu-demo"
import HoverCardDemo from "@/registry/example/hover-card-demo"
import MenubarDemo from "@/registry/example/menubar-demo"
import NavigationMenuDemo from "@/registry/example/navigation-menu-demo"
import PopoverDemo from "@/registry/example/popover-demo"
import ProgressDemo from "@/registry/example/progress-demo"
import RadioGroupDemo from "@/registry/example/radio-group-demo"
import ScrollAreaDemo from "@/registry/example/scroll-area-demo"
import SelectDemo from "@/registry/example/select-demo"
import SeparatorDemo from "@/registry/example/separator-demo"
import SheetDemo from "@/registry/example/sheet-demo"
import SkeletonDemo from "@/registry/example/skeleton-demo"
import SliderDemo from "@/registry/example/slider-demo"
import SwitchDemo from "@/registry/example/switch-demo"
import TabsDemo from "@/registry/example/tabs-demo"
import ToastDemo from "@/registry/example/toast-demo"
import ToggleDemo from "@/registry/example/toggle-demo"
import ToggleDisabled from "@/registry/example/toggle-disabled"
import ToggleGroupDemo from "@/registry/example/toggle-group-demo"
import ToggleOutline from "@/registry/example/toggle-outline"
import ToggleWithText from "@/registry/example/toggle-with-text"
import TooltipDemo from "@/registry/example/tooltip-demo"
import { Button } from "@/registry/ui/button"

export default function KitchenSinkPage() {
  return (
    <div className="container">
      <div className="grid gap-4">
        <div className="grid grid-cols-3 items-start gap-4">
          <div className="grid gap-4">
            <ComponentWrapper>
              <CardDemo className="w-full" />
            </ComponentWrapper>
            <ComponentWrapper>
              <SliderDemo className="w-full" />
            </ComponentWrapper>
            <ComponentWrapper
              className="spa flex-col items-start space-x-0
				space-y-2"
            >
              <p className="text-sm text-muted-foreground">Documentation</p>
              <p className="text-sm font-medium leading-none">
                You can customize the theme using{" "}
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
                  CSS variables
                </code>
                .{" "}
                <Link
                  href="#"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  Click here
                </Link>{" "}
                to learn more.
              </p>
            </ComponentWrapper>
            <ComponentWrapper>
              <CheckboxDemo />
              <HoverCardDemo />
            </ComponentWrapper>
            <ComponentWrapper className="[&>div]:w-full">
              <TabsDemo />
            </ComponentWrapper>
          </div>
          <div className="grid gap-4">
            <ComponentWrapper>
              <MenubarDemo />
              <AvatarDemo />
            </ComponentWrapper>
            <ComponentWrapper className="flex-col items-start space-x-0 space-y-2">
              <div className="flex space-x-2">
                <ButtonDemo />
                <ButtonSecondary />
                <ButtonDestructive />
              </div>
              <div className="flex space-x-2">
                <ButtonOutline />
                <ButtonLink />
                <ButtonGhost />
              </div>
              <div className="flex space-x-2">
                <ButtonWithIcon />
                <ButtonLoading />
              </div>
              <div className="flex space-x-2">
                <Button size="lg">Large</Button>
                <Button size="sm">Small</Button>
              </div>
            </ComponentWrapper>
            <ComponentWrapper>
              <DatePickerDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <AccordionDemo />
            </ComponentWrapper>
            <ComponentWrapper className="[&_ul>li:last-child]:hidden">
              <NavigationMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper className="justify-between">
              <SwitchDemo />
              <SelectDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <ToggleGroupDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <SeparatorDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <AspectRatioDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <PopoverDemo />
              <ToastDemo />
            </ComponentWrapper>
          </div>
          <div className="grid gap-4">
            <ComponentWrapper>
              <TooltipDemo />
              <SheetDemo />
              <ProgressDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <CommandDemo />
            </ComponentWrapper>
            <ComponentWrapper className="[&>span]:h-[80px] [&>span]:w-[200px]">
              <RadioGroupDemo />
              <ContextMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <div className="flex space-x-2">
                <DropdownMenuDemo />
                <AlertDialogDemo />
                <DialogDemo />
              </div>
            </ComponentWrapper>
            <ComponentWrapper>
              <div className="flex space-x-2">
                <BadgeDemo />
                <BadgeSecondary />
                <BadgeDestructive />
                <BadgeOutline />
              </div>
            </ComponentWrapper>
            <ComponentWrapper>
              <SkeletonDemo />
            </ComponentWrapper>
            <ComponentWrapper className="[&>div]:w-full">
              <CollapsibleDemo />
            </ComponentWrapper>
            <ComponentWrapper>
              <div className="flex space-x-2">
                <ToggleDemo />
                <ToggleOutline />
                <ToggleDisabled />
                <ToggleWithText />
              </div>
            </ComponentWrapper>
            <ComponentWrapper>
              <ScrollAreaDemo />
            </ComponentWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComponentWrapper({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between space-x-4 rounded-md p-4",
        className
      )}
    >
      {children}
    </div>
  )
}
