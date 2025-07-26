

"use client"
// components/ui/ReusableMenu.tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type MenuItemType = {
  label: string;
  onClick?: () => void;
};

interface ReusableMenuProps {
  buttonLabel: React.ReactNode;
  menuItems: MenuItemType[];
  buttonClassName?: string;
}

const ReusableMenu: React.FC<ReusableMenuProps> = ({
  buttonLabel,
  menuItems,
  buttonClassName,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="reusable-button"
        aria-controls={open ? 'reusable-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={buttonClassName}
      >
        {buttonLabel}
      </Button>
      <Menu
        id="reusable-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'reusable-button',
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              item.onClick?.();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ReusableMenu;
