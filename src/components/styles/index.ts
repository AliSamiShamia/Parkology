import { Dimensions, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../constant/color';

const { width, height } = Dimensions.get('screen');
const Styles = StyleSheet.create({
  // Common Style

  main: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  center: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  backgroundImageContainer: {
    // flexDirection: 'row',
    paddingVertical: 0,
    // width: width,
  },

  // Space Style
  space: {
    marginVertical: 15,
  },
  space5: {
    marginVertical: '5%',
  },
  space3: {
    marginVertical: '3%',
  },
  space8: {
    marginVertical: '8%',
  },
  space10: {
    marginVertical: '10%',
  },
  space20: {
    marginVertical: '20%',
  },

  space30: {
    marginVertical: '30%',
  },
  space40: {
    marginVertical: '40%',
  },
  marginTop20: {
    marginTop: '20%',
  },
  marginTop10: {
    marginTop: '10%',
  },
  marginBottom20: {
    marginBottom: '20%',
  },
  marginBottom10: {
    marginBottom: '10%',
  },

  // Image Style

  logo: {
    resizeMode: 'contain',
  },
  banner: {
    width: width,
    height: 100,
    resizeMode: 'contain',
  },

  videoBanner: {
    width: width,
    height: 200,
    resizeMode: 'contain',
  },

  appbar: {
    position: 'absolute',
    width: width,

    paddingBottom: 14,
    flex: 1,
    alignItems: 'center',
    zIndex: 100,
    alignContent: 'center',
  },
  appbarSpace: {
    marginTop: height * 0.18,
  },
  icons: {
    paddingHorizontal: 20,
    width: width,
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: Colors.white,
    padding: 2,
    elevation: 3,
    width: 50,
    height: 50,
    maxWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  uploadCard: {
    borderWidth: 4,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dotted',
    borderColor: Colors.secondary,
    width: width * 0.7,
    minHeight: 100,
    backgroundColor: Colors.grey,
    borderRadius: 20,
    elevation: 10,
  },
  replaceIcon: {
    position: 'absolute',
    top: -15,
    right: -15,
    elevation: 20,
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    zIndex: 20,
  },
  // flex Style
  flexColumn: {
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  flexRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  flexRowEnd: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    width: '100%',
  },
  flexSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flexSpaceEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  flexColumnSpaceBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  flexColumnSpaceEvenly: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  flexColumnStart: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  // Card Style
  item: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  roundItem: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: Colors.grey,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    borderRadius: 100,
    backgroundColor: Colors.white,
  },
  slide: {
    borderWidth: 1,
    borderColor: Colors.grey,
    elevation: 8,
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  card: {
    // flex: 1,
    // width: width * 0.9,
    paddingHorizontal: 10,
    paddingVertical: 40,
    maxWidth: 600,
    marginHorizontal: width * .1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  //User Type Card Style
  typeCard: {
    width: 90, // Adjust according to your preference
    height: 90, // Adjust according to your preference
    margin: 5,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  // Input Style
  field: {
    backgroundColor: Colors.transparent,
    height: 40,
    // color: Colors.placeholder,
  },

  // Button Style
  fixedButton: {
    backgroundColor: Colors.primary, // Button background color
    padding: 10,
    flex: 1,
    borderRadius: 5,
    width: 200,
  },

  submit: {
    marginVertical: 10,
    width: 120,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // flex: 1,
  },
  btnText: {
    color: Colors.white,
    fontWeight: 'bold',
    // fontSize: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  text: {
    color: Colors.white,
    fontSize: 12,
  },
  boldText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  darkBoldText: {
    color: Colors.dark,
    fontWeight: 'bold',
  },
  primaryBoldText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },

  secondrayBoldText: {
    color: Colors.secondary,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },

  darkText: {
    color: Colors.dark,
    fontSize: 12,
  },

  // Map Style
  map: {
    alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
  },
  mapLevels: {
    width: width * 0.7,
    flexWrap: 'wrap',
    // transform: [{scaleX: -1}],

    flexDirection: 'row-reverse',
    // alignItems: 'flex-start', // Align items from the left
    // justifyContent: 'flex-end',
    marginVertical: height * 0.03,
    paddingRight: width * 0.03,
  },
  level: {
    width: '33.3%',
  },
  image: {
    position: 'absolute',
    top: -30,
    left: -5,
    zIndex: 200,
    width: width * 0.1,
    height: width * 0.12,
  },

  // Score Style
  score: {
    paddingHorizontal: 20,
  },
  // Quiz Style

  quiz: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingHorizontal: '10%',
  },
  quizTitle: {
    fontSize: 20,
    color: Colors.white,
    // marginBottom: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answer: {
    backgroundColor: Colors.white,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backgroundVideo: {
    width: width,
  },
  chooseAvatar: {
    flex: 1, backgroundColor: Colors.placeholder,
    position: 'absolute', top: 0, left: 0,
    right: 0, zIndex: 10,
    width: width,
    height: height
  },
  avatarBg: {
    height: height * .5,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
    // maxHeight: 400,
  },
  Avatar: {
    width: 100,
    height: 100
  }
});



export default Styles;
