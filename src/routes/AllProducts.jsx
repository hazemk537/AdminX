import React from 'react'
import { Pie } from '@ant-design/plots';
import { DemoPie } from '../RatingPie';
const data=JSON.parse(localStorage.getItem('productsWithSold'))
const RatingConfig={
  appendPadding: 10,
  data,
  angleField: 'rating',
  colorField: 'title',
  radius: 0.9,
  label: {
    type: 'inner',
    offset: '-30%',
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [
    {
      type: 'element-active',
    },
  ],
};
function Summary() {
  return (
    
    <div className="statistics">
      <div className="RatingPie">
      <h1>Highest Rating Data</h1>
      {/* <DemoPie/> */}
      <Pie {...RatingConfig} />

      </div>
      <div className="">


      </div>



    </div>

  )
}

export default Summary


//TODO

// in each category 3 level
// in all categories  2 level

//producs rating chart 
//products stock chart
//products most sold chart
