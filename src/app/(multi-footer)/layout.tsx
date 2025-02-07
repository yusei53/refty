"use client";
import { usePathname } from "next/navigation";
import { Container } from "@mui/material";
import { Footer } from "@/src/components/footer";

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLP = pathname.startsWith("/welcome");

  return (
    <>
      <Container maxWidth={isLP ? false : "md"} sx={{ my: 6 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
