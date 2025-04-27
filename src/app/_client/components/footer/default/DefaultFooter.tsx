"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Box, Container, Typography } from "@mui/material";
import { CustomLink } from "./CustomLink";
import { theme } from "@/src/app/_client/utils/theme";
import { LogoutButton } from "@/src/features/routes/login";
import { useResponsive } from "@/src/hooks/responsive/useResponsive";

export const DefaultFooter = () => {
  const { data: session } = useSession();
  const { isMobile } = useResponsive();

  return (
    <Box
      component={"footer"}
      borderTop={`1.5px solid ${theme.palette.grey[400]}`}
      py={3}
      bgcolor={"white"}
    >
      <Container maxWidth={"md"}>
        <Box mx={{ xs: 1, sm: 5 }}>
          <Image
            src={"/favicon.svg"}
            alt={"リフティのロゴ"}
            width={70}
            height={70}
          />
          <Typography fontWeight={550} fontSize={16} mb={0.5}>
            リフティ
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box>
              <Typography
                fontSize={15}
                color={theme.palette.grey[600]}
                letterSpacing={0.8}
                mb={{ xs: 6, sm: 8 }}
              >
                日々の振り返りを手助けする振り返りアプリ
              </Typography>
              {!isMobile && session && <LogoutButton />}
            </Box>
            <Box display={"flex"} gap={8}>
              <Box display={"flex"} flexDirection={"column"} gap={2}>
                <CustomLink href="/welcome">リフティとは</CustomLink>
                <CustomLink href="/important">振り返りをする理由</CustomLink>
                <CustomLink href="/">みんなの振り返り</CustomLink>
              </Box>
              <Box display={"flex"} flexDirection={"column"} gap={2}>
                {session ? (
                  <>
                    <CustomLink href={`/${session.user.username}`}>
                      マイページ
                    </CustomLink>
                    <CustomLink href="/post">投稿する</CustomLink>
                  </>
                ) : (
                  <CustomLink href="/login">ログイン</CustomLink>
                )}
              </Box>
            </Box>
            {isMobile && session && (
              <Box mt={8}>
                <LogoutButton />
              </Box>
            )}
          </Box>
          <Typography
            color={theme.palette.grey[600]}
            textAlign={"center"}
            mt={4}
          >
            {`Copyright ${new Date().getFullYear()} yusei53`}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
