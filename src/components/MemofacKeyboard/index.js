import { AppColors } from 'assets/AppColors';
import { isIOS } from 'components/AppHeader';
import { AccentButton } from 'components/Mini';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './index.styles';

export const MemofacKeyboard = ({
  onPress = () => null,
  onChangeText = () => null,
  onAttachEmoji = () => null,
  value = '',
  multiline,
  autoFocus,
}) => {
  const [EmojiMode, setEmojiMode] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: AppColors.DarkBG, marginBottom: isIOS ? null : 20 },
      ]}
    >
      <View style={{ flexDirection: 'row', marginRight: 10 }}>
        <TextInput
          multiline={multiline}
          value={value}
          autoFocus={autoFocus}
          onFocus={() => {
            setEmojiMode(false);
          }}
          style={[
            styles.textFieldContainer,
            {
              backgroundColor: AppColors.DarkGrey2,
              color: AppColors.disableColor,
            },
          ]}
          placeholder={'Write a comment ...'}
          placeholderTextColor={AppColors.disableColor}
          onChangeText={onChangeText}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <TouchableOpacity
          onPress={() => {
            setEmojiMode(!EmojiMode), Keyboard.dismiss();
          }}
        >
          <Text style={styles.logo1}>🙂</Text>
        </TouchableOpacity>

        <EmojiPicker
          onEmojiSelected={text => {
            onAttachEmoji(text);
            onChangeText(value + text.emoji);
          }}
          open={EmojiMode}
          onClose={() => setEmojiMode(false)}
          emojiSize={28}
          categoryColor={AppColors.MediumGrey}
          activeCategoryColor={AppColors.logoColour_1_bold}
          categoryContainerColor="white"
          disableSafeArea
          categoryPosition="top"
          categoryContainerStyles={{ marginTop: 20 }}
          backdropColor="transparent"
        /> */}

        <View style={styles.sendButtonContainer}>
          <AccentButton style={{ height: 35 }} onPress={onPress} />
        </View>
      </View>
    </View>
  );
};
