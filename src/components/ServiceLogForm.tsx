import { useEffect } from 'react'

import { Box, Grid, TextField, Button, MenuItem, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  createDraft,
  updateDraft,
  createServiceLog,
  clearDrafts,
  setSavingStatus,
  setActiveDraft,
} from '../store/serviceLog/serviceLogSlice'
import { serviceLogSchema } from '../schemas/serviceLogSchema'
import { selectActiveDraft, selectActiveDraftId, selectSavingStatus } from '../store/serviceLog'
import type { ServiceLog, ServiceLogFormValues } from '../store/serviceLog/serviceLogTypes'

const defaultValues: ServiceLog = {
  id: '',
  providerId: '',
  serviceOrder: '',
  carId: '',
  odometer: 0,
  engineHours: 0,
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
  type: 'planned',
  serviceDescription: '',
}

const ServiceLogForm = () => {
  const dispatch = useAppDispatch()
  const savingStatus = useAppSelector(selectSavingStatus)
  const activeDraft = useAppSelector(selectActiveDraft)
  const activeDraftId = useAppSelector(selectActiveDraftId)

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ServiceLogFormValues>({
    defaultValues,
    resolver: yupResolver(serviceLogSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const startDate = watch('startDate')

  useEffect(() => {
    if (startDate) {
      const nextDay = dayjs(startDate).add(1, 'day').format('YYYY-MM-DD')
      setValue('endDate', nextDay)
    }
  }, [startDate, setValue])

  useEffect(() => {
    if (!activeDraft) return

    reset(activeDraft)
  }, [activeDraft, reset])


  useEffect(() => {
    if (!activeDraftId) return

    const subscription = watch((value, info) => {
      if (info.type !== 'change') return

      dispatch(setSavingStatus('saving'))

      const timeout = setTimeout(() => {
        dispatch(
          updateDraft({
            id: activeDraftId,
            changes: value,
          })
        )

        dispatch(setSavingStatus('saved'))
      }, 300)

      const idleTimeout = setTimeout(() => {
        dispatch(setSavingStatus('idle'))
      }, 2000)

      return () => {
        clearTimeout(timeout)
        clearTimeout(idleTimeout)
      }
    })

    return () => subscription.unsubscribe()
  }, [activeDraftId, dispatch, watch])



  const onCreateDraft = () => {
    const values = getValues()

    const id = uuid()

    dispatch(
      createDraft({
        ...values,
        id,
        isDraft: true,
      })
    )

    dispatch(setActiveDraft(id))
  }

  const onCreateServiceLog = (data: ServiceLogFormValues) => {
    dispatch(createServiceLog({ ...data, id: uuid(), isDraft: false }))
    reset(defaultValues)
  }

  return (
    <Box component="form">
      <Grid container spacing={2}>
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
          <TextField label="Car ID" fullWidth {...register('carId')} />
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

        <Grid size={12}>
          <TextField
            label="Service Description"
            fullWidth
            multiline
            rows={3}
            {...register('serviceDescription')}
          />
        </Grid>

        <Grid size={12}>
          <Typography variant="body2">
            Status: {savingStatus === 'saving' && 'Saving...'}
                    {savingStatus === 'saved' && 'Draft saved ✓'}
          </Typography>
        </Grid>

        <Grid size={12} sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={onCreateDraft}>
            Create Draft
          </Button>

          <Button variant="outlined" color="error" onClick={() => dispatch(clearDrafts())}>
            Clear All Drafts
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onCreateServiceLog)}
          >
            Create Service Log
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ServiceLogForm
