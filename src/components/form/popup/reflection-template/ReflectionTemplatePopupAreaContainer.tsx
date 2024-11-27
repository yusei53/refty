import { useState } from "react";
import { ReflectionTemplateType } from "./reflection-templates";
import ReflectionTemplatePopupArea from "./ReflectionTemplatePopupArea";
import { marked } from "marked";
import { Box } from "@mui/material";

type ReflectionTemplatePopupAreaContainerProps = {
  onInsertTemplate: (template: string) => void;
  onClearContent: () => void;
  reflectionTemplateType: ReflectionTemplateType;
};

export const ReflectionTemplatePopupAreaContainer: React.FC<
  ReflectionTemplatePopupAreaContainerProps
> = ({ onInsertTemplate, onClearContent, reflectionTemplateType }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTemplateSelect = async (
    categoryKey: keyof ReflectionTemplateType
  ) => {
    const markdownText = reflectionTemplateType[categoryKey]
      .map(
        (template) =>
          `### ${template.title}\n\n- ${template.description || ""}\n`
      )
      .join("\n");

    const htmlContent = await marked(markdownText);
    onInsertTemplate(htmlContent);
    setAnchorEl(null);
  };

  return (
    // <Box py={"8px"}>
    <ReflectionTemplatePopupArea
      anchorEl={anchorEl}
      open={open}
      reflectionTemplateType={reflectionTemplateType}
      onClick={handleClick}
      onClose={handleClose}
      onTemplateSelect={handleTemplateSelect}
      onClearContent={onClearContent}
    />
    // </Box>
  );
};
