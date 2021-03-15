import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

const Header = ({ showOpenDialog, exportProject }) => (
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
      <Button
        className="btn btn-default"
        onClick={exportProject}
      >
        <CollectionsBookmarkIcon className="icon" />
      </Button>
    </ButtonGroup>
  </div>
);

export default Header;
