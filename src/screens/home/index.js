import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { customRequest } from '../../api/customRequest';
import HomeHeader from '../../components/common/header/HomeHeader';
import Image from '../../components/common/Image';
import RegularText from '../../components/common/text/RegularText';
import Title from '../../components/common/text/Title';
import CourseCategoryListModal from '../../components/modal/CourseCategoryListModal';
import CourseCategoryList from '../../components/module/CourseCategoryList';
import CourseList from '../../components/module/CoursesList';
import HomeContactUsCard from '../../components/module/HomeContactUsCard';
import ImageCarousal from '../../components/module/ImageCarousal';
import { StackNav, TabNav } from '../../navigation/NavigationKeys';
import { showDrawer } from '../../redux/slices/drawerSlice';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import { boxShadow } from '../../styles/Mixins';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import { APP_PADDING_HORIZONTAL } from '../../themes/commonStyle';
import {
  CURRENT_AFFAIR_CATEGORY_TYPE,
  SCREEN_COURSE_CATEGORY,
  SCREEN_MATERIAL_STORE,
} from '../../utils/constants';
import { ImagePaths } from '../../utils/imagePaths';

const MARGIN_BETWEEN_SECTION = spacing.MARGIN_16;
const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.USER_SLICE);

  const [courseCatgroies, setCourseCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [popularCategory, setPopularCategory] = useState([]);
  const [iasUpscCourses, setIasUpscCourses] = useState([]);
  const [sliders, setSliders] = useState([]);

  const [showCourseCategoriesModal, setShowCourseCategoriesModal] =
    useState(false);

  const FREE_CONTENTS = [
    {
      title: 'Current Affairs',
      icon: ImagePaths.NEWS,
      onPress: () => navigation.navigate(StackNav.CurrentAffairCategory),
    },
    {
      title: 'Daily Quiz',
      icon: ImagePaths.QUESTION_ANSWER,
      onPress: () =>
        navigation.navigate(StackNav.CurrentAffairListing, {
          currentAffairCategory: {
            name: 'Daily Quiz',
            type: CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_QUIZE,
          },
        }),
    },
    {
      title: 'Magazines',
      icon: ImagePaths.MAGAZINE,
      onPress: () => navigation.navigate(StackNav.MagazinesCategory),
    },
    // {
    //   title: 'Books Store',
    //   icon: ImagePaths.STORE,
    //   onPress: () => navigation.navigate(SCREEN_MATERIAL_STORE),
    // },
    {
      title: 'Answer Writing',
      icon: ImagePaths.ANSWER_WRITING,
      onPress: () =>
        navigation.navigate(StackNav.CurrentAffairListing, {
          currentAffairCategory: {
            name: 'Daily Answer Writing',
            type: CURRENT_AFFAIR_CATEGORY_TYPE.ANSWER_WRITING,
          },
        }),
    },
  ];

  useEffect(() => {
    homeCourses();
    // getCourseCategory();
    getPopularCourse();
    getIasUpascCourses();
    getSliderData();
  }, []);

  const homeCourses = () => {
    customRequest('app/home/courses?limit=4', 'GET').then(res => {
      // console.log('HomeCourses', res);
      setCourseCategories(res);
    });
  };
  console.log('popularCategory >>', popularCategory);

  // const getCourseCategory = () => {
  //   customRequest('course-category/show-actives', 'GET').then(res => {
  //     console.log('res >>', res);

  //     setCourses(res);
  //   });
  // };

  const getPopularCourse = () => {
    customRequest('app/home/courses_extra', 'GET').then(res => {
      setPopularCategory(res);
    });
  };

  const getIasUpascCourses = () => {
    customRequest(`course-category/students/course/7`, 'GET').then(res => {
      let courses = res?.message?.data
        .sort((a, b) => {
          if (parseFloat(a.amount) === 0) return -1;
          if (parseFloat(b.amount) === 0) return 1;
          return parseFloat(b.amount) - parseFloat(a.amount);
        })
        .slice(0, 2);
      setIasUpscCourses(courses);
    });
  };

  const getSliderData = () => {
    customRequest('student/slider/image', 'GET').then(res => {
      setSliders(res.map(slide => slide.image));
    });
  };

  const toggleDrawer = () => {
    // setVisibleDrawer(!visibleDrawer);
    dispatch(showDrawer());
  };

  function onPressSeeAllCourseCategory() {
    navigation.navigate(SCREEN_COURSE_CATEGORY);
  }
  function onPressSeeIASCourse(id) {
    navigation.navigate(StackNav.CourseCategory, {
      id: id,
    });
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.contentContainer}>
        <HomeHeader toggleDrawer={toggleDrawer} />
        <ImageCarousal
          dataArray={sliders}
          autoScroll={true}
          mainViewStyle={{
            marginTop: MARGIN_BETWEEN_SECTION,
          }}
        />
        <Title title={'Our Free Initiatives 🔥'} style={styles.title} />
        <View style={styles.freeContentCards}>
          {FREE_CONTENTS.map((content, index) => (
            <FreeContentCard
              key={'FREE_CONTENTS' + index}
              title={content.title}
              icon={content.icon}
              onPress={content.onPress}
            />
          ))}
        </View>

        <View style={[commonStyle.flexDirectionRow]}>
          <Title title={'Popular Courses'} style={styles.title} />
          <TouchableOpacity onPress={onPressSeeAllCourseCategory}>
            <RegularText style={styles.seeAllText}>See All</RegularText>
          </TouchableOpacity>
        </View>
        <CourseCategoryList
          courseCategories={courseCatgroies?.slice(0, 2)}
          from={TabNav.HomeTab}
        />
        <View
          style={styles.categoryBanner_container}>
          <Image
            source={ImagePaths.ON_BOARD_IMAGE_2}
            style={styles.categoryBanner_backgroundImg}
          />

          <RegularText style={styles.categoryBanner_tile}>
            Start Your Exam Journey
          </RegularText>

          <TouchableOpacity
            onPress={() => setShowCourseCategoriesModal(true)}
            style={styles.categoryBanner_selectionContainer}>
            <RegularText style={styles.categoryBanner_selection_title}>
              Select Course category
            </RegularText>
            <Image
              source={ImagePaths.ARROW}
              style={{transform: [{rotate: '90deg'}]}}
            />
          </TouchableOpacity>
        </View>
        <View style={[commonStyle.flexDirectionRow]}>
          <Title title={'IAS/UPSC Courses'} style={styles.title} />
          <TouchableOpacity onPress={() => onPressSeeIASCourse('7')}>
            <RegularText style={styles.seeAllText}>See All</RegularText>
          </TouchableOpacity>
        </View>
        <CourseList courses={iasUpscCourses} from={TabNav.HomeTab} />

        <ImageBackground
          source={ImagePaths.HOME_BANNER_BACKGROUND}
          style={styles.banner}>
          <Image
            source={ImagePaths.HOME_BANNER_BACKGROUND}
            style={styles.banner_background}
            resizeMode={'cover'}
          />
          <Image
            source={ImagePaths.HOME_BANNER_GIRL}
            style={styles.banner_img}
          />
          <View style={{flex: 1, justifyContent: 'center',padding  : spacing.MARGIN_12 }}>
            <RegularText style={styles.bannerSubtitle}>
              The Leader in Online Learning
            </RegularText>
            <RegularText style={styles.bannerTitle}>
              Engaging & Accessible Online Courses For All
            </RegularText>
            <RegularText style={styles.bannerSubtitle}>
              Own your future learning new skills online
            </RegularText>
          </View>
        </ImageBackground>
        {/* <YoutubeVideoPlayer
            containerStyle={styles.ytPlayerStyle}
            videoId={'rN5l0eXNcuU'}
            autoPlay={false}
          /> */}
        {/* <Title title={'Testimonials'} style={styles.title} /> */}
        {/* <TestimonialList /> */}
        <HomeContactUsCard />
      </ScrollView>
      <CourseCategoryListModal
        visible={showCourseCategoriesModal}
        courseCategories={courseCatgroies}
        onRequestClose={() => setShowCourseCategoriesModal(false)}
      />
    </View>
  );
};

