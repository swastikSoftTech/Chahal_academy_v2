// // Tab Routes
import HomeTab from '../containers/tabbar/home/HomeTab';
import ProfileTab from '../containers/tabbar/profile/ProfileTab';
import TargetTab from '../containers/tabbar/Target/TargetTab';
import SearchTab from '../containers/tabbar/search/SearchTab';
import AllCourses from '../containers/tabbar/courses/AllCourses';
import CourseList from '../containers/tabbar/reel/CourseList';
// import TestSeries from '../containers/tabbar/testSeries/TestSeries';

import ZoomTab from '../containers/tabbar/Zoom/ZoomTab';

// // Screens Route
import Splash from '../containers/auth/Splash';
import OnBoarding from '../containers/OnBoarding';
import Login from '../containers/auth/Login';
import SignUp from '../containers/auth/SignUp';
import ForgotPassword from '../containers/auth/ForgotPassword';
import PasswordReset from '../containers/auth/PasswordReset';
import Otpverify from '../containers/auth/Otpverify';
import CreatePassword from '../containers/auth/CreatePassword';
import Success from '../containers/auth/Success';
import TabBar from './Type/TabBarNavigation';
import Categories from '../containers/tabbar/home/screens/Categories';
import Courses from '../containers/tabbar/home/screens/Courses';
import Notification from '../containers/tabbar/home/screens/Notification';
import Filter from '../containers/tabbar/search/Filter';
import CourseDetail from '../containers/tabbar/search/courses/CourseDetail';
import EnrollCourse from '../containers/tabbar/search/courses/EnrollCourse';
import PaymentSuccess from '../containers/tabbar/search/courses/PaymentSuccess';
import AddNewCard from '../containers/tabbar/search/courses/AddNewCard';
import MyLearning from '../containers/tabbar/profile/MyLearning/MyLearning';
import RateCourse from '../containers/tabbar/profile/MyLearning/RateCourse';
import SubjectVideos from '../components/CommonComponent/SubjectVideos';
import TestCard from '../containers/tabbar/testSeries/TestCard';
import SingleResult from '../containers/tabbar/testSeries/SingleResult';
import MultiSubjectResult from '../containers/tabbar/testSeries/MultiSubjectResult';
import Results from '../containers/tabbar/testSeries/Results';
import StartTest from '../containers/tabbar/testSeries/StartTestNew';
import ShowTestModule from '../containers/tabbar/testSeries/ShowTestModule';
import ShowSubTextModules from '../containers/tabbar/testSeries/ShowSubTextModules';
import CourseCategory from '../containers/tabbar/home/screens/CourseCategory';
import CourseCategoryDetailScreen from '../containers/tabbar/home/screens/CourseCategoryDetailScreen';
import CourseCat from '../containers/tabbar/home/screens/CourseCat';
import EditProfile from '../containers/tabbar/profile/EditProfile';
import MySubscription from '../containers/tabbar/profile/MySubscription';
import Chat from '../containers/tabbar/profile/Chat';
import CurrentAffairCategory from '../screens/currentAffairCategory';
import UPSC_CSE from '../containers/tabbar/home/screens/UPSC_CSE';
import UPSCExamDetails from '../containers/tabbar/home/screens/UPSCExamDetails';
import Eligibility from '../containers/tabbar/home/StaticScreens/Eligibility';
import PreparationStrategy from '../containers/tabbar/home/screens/PreparationStrategy';
import TopperJourney from '../containers/tabbar/home/screens/TopperJourney';
import BasicInfo from '../containers/tabbar/home/screens/BasicInfo';
import Admission from '../containers/tabbar/home/screens/Admission';
import SelectionScreen from '../containers/tabbar/home/screens/SelectionScreen';
import Dashboard from '../containers/tabbar/home/dashboard';
import MyInvoice from '../containers/tabbar/profile/MyInvoice';
import Payment from '../containers/tabbar/Payment/Payment';
import CurrentAffairListing from '../screens/currentAffairList';
import CurrentAffairDetail from '../screens/currentAffairDetail';
import MagazinesCategory from '../screens/magazinesCategory';
import Magazines from '../screens/magazines';
import AnswerWriting from '../screens/answerWriting.js';
import QuizeParticiaption from '../screens/quizDetail';
import WebViewScreen from '../screens/webView';
import TestSeriesSubjects from '../screens/testSeriesSubject';
import TestSeries from '../screens/testSeries';
Payment;
export const TabRoute = {
  HomeTab,
  TargetTab,
  CourseList,
  SearchTab,
  ProfileTab,
  TestSeriesSubjects,
  ZoomTab,
  AllCourses,
};

export const StackRoute = {
  TestSeries,
  Splash,
  OnBoarding,
  Login,
  SignUp,
  ForgotPassword,
  PasswordReset,
  Otpverify,
  CreatePassword,
  Success,
  TabBar,
  Categories,
  CourseCategoryDetailScreen,
  Courses,
  CourseCategory,
  Notification,
  Filter,
  CourseDetail,
  EnrollCourse,
  PaymentSuccess,
  AddNewCard,
  MyLearning,
  RateCourse,
  SubjectVideos,
  TestCard,
  SingleResult,
  MultiSubjectResult,
  Results,
  StartTest,
  ShowTestModule,
  CourseCat,
  EditProfile,
  MySubscription,
  Chat,
  CurrentAffairCategory,
  CurrentAffairListing,
  CurrentAffairDetail,
  UPSC_CSE,
  UPSCExamDetails,
  Eligibility,
  PreparationStrategy,
  TopperJourney,
  BasicInfo,
  Admission,
  SelectionScreen,
  Dashboard,
  MyInvoice,
  Payment,
  ShowSubTextModules,
  TargetTab,
  MagazinesCategory,
  Magazines,
  AnswerWriting,
  QuizeParticiaption,
  WebViewScreen,
};
