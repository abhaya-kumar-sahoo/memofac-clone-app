import React from 'react';
import { AppColors } from 'assets/AppColors';
import { AccentButton } from 'components/Mini';
import {
  checkContactPermission,
  getContactPermission,
} from 'shared/Permission';
import { PermissionContent } from 'screens/Contacts/ContactPermissionHandler/PermissionContent';
import { Linking, View, Alert, AppState, Platform } from 'react-native';
import { hp } from 'shared/dimens';
import { GStyles, VertSpace } from 'shared/Global.styles';
import { RESULTS } from 'react-native-permissions';

const permissionStateProps = {
  result: RESULTS.DENIED,
  isPermissionGranted: false,
};
export const ContactPmsContainer = ({
  permissionState = { ...permissionStateProps },
  onStateChange = ({ ...permissionStateProps }) => {},
  onPermissionGrated = ({ ...permissionStateProps }) => {},
  children,
}) => {
  const { result } = { ...permissionState };
  const appState = React.useRef(AppState.currentState);
  const [nextAppState, setAppState] = React.useState(appState.current);
  const focusEvent = Platform.OS === 'ios' ? 'focus' : 'change';

  React.useEffect(() => {
    // const backgroundState = AppState.addEventListener(
    //   focusEvent,
    //   handleAppStateChange,
    // );
    AppState.addEventListener('change', async e => {
      // handleAppStateChange(e);
      const { isPermissionGranted, result: statuses } =
        await checkContactPermission();

      if (isPermissionGranted) {
        onPermissionGrated({ statuses, isPermissionGranted });
        onStateChange({ statuses, isPermissionGranted });
      }
      // getContactPermission().then(({ statuses, isPermissionGranted }) => {
      //   onStateChange({ statuses, isPermissionGranted });
      //   if (isPermissionGranted) {
      //     onPermissionGrated({ statuses, isPermissionGranted });
      //   }
      // });
    });
    return () => {
      AppState.addEventListener('change', handleAppStateChange).remove();
    };
  }, []);

  const handleAppStateChange = nextAppState => {
    getContactPermission().then(({ statuses, isPermissionGranted }) => {
      onStateChange({ statuses, isPermissionGranted });
      if (isPermissionGranted) {
        onPermissionGrated({ statuses, isPermissionGranted });
      }
    });
    if (
      // appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      getContactPermission().then(({ statuses, isPermissionGranted }) => {
        onStateChange({ statuses, isPermissionGranted });
        if (isPermissionGranted) {
          onPermissionGrated({ statuses, isPermissionGranted });
        }
      });
    } else {
    }

    appState.current = nextAppState;
    setAppState(appState.current);
  };

  return (
    <>
      {permissionState.isPermissionGranted === false && (
        <View
          style={{
            flex: 1,
            ...GStyles.containView,
            backgroundColor: AppColors.DarkBG,
          }}
        >
          <PermissionContent />
          <VertSpace size={hp(70)} />
          <AccentButton
            style={{ height: 50, width: 180, ...GStyles.containView }}
            title={
              result === RESULTS.BLOCKED ? 'Open settings' : 'Allow contacts'
            }
            onPress={() => {
              setTimeout(() => {
                if (result === RESULTS.BLOCKED) {
                  askForSettings();
                } else {
                  getContactPermission().then(
                    ({ statuses, isPermissionGranted }) => {
                      console.log(statuses);
                      console.log(isPermissionGranted);
                      onStateChange({ statuses, isPermissionGranted });
                      if (isPermissionGranted) {
                        onPermissionGrated({ statuses, isPermissionGranted });
                      }
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

export const askForSettings = () => {
  return Alert.alert(
    'Permission required',
    'Memofac requires the Contacts permission in order to display users rating, but it has been permanently denied. Please continue to the app settings menu, select Permissions and enable Contacts',
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

export const askForSettingsStorage = () => {
  return Alert.alert(
    'Permission required',
    'Memofac requires the Storage permission in order to take photos for post, but it has been permanently denied. Please continue to the app settings menu, select Permissions and enable Storage',
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
