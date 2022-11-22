/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {MemoRateView} from '../MemoRateView';

export const MemoSelection = ({
  memosList = {},
  onRateCallback = () => {},
  onRemove = () => {},
  defaultRate = -1,
}) => {
  return (
    <>
      {Object.values(memosList).map((item, index) => {
        return (
          <View key={index} style={{paddingBottom: 30}}>
            <MemoRateView
              key={index}
              onRemove={() => onRemove(item)}
              imageUrl={item.image || null}
              memoName={item.title}
              memoDesc={item.description}
              RateStarSize={30}
              defaultRate={index === 0 ? defaultRate : -1}
              onRateCallback={rateIndex => onRateCallback(item, rateIndex)}
              gapInTitleDes={12}
            />
          </View>
        );
      })}
    </>
  );
};
