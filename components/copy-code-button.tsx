"use client";

export default function CopyCodeButton({
  className,
  code,
  ...props
}: React.ComponentProps<typeof Button> & { code: string }) {
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
