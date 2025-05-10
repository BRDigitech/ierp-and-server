'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const ApexLineChart = ({title, yAxisLabel, growthByMonth}) => {
  // Vars
  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'
  const growthSeries = [{ name: 'Customers', data: Object.values(growthByMonth) }];
  const options = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: true },
      toolbar: { show: true }
    },
    colors: ['#ff9f43'],
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val
        }
      }
      // custom(data) {
      //   return `<div class='bar-chart'>
      //     <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
      //   </div>`
      // }
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val
        },
      },
      title: {
        text: `${yAxisLabel}`
      },
      // labels: {
      //   style: { colors: disabledText, fontSize: '13px' }
      // }
    },
    xaxis: {
      axisBorder: { show: true },
      axisTicks: { color: divider },
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      },
      categories: Object.keys(growthByMonth)
    }
  }

  return (
    <Card>
      <CardHeader
        title={title}
        // subheader='Commercial networks & enterprises'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <AppReactApexCharts type='line' width='100%' height={400} options={options} series={growthSeries} />
      </CardContent>
    </Card>
  )
}

export default ApexLineChart
