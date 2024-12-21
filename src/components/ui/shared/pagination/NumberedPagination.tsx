import { Box, Pagination } from "@mui/material";
import { ChangeEvent } from "react";

type NumberedPaginationProps = {
  currentPage: number;
  totalPage: number;
  onChange: (event: ChangeEvent<unknown>, value: number) => void;
};

export const NumberedPagination: React.FC<NumberedPaginationProps> = ({
  currentPage,
  totalPage,
  onChange,
}) => {
  return (
    <Box display={"flex"} justifyContent={"center"} mb={5}>
      <Pagination
        page={currentPage}
        count={totalPage}
        onChange={onChange}
        sx={{
          "& .Mui-selected": {
            backgroundColor: "#f0f7ff",
          },
        }}
      />
    </Box>
  );
};
