import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../components/common/header/Header';
import RegularText from '../../components/common/text/RegularText';
import Title from '../../components/common/text/Title';
import colors from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';

const ABOUT_US_DATA = [
  {
    // title: 'About Us',
    desc: `Chahal Academy is India's one of the premier and fastest-growing coaching institute for Civil Services Examination which is a nationwide competitive examination for recruitment to various Civil Services of the Government of India, including the Indian Administrative Service(IAS), Indian Forest Service(IFS), and Indian Police Service(IPS).

We at Chahal Academy, provide specialized classroom courses and distance learning programs for Indian Civil Services Exams. We thrive to bring out the best in you by creating an environment which helps you in developing your ability to master the complexities involved in the examination and its pattern by providing easy to understand and innovative analysis of previous years exams which would ultimately help you to climb the ladder of success and hence it is the ULTIMATE place to learn and grow.

''The best preparation for tomorrow is doing your best today''- H. Jackson Brown Jr

Being prepared in advance for tomorrow is what we believe in and this is the need of the hour. At Chahal Academy, we provide long and purposive practice and feed in the essential ingredients of the "I CAN" factor in the students to ensure that whatever they have learned gives a fruitful result.

The Faculty at Chahal Academy is composed of experienced teachers, a dedicated team for developing content for the students and a well supportive and competent administrative staff. With many years of experience in teaching UPSC candidates, we have helped hundreds of students in cracking various examinations and services.

With facilities such as flexible online and offline courses, along with All India Test Series(NCERT, Current Affairs, and General Studies), study material, Infographics, Current Affairs Magazines, valuable materials, answer writing practices, trend analysis and 24/7 assistance to students, we are helping our students to get exactly what they require for the examination. Our willingness and effort to go for the extra mile to help students have received remarkable appreciation and has made Chahal Academy India's Fastest Growing Civil Services Coaching Institute and Gujarat's Civil Services Coaching Institute.
`,
  },
  {
    title: 'Our Vision',
    desc: `“You can’t cross the sea merely by standing and staring at the water.” – Tagore

Our main aim is to guide the motivated young minds to a better career and towards a successful professional life. In pursuit of excellence, we are dedicated to the success of every student in our academy..

Join us for one year and we promise you a bright prospect because we here at CHAHAL ACADEMY groom you for all the three stages of the examination i.e. Preliminary exam, Mains exam and interview stage.

If you are reading this and if you are an aspiring, self-motivated candidate who is looking for a successful career, you must understand our vision is not only to prepare you for an examination which is highly competitive and challenging but also to create an effective and qualified administrative workforce for the country which in future will work for the welfare and betterment of our Society.
`,
  },
  {
    title: 'Thoughts',
    desc: `FROM AMBITION TO ASPIRATION, FROM ACQUIRING TO BECOMING

Our experienced faculty has designed the curriculum carefully to directly meet the demands of the examinations. We constantly keep changing our approach as per the changing trends of the examination and accordingly develop suitable content and infographics to effectively bring down the workload on the students greatly and allows them to rely on highly competent and tailor-made guidance, the success story of our students is a testimony to our excellence in this field.
`,
  },
  {
    title: 'Our Missions',
    desc: `FROM AMBITION TO ASPIRATION, FROM ACQUIRING TO BECOMING

Gone are the days when Delhi used to be a benchmark place for the preparation of Civil Services. Chahal Academy is dedicated to creating a better if not the same environment in all of its branches running across 18 cities in India. From our Faculty to our study material, everything is of the highest quality and provides in-depth knowledge on every subject of the syllabus.

One must understand the very basic fact that the Civil Service Examination differs from the university type examinations, the time and technique required to prepare for the university examinations is less and simple, however, a candidate preparing for the Civil Services Examination does not have much time at his/her disposal and the amount of tasks to be disposed of within this short period is truly enormous.

It will be extremely unrealistic to think that one can prepare for this examination within a short time entirely on one's own. Therefore, the technique involved in preparation has to suit the specific needs of this examination. Understanding the enormity of this challenge, CHAHAL ACADEMY emphasizes an approach that is totally in tune with the requirements of this 
`,
  },
];

