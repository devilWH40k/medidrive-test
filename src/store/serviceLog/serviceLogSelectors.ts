import type { RootState } from "../rootReducer"

export const selectDrafts = (state: RootState) =>
  state.serviceLog.drafts

export const selectLogs = (state: RootState) =>
  state.serviceLog.logs

export const selectSavingStatus = (state: RootState) =>
  state.serviceLog.savingStatus

export const selectActiveDraftId = (state: RootState) => {
  return state.serviceLog.activeDraftId
}

export const selectActiveDraft = (state: RootState) =>
  state.serviceLog.drafts.find(
    d => d.id === state.serviceLog.activeDraftId
  )
