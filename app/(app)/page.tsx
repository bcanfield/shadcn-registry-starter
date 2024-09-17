import Link from "next/link";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Shadcn Registry Starter</PageHeaderHeading>
        <PageHeaderDescription>
          Template for creating a custom shadcn component registry
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
            >
              GitHub
            </Link>
          </Button>
        </PageActions>
      </PageHeader>
    </div>
  );
}
