import CameraRoll from '@react-native-community/cameraroll';

//  ALBUM PHOTO RETREIVE
export const GetAlbumPhoto = (AlBumName) =>
  CameraRoll.getPhotos({
    assetType: 'Photos',
    groupTypes: 'Album',
    groupName: AlBumName,
    first: 1,
  }).then((response) => {
    return response.edges[0];
  });
