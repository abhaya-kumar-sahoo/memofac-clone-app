import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AppColors } from '../../assets/AppColors';
import { Spacing, VertSpace, WhiteFadeView } from '../../shared/Global.styles';
import { AppFonts } from '../../assets/fonts/AppFonts';
import { AppHeader } from '../../components/AppHeader';
import { AlbumThumbNail } from './Components/Albums.View';

export function Gallery({ route, navigation }) {
  const [Foldernames, setFoldernames] = React.useState([]);
  const { albumData } = route.params;

  React.useEffect(() => {
    setFoldernames(albumData);
  }, [albumData]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
        paddingHorizontal: Spacing.large,
      }}
    >
      <AppHeader enableBack />

      <View>
        <WhiteFadeView reverse style={Styles.headerView}>
          {/* <VertSpace size={30} /> */}
          <Text style={Styles.headerTextView}>Select Folder</Text>
        </WhiteFadeView>
      </View>

      {/* LIST OF ALBUMS */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SPACE ADDITION */}
        <VertSpace size={60} />
        {/* LOOPING THROUGH THE ALBUMS RESPONSES */}
        {Foldernames.map((item, index) => (
          <AlbumThumbNail
            key={index.toString()}
            albumData={item}
            onPress={() => {
              navigation.navigate('PhotosList', {
                selectedGroup: item,
              });
            }}
          />
        ))}

        <VertSpace size={50} />
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  headerView: {
    backgroundColor: AppColors.Transparent,
    width: '100%',
    // height: 100,
    paddingBottom: 40,
    zIndex: 20,
    position: 'absolute',
    top: 0,
  },
  headerTextView: {
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.DarkGrey,
    fontSize: Spacing.xxlarge,
  },
});
