import { Box, Divider, Tab, Tabs } from "@mui/material";
import type { ViewMode } from "@/src/hooks/tabs/useViewMode";
import { theme } from "@/src/utils/theme";

type TabsAreaProps = {
  currentViewMode: ViewMode;
  onViewModeChange: (event: React.SyntheticEvent, newValue: ViewMode) => void;
};

export const TabsArea: React.FC<TabsAreaProps> = ({
  currentViewMode,
  onViewModeChange
}) => {
  return (
    <Box mx={3}>
      <Tabs
        value={currentViewMode}
        onChange={onViewModeChange}
        sx={{
          "& .MuiTab-root": {
            color: theme.palette.grey[600],
            "&.Mui-selected": {
              color: "black"
            }
          },
          "& .MuiTabs-indicator": {
            display: "none"
          }
        }}
      >
        <Tab label="カード表示" value="card" disableRipple />
        <Tab label="内容表示" value="detail" disableRipple />
      </Tabs>
      <Divider
        sx={{
          color: theme.palette.grey[400]
        }}
      />
    </Box>
  );
};
