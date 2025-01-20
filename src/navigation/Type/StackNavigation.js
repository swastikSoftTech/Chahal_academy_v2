import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AboutUs from '../../screens/aboutUs';
import Blogs from '../../screens/blogs';
import BlogDetail from '../../screens/blogsDetail';
import MaterialStore from '../../screens/materialStore';
import ProductDetail from '../../screens/productDetail';
import TermsAndCondition from '../../screens/termsAndCondition';
import {
  SCREEN_MATERIAL_STORE,
  SCREEN_PRODUCT_DETAIL,
  SCREEN_TEST_SERIES_FOLDER,
  SCREEN_TEST_SERIES_RESULT,
} from '../../utils/constants';
import DrawerScreen from '../Drawer';
import {StackNav} from '../NavigationKeys';
import {StackRoute} from '../NavigationRoutes';
import AuthStack from './AuthStack';
import TestSeriesFolder from '../../screens/testSeriesFolder';
import TestSeriesResult from '../../screens/testSeriesResult';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <DrawerScreen>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName={StackNav.TabBar}>
        {/* <Stack.Screen name={StackNav.Splash} component={StackRoute.Splash} /> */}
        <Stack.Screen
          name={StackNav.OnBoarding}
          component={StackRoute.OnBoarding}
        />
        <Stack.Screen name={StackNav.Auth} component={AuthStack} />
        {/* <Stack.Screen name={'Drawer'} component={DrawerScreen} /> */}
        <Stack.Screen name={StackNav.TabBar} component={StackRoute.TabBar} />
        <Stack.Screen name={SCREEN_PRODUCT_DETAIL} component={ProductDetail} />
        <Stack.Screen name={'AboutUs'} component={AboutUs} />
        <Stack.Screen
          name={'TermsAndCondition'}
          component={TermsAndCondition}
        />
        <Stack.Screen name={'Blogs'} component={Blogs} />
        <Stack.Screen name={'BlogDetail'} component={BlogDetail} />
        <Stack.Screen name={SCREEN_MATERIAL_STORE} component={MaterialStore} />
        <Stack.Screen
          name={StackNav.Categories}
          component={StackRoute.Categories}
        />
        <Stack.Screen name={StackNav.Courses} component={StackRoute.Courses} />
        <Stack.Screen
          name={StackNav.Notification}
          component={StackRoute.Notification}
        />
        <Stack.Screen name={StackNav.Filter} component={StackRoute.Filter} />
        <Stack.Screen
          name={StackNav.CourseDetail}
          component={StackRoute.CourseDetail}
        />
        <Stack.Screen
          name={StackNav.EnrollCourse}
          component={StackRoute.EnrollCourse}
        />
        <Stack.Screen
          name={StackNav.PaymentSuccess}
          component={StackRoute.PaymentSuccess}
        />
        <Stack.Screen
          name={StackNav.AddNewCard}
          component={StackRoute.AddNewCard}
        />
        <Stack.Screen
          name={StackNav.MyLearning}
          component={StackRoute.MyLearning}
        />
        <Stack.Screen
          name={StackNav.RateCourse}
          component={StackRoute.RateCourse}
        />
        <Stack.Screen
          name={StackNav.SubjectVideos}
          component={StackRoute.SubjectVideos}
        />
        <Stack.Screen
          name={StackNav.TestCard}
          component={StackRoute.TestCard}
        />
        <Stack.Screen
          name={StackNav.SingleResult}
          component={StackRoute.SingleResult}
        />
        <Stack.Screen
          name={StackNav.MultiSubjectResult}
          component={StackRoute.MultiSubjectResult}
        />
        <Stack.Screen name={StackNav.Results} component={StackRoute.Results} />
        <Stack.Screen
          name={StackNav.StartTest}
          component={StackRoute.StartTest}
        />
        <Stack.Screen
          name={StackNav.ShowTestModule}
          component={StackRoute.ShowTestModule}
        />
        <Stack.Screen
          name={StackNav.CourseCategory}
          component={StackRoute.CourseCategory}
        />
        <Stack.Screen
          name={StackNav.CourseCategoryDetailScreen}
          component={StackRoute.CourseCategoryDetailScreen}
        />
        <Stack.Screen
          name={StackNav.CourseCat}
          component={StackRoute.CourseCat}
        />

        <Stack.Screen
          name={StackNav.CurrentAffairCategory}
          component={StackRoute.CurrentAffairCategory}
        />
        <Stack.Screen
          name={StackNav.CurrentAffairListing}
          component={StackRoute.CurrentAffairListing}
        />
        <Stack.Screen
          name={StackNav.CurrentAffairDetail}
          component={StackRoute.CurrentAffairDetail}
        />
        <Stack.Screen
          name={StackNav.SelectionScreen}
          component={StackRoute.SelectionScreen}
        />
        <Stack.Screen
          name={StackNav.BasicInfo}
          component={StackRoute.BasicInfo}
        />
        <Stack.Screen
          name={StackNav.Eligibility}
          component={StackRoute.Eligibility}
        />
        <Stack.Screen
          name={StackNav.EditProfile}
          component={StackRoute.EditProfile}
        />
        <Stack.Screen
          name={StackNav.MySubscription}
          component={StackRoute.MySubscription}
        />
        <Stack.Screen name={StackNav.Chat} component={StackRoute.Chat} />
        <Stack.Screen
          name={StackNav.TopperJourney}
          component={StackRoute.TopperJourney}
        />
        <Stack.Screen
          name={StackNav.PreparationStrategy}
          component={StackRoute.PreparationStrategy}
        />
        <Stack.Screen
          name={StackNav.UPSCExamDetails}
          component={StackRoute.UPSCExamDetails}
        />
        <Stack.Screen
          name={StackNav.UPSC_CSE}
          component={StackRoute.UPSC_CSE}
        />
        <Stack.Screen
          name={StackNav.Admission}
          component={StackRoute.Admission}
        />
        <Stack.Screen
          name={StackNav.Dashboard}
          component={StackRoute.Dashboard}
        />
        <Stack.Screen
          name={StackNav.ShowSubTextModules}
          component={StackRoute.ShowSubTextModules}
        />
        <Stack.Screen
          name={StackNav.MyInvoice}
          component={StackRoute.MyInvoice}
        />
        <Stack.Screen name={StackNav.Payment} component={StackRoute.Payment} />
        <Stack.Screen
          name={StackNav.TargetTab}
          component={StackRoute.TargetTab}
        />
        <Stack.Screen
          name={StackNav.MagazinesCategory}
          component={StackRoute.MagazinesCategory}
        />
        <Stack.Screen
          name={StackNav.Magazines}
          component={StackRoute.Magazines}
        />
        {/* <Stack.Screen name={StackNav.PdfView} component={StackRoute.PdfView} /> */}
        <Stack.Screen
          name={StackNav.AnswerWriting}
          component={StackRoute.AnswerWriting}
        />
        <Stack.Screen
          name={StackNav.QuizeParticiaption}
          component={StackRoute.QuizeParticiaption}
        />
        <Stack.Screen
          name={StackNav.WebViewScreen}
          component={StackRoute.WebViewScreen}
        />
        <Stack.Screen
          name={StackNav.TestSeries}
          component={StackRoute.TestSeries}
        />
        <Stack.Screen
          name={SCREEN_TEST_SERIES_FOLDER}
          component={TestSeriesFolder}
        />
        <Stack.Screen
          name={SCREEN_TEST_SERIES_RESULT}
          component={TestSeriesResult}
        />
      </Stack.Navigator>
    </DrawerScreen>
  );
}
