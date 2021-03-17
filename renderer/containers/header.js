import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import ContextStore from '../context_store';

const Header = ({
  // showOpenDialog,
  exportProject,
  selectFolder,
}) => {
  const { workingPath } = useContext(ContextStore);

  return (
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
        {/* <Button
          className="btn btn-default"
          onClick={showOpenDialog}
        >
          <AddPhotoAlternateIcon className="icon" />
        </Button> */}
        <Button
          className="btn btn-default"
          onClick={() => selectFolder('default')}
        >
          <FolderOpenIcon className="icon" />
        </Button>
        <Button
          className="btn btn-default"
          onClick={exportProject}
        >
          <CollectionsBookmarkIcon className="icon" />
        </Button>
      </ButtonGroup>
      <div>
        {`Working Path: ${workingPath}`}
      </div>
    </div>
  );
};

export default Header;
