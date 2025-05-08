'use client'
import { useState } from 'react'
import Link from 'next/link'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import CustomTextField from '@core/components/mui/TextField'
import { Container } from '@mui/material'


const FormLayoutsBasic = ({data}) => {
   return (
    <Container maxWidth="lg">
    <Card>
      
      <CardContent>
  <Grid container spacing={2}>
    {Object.entries(data[0]).map(([key, value], i) => (
      <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
        <CustomTextField
          fullWidth
          sx={{ width: '100%' }}
          label={key.replace(/_/g, ' ')} // format label: e.g. ACC_OPEN_DATE => ACC OPEN DATE
          placeholder={value ?? 'N/A'}
          value={value ?? ''}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    ))}
  </Grid>
</CardContent>
    </Card>
    </Container>
  )
}

export default FormLayoutsBasic
