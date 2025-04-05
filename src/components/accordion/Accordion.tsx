import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { AccordionProps, AccordionSummaryProps } from "@mui/material";
import { styled } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "white",
  padding: "5px",
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  },
  [theme.breakpoints.down("md")]: {
    padding: "5px 0px"
  }
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ChevronRightIcon fontSize={"medium"} />}
    {...props}
  />
))({
  width: "300px",
  padding: 0,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  }
});
