// 'use client'

// // Next Imports
// import dynamic from 'next/dynamic'

// // MUI Imports
// import Card from '@mui/material/Card'
// import { useTheme } from '@mui/material/styles'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

// // Styled Component Imports
// const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// // Vars
// const radialBarColors = {
//   series1: '#fdd835',
//   series2: '#32baff',
//   series3: '#00d4bd',
//   series4: '#7367f0',
//   series5: '#FFA1A1'
// }

// const ApexRadialBarChart = () => {
//   // Hooks
//   const theme = useTheme()

//   // Vars
//   const textSecondary = 'var(--mui-palette-text-secondary)'

//   const options = {
//     stroke: { lineCap: 'round' },
//     labels: ['Comments', 'Replies', 'Shares'],
//     legend: {
//       show: true,
//       fontSize: '13px',
//       position: 'bottom',
//       labels: {
//         colors: textSecondary
//       },
//       markers: {
//         offsetX: theme.direction === 'rtl' ? 7 : -4
//       },
//       itemMargin: {
//         horizontal: 9
//       }
//     },
//     colors: [radialBarColors.series1, radialBarColors.series2, radialBarColors.series4],
//     plotOptions: {
//       radialBar: {
//         hollow: { size: '30%' },
//         track: {
//           margin: 15,
//           background: 'var(--mui-palette-customColors-trackBg)'
//         },
//         dataLabels: {
//           name: {
//             fontSize: '2rem'
//           },
//           value: {
//             fontSize: '15px',
//             fontWeight: 500,
//             color: textSecondary
//           },
//           total: {
//             show: true,
//             fontWeight: 500,
//             label: 'Comments',
//             fontSize: '1.125rem',
//             color: 'var(--mui-palette-text-primary)',
//             formatter: function (w) {
//               const totalValue =
//                 w.globals.seriesTotals.reduce((a, b) => {
//                   return a + b
//                 }, 0) / w.globals.series.length

//               if (totalValue % 1 === 0) {
//                 return totalValue + '%'
//               } else {
//                 return totalValue.toFixed(2) + '%'
//               }
//             }
//           }
//         }
//       }
//     },
//     grid: {
//       padding: {
//         top: -35,
//         bottom: -30
//       }
//     }
//   }

//   return (
//     <Card>
//       <CardHeader title='Statistics' />
//       <CardContent>
//         <AppReactApexCharts type='radialBar' width='100%' height={400} options={options} series={[80, 50, 35]} />
//       </CardContent>
//     </Card>
//   )
// }

// export default ApexRadialBarChart
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
const radialBarColors = {
  series1: '#fdd835',
  series2: '#32baff',
  series3: '#00d4bd',
  series4: '#7367f0',
  series5: '#FFA1A1'
}

const pastelColors = [
 '#FFA1A1','#7367f0','#00d4bd', '#32baff', '#fdd835','#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
  '#D7BAFF', '#FFCBA4', '#A4FFCB', '#FFE3BA', '#BAFFD9'
];
const ApexRadialBarChart = ({missingCounts,label, title, fields, series}) => {
  // Hooks
  const theme = useTheme()
       
  // Vars
  const textSecondary = 'var(--mui-palette-text-secondary)'

  const options = {
    stroke: { lineCap: 'round' },
    // labels: fields.map(f => f.label),
    labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"],

    legend: {
      show: true,
      fontSize: '13px',
      position: 'bottom',
      labels: {
        colors: textSecondary
      },
      markers: {
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      itemMargin: {
        horizontal: 9
      }
    },
    colors: pastelColors.slice(0, fields.length),
    // colors: [radialBarColors.series1, radialBarColors.series2, radialBarColors.series4],
     plotOptions: {
      radialBar: {
        hollow: { size: '30%' },
        track: {
          margin: 15,
          background: 'var(--mui-palette-customColors-trackBg)'
        },
        dataLabels: {
          name: {
            fontSize: '2rem'
          },
          value: {
            fontSize: '15px',
            fontWeight: 500,
            color: textSecondary
          },
          total: {
            show: true,
            fontWeight: 500,
            label: label,
            fontSize: '1.125rem',
            color: 'var(--mui-palette-text-primary)',
            formatter: () => missingCounts.reduce((a, b) => a + b, 0)
        
            // formatter: function (w) {
            //   const totalValue =
            //     w.globals.seriesTotals.reduce((a, b) => {
            //       return a + b
            //     }, 0) / w.globals.series.length

            //   if (totalValue % 1 === 0) {
            //     return totalValue + '%'
            //   } else {
            //     return totalValue.toFixed(2) + '%'
            //   }
            // }
          }
        }
      }
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30
      }
    }
  }

  return (
    <Card>
      {/* <CardHeader title={title} /> */}
      <CardContent>
        <AppReactApexCharts type='radialBar' width='100%' height={400} options={options} series={[23, 11, 54, 72]} />
      </CardContent>
    </Card>
  )
}

export default ApexRadialBarChart

