import React, { Fragment } from 'react';
import { Text, View } from 'react-native';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import { SeelAllButton } from '../../components/SeeAllButton';
import {
  FontSize,
  GStyles,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';
import { MemoChip } from '../Memos/MemoChip';
import { useNavigation } from '@react-navigation/native';

export const MemoSection = ({
  userid,
  title = 'Memos',
  disableHeader = false,
  MemosDataSet = [],
  short = false,
}) => {
  const navigation = useNavigation();
  const { navigate } = { ...navigation };
  const onPress = () => navigate('UserMemos', { userid });

  return (
    <View style={{ marginLeft: 5 }}>
      {!disableHeader && MemosDataSet.length !== 0 && (
        <View
          style={[
            GStyles.flexRow,
            { justifyContent: 'space-between', paddingVertical: Spacing.large },
          ]}
        >
          <Text
            style={{
              color: AppColors.DarkGrey,
              fontSize: FontSize.inputText,
              fontFamily: AppFonts.CalibriBold,
            }}
          >
            {title}
          </Text>
          <SeelAllButton onPress={onPress} />
        </View>
      )}

      {short ? (
        <>
          <View style={{}}>
            {MemosDataSet.slice(0, 4).map((memo, index) => {
              return (
                <Fragment key={(index + index + 2).toString()}>
                  <MemoChip item={memo} key={index} fieldName={'me'} />
                  <VertSpace />
                </Fragment>
              );
            })}
          </View>

          {MemosDataSet.length > 3 && (
            <Text style={{ fontSize: FontSize.xxlarge, lineHeight: 10 }}>
              ...
            </Text>
          )}
        </>
      ) : (
        <>
          <View style={{}}>
            {MemosDataSet.map((memo, index) => {
              return (
                <Fragment key={(index + index + 2).toString()}>
                  <MemoChip item={memo} key={index} fieldName={'me'} />
                  <VertSpace />
                </Fragment>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
};
