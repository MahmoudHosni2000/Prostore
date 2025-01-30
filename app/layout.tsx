import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | Prostore`, // %s will be replaced with the page title
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider enableSystem defaultTheme="light" attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// enableSystem => used to enable the system theme Whether dark or light
// defaultTheme => set the default theme to light if the system theme is not enabled
// attribute => means the 'child html elements' will have the class attribute
// disableTransitionOnChange => used to disable the transition effects when the theme changes (Light ↔ Dark) ) => (Optional)
// suppressHydrationWarning => ignore the hydration warning in the console
