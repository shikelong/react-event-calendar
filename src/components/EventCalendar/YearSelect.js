import React, { Component, PropTypes } from 'react';
import {VirtualScroll} from 'react-virtualized';
import moment from 'moment';

const styles = {
  'YearSelect_Container': 'YearSelect_Container',
  'YearSelect_list': 'YearSelect_list',
  'YearSelect_Item': 'YearSelect_Item',
  'YearSelect_ThisYear': 'YearSelect_ThisYear',
  'YearSelect_SelectedYear': 'YearSelect_SelectedYear'
};

export default class YearSelect extends Component {


  constructor(props){
    super(props);
    this.handleSelectYear = this.handleSelectYear.bind(this);
  }

  handleSelectYear(event){
    if (event){
      this.props.onSelectYear(event.currentTarget.dataset.year);
    }
  }

  render() {

    let { selectedDate, minDate, maxDate } = this.props;
    // FIXME: style从外面传递进来并保证可用性
    const height = 200, width = 318;

    const selectedYear = selectedDate.year(), minYear = minDate.year(), maxYear = maxDate.year(),
      thisYear = moment().year();

    const years = [];

    for (let i = minYear; i <= maxYear; i++) {
      years.push(i);
    }

    years.unshift(null);
    years.push(null);


    const rowHeight = 50, yearsCount = years.length;
    const containerHeight = (yearsCount * rowHeight < height + 50)
      ? yearsCount * rowHeight
      : height + 50;

    return (
      <div className={styles.YearSelect_Container}>
        <VirtualScroll
          ref="VirtualScroll"
          className={styles.YearSelect_list}
          width={width}
          height={containerHeight}
          rowCount={yearsCount}
          rowHeight={rowHeight}
          scrollToIndex={1}
          scrollToAlignment={'center'}
          rowRenderer={({index}) => {
            return years[index];
            // const renderYear = years[index];
            // let className= `${styles.YearSelect_Item}`;
            // if (renderYear === thisYear) {
            //   className = `${className} ${styles.YearSelect_ThisYear}`;
            // }
            // if (renderYear === selectedYear) {
            //   className = `${className} ${styles.YearSelect_SelectedYear}`;
            // }
            //
            // return (<div
            //   className={className}
            //   onClick={this.handleSelectYear}
            //   data-year={renderYear}
            //   ><span>{renderYear}</span>
            // </div>);
          }}
        />
      </div>
    );
  }
}

YearSelect.propTypes = {
  onSelectYear: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired
}