const FreeContentCard = ({title, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.freeContentCardConatiner}>
      <Image source={icon} style={styles.freeContentCard_icon} />
      <RegularText style={styles.freeContentCard_title}>{title}</RegularText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
  categoryBanner_container: {
    marginHorizontal: APP_PADDING_HORIZONTAL,
    padding: APP_PADDING_HORIZONTAL,
    backgroundColor: colors.theme,
    borderRadius: spacing.RADIUS_12,
    marginTop: spacing.MARGIN_12,
    overflow: 'hidden',
  },
  categoryBanner_backgroundImg: {
    position: 'absolute',
    width: spacing.WIDTH_188,
    height: spacing.WIDTH_188,
    right: -APP_PADDING_HORIZONTAL,
    top: -APP_PADDING_HORIZONTAL * 3.5,
    borderWidth: 1,
    // bottom: 0,
    // backgroundColor: 'red',
  },
  categoryBanner_tile: {
    fontSize: textScale(20),
    color: colors.white,
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    width: '60%',
  },
  categoryBanner_selectionContainer: {
    backgroundColor: colors.grey200,
    paddingHorizontal: spacing.PADDING_16,
    paddingVertical: spacing.PADDING_12,
    borderRadius: spacing.RADIUS_82,
    ...commonStyle.flexDirectionRow,
  },
  categoryBanner_selection_title: {
    flex: 1,
    fontSize: textScale(13),
  },
  banner: {
    // height: spacing.HEIGHT_136,
    height: spacing.HEIGHT_180,
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2,
    backgroundColor: colors.grey50,
    marginTop: MARGIN_BETWEEN_SECTION,
    borderRadius: spacing.RADIUS_12,
    alignSelf: 'center',
    overflow: 'hidden',
    // paddingHorizontal: spacing.PADDING_12,
  },
  banner_background: {
    position: 'absolute',
    transform: [{rotateX: '180deg'}],
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2,
    height: spacing.HEIGHT_180,
  },
  banner_img: {
    width: spacing.WIDTH_124,
    height: spacing.WIDTH_124,
    position: 'absolute',
    right: '5%',
    top: spacing.MARGIN_12,
  },
  bannerSubtitle: {
    fontSize: textScale(12),
    color: colors.grey700,
    width: '75%',
    marginLeft: spacing.MARGIN_12,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
  },
  bannerTitle: {
    fontSize: textScale(16),
    width: '60%',
    marginLeft: spacing.MARGIN_12,
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
  },
  contentContainer: {
    // paddingHorizontal: APP_PADDING_HORIZONTAL,
  },
  title: {
    marginTop: MARGIN_BETWEEN_SECTION,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    flex: 1,
  },
  freeContentCards: {
    ...commonStyle.flexDirectionRow,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    justifyContent: 'space-between',
  },
  seeAllText: {
    color: colors.theme,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    marginTop: MARGIN_BETWEEN_SECTION,
    // fontss
  },
  ytPlayerStyle: {
    marginHorizontal: APP_PADDING_HORIZONTAL,
    borderRadius: spacing.RADIUS_12,
    marginTop: MARGIN_BETWEEN_SECTION - spacing.MARGIN_12,
    marginBottom: MARGIN_BETWEEN_SECTION,
    // borderWidth: 1,
  },
  freeContentCardConatiner: {
    width: parseInt(
      (spacing.FULL_WIDTH -
        APP_PADDING_HORIZONTAL * 2 -
        spacing.MARGIN_12 * 3) /
        4,
    ),
    backgroundColor: colors.white,
    ...boxShadow(colors.theme),
    alignItems: 'center',
    borderRadius: spacing.RADIUS_8,
    padding: spacing.PADDING_8,
    height: '100%',
    borderWidth: 1,
    borderColor: colors.lightTheme01,
  },
  freeContentCard_icon: {
    width: spacing.WIDTH_30,
    height: spacing.WIDTH_30,
  },
  freeContentCard_title: {
    fontSize: textScale(11),
    marginTop: spacing.MARGIN_4,
    textAlign: 'center',
  },
});

export default Home;
