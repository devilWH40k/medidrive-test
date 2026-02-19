import * as yup from 'yup'

export const serviceLogSchema = yup.object({
  providerId: yup.string().required(),
  serviceOrder: yup.string().required(),
  carId: yup.string().required(),
  odometer: yup.number().required().positive(),
  engineHours: yup.number().required().positive(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  type: yup.string().oneOf(['planned', 'unplanned', 'emergency']).required(),
  serviceDescription: yup.string().required(),
})
