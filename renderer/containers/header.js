import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
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
      {/* <ButtonGroup aria-label="outlined button group"> */}
      {/* <Button
          className="btn btn-default"
          onClick={showOpenDialog}
        >
          <AddPhotoAlternateIcon className="icon" />
        </Button> */}
      <div>
        <IconButton
          aria-label="expand"
          size="small"
          onClick={() => selectFolder('default')}
          style={{
            marginRight: '5px',
          }}
        >
          <FolderOpenIcon className="icon" />
        </IconButton>
        {workingPath}
      </div>
      {/* </ButtonGroup> */}
      <IconButton
        aria-label="expand"
        size="small"
        onClick={exportProject}
      >
        <SaveAltIcon className="icon" />
      </IconButton>
    </div>
  );
};

export default Header;
