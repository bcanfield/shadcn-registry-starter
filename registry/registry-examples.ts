// https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/registry-examples.ts

import { Registry } from "@/registry/schema";

export const examples: Registry = [
  {
    name: "multi-select-demo",
    type: "registry:example",
    registryDependencies: ["multi-select"],
    files: ["example/multi-select-demo.tsx"],
  },
  {
    name: "multi-select-secondary",
    type: "registry:example",
    registryDependencies: ["multi-select"],
    files: ["example/multi-select-secondary.tsx"],
  },
  {
    name: "multi-select-destructive",
    type: "registry:example",
    registryDependencies: ["multi-select"],
    files: ["example/multi-select-destructive.tsx"],
  },
  {
    name: "multi-select-inverted",
    type: "registry:example",
    registryDependencies: ["multi-select"],
    files: ["example/multi-select-inverted.tsx"],
  },
  {
    name: "multi-select-form",
    type: "registry:example",
    registryDependencies: ["multi-select"],
    files: ["example/multi-select-form.tsx"],
  },
];
