'use client'
import React from 'react'
import Menu from '@mui/material/Menu';
import {
  TableCell,
  TableRow,
  Snackbar
} from '@mui/material'
import { styled } from '@mui/system'
import {dbUrl} from "./../../../../../../utils/string"
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import TableFilters from './../../../../../../views/apps/user/list/TableFilters'
import AddUserDrawer from './../../../../../../views/apps/user/list/AddUserDrawer'
// import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'
import { getInitials } from '@/utils/getInitials'
// import { getLocalizedUrl } from '@/utils/i18n'
import tableStyles from '@core/styles/table.module.css'
// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const userRoleObj = {
  CO: { icon: 'tabler-crown', color: 'error' },
  SP: { icon: 'tabler-device-desktop', color: 'warning' },
  IN: { icon: 'tabler-edit', color: 'info' },
 }

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}
// Column Definitions
const columnHelper = createColumnHelper()

const UserListTable = ({ tableData }) => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState([])
  const [file, setFile] = useState()
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [headerkeys, setHeaderkeys] = useState([])
  const [loadingExport, setLoadingExport] = useState(false)
  const [loading, setLoading] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('NAME', {
        header: 'Customer',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: row.original.avatar, fullName: row.original.NAME })}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.NAME}
              </Typography>
              {/* <Typography variant='body2'>{row.original.username}</Typography> */}
            </div>
          </div>
        )
      }),
      columnHelper.accessor('customer-number', {
        header: 'Customer #',
        cell: ({ row }) => <Typography>{row.original.CUST_NO}</Typography>
      }),
      columnHelper.accessor('date', {
        header: 'Account Opening',
        cell: ({ row }) => <Typography>{row.original.ACC_OPEN_DATE?.slice(0, 10)}</Typography>
      }),
     
      columnHelper.accessor('email', {
        header: 'EMAIL',
        cell: ({ row }) => <Typography>{row.original.EMAIL}</Typography>
      }),
      columnHelper.accessor('introced-by', {
        header: 'Introduced By',
        cell: ({ row }) => <Typography>{row.original.INTRODUCED_BY}</Typography>
      }),
      columnHelper.accessor('telephone', {
        header: 'Tele #',
        cell: ({ row }) => <Typography>{row.original.TEL_NO}</Typography>
      }),
      columnHelper.accessor('role', {
        header: 'CLIENT TYPE',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Icon
              className={userRoleObj[row.original.CLIENT_TYPE_CODE]?.icon}
              sx={{ color: `var(--mui-palette-${userRoleObj[row.original.CLIENT_TYPE_CODE]?.color}-main)` }}
            />
            <Typography className='capitalize' color='text.primary'>
              {row.original.CLIENT_TYPE_CODE}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('nic-n', {
        header: 'NIC N',
        cell: ({ row }) => <Typography>{row.original.NIC_N}</Typography>
      }),
      columnHelper.accessor('nic-number', {
        header: 'NIC #',
        cell: ({ row }) => <Typography>{row.original.NIC_NO}</Typography>
      }),
      columnHelper.accessor('mobile-number', {
        header: 'Mobile #',
        cell: ({ row }) => <Typography>{row.original.MOBILE_NO}</Typography>
      }),
      columnHelper.accessor('fax-number', {
        header: 'Fax #',
        cell: ({ row }) => <Typography>{row.original.FAX_NO}</Typography>
      }),
      columnHelper.accessor('f-h-name', {
        header: 'F H Name',
        cell: ({ row }) => <Typography>{row.original.F_H_NAME}</Typography>
      }),
      columnHelper.accessor('customer-old', {
        header: 'Customer Old',
        cell: ({ row }) => <Typography>{row.original.CUST_OLD}</Typography>
      }),
      // columnHelper.accessor('status', {
      //   header: 'Status',
      //   cell: ({ row }) => (
      //     <div className='flex items-center gap-3'>
      //       <Chip
      //         variant='tonal'
      //         label={row.original.status}
      //         size='small'
      //         color={userStatusObj[row.original.status]}
      //         className='capitalize'
      //       />
      //     </div>
      //   )
      // }),
      // columnHelper.accessor('action', {
      //   header: 'Action',
      //   cell: ({ row }) => (
      //     <div className='flex items-center'>
      //       <IconButton onClick={() => setData(data?.filter(product => product.CUST_NO !== row.original.CUST_NO))}>
      //         <i className='tabler-trash text-textSecondary' />
      //       </IconButton>
      //       <IconButton>
      //         <Link href={getLocalizedUrl('/apps/user/view', locale)} className='flex'>
      //           <i className='tabler-eye text-textSecondary' />
              
      //         </Link>
      //       </IconButton>
      //       <OptionMenu
      //         iconButtonProps={{ size: 'medium' }}
      //         iconClassName='text-textSecondary'
      //         options={[
      //           {
      //             text: 'Download',
      //             icon: 'tabler-download',
      //             menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
      //           },
      //           {
      //             text: 'Edit',
      //             icon: 'tabler-edit',
      //             menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
      //           }
      //         ]}
      //       />
      //     </div>
      //   ),
      //   enableSorting: false
      // })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const getAvatar = params => {
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else if(fullName) {
      return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
    } else {
      return <CustomAvatar size={34}>{getInitials("brd")}</CustomAvatar>
    }
  }
  const handleGenerateReport = async () => {
    setLoading(true)
      try {
        const response = await fetch(
          `${dbUrl}/all-customers`
        )
        const result = await response.json()
        if (result.length === 0) {
          console.log('No data found for the given criteria')
        }
  
        // const uniqueClientTypes = [...new Set(
        //   result.map(item => item.CLIENT_TYPE_CODE).filter(code => code !== null)
        // )];
        const formattedKeys = Object.keys(result[0]).map(key => {
          return key
              });
        setHeaderkeys(formattedKeys)
        setData(result)
       
      } catch (error) {
        console.error('Error fetching data:', error)
      }
        setLoading(false)
  }
  const handleExportToExcel = () => {
     const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'All Customers')
    XLSX.writeFile(wb, 'all_customers.xlsx')
  }

  const handleExportToPDF = () => {
   const doc = new jsPDF()
const tableBody = data.map((item) => [
  item.CUST_NO,
  item.NAME,
  item.CLIENT_TYPE_CODE,
  item.EMAIL,
  item.TEL_NO,
  item.INTRODUCED_BY,
  item.ACC_OPEN_DATE?.slice(0, 10)]);
    autoTable(doc,{
      head:[['Customer#', 'Name', 'Type', 'Email', 'Phone', 'Introduced By', 'Opened at']],
      body:tableBody,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak', // wrap words, not characters
        halign: 'left',
      },
      headStyles: {
        fontSize: 8,
        cellPadding: 2,
        halign: 'center',
        valign: 'middle',
        overflow: 'visible', // Prevent wrapping
      },
      columnStyles: {
        0: { cellWidth: 15 }, // Customer No
        1: { cellWidth: 40 }, // Name
        2: { cellWidth: 10 }, // Type
        3: { cellWidth: 50 }, // Email
        4: { cellWidth: 30 }, // Phone
        5: { cellWidth: 20 }, // Introduced By
        6: { cellWidth: 35 }, // Opened
      },
    })
    doc.save('all_customers.pdf')
  }

  const setFileAction = (val)=>{
    setFile(val)
    handleClose()
    setLoadingExport(true)
    if(val === 0){
      handleExportToPDF()
    }else{
      handleExportToExcel()
    }
    setLoadingExport(false)
  }
  useEffect(() => {
   }, [rowSelection, file])
  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters setData={setFilteredData} tableData={data} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search User'
              className='max-sm:is-full'
            />
           
           <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={loadingExport || data.length < 1}
      >
       {loadingExport ? "Exporting..." : "Export"} 
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem  onClick={()=>setFileAction(0)}>PDF</MenuItem>
        <MenuItem  onClick={()=>setFileAction(1)}>XL</MenuItem>
         </Menu>
            <Button
              variant='contained'
              // startIcon={<i className='tabler-plus' />}
              disabled={loading}
              // onClick={() => setAddUserOpen(!addUserOpen)}
               onClick={() => handleGenerateReport()}
              className='max-sm:is-full'
            >
           {loading ? "Fetching..." : "Fetch Users"}
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <AddUserDrawer
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        userData={data}
        setData={setData}
      />
    </>
  )
}
// const UserListTable = ({ tableData }) => {
// return(<>hello</>)
   
// }

export default UserListTable
