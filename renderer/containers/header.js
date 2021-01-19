import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import CreateDialog from '../components/pages/create_dialog';
import ContextStore from '../context_store';

const Header = ({ showOpenDialog }) => {
  const [open, setOpen] = React.useState(false);
  const { selectLabel } = useContext(ContextStore);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        {
          selectLabel ? (
            <Button
              className="btn btn-default"
              onClick={showOpenDialog}
            >
              <AddPhotoAlternateIcon className="icon" />
            </Button>
          ) : (
            <Button
              className="btn btn-default"
              onClick={handleClickOpen}
            >
              <CreateNewFolderIcon className="icon" />
            </Button>
          )
        }
        {/* <Button
          className="btn btn-default"
          // onClick={showSaveDialog}
        >
          <span className="icon icon-export" />
        </Button> */}
        <CreateDialog
          open={open}
          handleClose={handleClose}
        />
      </ButtonGroup>
    </div>
  );
};

export default Header;
