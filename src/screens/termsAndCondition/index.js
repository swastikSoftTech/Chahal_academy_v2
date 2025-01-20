import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../components/common/header/Header';
import colors from '../../styles/colors';
import Title from '../../components/common/text/Title';
import RegularText from '../../components/common/text/RegularText';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {spacing} from '../../styles/spacing';

const TermsAndCondition = () => {
  return (
    <View style={styles.mainContainer}>
      <Header title={'Terms And Conditon'} />
      <ScrollView style={styles.contentContainer}>
        <Title title={'Privacy Policy'} style={styles.title} />
        <RegularText style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
        <Title
          style={styles.title}
          title={'Usage and retension of informaton'}
        />
        <RegularText style={styles.desc}>
          Lorem ipsum Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
        <Title style={styles.title} title={'Cookies'} />
        <RegularText style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
        <Title
          style={styles.title}
          title={'Sharing and closing personal information'}
        />
        <RegularText style={styles.desc}>
          Lorem ipsum Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
        <Title style={styles.title} title={'Information Security'} />
        <RegularText style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
        <Title title={'Privacy Policy'} style={styles.title} />
        <RegularText style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
        <Title
          style={styles.title}
          title={'Usage and retension of informaton'}
        />
        <RegularText style={styles.desc}>
          Lorem ipsum Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
        <Title style={styles.title} title={'Cookies'} />
        <RegularText style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
        <Title
          style={styles.title}
          title={'Sharing and closing personal information'}
        />
        <RegularText style={styles.desc}>
          Lorem ipsum Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
        <Title style={styles.title} title={'Information Security'} />
        <RegularText style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
  contentContainer: {
    paddingHorizontal: APP_PADDING_HORIZONTAL,
  },
  title: {
    // fontSize: textScale()
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    marginTop: spacing.MARGIN_12,
  },
  desc: {
    marginBottom: spacing.MARGIN_12,
  },
});

export default TermsAndCondition;
