import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material'

import { serviceLogSchema } from '../schemas/serviceLogSchema'
import { useAppDispatch } from '../store/hooks'
import { editServiceLog } from '../store/serviceLog'
import type { ServiceLog } from '../store/serviceLog'

interface Props {
  open: boolean
  onClose: () => void
  log: ServiceLog | null
}

const EditServiceLogDialog = ({ open, onClose, log }: Props) => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceLogSchema),
  })

  useEffect(() => {
    if (log) reset(log)
  }, [log, reset])

  const onSubmit = (data: Partial<ServiceLog>) => {
    if (!log) return

    dispatch(
      editServiceLog({
        ...log,
        ...data,
      })
    )

    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Service Log</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={6}>
            <TextField
              label="Provider ID"
              fullWidth
              {...register('providerId')}
              error={!!errors.providerId}
              helperText={errors.providerId?.message}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Service Order"
              fullWidth
              {...register('serviceOrder')}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Car ID"
              fullWidth
              {...register('carId')}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Odometer"
              type="number"
              fullWidth
              {...register('odometer')}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Engine Hours"
              type="number"
              fullWidth
              {...register('engineHours')}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              select
              label="Type"
              fullWidth
              defaultValue=""
              {...register('type')}
            >
              <MenuItem value="planned">Planned</MenuItem>
              <MenuItem value="unplanned">Unplanned</MenuItem>
              <MenuItem value="emergency">Emergency</MenuItem>
            </TextField>
          </Grid>

          <Grid size={6}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('startDate')}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('endDate')}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Service Description"
              fullWidth
              multiline
              rows={3}
              {...register('serviceDescription')}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditServiceLogDialog
