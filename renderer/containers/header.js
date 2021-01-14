import React, { useContext } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ContextStore from '../context_store';
import { addNewBucketLabel } from '../reducers/label_actions';

const Header = ({ showOpenDialog, showSaveDialog }) => {
  const { ldispatch, projectName } = useContext(ContextStore);

  const createBucket = () => {
    ldispatch(addNewBucketLabel({
      title: moment(new Date()).format(`YYYY-MM-DD ${1}`),
      project: projectName,
    }));
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
          onClick={showSaveDialog}
        >
          <span className="icon icon-export" />
        </Button>
        <Button
          className="btn btn-default"
          onClick={createBucket}
        >
          <PersonAddIcon className="icon" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Header;
