import React from 'react';
import { AgCharts } from 'ag-charts-react';

const MyChart3 = () => {
  const options = {
    data: [
      { Day: '1', Nd1: 10},
      { Day: '2', Nd1: 50},
      { Day: '3', Nd1: 0},
      { Day: '4', Nd1: 30},
      { Day: '5', Nd1: 60},
      { Day: '6', Nd1: 20},
      { Day: '7', Nd1: 40},
      { Day: '8', Nd1: 10},
      { Day: '9', Nd1: 40},
      { Day: '10', Nd1: 10},
    ],
    title: {
      text: 'Room Using in Month',
    },
    series: [
      {
        type: 'line',
        xKey: 'Day',
        yKey: 'Nd1',
      },
    ],

    background: {
      fill: '#ffff',
    },
  };

  return (
    <div style={{ height: '90%', width: '90%', marginLeft: '5%' , marginRight: '5%'}}>
      <AgCharts options={options} />
    </div>
  );
};

export default MyChart3;
