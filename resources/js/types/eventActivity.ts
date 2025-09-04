// resources/js/types/event.ts
export type StatusType = 'disetujui' | 'ditolak' | 'drafted' | 'hadir' | 'telat' | 'cuti'

export interface ExtendedProps {
  status: StatusType
  photo?: string
  activity?: string
  points?: number
  startTime: string
  endTime: string
  userId?: number         // ID user untuk mapping 1 orang / banyak orang
  userName?: string       // Nama user (buat tampilan manager)
}

export interface EventItem {
  title: string
  date: string
  extendedProps: ExtendedProps
}

export interface CalendarOptions {
  disableDayCellColoring?: boolean
}