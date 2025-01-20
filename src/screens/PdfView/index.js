import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import Header from '../../components/common/header/Header';
import {spacing} from '../../styles/spacing';

const PdfView = ({route}) => {
  const {params} = route;
  const {pdfUrl, title} = params;
  console.log('pdfUrl >>', pdfUrl);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Header title={title} />
      <Pdf
        trustAllCerts={false}
        source={{
          uri: pdfUrl,
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
      {/* <WebView source={{uri: url}} style={{flex: 1}} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: spacing.FULL_WIDTH,
    height: spacing.FULL_HEIGHT,
  },
});
export default PdfView;
