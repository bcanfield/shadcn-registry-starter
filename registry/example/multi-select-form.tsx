"use client";

import { MultiSelect } from "@/registry/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

const FormSchema = z.object({
  framework: z.array(z.string(), {
    required_error: "Please select at least one framework.",
  }),
});

export default function MultiSelectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="framework"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frameworks</FormLabel>
              <FormControl {...field}>
                <MultiSelect
                  options={frameworksList}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
