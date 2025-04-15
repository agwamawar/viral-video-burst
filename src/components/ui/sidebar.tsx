
import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

/* ----------------- Context ----------------- */
type SidebarContextValue = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
);

export function useSidebarContext() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "Sidebar compound components must be used within a SidebarProvider"
    );
  }

  return context;
}

/* ----------------- Provider ----------------- */
type SidebarProviderProps = {
  children: React.ReactNode;
  defaultExpanded?: boolean;
};

export function SidebarProvider({
  children,
  defaultExpanded = false,
}: SidebarProviderProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        setExpanded,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

/* ----------------- Toggle ----------------- */
type SidebarTriggerProps = {
  className?: string;
};

export function SidebarTrigger({ className }: SidebarTriggerProps) {
  const { expanded, setExpanded } = useSidebarContext();

  return (
    <Button
      onClick={() => setExpanded((prev) => !prev)}
      className={cn(
        "absolute h-6 w-6 top-3 -right-3 z-10 rounded-full bg-accent p-0 text-accent-foreground shadow-md transition-all hover:scale-105 hover:bg-accent hover:text-accent-foreground",
        expanded && "right-3 rotate-180",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="m15 6-6 6 6 6" />
      </svg>
    </Button>
  );
}

/* ----------------- Sidebar ----------------- */
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Sidebar({ className, ...props }: SidebarProps) {
  const { expanded } = useSidebarContext();

  return (
    <aside
      className={cn(
        "group relative flex h-screen shrink-0 grow-0 flex-col overflow-y-auto border-r bg-background transition-all duration-300",
        expanded ? "w-64" : "w-16",
        className
      )}
      {...props}
    />
  );
}

/* ----------------- Content ----------------- */
export interface SidebarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SidebarContent({
  className,
  ...props
}: SidebarContentProps) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto py-3", className)}
      {...props}
    />
  );
}

/* ----------------- Header ----------------- */
export interface SidebarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SidebarHeader({
  className,
  ...props
}: SidebarHeaderProps) {
  const { expanded } = useSidebarContext();

  return (
    <div
      className={cn(
        "px-3 py-5",
        expanded && "items-center",
        !expanded && "items-center justify-center",
        className
      )}
      {...props}
    />
  );
}

/* ----------------- Footer ----------------- */
export interface SidebarFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SidebarFooter({
  className,
  ...props
}: SidebarFooterProps) {
  const { expanded } = useSidebarContext();

  return (
    <div
      className={cn(
        "mt-auto px-3 py-4",
        expanded && "items-center",
        !expanded && "items-center justify-center",
        className
      )}
      {...props}
    />
  );
}

/* ----------------- Group ----------------- */
export interface SidebarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SidebarGroup({
  className,
  ...props
}: SidebarGroupProps) {
  return (
    <div className={cn("space-y-1 py-1.5", className)} {...props} />
  );
}

/* ----------------- Group Label ----------------- */
export interface SidebarGroupLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SidebarGroupLabel({
  className,
  ...props
}: SidebarGroupLabelProps) {
  const { expanded } = useSidebarContext();

  return (
    <div
      className={cn(
        "px-3 py-0",
        expanded && "px-3",
        !expanded && "sr-only",
        "text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ----------------- Group Content ----------------- */
export interface SidebarGroupContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SidebarGroupContent({
  className,
  ...props
}: SidebarGroupContentProps) {
  return <div className={cn("", className)} {...props} />;
}

/* ----------------- Menu ----------------- */
export interface SidebarMenuProps
  extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
}

export function SidebarMenu({
  className,
  ...props
}: SidebarMenuProps) {
  return (
    <ul
      role="menu"
      className={cn("min-w-full py-0", className)}
      {...props}
    />
  );
}

/* ----------------- Menu Item ----------------- */
export interface SidebarMenuItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  className?: string;
}

export function SidebarMenuItem({
  className,
  ...props
}: SidebarMenuItemProps) {
  return (
    <li
      role="menuitem"
      className={cn("min-w-full", className)}
      {...props}
    />
  );
}

/* ----------------- Menu Button ----------------- */
const menuButtonVariants = cva(
  "relative flex items-center justify-start gap-2 overflow-hidden rounded-md p-2 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground data-[current=true]:bg-muted hover:bg-muted focus:outline-none focus:ring-2 focus:ring-muted aria-expanded:text-foreground transition-all",
  {
    variants: {
      expanded: {
        true: "min-w-full px-3",
        false: "min-w-full justify-center px-2",
      },
    },
    defaultVariants: {
      expanded: true,
    },
  }
);

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  asChild?: boolean;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, asChild = false, ...props }, ref) => {
  const { expanded } = useSidebarContext();
  const Comp = asChild ? React.Fragment : "button";

  return (
    <Comp
      ref={ref}
      className={cn(menuButtonVariants({ expanded, className }))}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";
