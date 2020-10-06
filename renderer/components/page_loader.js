import React from 'react';
import ImageTagger from './pages/image_tagger/image_tagger';
import { MEDIA_TAGGER } from '../constants';

const PageLoader = ({ properties }) => {
  switch (properties.page.type) {
    case MEDIA_TAGGER:
      // TODO: Check properties
      return <ImageTagger {...properties} />;
    default:
      return null;
  }
};

export default PageLoader;
