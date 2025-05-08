'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { Grid, styled } from '@mui/system'
import MuiAlert from '@mui/material/Alert'
import {dbUrl, getAvatar, ColumnToggleDropdown} from "../../../../../../utils/string"
import Menu from '@mui/material/Menu';
import { TextField, List, ListItem, ListItemText, Box, Paper, FormControlLabel, FormGroup, FormControl, InputLabel, Select } from '@mui/material';
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
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
    ColumnDef,
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
import TableFilters from '../../../../../../views/apps/user/list/TableFilters'
import AddUserDrawer from '../../../../../../views/apps/user/list/AddUserDrawer'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import { getLocalizedUrl } from '@/utils/i18n'
import tableStyles from '@core/styles/table.module.css'
import { CardActions, CardContent, Divider } from '@mui/material'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import select from '@/@core/theme/overrides/select'
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, SortableContext, useSortable } from '@dnd-kit/sortable';
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
 const apiTypes = [
    { label: 'List of Offers', value: 'offers', requiresDate: false },
    { label: 'List of Contracts', value: 'contracts', requiresDate: true },
    { label: 'List of Disbursements', value: 'disbursements', requiresDate: true }
  ]
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
  const [loadingExport, setLoadingExport] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedApi, setSelectedApi] = useState('offers')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnOrder, setColumnOrder] = useState();

  const requiresDate = apiTypes.find(api => api.value === selectedApi)?.requiresDate

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const optionalColumns = useMemo(() => {
    if (selectedApi === 'offers') {
      return [
        columnHelper.accessor('OFFER_DATE', {
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
          cell: ({ row }) => <Typography>{row.original.OFFER_DATE?.slice(0, 10)}</Typography>
        }),
        columnHelper.accessor('OFFER_NO', {
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
          cell: ({ row }) => <Typography>{row.original.OFFER_NO}</Typography>
        })
      ]
    }
    //  else if (selectedApi === 'contracts') {
    //   return [
    //     columnHelper.accessor('LEASE_DATE', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //             control={
    //               <Checkbox
    //                 checked={column.getIsVisible()}
    //                 onChange={column.getToggleVisibilityHandler()}
    //                 size="small"
    //               />
    //             }
    //             label={column.id}
    //           />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.LEASE_DATE?.slice(0, 10)}</Typography>
    //     }),
    //     columnHelper.accessor('LEASE_NO', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //             control={
    //               <Checkbox
    //                 checked={column.getIsVisible()}
    //                 onChange={column.getToggleVisibilityHandler()}
    //                 size="small"
    //               />
    //             }
    //             label={column.id}
    //           />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.LEASE_NO}</Typography>
    //     })
    //   ]
    // } else if (selectedApi === 'disbursements') {
    //   return [
    //     columnHelper.accessor('DISB_DATE', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //         control={
    //           <Checkbox
    //             checked={column.getIsVisible()}
    //             onChange={column.getToggleVisibilityHandler()}
    //             size="small"
    //           />
    //         }
    //         label={column.id}
    //       />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.DISB_DT?.slice(0, 10)}</Typography>
    //     }),
    //     columnHelper.accessor('ASSET_DESCRIPTION', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //             control={
    //               <Checkbox
    //                 checked={column.getIsVisible()}
    //                 onChange={column.getToggleVisibilityHandler()}
    //                 size="small"
    //               />
    //             }
    //             label={column.id}
    //           />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.ASSET_DESCRIPTION}</Typography>
    //     })
    //     ,
    //     columnHelper.accessor('LEASE_DATE', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //             control={
    //               <Checkbox
    //                 checked={column.getIsVisible()}
    //                 onChange={column.getToggleVisibilityHandler()}
    //                 size="small"
    //               />
    //             }
    //             label={column.id}
    //           />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.LEASE_DATE}</Typography>
    //     })
    //     ,
    //     columnHelper.accessor('LEASE_NO', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //         control={
    //           <Checkbox
    //             checked={column.getIsVisible()}
    //             onChange={column.getToggleVisibilityHandler()}
    //             size="small"
    //           />
    //         }
    //         label={column.id}
    //       />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.LEASE_NO}</Typography>
    //     })
    //     ,
    //     columnHelper.accessor('LEASE_STATUS', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //             control={
    //               <Checkbox
    //                 checked={column.getIsVisible()}
    //                 onChange={column.getToggleVisibilityHandler()}
    //                 size="small"
    //               />
    //             }
    //             label={column.id}
    //           />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.LEASE_STATUS}</Typography>
    //     })
    //     ,
    //     columnHelper.accessor('LEASE_TYPE', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //         control={
    //           <Checkbox
    //             checked={column.getIsVisible()}
    //             onChange={column.getToggleVisibilityHandler()}
    //             size="small"
    //           />
    //         }
    //         label={column.id}
    //       />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.LEASE_TYPE}</Typography>
    //     })
    //     ,
    //     columnHelper.accessor('OLD_LEASENO', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //         control={
    //           <Checkbox
    //             checked={column.getIsVisible()}
    //             onChange={column.getToggleVisibilityHandler()}
    //             size="small"
    //           />
    //         }
    //         label={column.id}
    //       />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.OLD_LEASENO}</Typography>
    //     })
    //     ,
    //     columnHelper.accessor('TERMDATE', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //         control={
    //           <Checkbox
    //             checked={column.getIsVisible()}
    //             onChange={column.getToggleVisibilityHandler()}
    //             size="small"
    //           />
    //         }
    //         label={column.id}
    //       />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.TERMDATE?.slice(0, 10)}</Typography>
    //     })
    //     ,
    //     columnHelper.accessor('TERMTYPE', {
    //         header: ({ column }) => (
    //             <FormControlLabel
    //             control={
    //               <Checkbox
    //                 checked={column.getIsVisible()}
    //                 onChange={column.getToggleVisibilityHandler()}
    //                 size="small"
    //               />
    //             }
    //             label={column.id}
    //           />
    //           ),
    //       cell: ({ row }) => <Typography>{row.original.TERMTYPE}</Typography>
    //     })

    //   ]
    // }
  
    return []
  }, [selectedApi])
