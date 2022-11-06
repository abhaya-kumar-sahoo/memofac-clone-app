import React, { Component, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import { FontSize } from '../../shared/Global.styles';

const LONG_TEXT =
  'Nostrud duis officia excepteur labore aliquip laborum dolor minim cillum occaecat. Nisi laboris in velit ad velit reprehenderit consequat eu. Non occaecat ad excepteur laboris consequat consectetur deserunt nostrud officia ex. Dolor velit minim ea incididunt nisi labore.';

// COMPONENT
// TODO: More needs to be in same  line with text component
// !More  text needs to be in same line
export const InfiniteText = ({ text = '' }) => {
  const [MoreText, setMoreText] = React.useState(true);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Pressable
        onPress={() => setMoreText(!MoreText)}
        // style={{}}
        // numberOfLines={0}
      >
        <Text
          // onTextLayout={onTextLayout}
          numberOfLines={MoreText ? 4 : 0}
          lineBreakMode={'tail'}
          style={{
            flexDirection: 'row',
            // backgroundColor: 'wheat',
            fontSize: FontSize.medium,
            fontFamily: AppFonts.CalibriBold,
            color: AppColors.MediumGrey,
          }}
        >
          {text}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            flexDirection: 'row',
            fontFamily: AppFonts.CalibriBold,
            color: AppColors.blue,
          }}
        >
          {text.length > 200 ? (MoreText ? 'More' : 'Less') : ''}
        </Text>
      </Pressable>
    </View>
  );
};
