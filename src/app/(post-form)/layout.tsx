import { Footer } from "@/src/components/shared/footer";
import { Container } from "@mui/material";

export default function PostLayout({
  children,
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
