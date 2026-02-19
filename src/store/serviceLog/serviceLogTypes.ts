export type ServiceType = 'planned' | 'unplanned' | 'emergency'

export interface ServiceLogFormValues {
  providerId: string
  serviceOrder: string
  carId: string
  odometer: number
  engineHours: number
  startDate: string
  endDate: string
  type: ServiceType
  serviceDescription: string
}

export interface ServiceLog extends ServiceLogFormValues {
  id: string
  isDraft?: boolean
  isSaved?: boolean
}

export interface ServiceLogState {
  drafts: ServiceLog[]
  logs: ServiceLog[]
  activeDraftId: string | null
  savingStatus: 'idle' | 'saving' | 'saved'
}
