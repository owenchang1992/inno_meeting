import React from 'react';
import ImageEditor from './pages/image_editor/image_editor';

export default (pageProps, page) => {
  switch (page.type) {
    case 'image_editor':
      // TODO: Check properties
      return <ImageEditor imagePath={pageProps.imagePath} />;
    default:
      return null;
  }
};