const baseColumns = useMemo(
      () => [
        // {
        //   id: 'select',
        //   header: ({ column }) => (
        //     <div>
        //     {/* <input
        //       type="checkbox"
        //       checked={column.getIsVisible()}
        //       onChange={column.getToggleVisibilityHandler()}
        //     />{' '}
        //     Select */}
        //   </div>
        //   ),
        // //   cell: ({ row }) => ()
        // },
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
                </div>
            </div>
          )
        }),
        columnHelper.accessor('Customer #', {
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
          cell: ({ row }) => <Typography>{row.original.CUST_NO}</Typography>
        }),
        columnHelper.accessor('ACCT_MGR', {
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
          cell: ({ row }) => <Typography>{row.original.ACCT_MGR}</Typography>
        }),
        // columnHelper.accessor('DOC_FEE', {
        //     header: ({ column }) => (
        //         <FormControlLabel
        //         control={
        //           <Checkbox
        //             checked={column.getIsVisible()}
        //             onChange={column.getToggleVisibilityHandler()}
        //             size="small"
        //           />
        //         }
        //         label={column.id}
        //       />
        //       ),
        //   cell: ({ row }) => <Typography>{row.original.DOC_FEE}</Typography>
        // }),
        // columnHelper.accessor('FE_FEE_PC', {
        //     header: ({ column }) => (
        //         <FormControlLabel
        //     control={
        //       <Checkbox
        //         checked={column.getIsVisible()}
        //         onChange={column.getToggleVisibilityHandler()}
        //         size="small"
        //       />
        //     }
        //     label={column.id}
        //   />
        //       ),
        //   cell: ({ row }) => <Typography>{row.original.FE_FEE_PC}</Typography>
        // }),
        // columnHelper.accessor('FIRST_RENT', {
        //     header: ({ column }) => (
        //         <FormControlLabel
        //         control={
        //           <Checkbox
        //             checked={column.getIsVisible()}
        //             onChange={column.getToggleVisibilityHandler()}
        //             size="small"
        //           />
        //         }
        //         label={column.id}
        //       />
        //       ),
        //   cell: ({ row }) => <Typography>{row.original.FIRST_RENT}</Typography>
        // }),
        // columnHelper.accessor('irr', {
        //     header: ({ column }) => (        
        //     <div>
        //     <input
        //       type="checkbox"
        //       checked={column.getIsVisible()}
        //       onChange={column.getToggleVisibilityHandler()}
        //     />{' '}
        //    {column.id}
        //   </div>
        //       ),
        //   cell: ({ row }) => <Typography>{row.original.IRR}</Typography>
        // }),
        // columnHelper.accessor('LEASE_AMT', {
        //     header: ({ column }) => (
        //         <FormControlLabel
        //     control={
        //       <Checkbox
        //         checked={column.getIsVisible()}
        //         onChange={column.getToggleVisibilityHandler()}
        //         size="small"
        //       />
        //     }
        //     label={column.id}
        //   />
        //       ),
        //   cell: ({ row }) => <Typography>{row.original.LEASE_AMT}</Typography>
        // }),
        // columnHelper.accessor('PERIOD_MM', {
        //     header: ({ column }) => (
        //         <FormControlLabel
        //         control={
        //           <Checkbox
        //             checked={column.getIsVisible()}
        //             onChange={column.getToggleVisibilityHandler()}
        //             size="small"
        //           />
        //         }
        //         label={column.id}
        //       />
        //       ),
        //   cell: ({ row }) => <Typography>{row.original.PERIOD_MM}</Typography>
        // }),
        // columnHelper.accessor('SEC_DPST_PC', {
        //     header: ({ column }) => (
        //         <FormControlLabel
        //     control={
        //       <Checkbox
        //         checked={column.getIsVisible()}
        //         onChange={column.getToggleVisibilityHandler()}
        //         size="small"
        //       />
        //     }
        //     label={column.id}
        //   />
        //       ),
        //   cell: ({ row }) => <Typography>{row.original.SEC_DPST_PC}</Typography>
        // }),
        // columnHelper.accessor('SLVG_VAL_PC', {
        //     header: ({ column }) => (
        //         <FormControlLabel
        //         control={
        //           <Checkbox
        //             checked={column.getIsVisible()}
        //             onChange={column.getToggleVisibilityHandler()}
        //             size="small"
        //           />
        //         }
        //         label={column.id}
        //       />
        //       ),
        //   cell: ({ row }) => <Typography>{row.original.SLVG_VAL_PC}</Typography>
        // }),

      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [data, filteredData]
    )
  const allColumns = useMemo(() => [...baseColumns, ...optionalColumns], [baseColumns, optionalColumns])

  const table = useReactTable({
    data: filteredData,
    columns: allColumns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter, columnVisibility },
    initialState: {
      pagination: { pageSize: 10 },
      columnOrder
    },
    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
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
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;
  // Handle column drag start and end
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const newColumnOrder = [...columnOrder];
      const oldIndex = columnOrder.indexOf(active.id);
      const newIndex = columnOrder.indexOf(over.id);
      newColumnOrder.splice(oldIndex, 1);
      newColumnOrder.splice(newIndex, 0, active.id);
      setColumnOrder(newColumnOrder);
    }
  };
 const handleGenerateReport = async () => {
    setLoading(true)
    if (requiresDate && (!startDate || !endDate)) {
        alert('Please select both start and end dates')
        return
      }
      let url=""
      if (selectedApi === 'offers') {
       url =  `${dbUrl}/list-of-offers`
      } else if (selectedApi === 'contracts') {
        url =  `${dbUrl}/list-of-contracts?pdt1=${startDate}&p_dt2=${endDate}`
      } else if (selectedApi === 'disbursements') {
        url =  `${dbUrl}/list-of-disbursment?pdt1=${startDate}&p_dt2=${endDate}`
      }
      try {
        const response = await fetch(url)
        const result = await response.json()
        if (result.length === 0) {
          console.log('No data found for the given criteria')
        }
         console.log('result',result)
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
   const doc = new jsPDF(
    {
        orientation: 'landscape', // Set to landscape
        unit: 'mm',               // Optional: mm, cm, in, px
        format: 'a4'              // Optional: a4, letter, etc.
      }
   )
const tableBody = data.map((item) => [
  item.CUST_NO,
  item.NAME,
  item.CLIENT_TYPE_CODE,
  item.EMAIL,
  item.TEL_NO,
  item.INTRODUCED_BY,
  item.ACC_OPEN_DATE?.slice(0, 10),
  item.PERIOD_MM,
item.LEASE_AMT,
item.SEC_DPST_PC,
item.SLVG_VAL_PC,
item.FIRST_RENT,
item.IRR,
item.DOC_FEE,
item.FE_FEE_PC
]);
    autoTable(doc,{
      head:[['Cu#', 'Name', 'Type', 'Email', 'Phone', 'Introduced By', 'Opened at', "PERIOD_MM", "LEASE_AMT", "SEC_DPST_PC", "SLVG_VAL_PC", "FIRST_RENT", "IRR", "DOC_FEE", "FE_FEE_PC"]],
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
    //   columnStyles: {
    //     0: { cellWidth: 15 }, // Customer No
    //     1: { cellWidth: 30 }, // Name
    //     2: { cellWidth: 10 }, // Type
    //     3: { cellWidth: 30 }, // Email
    //     4: { cellWidth: 30 }, // Phone
    //     5: { cellWidth: 20 }, // Introduced By
    //     6: { cellWidth: 35 }, // Opened
    //     7: { cellWidth: 10 }, // Opened
    //     8: { cellWidth: 15 }, // Opened
    //   },
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
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };
  
  const handleDrop = (e, targetId) => {
    const draggedId = e.dataTransfer.getData('text/plain');
    const newOrder = [...columnOrder];
    const fromIndex = newOrder.indexOf(draggedId);
    const toIndex = newOrder.indexOf(targetId);
    newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, draggedId);
    setColumnOrder(newOrder);
  };
  useEffect(() => {

   }, [ file])

   useEffect(() => {
    setColumnOrder(allColumns.map((col) => col.id));
  }, [allColumns]);
   useEffect(() => {
setData([])
   }, [ selectedApi])
  return (
    <>
        <Card>
      <CardHeader title='Lists' />

        <CardContent>
        <Box display="flex" flexDirection="column" gap={2} width="300px">
      <TextField
        select
        label="API Type"
        value={selectedApi}
        onChange={(e) => setSelectedApi(e.target.value)}
      >
        {apiTypes.map((api) => (
          <MenuItem key={api.value} value={api.value}>
            {api.label}
          </MenuItem>
        ))}
      </TextField>

      {requiresDate && (
        <>
          <TextField
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </>
      )}

      <Button variant="contained" onClick={()=> handleGenerateReport()}>
      {loading ? "Fetching..." : "Fetch Lists"}
      </Button>
    </Box>
          <Grid container spacing={6}>
          </Grid>
        </CardContent>
        {/* <Divider /> */}
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters setData={setFilteredData} tableData={data} text={"Select"} show={false} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table &&  table.getState().pagination.pageSize}
            onChange={e => table && table.setPageSize(Number(e.target.value))}
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
          </div>
        </div>
        <CardContent>
 <Box display="flex" flexDirection="column" gap={2} width="300px">
 <ColumnToggleDropdown table={table} />
 </Box>
 </CardContent>

        <div className='overflow-x-auto'>
            
          <table className={tableStyles.table}>
            <thead>
              { table && table.getHeaderGroups().map(headerGroup => (
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
            { table && table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={ table && table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                 {table && table
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
        {
            table &&     <TablePagination
            component={() => <TablePaginationComponent table={table} />}
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            onPageChange={(_, page) => {table.setPageIndex(page)}}
          />
        }
    
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

export default UserListTable

const ColumnToggleDropdown = ({ table }) => {
    const visibleColumnIds = table
    .getAllLeafColumns()
    .filter(col => col.getIsVisible())
    .map(col => col.id);

  const handleChange = (event) => {
    const selected = event.target.value;

    table.getAllLeafColumns().forEach((column) => {
      column.toggleVisibility(selected.includes(column.id));
    });
  };
  return (
    <>
    <TextField
        select
        label="Columns"
        value={visibleColumnIds}
        onChange={handleChange}
        fullWidth
        slotProps={{
            select: {
              multiple: true,
              renderValue: (selected) => selected[0]
            }
          }}
      >
        {table.getAllLeafColumns().map((column,i) =>{
            return(
          <MenuItem key={i} value={column.id}>
            <Checkbox checked={visibleColumnIds.includes(column.id)} />
            {column.id}
          </MenuItem>
        )
})}
      </TextField></>
  )
}

