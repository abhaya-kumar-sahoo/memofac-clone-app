import CameraRoll, { getAlbums } from '@react-native-community/cameraroll';
import { AppColors } from 'assets/AppColors';
import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const PhotosListScreen = () => {
  const [PhotosList, setPhotosList] = React.useState([]);
  const [albumList, setAlbumList] = React.useState([]);
  const [albumName, setAlbumName] = React.useState('');
  useEffect(() => {
    getPhotos('');
    getAllAlbumData();
  }, []);

  const getAllAlbumData = () => {
    CameraRoll.getAlbums({ assetType: 'Photos' }).then(response => {
      setAlbumList(response);
    });
  };
  const getPhotos = albumName => {
    CameraRoll.getPhotos({
      first: 20,
      after: '0',
      assetType: 'Photos',
      groupTypes: 'Album',
      groupName: albumName,
    })
      .then(r => {
        setPhotosList(r.edges);
      })
      .catch(err => {
        //Error Loading Images
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        ListHeaderComponent={
          <ScrollView horizontal>
            {albumList.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setAlbumName(item.title);
                  getPhotos(item.title);
                }}
                key={index.toString()}
                style={{
                  backgroundColor: '#efefef',
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: AppColors.LowDark }}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        }
        keyExtractor={(_, index) => index.toString()}
        data={PhotosList}
        renderItem={({ item, index }) => {
          return (
            <Image
              key={index}
              style={{
                borderRadius: 20,
                width: 200,
                height: 200,
              }}
              source={{ uri: item.node.image.uri }}
            />
          );
        }}
      />
    </View>
  );
};
