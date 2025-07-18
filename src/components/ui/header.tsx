"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface HeaderProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
  className?: string;
}

export function Header({
  isAuthenticated = false,
  onSignOut,
  className,
}: HeaderProps) {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <header className={cn("border-b bg-background", className)}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold text-lg">
            MidDayMeal
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {isAuthenticated ? (
                  <>
                    <NavigationMenuItem>
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                          Home
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                          About
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button
                        variant="ghost"
                        className="ml-2"
                        onClick={onSignOut}
                      >
                        Sign Out
                      </Button>
                    </NavigationMenuItem>
                  </>
                ) : (
                  <>
                    <NavigationMenuItem>
                      <Link href="/login" legacyBehavior passHref>
                        <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                          Log In
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/register" legacyBehavior passHref>
                        <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:bg-primary/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                          Register
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="font-semibold text-lg">
                      MidDayMeal
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      Appearance
                    </span>
                    <ThemeToggle />
                  </div>
                  {isAuthenticated ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href="/">Home</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href="/about">About</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-500"
                        onClick={() => {
                          setOpen(false);
                          onSignOut?.();
                        }}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" className="w-full" asChild>
                        <Link href="/login">Log In</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
