export const getEventBackgroundColor = (status?: string) => {
  switch (status) {
    case 'ditolak': return '#ef4444'
    case 'drafted': return '#f97316'
    case 'disetujui': return '#22c55e'
    default: return '#6b7280'
  }
}

export const getDayCellBackgroundColor = (status?: string) => {
  switch (status) {
    case 'Tidak Hadir': return '#ff0000'
    case 'telat': return '#ffd966'
    case 'hadir': return '#6aa84f'
    default: return '#f3f4f6'
  }
}
