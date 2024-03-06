import { scaledFontSize } from '@/components/functions';
import Styles from '@/components/styles';
import { UserAvatar } from '@/components/types';
import { Colors } from '@/constant/color';
import { routeConfig } from '@/constant/route';
import { post } from '@/data/api.handler';
import { getUser, storeUser } from '@/data/store.data';
import { setUser, updateAvatar } from '@/store/user';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window')
const baseHeight = 800; // Height on which the font size is designed
const baseWidth = 400; // Height on which the font size is designed

function ChooseAvatar() {

    const [loading, setLoading] = useState(false);
    const scaleFactor = height / baseHeight;
    const scaledHeight = baseHeight * scaleFactor;
    const scaledWidth = baseWidth * scaleFactor;
    const dispatch = useDispatch();

    const handleChoose = async (avatar: UserAvatar) => {
        try {
            setLoading(true)
            const user = await getUser();

            const res = await post(routeConfig.avatar, {
                avatar: avatar
            }, user?.token);
            if (res && res.status_code == 200) {
                storeUser(res.data)
                dispatch(updateAvatar(avatar))
            }
            setLoading(false)
        }
        catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    useEffect(() => {

    }, []);

    return (
        <View style={[Styles.chooseAvatar, Styles.center]}>
            <ImageBackground source={require('@assets/images/quiz_bg.png')} style={[Styles.avatarBg, {
                width: scaledWidth * .8,
                height: scaledHeight * .5,
                paddingHorizontal: scaledWidth * .08,

            }]} resizeMode='contain' >
                <View style={[Styles.flexColumn, { gap: 20, paddingHorizontal: 20 }]}>
                    <Text style={[Styles.boldText, { textAlign: 'center', color: Colors.secondary, fontSize: scaledFontSize(16) }]}>Welcome</Text>
                    <Text style={[Styles.text, { fontSize: scaledFontSize(12) }]}>Welcome to Parkology!
                        Take on the daily challenge to test your knowledge.
                        Earn points for each correct answer, with 5 points awarded for a correct answer on your first try, 3 points for a correct answer on your second try, and 1 point for a correct answer on your third try.
                        Collect enough points to redeem them for prizes.
                        We hope you enjoy Parkology</Text>
                    {loading ? <View>
                        <ActivityIndicator size={40} color={Colors.secondary} />
                    </View> : <View style={[{ gap: 10 }]}>
                        <Text style={[Styles.boldText, { textAlign: 'center', color: Colors.white, fontSize: scaledFontSize(12) }]}>Choose your avatar</Text>
                        <View style={[Styles.flexRow, { justifyContent: 'space-around' }]}>
                            <TouchableOpacity onPress={() => { handleChoose('female') }}>
                                <Image source={require('@assets/images/female.png')} style={[Styles.Avatar, { width: scaledFontSize(100), height: scaledFontSize(100) }]} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { handleChoose('male') }}>
                                <Image source={require('@assets/images/male.png')} style={[Styles.Avatar, { width: scaledFontSize(100), height: scaledFontSize(100) }]} />
                            </TouchableOpacity>
                        </View>
                    </View>}
                </View>
            </ImageBackground>
        </View>
    );
}

export default ChooseAvatar;