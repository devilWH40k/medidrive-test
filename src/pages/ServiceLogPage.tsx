import { Box, Typography, Paper } from '@mui/material'

import ServiceLogForm from '../components/ServiceLogForm'
import ServiceLogsTable from '../components/ServiceLogsTable'
import DraftsTable from '../components/DraftsTable'

const ServiceLogPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Service Logs Management
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <ServiceLogForm />
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <DraftsTable />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <ServiceLogsTable />
      </Paper>
    </Box>
  )
}

export default ServiceLogPage
