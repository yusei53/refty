"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import FolderIcon from "@mui/icons-material/Folder";
import MenuIcon from "@mui/icons-material/Menu";
import TagIcon from "@mui/icons-material/Tag";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from "@mui/material";
import type {
  RandomReflection,
  Reflection,
  ReflectionTagCountList
} from "@/src/api/reflection-api";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
import type { User } from "@prisma/client";
import { PostNavigationButton } from "@/src/components/button";
import {
  ArrowPagination,
  NumberedPagination
} from "@/src/components/pagination";
import { SearchBar } from "@/src/features/common/search-bar";
import ReflectionCardListArea from "@/src/features/routes/reflection-list/card-list/ReflectionCardListArea";
import { EmptyReflection } from "@/src/features/routes/reflection-list/card-list/empty-reflection";
import { GoodJobModal } from "@/src/features/routes/reflection-list/modal";
import UserProfileArea from "@/src/features/routes/reflection-list/profile/UserProfileArea";
import { usePagination } from "@/src/hooks/reflection/usePagination";
import { tagMap } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import { useTagHandler } from "@/src/hooks/reflection-tag/useTagHandler";
import { theme } from "@/src/utils/theme";

type UserReflectionListPageProps = {
  currentUsername: User["username"];
  userImage: string;
  username: string;
  bio: string;
  website: string;
  reflectionCount: ReflectionsCount;
  reflections: Reflection[];
  currentPage: number;
  totalPage: number;
  tagCountList: ReflectionTagCountList;
  randomReflection: RandomReflection | null;
};

const UserReflectionListPage: React.FC<UserReflectionListPageProps> = ({
  currentUsername,
  userImage,
  username,
  bio,
  website,
  reflectionCount,
  reflections,
  currentPage,
  totalPage,
  tagCountList,
  randomReflection
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const {
    isOpenTagList,
    selectedTag,
    handleToggleTags,
    handleTagChange,
    getSelectedTagCount
  } = useTagHandler();
  const { handlePageChange } = usePagination();

  const isCurrentUser = currentUsername === username;
  const isModalOpen = searchParams.get("status") === "posted";
  const handleCloseModal = () => {
    router.push(`/${username}`);
  };

  // const handleCreateFolder = async () => {
  //   const folderName = prompt("新しいフォルダ名を入力してください"); // 直接入力
  //   if (!folderName) return;

  //   try {
  //     const result = await folderAPI.createFolder(username, folderName);
  //     if (result === 401) {
  //       alert("フォルダの作成に失敗しました");
  //     } else {
  //       alert("フォルダが作成されました");
  //       router.refresh();
  //     }
  //   } catch (error) {
  //     console.error("フォルダ作成エラー:", error);
  //     alert("エラーが発生しました");
  //   }
  // };

  return (
    <>
      <Box minHeight={"90vh"}>
        <IconButton
          disableRipple
          onClick={() => setSidebarOpen((prev) => !prev)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 10
          }}
        >
          <MenuIcon sx={{ color: theme.palette.grey[500] }} />
        </IconButton>
        <Box
          position={"fixed"}
          top={0}
          left={isSidebarOpen ? 0 : "-250px"}
          width={"240px"}
          height={"100vh"}
          borderRight={`1px solid ${theme.palette.grey[400]}`}
          px={1.2}
          sx={{
            transition: "left 0.3s ease-in-out",
            backgroundColor: "white"
          }}
        >
          <Box my={10}>
            <List>
              <ListItem
                sx={{
                  py: 0,
                  my: 1,
                  borderRadius: 2,
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: theme.palette.grey[100],
                    "& .hover-icons": { display: "flex" }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: "27px" }}>
                  <FolderIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey[500] }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="kotlin"
                  primaryTypographyProps={{ fontSize: 14.5 }}
                />
                <Box
                  className="hover-icons"
                  display="none"
                  gap={1}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: `${theme.palette.primary.contrastText}`
                      }
                    }}
                  ></Box>
                  <Image
                    src={"/kebab-menu.svg"}
                    alt={"ケバブボタン"}
                    width={22}
                    height={22}
                  />
                  <Image
                    src={"/book.svg"}
                    alt={"ブックアイコン"}
                    width={22}
                    height={22}
                  />
                </Box>
              </ListItem>
            </List>
            <List>
              <ListItem
                sx={{
                  py: 0,
                  my: 1,
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: theme.palette.grey[100],
                    "& .hover-icons": { display: "flex" }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: "25px" }}>
                  <TagIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey[500] }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="振り返り"
                  primaryTypographyProps={{ fontSize: 14.5 }}
                />
                <Box
                  className="hover-icons"
                  display="none"
                  gap={1}
                  alignItems="center"
                >
                  <Image
                    src={"/kebab-menu.svg"}
                    alt={"ケバブボタン"}
                    width={22}
                    height={22}
                  />
                  <Image
                    src={"/book.svg"}
                    alt={"ブックアイコン"}
                    width={22}
                    height={22}
                  />
                </Box>
              </ListItem>
            </List>
          </Box>
        </Box>
        <UserProfileArea
          userImage={userImage}
          username={username}
          bio={bio}
          website={website}
          reflectionCount={reflectionCount}
          isCurrentUser={isCurrentUser}
        />
        <SearchBar
          tags={Object.values(tagMap)}
          selectedTag={selectedTag}
          selectedTagCount={getSelectedTagCount(tagCountList, selectedTag)}
          isOpenTagList={isOpenTagList}
          onToggleTags={handleToggleTags}
          onTagChange={handleTagChange}
        />
        {reflections.length === 0 ? (
          <EmptyReflection />
        ) : (
          <>
            <ArrowPagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChange={handlePageChange}
            />
            <ReflectionCardListArea
              username={username}
              reflections={reflections}
              isCurrentUser={isCurrentUser}
            />
            <NumberedPagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChange={handlePageChange}
            />
          </>
        )}
        {username && isLargeScreen && (
          <PostNavigationButton
            sx={{
              position: "fixed",
              right: { sm: 130 },
              bottom: { sm: 50 }
            }}
          />
        )}
      </Box>
      {isModalOpen && (
        <GoodJobModal
          open={isModalOpen}
          onClose={handleCloseModal}
          username={username}
          randomReflection={randomReflection}
        />
      )}
    </>
  );
};

export default UserReflectionListPage;
