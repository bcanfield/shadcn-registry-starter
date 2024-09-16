"use client";

import { MultiSelect } from "@/registry/ui/multi-select";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { useState } from "react";

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

export default function MultiSelectDemo() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);

  return (
    <MultiSelect
      options={frameworksList}
      onValueChange={setSelectedFrameworks}
      defaultValue={selectedFrameworks}
      variant="destructive"
    />
  );
}
