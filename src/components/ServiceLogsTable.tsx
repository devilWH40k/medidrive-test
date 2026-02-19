import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  MenuItem,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import dayjs from 'dayjs'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { deleteServiceLog } from '../store/serviceLog/serviceLogSlice'
import { selectLogs, type ServiceLog } from '../store/serviceLog'
import { useState, useMemo } from 'react'
import EditServiceLogDialog from './EditServiceLogDialog'
import { debounce } from '../utils/debounce'

const ServiceLogsTable = () => {
  const logs = useAppSelector(selectLogs)
  const dispatch = useAppDispatch()

  const [selectedLog, setSelectedLog] = useState<ServiceLog | null>(null)
  const [open, setOpen] = useState(false)

  const [search, setSearch] = useState('')
  const [startFrom, setStartFrom] = useState('')
  const [startTo, setStartTo] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const handleEdit = (log: ServiceLog) => {
    setSelectedLog(log)
    setOpen(true)
  }

  const debouncedSetSearch = useMemo(
    () => 
      debounce((value: string) => {
        setSearch(value)
      }, 300),
    []
  )

  const filteredLogs = useMemo(() => {
    return logs
      .filter((log) => {
        const matchesSearch =
          log.providerId.toLowerCase().includes(search.toLowerCase()) ||
          log.serviceOrder.toLowerCase().includes(search.toLowerCase()) ||
          log.carId.toLowerCase().includes(search.toLowerCase())

        if (!matchesSearch) return false

        if (typeFilter && log.type !== typeFilter) return false

        const startDate = dayjs(log.startDate)

        if (startFrom && startDate.isBefore(dayjs(startFrom))) return false
        if (startTo && startDate.isAfter(dayjs(startTo))) return false

        return true
      })
  }, [logs, search, startFrom, startTo, typeFilter])

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Search"
          onChange={(e) => debouncedSetSearch(e.target.value)}
        />

        <TextField
          type="date"
          label="Start From"
          InputLabelProps={{ shrink: true }}
          value={startFrom}
          onChange={(e) => setStartFrom(e.target.value)}
        />

        <TextField
          type="date"
          label="Start To"
          InputLabelProps={{ shrink: true }}
          value={startTo}
          onChange={(e) => setStartTo(e.target.value)}
        />

        <TextField
          select
          label="Type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="planned">Planned</MenuItem>
          <MenuItem value="unplanned">Unplanned</MenuItem>
          <MenuItem value="emergency">Emergency</MenuItem>
        </TextField>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Provider</TableCell>
            <TableCell>Order</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.providerId}</TableCell>
              <TableCell>{log.serviceOrder}</TableCell>
              <TableCell>{log.type}</TableCell>
              <TableCell>{log.startDate}</TableCell>
              <TableCell>{log.endDate}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(log)}>
                  <EditIcon sx={{ color: '#1976d2' }} />
                </IconButton>
                <IconButton
                  onClick={() => dispatch(deleteServiceLog(log.id))}
                >
                  <DeleteIcon sx={{ color: '#f44336' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditServiceLogDialog
        open={open}
        onClose={() => setOpen(false)}
        log={selectedLog}
      />
    </>
  )
}

export default ServiceLogsTable
