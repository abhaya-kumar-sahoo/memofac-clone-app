import React from 'react';
import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import { AccentButton } from 'components/Mini';
import { getStoragePermission } from 'shared/Permission';
import { Linking, Text, View, Alert, AppState } from 'react-native';
import { hp } from 'shared/dimens';
import { FontSize, GStyles, VertSpace } from 'shared/Global.styles';
import { RESULTS } from 'react-native-permissions';

export const askForStorageSettings = () => {
  return Alert.alert(
    'Permission required',
    'Memofac requires the Storage permission in order to display photos, files, etc, but it has been permanently denied. Please continue to the app settings menu, select Permissions and enable Storage',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'Continue', onPress: () => Linking.openSettings() },
    ],
  );
};

const permissionStateProps = {
  result: RESULTS.DENIED,
  isPermissionGranted: false,
};
export const StoragePermissionContainer = ({
  permissionState = { ...permissionStateProps },
  onStateChange = ({ ...permissionStateProps }) => {},
  onPermissionGrated = ({ ...permissionStateProps }) => {},
  children,
}) => {
  const { result } = { ...permissionState };
  const appState = React.useRef(AppState.currentState);
  const [nextAppState, setAppState] = React.useState(appState.current);

  React.useEffect(() => {
    const backgroundState = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );
    return () => AppState.removeEventListener('change', _handleAppStateChange);
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      getStoragePermission().then(({ statuses, isPermissionGranted }) => {
        onStateChange({ statuses, isPermissionGranted });
        if (isPermissionGranted)
          onPermissionGrated({ statuses, isPermissionGranted });
      });
    } else {
    }

    appState.current = nextAppState;
    setAppState(appState.current);
  };

  return (
    <>
      {permissionState.isPermissionGranted === false && (
        <View style={{ flex: 1, ...GStyles.containView }}>
          <StoragePermissionContent />
          <VertSpace size={hp(70)} />
          <AccentButton
            style={{ height: 50, width: 180, ...GStyles.containView }}
            title={
              result === RESULTS.BLOCKED ? 'Open settings' : 'Allow Storage'
            }
            onPress={() => {
              setTimeout(() => {
                if (result === RESULTS.BLOCKED) askForStorageSettings();
                else {
                  getStoragePermission().then(
                    ({ statuses, isPermissionGranted }) => {
                      onStateChange({ statuses, isPermissionGranted });
                      if (isPermissionGranted)
                        onPermissionGrated({ statuses, isPermissionGranted });
                    },
                  );
                }
              }, 300);
            }}
          />
        </View>
      )}
      {permissionState.isPermissionGranted === true && <>{children}</>}
    </>
  );
};

export const StoragePermissionContent = ({ style = {} }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text
        style={{
          width: 200,
          lineHeight: FontSize.xlarge,
          fontSize: FontSize.large,
          color: AppColors.MediumGrey,
          fontFamily: AppFonts.CalibriRegular,
        }}
      >
        Memofac would like to access your Storage to display photos and albums,
        for you to select and share with your Contacts
      </Text>
    </View>
  );
};
