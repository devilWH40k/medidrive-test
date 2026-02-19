export type ServiceType = 'planned' | 'unplanned' | 'emergency'

export interface ServiceLog {
  id: string
  providerId: string
  serviceOrder: string
  carId: string
  odometer: number
  engineHours: number
  startDate: string
  endDate: string
  type: ServiceType
  serviceDescription: string
  isDraft?: boolean
  isSaved?: boolean
}

export interface ServiceLogState {
  drafts: ServiceLog[]
  logs: ServiceLog[]
  savingStatus: 'idle' | 'saving' | 'saved'
}
