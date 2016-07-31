import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

const styles = {
  Day_Container: 'Day_Container',
  Day_Today: 'Day_Today',
  Day_Selected: 'Day_Selected',
  Day_EmptyContainer: 'Day_EmptyContainer'
};

// TODO: 处于性能方面的考虑 需要把day设计为stateless Component
const Day = ({date, selectedDate}) => {
  let className = `${styles.Day_Container}`;
  //如果为占位的月份
  if (_.isEmpty(date)){
    className = `${styles.Day_Container} ${styles.Day_EmptyContainer}`;
    return (
      <div className={className}>
        <div></div>
      </div>
    )
  }
  const isSelectedDate = date.calendar() == selectedDate.calendar();
  //如果为选择的日期
  if(isSelectedDate){
    className = `${styles.Day_Container} ${styles.Day_Selected}`;
  }
  return (
    <div className={className}>
      <div data-date={date.format('YYYY-MM-DD')}>{date.date()}</div>
    </div>
  );
}

export default Day;
