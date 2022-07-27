import {
  styled,
  Tooltip as MUITootiip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MUITootiip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#b39ddb",
    boxShadow: "0 3px 15px rgba(150, 150, 150, 0.2)",
    fontSize: "12px",
    padding: "12px",
    letterSpacing: "0.8px",
    fontWeght: "100",
  },
}));
export default Tooltip;
