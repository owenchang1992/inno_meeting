import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import ContextStore from '../../context_store';
import { addNewBucketLabel } from '../../reducers/label_actions';

const CreateDialog = ({ open, handleClose }) => {
  const [inputContent, setInputContent] = React.useState('');
  const { setSelectLabel, projectName, ldispatch } = useContext(ContextStore);

  const handleConfirm = () => {
    const newLabel = addNewBucketLabel({
      title: inputContent,
      project: projectName,
    });

    setSelectLabel(newLabel.payload);
    ldispatch(newLabel);

    handleClose();
  };

  return (
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
};

export default CreateDialog;
