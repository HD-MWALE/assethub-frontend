import type { ReactNode } from "react";

export default function ExternalLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
