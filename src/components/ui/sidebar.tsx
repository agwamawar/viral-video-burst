
// This is a simplified version of the shadcn/ui sidebar component
// Adapted for this project specifically

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

// Create context for sidebar state
type SidebarContextType = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

// Provider component
export function SidebarProvider({
  children,
  defaultExpanded = true,
}: {
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Hook to use sidebar context
export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// Main sidebar component
const sidebarVariants = cva(
  "h-screen bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
  {
    variants: {
      expanded: {
        true: "w-64",
        false: "w-16",
      },
    },
    defaultVariants: {
      expanded: true,
    },
  }
);

export function Sidebar({
  className,
  expanded,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  expanded?: boolean;
}) {
  const context = useSidebar();
  const isExpanded = expanded !== undefined ? expanded : context.expanded;

  return (
    <div
      className={cn(sidebarVariants({ expanded: isExpanded }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Sidebar header component
export function SidebarHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebar();

  return (
    <div
      className={cn(
        "flex h-14 items-center border-b border-border p-2",
        className
      )}
      {...props}
    >
      {children || (
        <div className="flex items-center ml-2">
          {expanded ? (
            <span className="font-semibold">BlowUp AI</span>
          ) : (
            <span className="font-semibold">AI</span>
          )}
        </div>
      )}
    </div>
  );
}

// Sidebar content wrapper
export function SidebarContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-grow overflow-y-auto p-2", className)} {...props}>
      {children}
    </div>
  );
}

// Sidebar group component
export function SidebarGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

// Sidebar group label component
export function SidebarGroupLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebar();
  
  if (!expanded) return null;
  
  return (
    <div
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Sidebar group content component
export function SidebarGroupContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  );
}

// Sidebar menu component
export function SidebarMenu({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("space-y-1", className)} {...props}>
      {children}
    </ul>
  );
}

// Sidebar menu item component
export function SidebarMenuItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn("", className)} {...props}>
      {children}
    </li>
  );
}

// Sidebar menu button component
export function SidebarMenuButton({
  className,
  children,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
}) {
  const { expanded } = useSidebar();
  const Comp = asChild ? React.Fragment : "button";
  const childProps = asChild ? {} : props;

  return (
    <Comp
      {...childProps}
      className={cn(
        "flex items-center w-full rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
        expanded ? "justify-start" : "justify-center",
        className
      )}
    >
      {typeof children === "function"
        ? children({ expanded })
        : React.Children.map(
            React.Children.toArray(children),
            (child, index) => {
              if (index === 0 || expanded) {
                return React.isValidElement(child)
                  ? React.cloneElement(child as React.ReactElement, {
                      className: cn(
                        "h-4 w-4",
                        expanded ? "mr-2" : "",
                        React.isValidElement(child) &&
                          child.props &&
                          child.props.className
                      ),
                    })
                  : child;
              }
              return null;
            }
          )}
    </Comp>
  );
}

// Sidebar footer component
export function SidebarFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded, setExpanded } = useSidebar();

  return (
    <div
      className={cn(
        "border-t border-border p-2 flex justify-center",
        className
      )}
      {...props}
    >
      {children || (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}

// Sidebar trigger button (for responsive layouts)
export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setExpanded } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("md:hidden", className)}
      onClick={() => setExpanded(true)}
      {...props}
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
}

// Sidebar inset component (for content area)
export function SidebarInset({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 overflow-auto", className)} {...props}>
      {children}
    </div>
  );
}
