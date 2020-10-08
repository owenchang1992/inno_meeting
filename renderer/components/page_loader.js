import React from 'react';
import ImageTagger from './pages/image_tagger/image_tagger';

// TODO: recognize the file type by mime
const PageLoader = ({ properties }) => {
  switch (properties.tab.src) {
    default:
      return <ImageTagger {...properties} />;
  }
};

export default PageLoader;
