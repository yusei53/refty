import { Container } from "@mui/material";
import { Footer } from "@/src/components/footer";

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
