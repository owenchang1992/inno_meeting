import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const Header = ({ showOpenDialog }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '4px 2%',
      alignItems: 'center',
      backgroundColor: '#f5f5f4',
    }}
  >
    <ButtonGroup aria-label="outlined button group">
      <Button
        className="btn btn-default"
        onClick={showOpenDialog}
      >
        <AddPhotoAlternateIcon className="icon" />
      </Button>
    </ButtonGroup>
  </div>
);

export default Header;
