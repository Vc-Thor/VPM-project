import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getCriterias } from '../helpers/api/criteria'

export const useCriteriaStore = create(
  devtools(
    persist(
      (set) => {
        return {
          criteria: [],
          getCriteria: async () => {
            const { data, ok, errorMessage } = await getCriterias()
            if (ok) {
              set({ criteria: data }, false, 'FETCH_CRITERIA')
            } else {
              set({ error: errorMessage }, false, 'ERROR_FETCH_CRITERIA')
            }
          },
        }
      },
      { name: 'criteria' }
    )
  )
)
