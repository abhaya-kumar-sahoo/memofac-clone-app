import React, { Component, useRef, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import {
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
} from '../../shared/Global.styles';
import { AddDarkIcon } from '../../shared/Icon.Comp';

export const ScrollableTags = ({
  DataArray = [],
  isAdding = true,
  onTagPress = () => {},
  onAddClick = () => {},
  style = {},
  fieldName = 'category_name',
  selectedKey = null,
}) => {
  const selKey = DataArray.findIndex(item => item.id == selectedKey);

  const [selected, setSelected] = React.useState(selKey);
  const ScrollableTagsRef = useRef();
  // re-rendering based on selectedData
  React.useEffect(() => {
    if (selectedKey !== null) {
      const selKey = DataArray.findIndex(item => item.id == selectedKey);
      setSelected(selKey);
    }
  }, [selectedKey]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          marginRight: -Spacing.large,
          minHeight: 40,
          ...style,
        }}
      >
        {/* ADD PRIMARY BUTTON */}
        {isAdding && (
          <View style={{}}>
            <Ripple
              rippleContainerBorderRadius={10}
              onPress={() => onAddClick()}
              style={{
                position: 'absolute',
                zIndex: 10,
                marginTop: 5,
                // padding: 10,
              }}
            >
              <AddDarkIcon size={35} />
            </Ripple>
          </View>
        )}

        <FlatList
          extraData={selectedKey}
          data={DataArray}
          ref={ScrollableTagsRef}
          getItemLayout={(data, index) => ({
            length: 40,
            offset: 40 * index,
            index,
          })}
          ListHeaderComponent={<HoriSpace size={50} />}
          ListFooterComponent={<HoriSpace size={100} />}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{ flexDirection: 'row' }}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flexDirection: 'row' }} key={index.toString()}>
                {selected === index ? (
                  <Ripple
                    rippleFades
                    style={{
                      ...GStyles.containView,
                      paddingHorizontal: Spacing.xlarge,
                      backgroundColor: AppColors.DarkGrey,
                      height: 40,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: AppFonts.CalibriBold,
                        fontSize: FontSize.xlarge,
                        color: AppColors.white,
                      }}
                    >
                      {item[fieldName]}
                    </Text>
                  </Ripple>
                ) : (
                  <Ripple
                    rippleFades
                    onPress={() => {
                      onTagPress(index);
                      setSelected(index);
                    }}
                    style={{
                      ...GStyles.containView,
                      paddingHorizontal: Spacing.xlarge,
                      backgroundColor: AppColors.VeryLightGrey,
                      height: 40,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: AppFonts.CalibriBold,
                        fontSize: FontSize.xlarge,
                        color: AppColors.DarkGrey,
                      }}
                    >
                      {item[fieldName]}
                    </Text>
                  </Ripple>
                )}
                <HoriSpace size={Spacing.short} />
              </View>
            );
          }}
        />

        {/* {isAdding && <HoriSpace size={Spacing.size40} />} */}
      </View>
    </View>
  );
};
