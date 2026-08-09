import type { ReactNode } from "react";

import MobileNavigation from "@/src/components/dashboard/MobileNavigation";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <MobileNavigation />
      {children}
    </>
  );
}
