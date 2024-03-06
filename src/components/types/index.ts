import { ReactNode } from 'react';
import { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';

// Common Types
export type RootStackParamList = {};
export type PropsType = {
  children: ReactNode;
  snackTitle?: string;
  snackVisable?: boolean;
  snackDismiss?: () => void;
  appbar?: boolean;
  bottomBar?: boolean;
  navigation?: any;
  refresh?: () => {};
  refreshing?: boolean;
  removeSpace?: boolean;
  fixed?: boolean;
  rotate?: boolean;
  life?: boolean;
};

export type ThemeProps = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type LevelProps = {
  id: number;
  level: string;
  quiz_id: number;
  index: number;
  status: boolean;
  attempts: number;
  navigation?: any;
  pass: number;
};

export type QuizProps = {
  id: number;
  quiz_id: number;
  level: string;
  slug: number;
  title: number;
  attempts?: number;
  answers: QuizAnswerProps[];
  navigation: any;
};

export type QuizAnswerProps = {
  id: number;
  slug: number;
  title: number;
  correct: boolean;
  quiz_id: number;
  navigation: any;
};

export type MapProps = {
  theme: ThemeProps;
  levels: LevelProps[];
  active_level: LevelProps;
  page: number;
  prev: boolean;
  next: boolean;
};

export type AdsType = {
  id: number;
  url: string;
  action: boolean;
  type: string;
};

export type LogoProps = {
  width: number;
  height: number;
};

export type FingerType = {
  start: number;
  end: number;
};

// Card Types

export type AdditionalAction = {
  title: string;
  subtitle?: string;
  type?:
  | 'text'
  | 'contained'
  | 'outlined'
  | 'elevated'
  | 'contained-tonal'
  | undefined;
  color: string;
  action: () => void;
  style?: any;
};

export type CardType = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  action?: AdditionalAction;
  loading: boolean;
  additional_action?: AdditionalAction[];
  style?: any;
};

// AutoCompleteType
export type AutoCompleteItemType = {
  id: number;
  title: string;
};
export type AutoCompleteType = {
  url: string;
  title: string;
  value?: any;
  handleChange:
  | ((key: string, value: string) => void)
  | ((key: string, item: any) => void);
};
// Param Types
export type UserAccountType = {
  id: number;
  slug: string;
  name: string;
  internal: number;
  document: number;
  language: string;
};

export type UserType = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  city?: CityType;
  pharmacy?: PharmacyType;
  type_id?: string;
  type?: UserSpecialityType;
  role?: string;
  language?: string;
  token: string;
  score?: string;
  attempts?: number;
  avatar?: UserAvatar
  verified?: boolean
};

export type UserAvatar = 'male' | 'female'

export type UserLoginType = {
  phone: string;
  password: string;
};

export type UserSpecialityType = {
  id: number;
  name: string;
  language: string;
  document: string;
};
export type PharmacyType = {
  id: number;
  name: string;
  city_id: number;
};

export type CityType = {
  id: number;
  name: string;
};

export type UserRegisterType = {
  phone: string;
  verify_code?: string;
};
export type UserRegistrationType = {
  name: string;
  phone: string;
  email: string;
  pharmacy?: PharmacyType;
  city?: CityType;
  password: string;
  confirm_password: string;
};
export type UserRegistrationErrorType = {
  name: boolean;
  phone: boolean;
  email: boolean;
  pharmacy: boolean;
  city: boolean;
  password: boolean;
  confirm_password?: boolean;
};

export type RegisterFormType = {
  loading: boolean;
  handleSubmit: () => void;
  navigation: any;
  info: UserRegistrationType;
  error: UserRegistrationErrorType;
  handleChange: (key: string, value: string) => void;
};

export type OtpFormType = {
  loading: boolean;
  handleSubmit: () => void;
  handleResend: () => void;
  info: UserRegisterType;
  error: UserRegisterErrorType;
  handleChange: (key: string, value: string) => void;
};

export type UserCompleteRegistrationType = {
  name: string;
  phone: string;
  email: string;
  type?: UserSpecialityType;
  pharmacy?: PharmacyType;
  city?: CityType;
  password: string;
  confirm_password?: string;
};

export type UserLoginErrorType = {
  phone: boolean | undefined;
  password: boolean | undefined;
};

export type UserRegisterErrorType = {
  phone: boolean | undefined;
  verify_code?: boolean | undefined;
};
export type UserCompleteRegistrationErrorType = {
  name: boolean | undefined;
  phone: boolean | undefined;
  password: boolean | undefined;
  email: boolean | undefined;
};
// Input Types
export type FieldType = {
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  label: string;
  param: string;
  password?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string;
  error?: boolean | undefined;
  action: (key: string, value: string) => void;
  left?: ReactNode;
  right?: ReactNode;
};

// Button Type
export type ButtonType = {
  title: string;
  action: (...params: any) => void;
  color: string;
  style?: object;
  type?:
  | 'text'
  | 'contained'
  | 'outlined'
  | 'elevated'
  | 'contained-tonal'
  | undefined;
  loading: boolean;
};

// Snackbar
export type SnackbarType = {
  title?: string;
  visible?: boolean;
  onDismiss?: () => void;
};

// LeaderBoard
export type LeaderboardType = {
  name: string;
  score: string;
};

// ProductKnowledge

export type ProductKnowledgeType = {
  id: number;
  title: string;
  description: string;
  media: ProductKnowledgeMediaType;
};

export type ProductKnowledgeMediaType = {
  id: number;
  url: string;
  thumb: string;
};


export type NotificationType = {
  id: number,
  title: string,
  type: 'private' | 'public' | 'role' | 'challenge',
  status: boolean,
  created_at: string
}