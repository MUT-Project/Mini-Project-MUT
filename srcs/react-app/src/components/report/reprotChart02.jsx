import React from 'react';
import { AgCharts } from 'ag-charts-react';

const MyChart2 = () => {
  const options = {
    data: [
      { month: 'January', MII: 40 , ELEC :30 , MECH: 50 , BU: 30 , VET: 15},
    ],
    title: {
      text: 'Room',
    },
    series: [
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'MII',
      },
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'ELEC',
      },
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'MECH',
      },
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'BU',
      },
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'VET',
      },
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

export default MyChart2;
