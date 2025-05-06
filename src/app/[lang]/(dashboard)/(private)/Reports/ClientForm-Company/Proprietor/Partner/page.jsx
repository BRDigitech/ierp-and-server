'use client'

import React, {useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableContainer,
  TextField,
  Typography,
  Paper,
  Tabs, Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Snackbar
} from '@mui/material'
import { styled } from '@mui/system'
import MuiAlert from '@mui/material/Alert'
import { dbUrl } from "./../../../../../../../../utils/string"

const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiAlert-root': {
    backgroundColor: '#388e3c',
    color: '#fff'
  },
  '& .MuiAlert-icon': {
    color: '#fff'
  }
}))
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const ClientFormCompany = () => {
  const [username, setUsername] = useState('')
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [showReport, setShowReport] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [clientData, setClientData] = useState(null)
  const [headeCustomerDetails, setHeadeCustomerDetails] = useState([])
  const [headeBankDetails, setHeadeBankDetails] = useState([])
  const [headeCompanies, setHeadeCompanies] = useState([])
  const [headeContacts, setHeadeContacts] = useState([])
  const [headeReferences, setHeadeReferences] = useState([])
  const [loading, setLoading] = useState(false)
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

   useEffect(() => {
    const handleTreeClick = async () => {
      await fetchUsers()
    }
    handleTreeClick()
  }, [])

  const handleGenerateReport = async () => {
    setLoading(true)
    console.log("username", username)
    if (username) {
      // Ensure you check the correct state (accOpenDate instead of asOnDate)
      try {
        const response = await fetch(
          `${dbUrl}/all-cu-customer-details2?username=${username}`
        )
        if (response.ok) {
          // Check if the HTTP status code is successful
          const result = await response.json()
          console.log("result",result)
          if (result.length === 0) {
            console.log('No data found for the given criteria')
            setClientData(null)
          } else {
          
            const formattedKeys1 = Object.keys(result.customerDetails.length > 0 ? result.customerDetails[0] : []).map(key => {
              return key
            });
            const formattedKeys2 = Object.keys(result.bankDetails.length > 0 ?  result.bankDetails[0] : []).map(key => {
              return key
            });
            const formattedKeys3 = Object.keys(result.companies.length > 0 ?  result.companies[0] : []).map(key => {
              return key
            });
            const formattedKeys4 = Object.keys(result.contacts.length > 0 ?  result.contacts[0] : []).map(key => {
              return key
            });
            const formattedKeys5 = Object.keys(result.references.length > 0 ?  result.references[0] : []).map(key => {
              return key
            });
            setHeadeCustomerDetails(formattedKeys1)
            setHeadeBankDetails(formattedKeys2)
            setHeadeCompanies(formattedKeys3)
            setHeadeContacts(formattedKeys4)
            setHeadeReferences(formattedKeys5)
            setClientData(result)
          }
          setShowReport(true)
        } else if (response.status === 404) {
          console.error('No data found for the given criteria')
          setOpenSnackbar(true)
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setOpenSnackbar(true)
      } finally {
        setLoading(false)
      }
    } else {
      setOpenSnackbar(true)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 8, mb: 4, backgroundColor: '#fff', width: '100%' }}>
        <Typography variant='h4' align='center' color='primary' gutterBottom sx={{ mb: 4 }}>
          Client Detail Report
        </Typography>
        <Box sx={{ mb: 6, width: '75%', mx: 'auto' }}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>Name</InputLabel>
            <Select value={username} onChange={e => setUsername(e.target.value)}>
              {userData && userData.map((itm, i) => {
                return <MenuItem value={itm.number} key={i}>{itm.name}</MenuItem>
              })}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button
              variant='contained'
              color='primary'
              disabled={loading}
              onClick={handleGenerateReport}
              sx={{ width: '200px', '&:hover': { backgroundColor: '#388e3c' } }}
            >
              {loading ? "Generating..." : "Generate Report"}
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => setShowReport(false)}
              sx={{ width: '100px', '&:hover': { backgroundColor: '#f5f5f5' } }}
            >
              Exit
            </Button>
          </Box>
        </Box>
      </Paper>
      {showReport && clientData && (
        <>

          {/* <Paper sx={{ p: 4, backgroundColor: '#fff', width: '100%' }}> */}
          <Typography variant='h5' align='center' color='primary' gutterBottom>
            Client Details
          </Typography>
          <Box
          >
            {/* Render client details dynamically */}
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab label="Customer Detail" />
              <Tab label="Bank Detail" />
              <Tab label="Companies" />
              <Tab label="Contacts" />
              <Tab label="References" />
            </Tabs>
            <TabPanel value={value} index={0}>    {/* Customer Details */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                    {headeCustomerDetails && headeCustomerDetails.map((itm,i)=>{
                  return  <StyledTableCell key={i}>{itm.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} </StyledTableCell>
                })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  <StyledTableRow>
                    {clientData.customerDetails &&
                      clientData.customerDetails.map((item, i) => (<Nested  key={i} data={item} headers={headeCustomerDetails}/>
                     ))}
                       </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>    {/* Bank Details */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                    {headeBankDetails && headeBankDetails.map((itm,i)=>{
                  return  <StyledTableCell key={i}>{itm.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} </StyledTableCell>
                })}
                    </TableRow>
                    
                  </TableHead>
                  <TableBody>
                  <StyledTableRow>
                    {clientData.bankDetails &&
                      clientData.bankDetails.map((item, i) => (
                        <Nested  key={i} data={item} headers={headeBankDetails}/>
                      ))}
                       </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={2}>     {/* Company Details */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                    {headeCompanies && headeCompanies.map((itm,i)=>{
                  return  <StyledTableCell key={i}>{itm.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} </StyledTableCell>
                })}
                    </TableRow>
    
                  </TableHead>
                  <TableBody>
                  <StyledTableRow>
                    {clientData.companies &&
                      clientData.companies.map((item, i) => (
                        <Nested  key={i} data={item} headers={headeCompanies}/>
                      ))}
                       </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={3}>    {/* Contact Details */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                    {headeContacts && headeContacts.map((itm,i)=>{
                  return  <StyledTableCell key={i}>{itm.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} </StyledTableCell>
                })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  <StyledTableRow>
                    {clientData.contacts &&
                      clientData.contacts.map((item, i) => (
                        <Nested  key={i} data={item} headers={headeContacts}/>
                      ))}
                       </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={4}>           {/* References Details */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                    
                    {headeReferences && headeReferences.map((itm,i)=>{
                  return  <StyledTableCell key={i}>{itm.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} </StyledTableCell>
                })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  <StyledTableRow>
                    {clientData.references &&
                      clientData.references.map((item, i) => (
                        <Nested  key={i} data={item} headers={headeReferences}/>
                      ))}
                       </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>






          </Box>
          {/* </Paper> */}
        </>
      )}
      <CustomSnackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant='filled' onClose={handleCloseSnackbar}>
          An error occurred while fetching the data. Please check your inputs and try again.
        </MuiAlert>
      </CustomSnackbar>
    </Container>
  )
}

export default ClientFormCompany
const Nested = ({data, headers}) => {
  function isValidDateString(str) {
    const date = new Date(str);
    return !isNaN(date.getTime());
  }
  return(
    <>
    {headers.map((itm,i)=>( <TableCell key={i}>{data[`${itm}`] !== null && isValidDateString(data[`${itm}`]) ? new Date(data[`${itm}`]).toLocaleDateString() : data[`${itm}`]}</TableCell>))}
    
    </>
  )
}
