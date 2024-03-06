import { Dimensions } from "react-native";

export const isValidEmail = (email: string): boolean => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the provided email against the regex
  return emailRegex.test(email);
};
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Regular expression for Egyptian phone numbers
  const phoneNumberRegex = /^(?:(?:\+|00)20)?1[0-2]\d{8}$/;
  // Test the provided phone number against the regex
  return phoneNumberRegex.test(phoneNumber);
};

export const isEmpty = (value: string) => {
  return value.trim() == '';
};

export const addPrefixIfNotExist = (str: string, prefix: string) => {
  // Remove leading zeros
  const stringWithoutZeros = str.replace(/^0/, '');

  // Add the prefix if it doesn't exist
  if (!stringWithoutZeros.startsWith(prefix)) {
    return prefix + stringWithoutZeros;
  }

  return stringWithoutZeros;
};
const { height } = Dimensions.get('screen');
const baseHeight = 1000
export const scaleFactor = height / baseHeight;
export const scaledFontSize = (size: number) => Math.round(size * scaleFactor);


export const removePrefixIfNotExist = (str: string, prefix: string) => {
  // Remove leading zeros
  const stringWithoutZeros = str.replace(/^0/, '');

  // Add the prefix if it doesn't exist
  if (stringWithoutZeros.startsWith(prefix)) {
    return stringWithoutZeros.replace(prefix, '');
  }
  return stringWithoutZeros;
};
