// status constant
export const STATUS = {
  DITOLAK: 'ditolak',
  DRAFTED: 'drafted',
  DISETUJUI: 'disetujui',
  HADIR: 'hadir',
  TELAT: 'telat',
  CUTI: 'cuti',
} as const

// contoh activity bawaan
export const ACTIVITIES = [
  { name: 'Meeting', points: 5 },
  { name: 'Workshop', points: 10 },
  { name: 'Coding', points: 8 },
]
