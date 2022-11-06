import React from 'react';
import ImageResizer from 'react-native-image-resizer';

export const getResizedImage = image =>
  ImageResizer.createResizedImage(
    image,
    1200,
    1200,
    'JPEG',
    40,
    0,
    null,
    true,
    { onlyScaleDown: true },
  )
    .then(response => {
      // console.log('image data --> ', response);
      return response;
    })
    .catch(err => {});

export const getResizedImageArray = async (ImageList = []) =>
  await Promise.all(ImageList.map(item => getResizedImage(item)));
