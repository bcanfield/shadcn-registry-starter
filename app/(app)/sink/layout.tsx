
import { ThemeWrapper } from "@/components/theme-wrapper"

interface SinkLayoutProps {
  children: React.ReactNode
}

export default function SinkLayout({ children }: SinkLayoutProps) {
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <ThemeWrapper>{children}</ThemeWrapper>
      </div>
    </div>
  )
}
