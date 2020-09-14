import React from 'react';

export default ({ history }) => {
  console.log(history);

  return (
    <ul className="list-group">
      <li className="list-group-item">
        {/* <img
          className="img-circle media-object pull-left"
          alt="avatar1"
          src="/assets/img/avatar.jpg"
          width="32"
          height="32"
        /> */}
        <div className="media-body">
          <strong>List item title</strong>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </li>
      <li className="list-group-item">
        {/* <img
          className="img-circle media-object pull-left"
          alt="avatar2"
          src="/assets/img/avatar2.png"
          width="32"
          height="32"
        /> */}
        <div className="media-body">
          <strong>List item title</strong>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </li>
    </ul>
  );
};
