import React, { useState, createContext, useEffect, useContext } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { AppFonts } from '../assets/fonts/AppFonts';
// import NoConnection from '../assets/svgs/NoConnection.svg';
import { AppColors } from '../assets/AppColors';
import { NointernetIcon } from '../shared/Icon.Comp';
import { AppButton } from './AppButton';
import { FontSize, VertSpace } from '../shared/Global.styles';
import Netinfo, { useNetInfo } from '@react-native-community/netinfo';

export const NetworkContext = createContext();

function usePrevious(value) {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function NetworkProvider(props) {
  const [netStatus, setNetStatus] = useState(true);
  const prevNetStatus = usePrevious(netStatus);

  // Subscribe
  React.useEffect(() => {
    // Unsubscribe
    Netinfo.addEventListener(state => {
      setNetStatus(state.isConnected);
    });
  }, []);

  return (
    <NetworkContext.Provider value={{ netStatus, prevNetStatus }}>
      {props.children}
    </NetworkContext.Provider>
  );
}

export function NetWorkModal() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NointernetIcon size={170} />

      <VertSpace size={20} />
      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.MediumGrey,
          fontSize: FontSize.large,
        }}
      >
        No Internet connection
      </Text>

      <VertSpace size={20} />
      <AppButton
        backgroundColor={AppColors.DarkGrey}
        width={120}
        height={40}
        titleFontSize={FontSize.xlarge}
        titleColor={AppColors.white}
        title="Try again"
      />
      {/* <Text>{contextData ? 'Network works' : 'Network is off'}</Text> */}
    </SafeAreaView>
  );
}
