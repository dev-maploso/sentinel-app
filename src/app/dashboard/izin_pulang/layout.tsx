import { ReactNode } from "react";

export default function IzinPulangLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <div className="space-y-6">{children}</div>;
}
