import React, { Component, Fragment, useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppHeader, DropdownHeader } from '../../components/AppHeader';
import {
  FontSize,
  GStyles,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';
import { Container } from '../../components/Mini';
import { ScrollableTags } from '../../components/ScrollableTags';
import { DoneFillIcon } from '../../shared/Icon.Comp';
import Ripple from 'react-native-material-ripple';
import { SwitchButton } from '../Wishlist/SwitchButton';
import { MyRecaptureApiCall } from '../../redux/sagas/UserProfile/userProfile.request';
import { ActivityIndicator } from 'react-native-paper';
import { AppColors } from '../../assets/AppColors';
import { showToast } from 'shared/Functions/ToastFunctions';
import { PostView } from 'screens/Timeline/components/PostView/Postview.comp';

const SampleData = [
  { name: 'All' },
  { name: 'Entertainment' },
  { name: 'Travel' },
  { name: 'Restuarant' },
  { name: 'Vlog' },
  { name: 'Dance' },
  { name: 'Travel' },
];

export function ExperiencedScreen() {
  const [PrimaryGroup, setPrimaryGroup] = useState('Vacation');
  const userToken = useSelector(state => state.userAuth.userToken);
  const [RecaptureList, setRecaptureList] = React.useState([]);
  const { CollectionFolderRedux } = useSelector(state => state);
  const [LoadingMore, setLoadingMore] = useState(true);
  const nav = useNavigation();
  const PageRef = React.useRef(1);

  useEffect(() => {
    setPrimaryGroup(CollectionFolderRedux.collectionFolders[0].name);
    getPosts();
  }, []);

  const getPosts = () => {
    if (PageRef.current !== 1) {
      setLoadingMore(true);
    }
    MyRecaptureApiCall(userToken, PageRef.current)
      .then(response => {
        PageRef.current = response.content.current_page + 1;
        setRecaptureList(prevstate => {
          return [...prevstate, ...response.content.data];
        });
        setLoadingMore(false);
      })
      .catch(error => {
        showToast(error);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#000000', flex: 1 }}>
      {/* HEQDER */}
      <AppHeader enableBack />

      {/* CONTAINER */}
      <Container padding={Spacing.large}>
        <DropdownHeader
          title={PrimaryGroup}
          RightContainer={() => (
            <SwitchButton
              type="Experience"
              onTrue={() => {
                nav.navigate('WishlistScreen');
              }}
              onFalse={() => {
                nav.navigate('ExperiencedScreen');
              }}
            />
          )}
        />
        <VertSpace size={Spacing.xlarge} />
        <ScrollableTags
          DataArray={CollectionFolderRedux.collectionFolders[0].secondary}
          fieldName={'name'}
        />
        <VertSpace size={Spacing.xlarge} />

        <FlatList
          ListFooterComponent={
            <>
              <View style={{ height: 300 }}>
                {LoadingMore && (
                  <View
                    style={{
                      height: 50,
                      backgroundColor: '#f3f3f3',
                      borderRadius: 50,
                      padding: 20,
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', ...GStyles.containView }}
                    >
                      <ActivityIndicator color={AppColors.MediumGrey} />
                      <Text style={{ marginLeft: 10 }}>Getting more posts</Text>
                    </View>
                  </View>
                )}
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            getPosts();
          }}
          keyExtractor={(_, index) => index.toString()}
          data={RecaptureList}
          renderItem={({ item, index }) => (
            <PostView item={item} index={index} />
          )}
        />
      </Container>
    </SafeAreaView>
  );
}
