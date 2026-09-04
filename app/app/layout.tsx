import type { Metadata } from "next";
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react/ssr";
import "@porsche-design-system/components-react/index.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rock Paper Scissors",
  description: "A simple Rock Paper Scissors game built with the Porsche Design System.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="scheme-dark">
      <body>
        <PorscheDesignSystemProvider>{children}</PorscheDesignSystemProvider>
      </body>
    </html>
  );
}
