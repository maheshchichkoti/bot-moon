"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Footer() {
  const pathname = usePathname();

  const footerLinks = {
    Product: [
      { href: "/invest", label: "Invest" },
      { href: "/security", label: "Security" },
      { href: "/referral", label: "Referral Program" },
    ],
    Support: [
      { href: "/help", label: "Help & FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/docs", label: "Documentation" },
    ],
    Legal: [
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/cookies", label: "Cookie Policy" },
    ],
  };

  return (
    <footer className="bg-secondary py-12 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">CryptoBot Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional cryptocurrency trading automation for serious investors.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-muted-foreground hover:text-foreground transition-colors",
                        pathname === link.href && "text-foreground"
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
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CryptoBot Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}