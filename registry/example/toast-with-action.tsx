"use client";

import { useToast } from "@/registry/hooks/use-toast";
import { Button } from "@/registry/ui/button";
import { ToastAction } from "@/registry/ui/toast";

export default function ToastWithAction() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }}
    >
      Show Toast
    </Button>
  );
}