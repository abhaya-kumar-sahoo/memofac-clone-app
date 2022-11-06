import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import { BioImageView } from 'components/BioImageView';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MiniRating } from 'screens/Memos/MemoChip';
import { wp } from 'shared/dimens';
import { FontSize, GStyles, HoriSpace } from 'shared/Global.styles';
import { GlobalIcon } from 'shared/Icon.Comp';

export const PublicIndicator = ({ image, type }) => {
  return (
    <View
      style={{
        backgroundColor: AppColors.Transparent,
        marginBottom: 5,
        marginRight: 5,
      }}
    >
      <BioImageView imageSize={50} imageSrc={image} />
      {type == '3' && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: AppColors.white,
            width: 20,
            height: 20,
            borderRadius: 20,
            elevation: 3,
            ...GStyles.containView,
          }}
        >
          <GlobalIcon size={15} />
        </View>
      )}
    </View>
  );
};

export const ContactsListView = ({ item, _, onPress }) => {
  const { name, rating, image, type, id } = { ...item };

  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      style={{
        ...GStyles.flexRowSpaceBetween,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <PublicIndicator image={image} type={type} />
        <HoriSpace size={10} />

        <Text
          numberOfLines={1}
          style={{
            width: wp(200),
            fontFamily: AppFonts.CalibriBold,
            color: AppColors.white1,
            fontSize: FontSize.xlarge,
          }}
        >
          {name}
        </Text>
      </View>

      <MiniRating
        RATESIZE={FontSize.xlarge}
        rateNumber={rating}
        nostyle={true}
        color={AppColors.white1}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});
