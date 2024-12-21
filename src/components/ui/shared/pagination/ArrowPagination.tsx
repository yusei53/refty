import { Box, Pagination, PaginationItem } from "@mui/material";

type ArrowPaginationProps = {
  currentPage: number;
  totalPage: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
};

export const ArrowPagination: React.FC<ArrowPaginationProps> = ({
  currentPage,
  totalPage,
  onChange,
}) => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"} mt={6} mr={2}>
      <Pagination
        page={currentPage}
        count={totalPage}
        onChange={onChange}
        renderItem={(item) =>
          item.type === "previous" || item.type === "next" ? (
            <PaginationItem {...item} />
          ) : null
        }
        sx={{
          "& .MuiPaginationItem-page": {
            display: "none",
          },
        }}
      />
    </Box>
  );
};
