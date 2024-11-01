import React from 'react';
import { AgCharts } from 'ag-charts-react';

const MyChart1 = () => {
  const options = {
    data: [
      { month: 'January', Use: 55 , Cancle :10},
    ],
    title: {
      text: 'Room Use & Cancle',
    },
    series: [
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'Use',
      },
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'Cancle',
      }
    ],
    background: {
      fill: '#ffff',
    },
  };

  return (
    <div style={{ height: '90%', width: '90%'}}>
      <AgCharts options={options} />
    </div>
  );
};

export default MyChart1;
