"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Zap, Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/invest", label: "Invest" },
    { href: "/help", label: "Help" },
    ...(isAuthenticated ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  const renderAuthButton = () => {
    if (isAuthenticated) {
      return (
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="gap-2"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      );
    }

    return (
      <Button asChild>
        <Link href="/register">Get Started</Link>
      </Button>
    );
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Zap className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl">CryptoBot Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-foreground/80 hover:text-foreground transition-colors",
                pathname === item.href &&
                  "text-foreground font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
          {renderAuthButton()}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="py-4">
              <h2 className="text-lg font-semibold mb-4">Menu</h2>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-foreground/80 hover:text-foreground transition-colors",
                      pathname === item.href && "text-foreground font-medium"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-6">{renderAuthButton()}</div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
