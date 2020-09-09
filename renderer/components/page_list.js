import React from 'react';
import ImageEditor from './pages/image_editor/image_editor';

export default (page, store) => {
  switch (page.type) {
    case 'image_editor':
      // TODO: Check properties
      return <ImageEditor page={page} store={store} />;
    default:
      return null;
  }
};
