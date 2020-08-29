import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';

import {
  getFormattedDate,
  calculateDaysArray,
  availableNumberOfDays,
} from '../utils';
import styles from './Header.styles';

const getFontSizeDays = (numberOfDays) => {
  return numberOfDays === 7 ? 12 : 14;
};

const getColumnContainerStyle = (isToday) => {
  return isToday ? {
    paddingTop: 4,
    borderBottomWidth: 4,
  } : null;
};

const getColumnTextStyle = (isToday) => {
  return isToday ? {
    fontWeight: 'bold',
    textShadowRadius: 0.5,
  } : null;
};

const Column = ({ column, numberOfDays, format, style, textStyle }) => {
  const isToday = moment().isSame(column, 'days');

  return (
    <View style={[styles.column, getColumnContainerStyle(isToday), style]}>
      <Text
        style={[
          {
            color: style.color,
            fontSize: getFontSizeDays(numberOfDays),
          },
          getColumnTextStyle(isToday),
          textStyle,
        ]}
      >
        {getFormattedDate(column, format)}
      </Text>
    </View>
  );
};

const Columns = ({ columns, numberOfDays, format, style, textStyle }) => {
  return (
    <View style={styles.columns}>
      {columns.map((column) => {
        return (
          <Column
            style={style}
            textStyle={textStyle}
            key={column}
            column={column}
            numberOfDays={numberOfDays}
            format={format}
          />
        );
      })}
    </View>
  );
};

const WeekViewHeader = ({
  numberOfDays,
  initialDate,
  formatDate,
  style,
  textStyle,
  rightToLeft,
}) => {
  const columns = calculateDaysArray(initialDate, numberOfDays, rightToLeft);
  return (
    <View style={styles.container}>
      {columns && (
        <Columns
          format={formatDate}
          columns={columns}
          numberOfDays={numberOfDays}
          style={style}
          textStyle={textStyle}
        />
      )}
    </View>
  );
};

WeekViewHeader.propTypes = {
  numberOfDays: PropTypes.oneOf(availableNumberOfDays).isRequired,
  initialDate: PropTypes.string.isRequired,
  formatDate: PropTypes.string,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  rightToLeft: PropTypes.bool,
};

WeekViewHeader.defaultProps = {
  formatDate: 'MMM D',
};

export default React.memo(WeekViewHeader);
