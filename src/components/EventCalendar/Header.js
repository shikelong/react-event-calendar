import React, { Component, PropTypes } from 'react';


const styles = {
  Header_Container: 'Header_Container',
  Header_Year: 'Header_Year',
  Header_DateTime: 'Header_DateTime',
  Header_Today: 'Header_Today'
};

const Header = (props) => {
  const {
    selectedDate,
    setDisplay,
    goToday
  } = props;
  const year = selectedDate.year(), dateTime = selectedDate.format('ddd, MMMDo');

  return (
    <div className={styles.Header_Container}>
      <div
        className={styles.Header_Year}
        onClick={() => (setDisplay('years'))}
      >{year}</div>
      <div
        onClick={goToday}
        className={styles.Header_Today}
      >今日</div>
      <div className={styles.Header_DateTime}>{dateTime}</div>
    </div>
  );
}

export default Header;
