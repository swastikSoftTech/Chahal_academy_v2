import React from 'react';
import RegularText from './RegularText';
import {textScale} from '../../../styles/responsiveStyles';
import {fontNames} from '../../../styles/typography';

const Title = ({title, style, numberOfLines}) => {
  return (
    <RegularText
      style={[
        {fontSize: textScale(16), fontFamily: fontNames.FONT_PRIMARY_BOLD},
        style,
      ]}
      numberOfLines={numberOfLines}>
      {title}
    </RegularText>
  );
};

export default Title;
