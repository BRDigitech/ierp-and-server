'use client'
import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Snackbar
} from '@mui/material'
import { styled } from '@mui/system'
import MuiAlert from '@mui/material/Alert'
import {dbUrl} from "./../../../../../../../utils/string"
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '#fff',
  color: theme.palette.common.black
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected
  }
}))

const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiAlert-root': {
    backgroundColor: '#388e3c',
    color: '#fff'
  },
  '& .MuiAlert-icon': {
    color: '#fff'
  }
}))

const ClientDetailReport = () => {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false) // Default value
  const [showReport, setShowReport] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [data, setData] = useState([])
  const [userData, setUserData] = useState([])
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${dbUrl}/all-customers`
      )
      const result = await response.json()
      if (result.length === 0) {
        console.log('No data found for the given criteria')
      }
      let userList = result.map((itm) => {
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
  const handleGenerateReport = async () => {
    setLoading(true)
    if (username) {
      const requestUrl =  `${dbUrl}/cu-customer-details?username=${username}`
      try {
        const response = await fetch(requestUrl)
        const result = await response.json()
        if (response.ok && result.customerDetails) {
          setData(result.customerDetails)
          setShowReport(true)
        } else {
          throw new Error('No data or incorrect data format received.')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setOpenSnackbar(true)
      }finally{
        setLoading(false)
      }
    } else {
      setOpenSnackbar(true)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }
   useEffect(() => {
    const handleTreeClick = async () => {
      await fetchUsers()
    }
    handleTreeClick()
  }, [])
  return (
    <Container maxWidth='xl'>
      <Paper sx={{ p: 4, my: 2 }}>
        <Typography variant='h4' align='center' gutterBottom>
          Client Detail Report
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 4 }}>
                     <InputLabel>Name</InputLabel>
                     <Select value={username} onChange={e => setUsername(e.target.value)}>
                       {userData && userData.map((itm, i) => {
                         return <MenuItem value={itm.number} key={i}>{itm.name}</MenuItem>
                       })}
                     </Select>
                   </FormControl>  </Box>
        <Button variant='contained' color='primary' 
        disabled={loading}
        onClick={handleGenerateReport}>
         {loading ? "Generating..." : "Generate Report"} 
        </Button>
        <CustomSnackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <MuiAlert elevation={6} variant='filled' onClose={handleCloseSnackbar} severity='error'>
            Please fill in all fields correctly.
          </MuiAlert>
        </CustomSnackbar>
      </Paper>
      {showReport && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {['Name', 'Entry Date', 'Introduced By', 'Branch Code', 'Client Type Code', 'Public/Private'].map(
                  header => (
                    <StyledTableCell key={header}>{header}</StyledTableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <StyledTableRow key={index}>
                  {['NAME', 'ACC_OPEN_DATE', 'INTRODUCED_BY', 'BRANCH_CD', 'CLIENT_TYPE_CODE', 'PUB_PVT'].map(
                    column => (
                      <StyledTableCell key={column}>
                        {column === 'ACC_OPEN_DATE' ? new Date(row[column]).toLocaleDateString() : row[column]}
                      </StyledTableCell>
                    )
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component='div'
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Container>
  )
}

export default ClientDetailReport
