import { Spin,Alert } from 'antd'
import React from 'react'

function Spinner(props) {
  return (
    <div className="spinner-container">
<Spin  size={"large"}/>
{props.type==="employee"&&
<Alert  message="This API has CRUD operation But my be server Error,plz Be Patient"type="warning"/>
}
</div>

  )
}

export default Spinner