import React from 'react'
import DashboardGrid from '../Componenst/admin/DashboardGrid'
import BarGraph from '../Componenst/admin/BarGraph'
import PieCHart from '../Componenst/admin/PieCHart'

function Admin() {
  return (
    <div>
        <DashboardGrid/>
        <div className='d-flex gap-3 mx-3'>
            <div className='col-7'>
                <BarGraph/>
            </div>
            <div className='col-5'>
                <PieCHart/>
            </div>
        </div>
    </div>
  )
}

export default Admin