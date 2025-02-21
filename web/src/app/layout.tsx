import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";

import { SidebarProvider } from "@/components/ui/sidebar";
import StoreProvider from "@/redux/store-provider";
import { AppSidebar } from "@/components/sidebar";
import { BreadCrumb } from "@/components";

import "./globals.css";
import { DrawerClose } from "@/components/drawer-close";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Hyper hire test",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${plusJakartaSans.className} antialiased`}>
          <SidebarProvider>
            <AppSidebar />
            <main className="mx-12 my-8 w-full h-vh">
              <DrawerClose />
              <BreadCrumb />
              {children}
            </main>
          </SidebarProvider>
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
