import React from 'react';
import { FlatList, View, SafeAreaView } from 'react-native';
import { AppHeader, HeadingBar } from 'components/AppHeader';
import {
  AppDimens,
  FontSize,
  GStyles,
  Spacing,
  VertSpace,
} from 'shared/Global.styles';
import { Container } from 'components/Mini';
import { AppColors } from 'assets/AppColors';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { ImageGridView } from 'screens/GalleryPicker/PhotosList';

const IMAGE_GRID_SIZE = AppDimens.width * 0.25;

export const MemoImageGallery = ({ route }) => {
  const { imagesListParam } = route.params;
  const userAuth = useSelector(state => state.userAuth);
  const Navigation = useNavigation();
  const [galleryImages, setgalleryImages] = React.useState([]);

  React.useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#000000', flex: 1 }}>
      {/* HEQDER */}
      <AppHeader enableBack />

      <Container>
        <HeadingBar title={'Gallery'} titleFontSize={FontSize.x4large} />

        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-around',
          }}
          data={imagesListParam}
          ListFooterComponent={<VertSpace size={200} />}
          ListHeaderComponent={<VertSpace size={Spacing.xlarge} />}
          ItemSeparatorComponent={() => <VertSpace size={20} />}
          renderItem={({ item, index, separators }) => {
            if (item.image === null) {
              return (
                <View
                  style={{
                    width: IMAGE_GRID_SIZE,
                    height: IMAGE_GRID_SIZE,
                    borderRadius: IMAGE_GRID_SIZE / 2.9,
                    backgroundColor: AppColors.Transparent,
                    ...GStyles.containView,
                  }}
                />
              );
            } else {
              return (
                <ImageGridView
                  onPress={() =>
                    Navigation.navigate('ImageViewScreen', {
                      imageUrl: item.image,
                    })
                  }
                  requiredLoader={false}
                  selectable={false}
                  item={item}
                  imageUrl={item.image}
                />
              );
            }
          }}
        />
      </Container>
    </SafeAreaView>
  );
};
