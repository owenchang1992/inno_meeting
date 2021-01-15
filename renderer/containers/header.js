import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ContextStore from '../context_store';
import { addNewBucketLabel } from '../reducers/label_actions';

const CreateDialog = ({
  open,
  handleClose,
  inputContent,
  setInputContent,
  handleConfirm,
}) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Add New"
        variant="outlined"
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
        fullWidth
      />
    </DialogContent>
    <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={handleClose} size="small" color="primary">
        Cancel
      </Button>
      <Button onClick={handleConfirm} size="small" color="primary">
        confirm
      </Button>
    </DialogActions>
  </Dialog>
);

const Header = ({ showOpenDialog, showSaveDialog }) => {
  const [open, setOpen] = React.useState(false);
  const [inputContent, setInputContent] = React.useState('');
  const { setSelectLabel, projectName, ldispatch } = useContext(ContextStore);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    const newLabel = addNewBucketLabel({
      title: inputContent,
      project: projectName,
    });

    setSelectLabel(newLabel);
    ldispatch(newLabel);

    setOpen(false);
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
        <Button
          className="btn btn-default"
          onClick={showOpenDialog}
        >
          <AddPhotoAlternateIcon className="icon" />
        </Button>
        <Button
          className="btn btn-default"
          onClick={handleClickOpen}
        >
          <CreateNewFolderIcon className="icon" />
        </Button>
        <Button
          className="btn btn-default"
          onClick={showSaveDialog}
        >
          <span className="icon icon-export" />
        </Button>
        <CreateDialog
          open={open}
          handleClose={handleClose}
          inputContent={inputContent}
          handleConfirm={handleConfirm}
          setInputContent={setInputContent}
        />
      </ButtonGroup>
    </div>
  );
};

export default Header;
