'use client'
import React
, { useEffect, useState } 
 from 'react'
import {dbUrl} from "./../../../../../../utils/string"
// MUI Imports
import Grid from '@mui/material/Grid'
// Component Imports
import ApexAreaChart from "./../../../../../../views/charts/apex/ApexAreaChart"
// '@views/charts/apex/ApexAreaChart'
import ApexBarChart from './../../../../../../views/charts/apex/ApexBarChart'
import ApexCandlestickChart from './../../../../../../views/charts/apex/ApexCandlestickChart'
import ApexColumnChart from './../../../../../../views/charts/apex/ApexColumnChart'
import ApexDonutChart from './../../../../../../views/charts/apex/ApexDonutChart'
import ApexHeatmapChart from './../../../../../../views/charts/apex/ApexHeatmapChart'
import ApexLineChart from './../../../../../../views/charts/apex/ApexLineChart'
import ApexRadarChart from './../../../../../../views/charts/apex/ApexRadarChart'
import ApexRadialBarChart from './../../../../../../views/charts/apex/ApexRadialBarChart'
import ApexScatterChart from './../../../../../../views/charts/apex/ApexScatterChart'

const Statistics = () => {
//   const [data, setData] = useState([])
  const [userData, setUserData] = useState([])
  const [headerkeys, setHeaderkeys] = useState(null)
//  const [loading, setLoading] = useState(false)
const fetchUsers = async() =>{
  try {
    const response = await fetch(
      `${dbUrl}/all-customers`
    )
    const result = await response.json()
    if (result.length === 0) {
      console.log('No data found for the given criteria')
    }
    const groupedByYear = {};

    result.forEach(user => {
      const year = new Date(user.ACC_OPEN_DATE).getFullYear();
      groupedByYear[year] = (groupedByYear[year] || 0) + 1;
    });
    
    // Convert to chart-friendly format
    const years = Object.keys(groupedByYear).sort();
    const counts = years.map(year => groupedByYear[year]);
  
    setHeaderkeys({
        years,
        counts  
    })
//    console.log("ress",{
//     years,
//     counts  
// })
    //   setHeaderkeys(result)
    let userList = result.map((itm)=>{
      return {
        name: itm.NAME,
        number: itm.CUST_NO
      }
  })
    setUserData(userList)
  
  } catch (error) {
    console.log(`Error: ${error}`)
  }

}
useEffect(() => {
 const handleTreeClick = async () => {
    await fetchUsers()
 }
 handleTreeClick()
}, [])
 if(headerkeys) {
    return (
    <Grid container spacing={6}>
         <Grid item
        xs={12} md={12}
       >
        <ApexScatterChart data={headerkeys}/>
      </Grid>
      <Grid item
       xs={12} md={12}
       >
        {/* <ApexAreaChart /> */}
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <Square data={statsData.statsSquare} />
      </Grid> */}
      <Grid item
        xs={12} md={12}
       >
        {/* <ApexBarChart data={headerkeys}/> */}
      </Grid>
      <Grid item
        xs={12} md={12}
       >
        <ApexCandlestickChart />
      </Grid>
      <Grid item
        xs={12} md={12}
       >
        <ApexColumnChart />
      </Grid>
      <Grid item
        xs={12} md={12}
       >
        {/* <ApexDonutChart /> */}
      </Grid>
      <Grid item
        xs={12} md={12}
       >
        <ApexHeatmapChart />
      </Grid>
      <Grid item
        xs={12} md={12}
       >
        {/* <ApexLineChart /> */}
      </Grid>
      {/* <Grid item xs={12}>
        <LogisticsStatisticsCard data={statsData?.statsHorizontalWithBorder} />
      </Grid> */}
      <Grid item
        xs={12} md={12}
       >
        {/* <ApexRadarChart /> */}
      </Grid>
      {/* <Grid item xs={12}>
        <Horizontal data={statsData.statsHorizontal} />
      </Grid> */}
      {/* <Grid item xs={12}>
        <CardStatsLineAreaCharts data={statsData.statsWithAreaChart} />
      </Grid> */}
      <Grid item
        xs={12} md={12}
       >
        {/* <ApexRadialBarChart /> */}
      </Grid>
      {/* <Grid item
        xs={12} md={12}
       >
        <ApexScatterChart />
      </Grid> */}
    
      {/* <Grid item xs={12}>
        <HorizontalStatisticsCard data={statsData?.statsHorizontalWithAvatar} />
      </Grid>
      <Grid item xs={12}>
        <CustomerStatisticsCard customerStatData={statsData?.customerStats} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Vertical data={statsData.statsVertical} />
      </Grid> */}
    
    </Grid>
  )}
}

export default Statistics
