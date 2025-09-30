import { styled } from "@mui/material/styles";
import MuiListItem from "@mui/material/ListItemButton";
import MenuItem from "@mui/material/MenuItem";

export const ListItemButton = styled(MuiListItem)({
  backgroundColor: "darkblue",
  "&:hover": {
    backgroundColor: "#2D2DD4",
  },
  "&.Mui-selected": {
    backgroundColor: '#194DFA',
  }
});

export const StyledMenu = styled(MenuItem)({
  "& li": {
    backgroundColor: "white",
  },
  "&:hover": {
    backgroundColor: "#0891b2",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#0891b2",
  }
})

