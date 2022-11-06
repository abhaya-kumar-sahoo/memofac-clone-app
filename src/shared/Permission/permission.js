import {
  check,
  request,
  RESULTS,
  requestMultiple,
  checkMultiple,
} from 'react-native-permissions';

// This function can be used anywhere as it supports multiple permissions.
// It checks for permissions and then requests for it.
export async function getMultiplePermissions(permissions) {
  let isPermissionGranted = false;
  // console.log('permissions :', permissions);
  const statuses = await requestMultiple(permissions);
  for (var index in permissions) {
    if (statuses[permissions[index]] === RESULTS.GRANTED) {
      isPermissionGranted = true;
    } else {
      isPermissionGranted = false;
      break;
    }
  }

  return { isPermissionGranted, statuses };
}

// In case you want to check a single permission
export async function checkPermission(permission) {
  var isPermissionGranted = false;
  const result = await check(permission);
  switch (result) {
    case RESULTS.GRANTED:
      isPermissionGranted = true;
      break;
    case RESULTS.DENIED:
      isPermissionGranted = false;
      break;
    case RESULTS.BLOCKED:
      isPermissionGranted = false;
      break;
    case RESULTS.UNAVAILABLE:
      isPermissionGranted = false;
      break;
  }

  return { isPermissionGranted, result };
}

export async function checkMultiplePermissions(permissions) {
  const result = await checkMultiple([...permissions]);
  var isPermissionGranted = false;
  for (var index in permissions) {
    if (result[permissions[index]] === RESULTS.GRANTED) {
      isPermissionGranted = true;
    } else {
      isPermissionGranted = false;
      break;
    }
  }
  return { isPermissionGranted, result };
}
