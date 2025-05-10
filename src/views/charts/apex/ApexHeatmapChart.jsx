'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))


const ApexHeatmapChart = ({heatmapData, label}) => {
  // Hooks
  const theme = useTheme()

  // Vars
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: true }
    },
    dataLabels: { enabled: true },
    legend: {
      position: 'bottom',
      labels: {
        colors: 'var(--mui-palette-text-secondary)'
      },
      markers: {
        offsetY: 0,
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      itemMargin: {
        horizontal: 9
      }
    },
    plotOptions: {
      heatmap: {
        enableShades: false,
        colorScale: {
          ranges: [
            { from: 0, to: 0, color: '#e0f7fa', name: 'None Missing' },
          { from: 1, to: 10, color: '#ffe082', name: 'Few Missing' },
          { from: 11, to: 100, color: '#ffab91', name: 'Some Missing' },
          { from: 101, to: 10000, color: '#ff7043', name: 'Many Missing' }
      ]
        }
      }
    },
    grid: {
      padding: { top: -20 }
    },
    yaxis: {
      labels: {
        style: {
          colors: 'var(--mui-palette-text-disabled)',
          fontSize: '13px'
        }
      }
    },
    xaxis: {
      labels: { show: true },
      axisTicks: { show: true },
      axisBorder: { show: false },
      categories: ['Missing Count']
    }
  }

  return (
    <Card>
      <CardHeader title={label} />
      <CardContent>
        <AppReactApexCharts type='heatmap' width='100%' height={400} options={options} series={heatmapData} />
      </CardContent>
    </Card>
  )
}

export default ApexHeatmapChart
