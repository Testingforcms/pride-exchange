import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  hideBottomNav?: boolean;
  hideHeader?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export function Layout({
  children,
  hideBottomNav = false,
  hideHeader = false,
  className,
  fullWidth = false,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideHeader && <Header />}
      <main
        className={cn(
          "flex-1",
          !hideBottomNav && "pb-20",
          !fullWidth && "max-w-screen-xl mx-auto w-full px-4",
          className,
        )}
      >
        {children}
      </main>
      {!hideBottomNav && <BottomNav />}
      <footer className="hidden md:block bg-card border-t border-border pb-4 pt-6 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
