import React from 'react';

const SideBar = () => {
  console.log('');
  return (
    <div className="pane-sm sidebar">
      <ul className="list-group">
        <li className="list-group-header">
          <input
            className="form-control"
            type="text"
            placeholder="Search for image"
          />
        </li>
        <li className="list-group-item">
          {/* <img
            className="img-circle media-object pull-left"
            src="/assets/img/avatar.jpg"
            alt="test"
            width="32"
            height="32"
          /> */}
          <div className="media-body">
            <strong>List item title</strong>
          </div>
        </li>
        <li className="list-group-item">
          {/* <img
            className="img-circle media-object pull-left"
            src="/assets/img/avatar2.png"
            alt="test"
            width="32"
            height="32"
          /> */}
          <div className="media-body">
            <strong>List item title</strong>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
