import {UserType} from '@/components/types';
import {Platform} from 'react-native';
import * as Keychain from 'react-native-keychain';

// Options for iOS:
const iosOptions = {
  authenticationPrompt: {title:'Enter your password to access credentials'},
};

const iosTempOptions = {
  authenticationPrompt: {title:'Enter your password to access credentials'},
};

// Options for Android:
const androidOptions = {
  service: 'parkology-auth', // Unique identifier for storage
  userAuthRequired: false, // Require user authentication
  storage:Keychain.STORAGE_TYPE.FB
};

// Options for Android:
const androidTempOptions = {
  service: 'parkology-temp-auth', // Unique identifier for storage
  userAuthRequired: false, // Require user authentication
  storage:Keychain.STORAGE_TYPE.FB

};

// Choose platform-specific options:
const options = Platform.OS === 'ios' ? iosOptions : androidOptions;
const tempOptions = Platform.OS === 'ios' ? iosTempOptions : androidTempOptions;

export const storeUser = async (credentials: UserType) => {
  return await Keychain.setGenericPassword(
    'auth', // Identifier for the item
    JSON.stringify(credentials), // Data to store
    options,
  );
};

export const storeTempUser = async (credentials: UserType) => {
  return await Keychain.setGenericPassword(
    'auth-temp', // Identifier for the item
    JSON.stringify(credentials), // Data to store
    tempOptions,
  );
};

export const deleteTempUser = async () => {
  return await Keychain.resetGenericPassword(tempOptions);
};

export const deleteUser = async () => {
  return await Keychain.resetGenericPassword(options);
};

export const getUser = async (name?: string) => {
  try {
    const services = await Keychain.getGenericPassword(options);
    if (!services) {
      return null;
    }
    return JSON.parse(services.password) as UserType;
    // return JSON.parse(retrievedData) as AuthData;
  } catch (error) {
    console.error('Error retrieving auth data:', error);
    return null;
  }
};
export const getTempUser = async (name?: string) => {
  try {
    const services = await Keychain.getGenericPassword(tempOptions);
    if (!services) {
      return null;
    }
    return JSON.parse(services.password) as UserType;
    // return JSON.parse(retrievedData) as AuthData;
  } catch (error) {
    console.error('Error retrieving auth data:', error);
    return null;
  }
};
