import React, {
  // useEffect
} from 'react'
import { Grid } from '@mui/material'
import DateSearch from '../components/DashboardElements/DateSearch'
import NameSearch from '../components/DashboardElements/NameSearch'
import TableData from '../components/DashboardElements/TableData'
// import '../styles/dashboard.scss'


function Dashboard() {
  const [data, setData] = React.useState({});
  const [page, setPage] = React.useState(0);

  return (
    <div className='mt-6 font'>
      <div className='grid md:grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto gap-8'>
        <div>
            <NameSearch data={data} setData={setData} setPage={setPage} />
        </div>
        <div>
            <DateSearch data={data} setData={setData} setPage={setPage} />
        </div>
      </div>
      {/* <div className='flex w-90 center mt4 table-border br2'> */}
      <div className='grid grid-cols-1 w-11/12 mx-auto mt-8 shadow-xl'>
        <TableData data={data} setPage={setPage} page={page} setData={setData} />
      </div>
    </div>
  )
}

export default Dashboard