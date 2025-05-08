// React Imports
import { useState, useEffect } from 'react'
import CardContent from '@mui/material/CardContent'
import {Grid2 as Grid} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ setData, tableData, text, show }) => {
  // States
  const [CLIENT_TYPE_CODE, setClient] = useState('')
  // const [plan, setPlan] = useState('')
  // const [status, setStatus] = useState('')
  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (CLIENT_TYPE_CODE && user.CLIENT_TYPE_CODE !== CLIENT_TYPE_CODE) return false
      // if (plan && user.currentPlan !== plan) return false
      // if (status && user.status !== status) return false
      return true
    })
    setData(filteredData || [])
  }, [CLIENT_TYPE_CODE,
    //  plan,
    //   status,
       tableData,
        setData])
if(show){
  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={CLIENT_TYPE_CODE}
            onChange={e => setClient(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>{`Select ${text}`}</MenuItem>
            <MenuItem value='CO'>CO</MenuItem>
            <MenuItem value='SP'>SP</MenuItem>
            <MenuItem value='IN'>IN</MenuItem>
            </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

}

export default TableFilters
