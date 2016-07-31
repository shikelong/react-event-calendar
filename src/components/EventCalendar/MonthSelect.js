import React, { Component, PropTypes } from 'react';
import moment from 'moment';

const styles = {
  MonthSelect_Container: 'MonthSelect_Container',
  MonthSelect_Label: 'MonthSelect_Label',
  MonthSelect_Navigator: 'MonthSelect_Navigator'
};

export default class MonthSelect extends Component {

  /**
   * change the render month or year
   * @return {[type]} [description]
   */
  handleNavigate(direction){
    this.props.onNavigate(direction);
  }

  render() {

    const dateTime = this.props.currentMonth.format('MMM YYYY');

    return (
      <div className={styles.MonthSelect_Container}>
        <span
          onClick={this.handleNavigate.bind(this, 'prev')}
          className={styles.MonthSelect_Navigator}
        >{'<'}</span>
        <div className={styles.MonthSelect_Label}>{dateTime}</div>
        <span
          onClick={this.handleNavigate.bind(this, 'next')}
          className={styles.MonthSelect_Navigator}
        >{'>'}</span>
      </div>
    );
  }
}

MonthSelect.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired
}
