import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Linking, StyleSheet, View} from 'react-native';
import axios from '../../api/axios';
import Header from '../../components/common/header/Header';
import RegularText from '../../components/common/text/RegularText';
import MagazineList from '../../components/module/MagazineList';
import {StackNav} from '../../navigation/NavigationKeys';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {getMagazineApiUrl} from '../../utils/commonFunction';

const Magazines = ({route}) => {
  const navigation = useNavigation();
  const {params} = route;
  const {magazineCategoryData} = params;

  const [activeTab, setActiveTab] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [magazineData, setMagazineData] = useState();

  useEffect(() => {
    getMagazineData();
  }, []);

  async function getMagazineData() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${getMagazineApiUrl(magazineCategoryData.type)}`,
      );

      if (response?.data) {
        // console.log('response>>', response);
        setMagazineData(response?.data);
      }
    } catch (error) {
      console.log('Something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  }
  function onPressMazine(item) {
    // const params = {
    //   pdfUrl: magazineData.domain + `/` + item?.file,
    //   title: magazineCategoryData.name,
    // };
    Linking.openURL(magazineData.domain + `/` + item?.file);
    // navigation.navigate(StackNav.PdfView, params);
  }

  return (
    <View style={styles.mainContainer}>
      <Header title={magazineCategoryData?.name} showMenu />

      <View style={styles.tabParentContainer}>
        <View style={styles.topTabContainer}>
          <RegularText
            onPress={() => {
              setActiveTab(true);
            }}
            style={[
              styles.tabText,
              activeTab && {
                color: colors.white,
                backgroundColor: colors.theme,
              },
              {
                borderTopRightRadius: spacing.RADIUS_8,
                borderBottomRightRadius: spacing.RADIUS_8,
              },
            ]}>
            English
          </RegularText>
          <RegularText
            onPress={() => {
              setActiveTab(false);
            }}
            style={[
              styles.tabText,
              !activeTab && {
                color: colors.white,
                backgroundColor: colors.theme,
              },
              {
                borderTopLeftRadius: spacing.RADIUS_8,
                borderBottomLeftRadius: spacing.RADIUS_8,
              },
            ]}>
            Hindi
          </RegularText>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: spacing.MARGIN_16}}
          color={colors.theme}
        />
      ) : (
        <View style={styles.seconderyContainer}>
          <MagazineList
            data={activeTab ? magazineData?.eng : magazineData?.hindi}
            onPressMazine={onPressMazine}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  seconderyContainer: {
    flex: 1,
    marginTop: spacing.MARGIN_20,
  },
  tabParentContainer: {
    marginTop: spacing.MARGIN_16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTabContainer: {
    ...commonStyle.flexDirectionRow,
    backgroundColor: colors.white,
    borderRadius: spacing.RADIUS_8,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  tabText: {
    fontSize: textScale(13),
    textAlign: 'center',
    paddingVertical: spacing.PADDING_8,
    minWidth: spacing.WIDTH_94,
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    color: colors.black,
    backgroundColor: colors.white,
  },
});

export default Magazines;
