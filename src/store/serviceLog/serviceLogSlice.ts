import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { ServiceLog, ServiceLogState } from './serviceLogTypes'

const initialState: ServiceLogState = {
  drafts: [],
  logs: [],
  savingStatus: 'idle',
}

const serviceLogSlice = createSlice({
  name: 'serviceLog',
  initialState,
  reducers: {
    createDraft: (state, action: PayloadAction<ServiceLog>) => {
      state.drafts.push({ ...action.payload, id: uuid(), isDraft: true })
    },

    updateDraft: (state, action: PayloadAction<ServiceLog>) => {
      const index = state.drafts.findIndex(d => d.id === action.payload.id)
      if (index !== -1) {
        state.drafts[index] = action.payload
      }
    },

    deleteDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter(d => d.id !== action.payload)
    },

    clearDrafts: (state) => {
      state.drafts = []
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
