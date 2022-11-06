import { Platform, Alert, Linking } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import {
  checkMultiplePermissions,
  checkPermission,
  getMultiplePermissions,
} from 'shared/Permission/permission';

const contactPermission =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.CONTACTS
    : PERMISSIONS.ANDROID.READ_CONTACTS;

export const checkContactPermission = async () => {
  const { isPermissionGranted, result } = await checkPermission(
    contactPermission,
  );
  return { isPermissionGranted, result };
};

export const getContactPermission = async () => {
  const { isPermissionGranted, statuses } = await getMultiplePermissions([
    contactPermission,
  ]);

  return { isPermissionGranted, statuses };
};

//--EXTERNAL STORAGE-----------------------------------------------------------------------------------

const storagePermission =
  Platform.OS === 'ios'
    ? [PERMISSIONS.IOS.PHOTO_LIBRARY]
    : [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];

export const checkStoragePermission = async () => {
  const { isPermissionGranted, result } = await checkPermission(
    storagePermission[0],
  );
  return { isPermissionGranted, result };
};

export const getStoragePermission = async () => {
  const { isPermissionGranted, statuses } = await getMultiplePermissions(
    storagePermission,
  );

  return { isPermissionGranted, statuses };
};

//-------------------------------------------------------------------------------------

const AllPermissions =
  Platform.OS === 'ios'
    ? [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.STOREKIT]
    : [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
export const checkAllPermissions = async () => {
  const { isPermissionGranted, result } = await checkMultiplePermissions(
    AllPermissions,
  );
  return { isPermissionGranted, result };
};

// GET ALL MOBILE APP PERMISSION
export const getAllPermissions = async () => {
  const { isPermissionGranted, statuses } = await getMultiplePermissions(
    AllPermissions,
  );
  return { isPermissionGranted, statuses };
};
