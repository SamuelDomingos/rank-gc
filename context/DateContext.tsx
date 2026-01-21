"use client"

import React, { createContext, useContext, useState } from "react"

type DateContextType = {
  month: number
  year: number
  setMonth: (month: number) => void
  setYear: (year: number) => void
}

const DateContext = createContext<DateContextType | undefined>(undefined)

export function DateProvider({ children }: { children: React.ReactNode }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  return (
    <DateContext.Provider value={{ month, year, setMonth, setYear }}>
      {children}
    </DateContext.Provider>
  )
}

export function useDate() {
  const context = useContext(DateContext)
  if (!context) {
    throw new Error("useDate must be used within a DateProvider")
  }
  return context
}