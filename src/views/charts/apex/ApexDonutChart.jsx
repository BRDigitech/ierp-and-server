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

// Vars
const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#32baff',
  series5: '#ffa1a1'
}

const ApexDonutChart = ({title,clientTypeCounts,clientTypeSeries}) => {
  // Hooks
  const theme = useTheme()
 
  // Vars
  const textSecondary = 'var(--mui-palette-text-secondary)'

  const options = {
    stroke: { width: 0 },
    chart: {
      type: 'donut',
      width: '100%', // for Apex layout
    },
    labels:Object.keys(clientTypeCounts),
    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter: val => `${parseInt(val, 10)}%`
    },
    legend: {
      fontSize: '13px',
      position: 'bottom',
      markers: {
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      labels: { colors: textSecondary },
      itemMargin: {
        horizontal: 9
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: textSecondary,
              formatter: val => `${parseInt(val, 10)}`
            },
            // total: {
            //   show: true,
            //   fontSize: '1.2rem',
            //   label: 'Operational',
            //   formatter: () => '31%',
            //   color: 'var(--mui-palette-text-primary)'
            // }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
             width: '100%'
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320,
             width: '100%'
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader title={title} 
      // subheader='Spending on various categories'
       />
      <CardContent>
        <AppReactApexCharts type='donut' width='100%' height={400} options={options} series={clientTypeSeries} />
      </CardContent>
    </Card>
  )
}

export default ApexDonutChart
