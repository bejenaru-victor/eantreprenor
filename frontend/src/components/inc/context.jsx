import { createContext } from 'react'

export const UXContext = createContext()
export const DashboardContext = createContext({refreshData: null, setRefreshData: null})