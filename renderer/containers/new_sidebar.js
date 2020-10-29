import React from 'react';

const SideBarItem = ({ media }) => (
  <li className="list-group-item">
    <div className="media-body">
      <strong>{media.basePath}</strong>
    </div>
  </li>
);

const SideBar = ({ mediaList }) => {
  console.log(mediaList);
  const getList = () => {
    if (mediaList) {
      return mediaList.map((media) => (
        <SideBarItem media={media} />
      ));
    }

    return null;
  };

  return (
    <div className="pane-sm sidebar">
      <ul className="list-group">
        {/* <li className="list-group-header">
          <input
            className="form-control"
            type="text"
            placeholder="Search for image"
          />
        </li> */}
        {getList()}
      </ul>
    </div>
  );
};

export default SideBar;
