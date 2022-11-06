import React from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import { AppColors } from '../../../assets/AppColors';
import { AppFonts } from '../../../assets/fonts/AppFonts';
import { AppHeader } from '../../../components/AppHeader';
import { BioImageView } from '../../../components/BioImageView';
import {
  FontSize,
  VertSpace,
  HoriSpace,
  Spacing,
  GStyles,
} from '../../../shared/Global.styles';
import { Container } from '../../../components/Mini/';
import { useSelector } from 'react-redux';
import {
  ReactionConsts,
  ReactionView,
} from '../../Timeline/components/Reaction.comp';
import { HeartFillIcon, HeartIcon } from 'shared/Icon.Comp';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';

const ReactionContact = {
  id: -1,
  post_id: '',
  user_id: '',
  reactType: '-1',
  created_at: '2021-05-02T19:22:02.000000Z',
  updated_at: '2021-05-02T19:22:02.000000Z',
  name: '',
  image: null,
};
// CONTACTS VIEW
export const ContactsListView = ({ item, index, navigation }) => {
  return (
    <Ripple
      onPress={() => {
        navigation.navigate('FriendsProfile', { user_id: item.uid });
      }}
      style={{
        ...GStyles.flexRowSpaceBetween,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BioImageView imageSize={60} imageSrc={item.image} />
        <HoriSpace size={10} />

        <Text
          style={{
            fontFamily: AppFonts.CalibriBold,
            color: AppColors.white1,
            fontSize: FontSize.xlarge,
          }}
        >
          {item.name}
        </Text>
      </View>

      {/* {item.reactType === ReactionConsts.NONE ? (
        <HeartIcon size={FontSize.x4large} />
      ) : (
        <HeartFillIcon size={FontSize.x4large} />
      )} */}

      {/* <MiniRating rateNumber={item.rating} nostyle={true} /> */}
    </Ripple>
  );
};

export function ContactsWithReaction({ route, navigation }) {
  // const nav = useNavigation();

  const [UserReactions, setUserReactions] = React.useState([]);

  const { data, loading } = useSelector(
    state => state.PostReactionCommentsReducer,
  );

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack />
      <Container>
        <VertSpace size={Spacing.size40} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.post_react}
          ItemSeparatorComponent={() => <VertSpace size={20} />}
          renderItem={({ item, index }) => (
            <ContactsListView
              navigation={navigation}
              item={item}
              index={index}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Container>
    </SafeAreaView>
  );
}
