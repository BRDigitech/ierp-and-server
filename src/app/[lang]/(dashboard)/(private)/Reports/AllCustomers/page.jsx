'use client'
import React from 'react'
import Menu from '@mui/material/Menu';
import CustomerCharts from '../Charts/CustomerCharts';
import {CardContent,Box,TextField,Grid2} from '@mui/material'
import { styled } from '@mui/system'
import {dbUrl, getAvatar, ColumnToggleDropdown} from "./../../../../../../utils/string"
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { useEffect, useState, useMemo } from 'react'
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
    const [columnVisibility, setColumnVisibility] = useState({})
    const [columnOrder, setColumnOrder] = useState();
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
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
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
      columnHelper.accessor('CUST_NO', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        filterFn: 'fuzzyString',
        cell: ({ row }) => <Typography>{row.original.CUST_NO}</Typography>
      }),
      columnHelper.accessor('ACC_OPEN_DATE', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        cell: ({ row }) => <Typography>{row.original.ACC_OPEN_DATE?.slice(0, 10)}</Typography>
      }),
     
      columnHelper.accessor('EMAIL', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        cell: ({ row }) => <Typography>{row.original.EMAIL}</Typography>
      }),
      columnHelper.accessor('INTRODUCED_BY', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        cell: ({ row }) => <Typography>{row.original.INTRODUCED_BY}</Typography>
      }),
      columnHelper.accessor('TEL_NO', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        cell: ({ row }) => <Typography>{row.original.TEL_NO}</Typography>
      }),
      columnHelper.accessor('CLIENT_TYPE_CODE', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
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
      columnHelper.accessor('NIC_N', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        filterFn: 'fuzzyString',
        cell: ({ row }) => <Typography>{row.original.NIC_N}</Typography>
      }),
      columnHelper.accessor('NIC_NO', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        filterFn: 'fuzzyString',
        cell: ({ row }) => <Typography>{row.original.NIC_NO}</Typography>
      }),
      columnHelper.accessor('MOBILE_NO', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        filterFn: 'fuzzyString',
        cell: ({ row }) => <Typography>{row.original.MOBILE_NO}</Typography>
      }),
      columnHelper.accessor('FAX_NO', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        cell: ({ row }) => <Typography>{row.original.FAX_NO}</Typography>
      }),
      columnHelper.accessor('F_H_NAME', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        filterFn: 'fuzzyString',
        cell: ({ row }) => <Typography>{row.original.F_H_NAME}</Typography>
      }),
      columnHelper.accessor('CUST_OLD', {
        header: ({ column }) => (
          <div>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{' '}
         {column.id}
        </div>
        ),
        cell: ({ row }) => <Typography>{row.original.CUST_OLD}</Typography>
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
      fuzzyString: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
      }
    },
    state: {
      rowSelection,
      globalFilter,
      columnVisibility
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    onColumnOrderChange: setColumnOrder
  })

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
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedData = selectedRows.map(row => row.original);
  
    if (selectedData.length === 0) {
      alert("No rows selected for export.");
      return;
    }
     const ws = XLSX.utils.json_to_sheet(selectedData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'All-Customers')
    XLSX.writeFile(wb, 'all_customers.xlsx')
  }
  const handleExportToCSV = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedData = selectedRows.map(row => row.original);

    if (!selectedData.length) return;

    const headers = Object.keys(selectedData[0]);
    const csvContent = [
      headers.join(','), // header row
      ...selectedData.map(row =>
        headers.map(field => JSON.stringify(row[field] ?? '')).join(',')
      ),
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', "all_customers");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
 }


  const handleExportToPDF = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedData = selectedRows.map(row => row.original);
  
    if (selectedData.length === 0) {
      alert("No rows selected for export.");
      return;
    }
   const doc = new jsPDF(
    {
      orientation: 'landscape', // Set to landscape
      unit: 'mm',               // Optional: mm, cm, in, px
      format: 'a4'              // Optional: a4, letter, etc.
    }
   )
   const headers = Object.keys(selectedData[0]);
   const tableHead = [headers];
   const tableBody = selectedData.map(item =>
    headers.map(header => {
      const value = item[header];
      return typeof value === 'string' || typeof value === 'number'
        ? value
        : value?.toString?.() || '';
    })
  );

    autoTable(doc,{
      head:tableHead,
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
    })
    doc.save('all_customers.pdf')
  }

  const setFileAction = (val)=>{
    setFile(val)
    handleClose()
    setLoadingExport(true)
    if(val === 0){
      handleExportToPDF()
    }else if(val === 1){
      handleExportToExcel()
    }
    else{
      handleExportToCSV()
     
    }
    setLoadingExport(false)
  }
  useEffect(() => {
   }, [rowSelection, file])
      useEffect(() => {
       setColumnOrder(columns.map((col) => col.id));
     }, [columns]);
  return (
    <>
    
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters setData={setFilteredData} tableData={data} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
        <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>           
        
          <CustomTextField
            select
            fullWidth
            label='Rows'
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <SearchByColumn table={table}/>
          </div>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>           
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
        <MenuItem  onClick={()=>setFileAction(2)}>CSV</MenuItem>
         </Menu>
          <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width="300px">
          <ColumnToggleDropdown table={table} />
          </Box>
          </CardContent>
            <Button
              variant='contained'
              // startIcon={<i className='tabler-plus' />}
              disabled={loading}
              // onClick={() => setAddUserOpen(!addUserOpen)}
               onClick={() => handleGenerateReport()}
              className='max-sm:is-full'
            >
           {loading ? "Fetching..." : "Fetch"}
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
    
        {table &&
        <Grid2 item xs={12}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
          <CustomerCharts data={data}/>
          </CardContent>
        </Card>
      </Grid2>   
  }
      <AddUserDrawer
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        userData={data}
        setData={setData}
      />
    </>
  )
}

export default UserListTable

const SearchByColumn = ({ table }) => {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const columns = table.getAllLeafColumns().filter(col => col.getCanFilter());

  const handleColumnChange = (e) => {
    const newColumn = e.target.value;

    // Clear all existing filters
    table.getAllLeafColumns().forEach((col) => {
      col.setFilterValue(undefined);
    });
  
    setSelectedColumn(newColumn);
    setSearchValue(''); // reset on column change
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (selectedColumn) {
      const column = table.getColumn(selectedColumn);
      column.setFilterValue(value);
    }
  };
  useEffect(() => {
  }, [selectedColumn])
    
  return (
    <CardContent>
      <Grid2 container spacing={6}>
        <Grid2 item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            label='Select Column'
            value={selectedColumn}
            onChange={handleColumnChange}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select a Column</MenuItem>
            {columns.map((col) => (
              <MenuItem key={col.id} value={col.id}>
                {col.id}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid2>

        <Grid2 item xs={12} sm={8}>
          <CustomTextField
            fullWidth
            label='Search'
            value={searchValue}
            onChange={handleSearchChange}
            disabled={!selectedColumn}
            placeholder={`Search in ${selectedColumn || 'column'}...`}
          />
        </Grid2>
      </Grid2>
    </CardContent>
  );
};