const FAQ_DATA = [
  {
    question: 'I want to know about CHAHAL ACADEMY?',
    answer: `CHAHAL ACADEMY came into existence in 2011 to impart quality education to the students preparing for Civil Services Examination. At present we have branches in Ahmedabad, Vadodara, Anand and Surat. With an experience of many years and also after sending a great number of students into various prestigious services, the institute can proudly claim to be the most dependable institute for complete foundation programme. CHAHAL ACADEMY is known for its experienced faculty, comprehensive coverage, passionate classes, frequent tests, elaborate explanation, excellent study material and its emphasis on personal attention. With a batch size of only 20-30 students, we are able to focus on each student and nurture the best out of them. Moreover with a team of 8-12 experienced faculties under the guidance of Mr. Sumesh Chahal, we finish systematically the entire Prelims and Mains syllabus with a clear timeline. Faculties are very senior and experienced. We renew our reputation on a continuous basis with greater standards year after year. Our material is the best and every year up to date. Our style is simple, effective and formalistic. Our substance is in-depth and relevant.`,
  },
  {
    question: 'What are the courses offered in CHAHAL ACADEMY?',
    answer: `: CHAHAL ACADEMY focuses entirely on complete foundation course so as to provide students a one point solution at every step of this exam. Along with the foundation course we also integrate the preparation of Essay and conduct of TEST SERIES in this to evaluate students. We offer following courses : 1. GS Prelim-cum-Mains (with CSAT): Covers Prelims Papers I and II as well as the Four Papers of Mains and ESSAY. It takes a time span of 8-9 months. 2. GS Prelim-cum-Mains(without CSAT): Covers Prelims Papers I as well as the Four Papers of Mains and ESSAY. It takes a time span of around 7-8 months. 3. CSAT only: It covers the 2nd paper of preliminary exam. It takes a time span of 2-3 months. 4. PRELIMS ONLY ( GS + CSAT) It covers both papers GS + CSAT. It takes a span of 5 months. 5. Optional Test Series We provide Optional Test Series in following optional subjects : SOCIOLOGY-PUBLIC ADMINSTRATION-ECONOMICS-GEOGRAPHY-HISTORY. 6. GS Mains Test Series: Comprehensive Test series for all four papers of General Studies Mains Examination . 7. GS Prelims Test Series: Usually Starts in between November to January and continues till the date of preliminary examination. 8. Interview: Classes are held for all the candidates with special focus on analysis on DAF form and comprehensive coverage on social, political and economic issues apart from personality development. Course starts after the declaration of Mains result. After classes a number of mock interviews are being conducted to prepare students for the final step of the three tier process.`,
  },
  {
    question: 'How do you describe standard 2-hour CHAHAL ACADEMY?',
    answer: `A standard 2 hours class of CHAHAL ACADEMY is centered on basics. Strives to make the concept clear. Explains with examples. Proper class notes are provided so that students maintain a daily writing habit. it is also enriched with the debates going in contemporary along with newspaper relevant issues. Recent articles associated with the topics going on are provided in the class.No dictation is given, only discussion is conducted in the class. Materials are provided in printed, soft copy and handwritten form. Most of the institution provides class dictation which consume 50% of the course time period. Hence, our 6 months course is equivalent to 12 months course of other institutions. This is the reason, why most of the coaching do not cover full course in the session. However, we cover entire course with due conceptual clarity.`,
  },
  {
    question:
      'What are my chances of getting into services, if I join Chahal Academy?',
    answer: `Your chances are the best provided the right strategy is adopted. If you are regular for all classes; read the study material; attend the examinations; come prepared to the class; be ready to take the class room discussions forward with your own readings; write answers and get them corrected, your chances are the brightest.`,
  },
  {
    question: 'What will be the schedule of the classes?',
    answer: `For regular students , Classes are held daily for 2 hours. After the faculty lectures, students have the option of raising queries either privately or among the students. Students benefit immensely from our Faculty members as they are experienced and knowledgeable. The time table for the entire month is given at the beginning of the month. For weekend students / working professionals - classes will vary from 8-12 hrs on Saturdays and Sundays.`,
  },
  {
    question:
      'Who are the faculty members for teaching IAS-UPSC programme at CHAHAL ACADEMY?',
    answer: `Led by our Director, Mr. SumeshChahal, CHAHAL ACADEMY today attracts some of the finest educators from premier universities and research institutions. Many of our faculty members are drawn from Delhi University and renowned institutions and all those who have UPSC exposure and faced interview two or three times. Also serving officers do come for guest lectures. These committed educators are widely acclaimed for their: ïƒ˜ Deep insight in the subject ïƒ˜ Interdisciplinary approach towards the subject ïƒ˜ Unique teaching methodology focused at lucid explanation of key concepts and developing an analytical understanding ïƒ˜ Above all for producing results at the IAS Examinations over the years`,
  },
  {
    question:
      'Do you provide any national level test series for IAS-UPSC Exam preparation?',
    answer: `Yes, we are honored to be provides test series for Prelims, Mains as well as optional subject.`,
  },
  {
    question: 'Do you provide any library facility?',
    answer: `Yes, we have a well-stocked library and students can also issue books as per their requirements OR those who wish to study at our office can do so in our library during office time.`,
  },
];

const AboutUs = () => {
  return (
    <View style={styles.mainContainer}>
      <Header title={'About Us'} />
      <ScrollView style={styles.contentContainer}>
        {/* <YoutubeVideoPlayer
          containerStyle={styles.ytPlayerStyle}
          videoId={'rN5l0eXNcuU'}
          autoPlay={false}
        /> */}

        {ABOUT_US_DATA.map((data, index) => {
          return (
            <View
              key={data.title}
              style={{
                marginTop: index === 0 ? spacing.MARGIN_16 : 0,
                marginBottom: spacing.MARGIN_16,
              }}>
              {data?.title && <Title title={data.title} style={styles.title} />}
              <RegularText>{data.desc}</RegularText>
            </View>
          );
        })}
        <Title
          title={`FAQ's About Institute`}
          style={{...styles.title, textAlign: 'center'}}
        />
        {FAQ_DATA.map(data => {
          return (
            <View key={data.question} style={{marginBottom: spacing.MARGIN_16}}>
              {data?.question && (
                <Title
                  title={data.question}
                  style={{...styles.title, color: colors.grey900}}
                />
              )}
              <RegularText>{data.answer}</RegularText>
            </View>
          );
        })}
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
  ytPlayerStyle: {
    marginTop: spacing.MARGIN_16,
  },
  title: {
    // fontSize: textScale()
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    color: colors.theme,
    // marginTop: spacing.MARGIN_12,
  },
});

export default AboutUs;
