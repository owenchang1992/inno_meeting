import React from 'react';

const Header = () => {
  const openSelectFileDialog = () => {
    window.api.send('toMain', 'select-file-dialog');
  };

  return (
    <div className="toolbar toolbar-header">
      {/* <h1 className="title">Title</h1> */}

      <div className="toolbar-actions">
        <div className="btn-group">
          {/* <button type="button" className="btn btn-default">
            <span className="icon icon-home" />
          </button> */}
          {/* <button type="button" className="btn btn-default">
            <span className="icon icon-folder" />
          </button> */}
          <button
            type="button"
            className="btn btn-default"
            onClick={openSelectFileDialog}
          >
            <span className="icon icon-picture" />
          </button>
          {/* <button type="button" className="btn btn-default">
            <span className="icon icon-popup" />
          </button>
          <button type="button" className="btn btn-default">
            <span className="icon icon-shuffle" />
          </button> */}
        </div>

        {/* <button type="button" className="btn btn-default">
          <span className="icon icon-home icon-text" />
          Filters
        </button> */}
        {/*
        <button type="button" className="btn btn-default btn-dropdown pull-right">
          <span className="icon icon-cog" />
        </button> */}
      </div>
    </div>
  );
};

export default Header;
