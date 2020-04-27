import React, { ReactNode } from 'react';
import './ThreeDotsMenu.scss';
import { Menu, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ThreeDotsMenu = (props: { children: ReactNode }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const onMenuIconClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const onMenuClosed = () => {
    setMenuAnchorEl(null);
  };

  return (
    <div className="ThreeDotsMenu">
      <IconButton
        autoFocus
        color="secondary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={onMenuIconClicked}
      >
        <MoreVertIcon></MoreVertIcon>
      </IconButton>
      <Menu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={onMenuClosed}>
        {props.children}
      </Menu>
    </div>
  );
};

export default ThreeDotsMenu;
