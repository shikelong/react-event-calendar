import React, { Component, PropTypes } from 'react';
import Week from './Week';
import Day from './Day';
import moment from 'moment';
import 'moment-range';
import _ from 'lodash';


const styles = {

};

export default class DateGrid extends Component {

  constructor(props){
    super(props);
    this.handleSelectDate = this.handleSelectDate.bind(this);
  }

  /**
   * 选择所选的日期前事件
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  handleSelectDate(event){
    const date = event.target.dataset.date;
    if (_.isEmpty(date) || date === this.props.selectedDate.format('YYYY-MM-DD')){
      return;
    }
    this.props.onSelectDate(date)
  }

  /**
   * 渲染一个月视图中要渲染的所有day组件
   * @return {[type]} [description]
   */
  renderDays(){
    const {
      selectedDate,
      currentMonth,
    } = this.props;

    const daysComponent = [];
    //计算一些基本日期
    //firstDayOfWeek 默认为0(周日)
    const monthStartDate = currentMonth.clone().startOf('month'), monthEndDate = currentMonth.clone().endOf('month'),
    firstDayOfWeek = moment.localeData().firstDayOfWeek();
    //计算选择月的起始weekday和结束的weekday
    const monthStartDateWeekday = monthStartDate.weekday(), monthEndDateWeekday = monthEndDate.weekday();

    //渲染的时候需要把不足的周补齐
    const renderedStartDate = monthStartDate.clone().subtract(Math.abs(monthStartDateWeekday - firstDayOfWeek), 'days'),
    renderedEndDate = monthEndDate.clone().add(Math.abs(6 - monthEndDateWeekday - firstDayOfWeek), 'days');

    const renderDaysRange = moment.range(renderedStartDate, renderedEndDate);
    const thisMonthRange = moment.range(monthStartDate, monthEndDate);

    renderDaysRange.by('days', (day) => {
      const date = thisMonthRange.contains(day) ? day : {};
      daysComponent.push((<Day
          date={date}
          selectedDate={selectedDate}
        />));
    });

    return daysComponent;

  }

  render(){

    return (
      <div>
        <Week weekdays={moment.weekdaysMin()} />
        <div className={styles.Day_List} onClick={this.handleSelectDate}>
          {this.renderDays()}
        </div>
      </div>
    );
  }


}

DateGrid.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  currentMonth: PropTypes.object.isRequired,
  onSelectDate: PropTypes.func.isRequired
}
