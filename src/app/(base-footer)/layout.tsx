import { Container } from "@mui/material";
import { DefaultFooter } from "@/src/components/footer/default";

export default function PostLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container maxWidth="md" sx={{ my: 6 }}>
        {children}
      </Container>
      <DefaultFooter />
    </>
  );
}
