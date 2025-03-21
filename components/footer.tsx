"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/navigation";

export function Footer() {
  const pathname = usePathname();

  const footerLinks = {
    Product: [
      { href: routes.public.home, label: "Home" },
      { href: routes.public.invest, label: "Invest" },
      { href: routes.auth.dashboard, label: "Dashboard" },
    ],
    Support: [
      { href: routes.public.help, label: "Help & FAQ" },
      { href: routes.public.contact, label: "Contact" },
      { href: "/docs", label: "Documentation" },
    ],
    Legal: [
      { href: "/legal", label: "Terms of Service" },
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/cookies", label: "Cookie Policy" },
    ],
  };

  return (
    <footer className="bg-secondary border-t py-12">
      <div className="container space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo + Description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">CryptoBot Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional cryptocurrency trading automation for serious
              investors.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm transition-colors",
                        pathname === link.href
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} CryptoBot Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
