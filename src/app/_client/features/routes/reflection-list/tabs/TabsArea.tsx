import { Box, Divider, Tab, Tabs } from "@mui/material";
import type { ViewMode } from "@/src/app/_client/hooks/tabs/useViewMode";
import { theme } from "@/src/app/_client/utils/theme";

type TabsAreaProps = {
  currentViewMode: ViewMode;
  onViewModeChange: (event: React.SyntheticEvent, newValue: ViewMode) => void;
};

export const TabsArea: React.FC<TabsAreaProps> = ({
  currentViewMode,
  onViewModeChange
}) => {
  return (
    <Box mx={3} mt={{ xs: 2, sm: 0 }}>
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
        <Tab label="カード" value="card" disableRipple />
        <Tab label="フルビュー" value="detail" disableRipple sx={{ ml: -2 }} />
      </Tabs>
      <Divider
        sx={{
          color: theme.palette.grey[400]
        }}
      />
    </Box>
  );
};
