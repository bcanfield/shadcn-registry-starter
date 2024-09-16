import { siteConfig } from "@/config/site";
import { ThemeWrapper } from "./theme-wrapper";
import { CopyButton } from "./copy-button";

const RegistryAdd = ({
  className,
  componentName,
  ...props
}: React.HTMLAttributes<HTMLElement> & { componentName: string }) => {
  const copyToRegistryCode = `npx shadcn@latest add ${siteConfig.url}/r/${componentName}.json`;
  return (
    <ThemeWrapper defaultTheme="zinc" className="relative space-y-4 my-6">
      <div data-rehype-pretty-code-fragment="">
        <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            <span className="line text-white">{copyToRegistryCode}</span>
          </code>
          <CopyButton
            value={copyToRegistryCode}
            className={"absolute right-4 top-4"}
          />
        </pre>
      </div>
    </ThemeWrapper>
  );
};

export default RegistryAdd;
