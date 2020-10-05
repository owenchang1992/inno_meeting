import React from 'react';
import ImageTagger from './pages/image_editor/image_tagger';

const PageLoader = ({ properties }) => {
  switch (properties.page.type) {
    case 'image_editor':
      // TODO: Check properties
      return <ImageTagger {...properties} />;
    default:
      return null;
  }
};

export default PageLoader;
