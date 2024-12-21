import { Footer } from "@/src/components/ui/shared/footer";
import { Container } from "@mui/material";

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container maxWidth="md" sx={{ my: 6 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
