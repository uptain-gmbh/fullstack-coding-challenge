import { Box, ListItem, ListItemIcon, ListItemText, List as MuiList } from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import { ListProps } from './interfaces';
import React from "react";

export const List = (props: ListProps) => {
  const { items } = props;

  const headingText = items.length ? 'Notes:' : 'No notes...'

  const generateNotesItems = () => {
    return items.map((item, index) => {
      return (
        <ListItem sx={{ alignItems: 'flex-start', borderTop: '1px solid black', overflowWrap: 'anywhere' }} key={index}>
          <ListItemIcon sx={{ margin: '4px 0' }}>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText
            primary={item}
          />
        </ListItem>
      );
    });
  }

  return (
    <Box sx={{height: '100%', overflow: 'hidden'}}>
      <MuiList dense={false} sx={{ height: '100%', overflow: 'auto', paddingTop: '20px' }}>
        <ListItem>
          <ListItemText
            primary={headingText}
          />
        </ListItem>
        {generateNotesItems()}
      </MuiList>
    </Box>
  )
}
