import React from 'react';
import ImageEditor from './pages/image_editor/image_editor';

const PageLoader = ({ properties }) => {
  switch (properties.page.type) {
    case 'image_editor':
      // TODO: Check properties
      return <ImageEditor {...properties} />;
    default:
      return null;
  }
};

export default PageLoader;
