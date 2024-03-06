import { addPrefixIfNotExist, isEmpty, isValidEmail, isValidPhoneNumber, removePrefixIfNotExist, scaledFontSize } from '@/components/functions';
import Layout from '@/components/layout';
import Styles from '@/components/styles';
import { UserRegistrationErrorType, UserRegistrationType, UserType } from '@/components/types';
import AutoComplete from '@/components/widgets/autocomplete';
import CustomButton from '@/components/widgets/button';
import CustomCard from '@/components/widgets/card';
import CustomInputField from '@/components/widgets/input';
import { Colors } from '@/constant/color';
import { routeConfig } from '@/constant/route';
import { post } from '@/data/api.handler';
import {
    deleteTempUser,
    deleteUser,
    getUser,
    storeUser,
} from '@/data/store.data';
import useTrans from '@/locale';
import { resetUser, setUser } from '@/store/user';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

const { height } = Dimensions.get('screen');
const baseHeight = 800; // Width on which the font size is designed
const baseImageHeight = 700;

function EditProfileScreen({ navigation }: any) {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string>('');
    const [reset, setReset] = useState<boolean>(false);
    const [passwordInfo, setPasswordInfo] = useState<any>({
        password: '',
        confirm_password: ''
    });
    const scaleFactor = height / baseHeight;
    const scaledHeight = baseImageHeight * scaleFactor;
    const [profile, setProfile] = useState<UserType>();
    const dispatch = useDispatch();
    const { language, translate } = useTrans();
    const [info, setInfo] = useState<any>({
        name: '',
        phone: '',
        email: '',
        otp: ''

    });

    const [error, setError] = useState<any>({
        name: false,
        phone: false,
        email: false,
        otp: false

    });
    const [passwordError, setPasswordError] = useState<any>({
        password: false,
        confirm_password: false

    });
    const loadData = async () => {
        setLoading(true);
        const user = await getUser();
        try {
            const res = await post(routeConfig.profile, null, user?.token);
            if (res && res.status_code == 200) {
                setProfile(res.data);
                dispatch(setUser(res.data));
                let phone = removePrefixIfNotExist(res.data.phone, '+20');
                setInfo({ ...res.data, phone: phone, otp: '' });
            }

            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setInfo({
            ...info,
            [key]: value,
        });
        onDismiss();
    };

    const handlePasswordInfoChange = (key: string, value: string) => {
        setPasswordInfo({
            ...passwordInfo,
            [key]: value,
        });
        onDismiss();
    };


    const handleCityChange = (key: string, value: string) => {
        setInfo({
            ...info,
            [key]: value,
            pharmacy: null,
        });
        onDismiss();
    }
    const onDismiss = () => {
        setError({
            phone: false,
            name: false,
            email: false,
            pharmacy: false,
            city: false,

        });
        setPasswordError({
            password: false,
            confirm_password: false
        });
        setMessage('');
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAction = () => {
        setReset(!reset);
    };

    const validateForm = () => {
        const { name, phone, email, city, pharmacy } =
            info;

        if (isEmpty(name.trim())) {
            setError({
                ...error,
                name: true,
            });
            setMessage(translate('errorName'));
            return false;
        }
        if (!isValidEmail(email.trim())) {
            setError({
                ...error,
                email: true,
            });
            setMessage(translate('errorEmail'));
            return false;
        }
        if (!isValidPhoneNumber(phone)) {
            setError({
                ...error,
                phone: true,
            });
            setMessage(translate('errorPhone'));
            return false;
        }

        if (!city?.id) {
            setError({
                ...error,
                city: true,
            });
            setMessage(translate('errorCity'));
            return false;
        }
        if (!pharmacy?.id) {
            setError({
                ...error,
                pharmacy: true,
            });
            setMessage(translate('errorPharmacy'));
            return false;
        }
        setMessage('');

        return true;
    };

    const handleUpdate = async () => {
        if (validateForm()) {
            const data = {
                name: info.name,
                email: info.email,
                phone: addPrefixIfNotExist(info.phone, '+20'),
                city_id: info.city?.id,
                pharmacy_id: info.pharmacy?.id,
            };
            const res = await post(routeConfig.updateProfile + "/" + profile?.id, data, profile?.token);
            if (res && res.status_code == 200) {
                await storeUser(res.data);
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'SUCCESSFULLY',
                    textBody:
                        translate("successUpdated"),
                    button: 'close',
                    autoClose: true,
                    closeOnOverlayTap: false,
                    onHide: () => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Profile' }],
                        });
                    },

                });
            }
        }
    }

    const handlePasswordReset = async () => {
        const { password, confirm_password } = passwordInfo;
        if (isEmpty(password) || password != confirm_password) {

            if (isEmpty(password.trim())) {
                setError({
                    ...error,
                    name: true,
                });
                setMessage(translate('errorPassword'));
                return false;
            }
            if (password != confirm_password) {
                setError({
                    ...error,
                    name: true,
                });
                setMessage(translate('errorConfirmPassword'));
                return false;
            }

        } else {
            const data = {
                ...passwordInfo
            };
            const res = await post(routeConfig.updatePassword, data, profile?.token);
            if (res && res.status_code == 200) {
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: translate('success'),
                    textBody:
                        translate("successUpdated"),
                    button: 'close',
                    autoClose: true,
                    closeOnOverlayTap: false,
                    onHide: () => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Profile' }],
                        });
                    },

                });
            } else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: translate('info'),
                    textBody:
                        translate('error'),
                    autoClose: true,
                    closeOnOverlayTap: true,
                    button: 'close',

                });
            }
        }
    }

    const handleSubmit = async () => {

        setLoading(true);
        try {
            if (reset) {
                await handlePasswordReset()
            } else {
                await handleUpdate();
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);

        }
    };

    return (
        <Layout
            snackDismiss={onDismiss}
            appbar bottomBar navigation={navigation} refresh={loadData} snackTitle={message}
            snackVisable={!isEmpty(message)}>
            <View style={{ height: scaledHeight, position: 'relative' }}>
                <View style={[Styles.flexColumnStart, { marginVertical: 10 }]}>
                    <CustomCard
                        title="Personal Information"
                        subtitle="Profile"
                        loading={loading}
                        style={{ paddingVertical: 0, borderWidth: 1 }}
                        action={{
                            title: translate('update'),
                            action: handleSubmit,
                            color: Colors.white,
                            type: 'contained',
                            style: { width: 150, borderWidth: 2, borderColor: Colors.primary },
                        }}
                        additional_action={[
                            !reset ? {
                                title: translate('reset_password'),
                                action: handleAction,
                                color: Colors.white,
                                type: 'contained',
                                style: { backgroundColor: Colors.primary, borderWidth: 2, borderColor: Colors.primary, minWidth: 150 },
                            } : {
                                title: translate('profile'),
                                action: handleAction,
                                color: Colors.white,
                                type: 'contained',
                                style: { backgroundColor: Colors.primary, borderWidth: 2, borderColor: Colors.primary, minWidth: 150 },
                            },
                        ]}>
                        {loading ? (
                            <View>
                                <ActivityIndicator size={40} color={Colors.secondary} />
                            </View>
                        ) : (
                            <View style={[Styles.flexColumn, { flexDirection: 'row', gap: scaledFontSize(20), marginTop: 20 }]}>
                                <View style={{ ...Styles.flexColumn, gap: 3 }}>
                                    {reset ? <View style={Styles.flexColumn}>
                                        <CustomInputField
                                            label="Password"
                                            param="password"
                                            required
                                            password
                                            // right={<TextInput.Icon icon="eye" />}
                                            value={passwordInfo?.password}
                                            action={handlePasswordInfoChange}
                                            placeholder="Enter your Password"
                                        />
                                        <CustomInputField
                                            label="Confirm Password"
                                            param="confirm_password"
                                            required
                                            password
                                            // right={<TextInput.Icon icon="eye" />}
                                            value={passwordInfo?.confirm_password}
                                            action={handlePasswordInfoChange}
                                            placeholder="Enter your Password again"
                                        />
                                    </View> :
                                        <View style={Styles.flexColumn}>
                                            <CustomInputField
                                                label="Name"
                                                param="name"
                                                required
                                                value={info?.name}
                                                action={handleChange}
                                                error={error?.name}
                                                placeholder="Enter your Full Name"
                                            />
                                            <CustomInputField
                                                label="Email Address"
                                                param="email"
                                                required
                                                value={info?.email}
                                                action={handleChange}
                                                error={error?.email}
                                                placeholder="Enter your Email Address"
                                            />
                                            <CustomInputField
                                                label="Phone Number"
                                                param="phone"
                                                required
                                                left={<TextInput.Affix textStyle={{ justifyContent: 'center', flex: 1, }} text="+20" />}
                                                value={info.phone}
                                                action={handleChange}
                                                error={error?.phone}
                                                placeholder="Enter your Phone Number"
                                            />
                                            <AutoComplete
                                                url={routeConfig.cities}
                                                title="city"
                                                value={info.city}
                                                handleChange={handleCityChange}
                                            />
                                            {info.city ? (
                                                <AutoComplete
                                                    url={routeConfig.pharmacies + '/' + info.city.id}
                                                    value={info.pharmacy}
                                                    title="pharmacy"
                                                    handleChange={handleChange}
                                                />
                                            ) : null}
                                        </View>}
                                </View>
                            </View>
                        )}

                    </CustomCard>
                </View>
            </View>
        </Layout >
    );
}

export default EditProfileScreen;
