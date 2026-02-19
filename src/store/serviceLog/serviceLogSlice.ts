import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { ServiceLog, ServiceLogState } from './serviceLogTypes'

const initialState: ServiceLogState = {
  drafts: [],
  logs: [],
  activeDraftId: null,
  savingStatus: 'idle',
}

const serviceLogSlice = createSlice({
  name: 'serviceLog',
  initialState,
  reducers: {
    setActiveDraft: (state, action: PayloadAction<string | null>) => {
      state.activeDraftId = action.payload
    },
    
    createDraft: (state, action: PayloadAction<ServiceLog>) => {
      state.drafts.push(action.payload)
      state.activeDraftId = action.payload.id
    },


    updateDraft: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<ServiceLog> }>
    ) => {
      const draft = state.drafts.find(d => d.id === action.payload.id)
      if (draft) {
        Object.assign(draft, action.payload.changes)
      }
    },

    deleteDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter(d => d.id !== action.payload)

      if (state.activeDraftId === action.payload) {
        state.activeDraftId = null
      }
    },

    clearDrafts: (state) => {
      state.drafts = []
      state.activeDraftId = null
    },

    createServiceLog: (state, action: PayloadAction<ServiceLog>) => {
      state.logs.push({ ...action.payload, isDraft: false })
    },

    editServiceLog: (state, action: PayloadAction<ServiceLog>) => {
      const index = state.logs.findIndex(l => l.id === action.payload.id)
      if (index !== -1) {
        state.logs[index] = action.payload
      }
    },

    deleteServiceLog: (state, action: PayloadAction<string>) => {
      state.logs = state.logs.filter(l => l.id !== action.payload)
    },

    setSavingStatus: (
      state,
      action: PayloadAction<'idle' | 'saving' | 'saved'>
    ) => {
      state.savingStatus = action.payload
    },
  },
})

export const {
  setActiveDraft,
  createDraft,
  updateDraft,
  deleteDraft,
  clearDrafts,
  createServiceLog,
  editServiceLog,
  deleteServiceLog,
  setSavingStatus,
} = serviceLogSlice.actions

export default serviceLogSlice.reducer
