import CustomAvatar from '@core/components/mui/Avatar'
import { getInitials } from '@/utils/getInitials'
import { deepPurple, pink, blue, green } from '@mui/material/colors'
import { Checkbox, MenuItem, TextField } from '@mui/material'
export const ensurePrefix = (str, prefix) => (str.startsWith(prefix) ? str : `${prefix}${str}`)
export const withoutSuffix = (str, suffix) => (str.endsWith(suffix) ? str.slice(0, -suffix.length) : str)
export const withoutPrefix = (str, prefix) => (str.startsWith(prefix) ? str.slice(prefix.length) : str)
export const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL
const getColorFromName = (name) => {
  const colors = [deepPurple[100], pink[100], blue[100], green[100]]
  const index = name?.charCodeAt(0) % colors.length
  return colors[index]
}
export const getAvatar = params => {
  const { avatar, fullName } = params
  const initials = getInitials(fullName || "brd")
  const backgroundColor = getColorFromName(fullName || "brd")
  if (avatar) {
    return <CustomAvatar src={avatar} size={34} />
  }
  return (
    <CustomAvatar size={34} sx={{ bgcolor: backgroundColor }}>
      {initials}
    </CustomAvatar>
  ) 
}

export const ColumnToggleDropdown = ({ table }) => {
  const allColumns = table.getAllLeafColumns()
  .filter(col => col.id !== 'select');
  let length = allColumns.length
  const allColumnIds = allColumns.map(col => col.id);
  const visibleColumnIds = allColumns.filter(col => col.getIsVisible()).map(col => col.id);
  const isAllSelected = visibleColumnIds.length === allColumnIds.length;

  const handleChange = (event) => {
    const selected = event.target.value;
    const filtered = selected.filter(item => item !== 'all');
    if (selected.includes('all') || filtered.length === length) {
     console.log("if")
      const shouldSelectAll = visibleColumnIds.length !== allColumnIds.length;
      console.log("shouldSelectAll", shouldSelectAll)
      if(shouldSelectAll){
        allColumns.forEach((column) => {
          column.toggleVisibility(shouldSelectAll);
        });
      }else if(!shouldSelectAll){
        allColumns.forEach((column) => {
         column.toggleVisibility(shouldSelectAll);
       });
     }
      else if(!shouldSelectAll && visibleColumnIds.length == allColumnIds.length){
        console.log("only one unselect")
        // allColumns.forEach((column) => {
        //   column.toggleVisibility(shouldSelectAll);
        // });
      }
    
    } else {
      console.log("else")
      allColumns.forEach((column) => {
        column.toggleVisibility(selected.includes(column.id));
      });
    }
  };

  return (
    <TextField
      select
      label="Columns"
      value={isAllSelected ? ['all', ...visibleColumnIds] : visibleColumnIds}
      onChange={handleChange}
      fullWidth
      slotProps={{
        select: {
          multiple: true,
          renderValue: (selected) => {
            if (selected.length === 0) return 'None';
            if (selected.includes('all')) return 'All Columns';
            return selected.join(', ');
          },
        }


      }}
    >
      <MenuItem value="all">
        <Checkbox
          checked={isAllSelected}
          indeterminate={visibleColumnIds.length > 0 && !isAllSelected}
        />
        Select All
      </MenuItem>

      {allColumns.map((column) => (
        <MenuItem key={column.id} value={column.id}>
          <Checkbox checked={visibleColumnIds.includes(column.id)} />
          {column.id}
        </MenuItem>
      ))}
    </TextField>
  );
};