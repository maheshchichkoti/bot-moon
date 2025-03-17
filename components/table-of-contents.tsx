"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = {
  privacy: [
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use-information", title: "How We Use Your Information" },
    { id: "api-key-security", title: "API Key Security" },
    { id: "data-retention", title: "Data Retention" },
    { id: "third-party-services", title: "Third-Party Services" }
  ],
  terms: [
    { id: "license", title: "License" },
    { id: "payment-terms", title: "Payment Terms" },
    { id: "user-responsibilities", title: "User Responsibilities" },
    { id: "limitation-liability", title: "Limitation of Liability" },
    { id: "termination", title: "Termination" }
  ]
};

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sections).flat().forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="space-y-1">
      <h4 className="font-semibold mb-4">On this page</h4>
      {Object.entries(sections).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h5 className="text-sm font-medium text-muted-foreground mb-2 uppercase">
            {category === "privacy" ? "Privacy Policy" : "Terms of Use"}
          </h5>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "block text-sm py-1 px-2 rounded-md transition-colors",
                    activeSection === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}