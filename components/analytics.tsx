"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

<<<<<<< HEAD
=======
// ✅ Extend the global `window` type
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

>>>>>>> 38cbfb7 (Your commit message)
export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Send page view to analytics
    const url = pathname + searchParams.toString();
    window.gtag?.("config", "G-XXXXXXXX", {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXX', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 38cbfb7 (Your commit message)
