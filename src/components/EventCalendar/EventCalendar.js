import React, { Component, PropTypes } from 'react';
import Header from './Header';
import MonthSelect from './MonthSelect';
import DateGrid from './DateGrid';
import YearSelect from './YearSelect';
import 'moment/locale/ja';
import moment from 'moment';
import _ from 'lodash';


//i18n
moment.locale('ja');

/**
 * a object that map the short-name className and the real css className
 * @type {Object}
 */
const styles = {
  Calendar_Container: 'Calendar_Container',
  Calendar_MainContent: 'Calendar_MainContent'
};

/**
 * React Calendar with the day-events Render
 * rio.shikelong@gmail.com 2016-7-30 15:01:28
 */
export default class EventCalendar extends Component {

  constructor(props){
    super(props);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.handleSelectYear = this.handleSelectYear.bind(this);
    this.goToday = this.goToday.bind(this);
    this.state = {
      selectedDate: moment().startOf('day'),
      currentMonth: moment().startOf('month'),
      display: 'months'
    }
  }

  /**
   * 返回今天
   * @return {[type]} [description]
   */
  goToday(){
    const today = moment().startOf('day');
    this.setState({
      selectedDate: today.clone(),
      currentMonth: today.clone(),
      display: 'months'
    });
  }

  /**
   * [setDisplay description]
   * @param {['months', 'years']} display [show which type view]
   */
  setDisplay(display){
    this.setState({
      display
    });
  }

  handleNavigate(direction){
    let nextMonth;
    if (direction === 'prev'){
      nextMonth = this.state.currentMonth.clone().subtract(1, 'months');
    }
    if (direction === 'next'){
      nextMonth = this.state.currentMonth.clone().add(1, 'months');
    }

    if (_.isFunction(this.props.onShowMonthChange)){
      this.props.onShowMonthChange(nextMonth, this.state.currentMonth);
    }
    this.setState({
      currentMonth: nextMonth
    });
  }

  handleSelectYear(year){
    const newSelectedDate = this.state.selectedDate.year(Number(year));
    this.setState({
      selectedDate: newSelectedDate,
      display: 'months',
      currentMonth: newSelectedDate
    });
  }

  handleSelectDate(date){
    const newSelectedDate = moment(date);
    if (_.isFunction(this.props.onSelectChange)){
      this.props.onSelectChange(newSelectedDate, this.state.selectedDate);
    }
    this.setState({
      selectedDate: newSelectedDate
    });

  }

  render() {

    const {
      showHeader,
      showMonthSelect,
      layout,
      today,
      width
    } = this.props;

    // FIXME: 后续这里改成从props获取
    const minDate = moment("1980-01-01"), maxDate = moment("2100-12-31");


    const {
      selectedDate,
      currentMonth,
      display
    } = this.state;

    return (
      <section className={styles.Calendar_Container} style={{'width': `${width}px`}}>
        {
          showHeader && (<Header
            selectedDate={selectedDate}
            setDisplay={this.setDisplay}
            goToday={this.goToday}
          />)
        }
        <div className={styles.Calendar_MainContent}>
          {
            showMonthSelect && <MonthSelect
            currentMonth={currentMonth}
            onNavigate={this.handleNavigate}
            />
          }
          <DateGrid
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            onSelectDate={this.handleSelectDate}
          />
        </div>
        {
          display === 'years' && (
            <YearSelect
              onSelectYear={this.handleSelectYear}
              minDate={minDate}
              maxDate={maxDate}
              selectedDate={selectedDate}
            />
          )
        }
      </section>
    );
  }
}


EventCalendar.defaultProps = {
  showHeader: true,
  showMonthSelect: true,
  layout: 'portrait',
  width: 310
};


EventCalendar.propTypes = {
  showHeader: PropTypes.bool.isRequired,
  showMonthSelect: PropTypes.bool.isRequired,
  layout: PropTypes.oneOf(['portrait', 'landscape']),
  width: PropTypes.number,
  onSelectChange: PropTypes.func,
  onShowMonthChange: PropTypes.func
};
