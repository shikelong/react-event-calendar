import React, { Component, PropTypes } from 'react';

const styles = {
  Week_Container: 'Week_Container'
};

const Week = (props) => {
  const weekdays = props.weekdays;
  return (
    <div className={styles.Week_Container}>
      {
        weekdays.map((weekday)=>(<span>{weekday}</span>))
      }
    </div>
  );
}

export default Week;
