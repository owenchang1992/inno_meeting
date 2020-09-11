import React from 'react';
import ImageEditor from './pages/image_editor/image_editor';

export default (type, properties) => {
  switch (type) {
    case 'image_editor':
      // TODO: Check properties
      return <ImageEditor {...properties} />;
    default:
      return null;
  }
};
