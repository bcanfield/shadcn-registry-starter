// https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/registry-ui.ts

import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "multi-select",
    type: "registry:ui",
    dependencies: ["lucide-react", "class-variance-authority"],
    registryDependencies: [
      "separator",
      "button",
      "badge",
      "popover",
      "command",
    ],
    files: ["ui/multi-select.tsx"],
  },
];
