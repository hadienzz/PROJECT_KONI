import localeId from '@fullcalendar/core/locales/id';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { computed } from 'vue';
import { getDayCellBackgroundColor, getEventBackgroundColor } from '../../utils/calendarColors';

interface CalendarConfig {
    enableDayCellColors?: boolean;
    enableEventHover?: boolean;
    enableDateClick?: boolean;
    page?: 'attendance' | 'activity' | 'default';
}

export function useCalendarOptions(events: any[], calendarKey: any, config: CalendarConfig = {}) {
    const { enableDayCellColors = true, enableEventHover = true, enableDateClick = true, page = 'default' } = config;

    const eventsWithBackground = computed(() =>
        events.map((event) => ({
            ...event,
            backgroundColor: getEventBackgroundColor(event.extendedProps?.status),
            borderColor: getEventBackgroundColor(event.extendedProps?.status),
            textColor: '#ffffff',
        })),
    );

    const calendarOptions = computed(() => ({
        buttonText: { today: 'Hari Ini' },
        plugins: [dayGridPlugin, interactionPlugin],
        locale: localeId,
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prevYear,prev',
            center: 'title',
            right: 'next,nextYear',
        },
        buttonIcons: {
            prev: 'chevron-left',
            next: 'chevron-right',
            today: 'today',
        },
        titleFormat: {
            year: 'numeric' as const,
            month: 'long' as const,
            day: 'numeric' as const,
        },
        selectable: page === 'activity',
        businessHours: { daysOfWeek: [1, 2, 3, 4, 5] },
        selectConstraint: 'businessHours',
        events: eventsWithBackground.value,

        dateClick: (arg: any) => {
            if (!enableDateClick) return;
            if (arg.date.getDay() === 0 || arg.date.getDay() === 6) return;

            if (page === 'activity') {
                alert('date click! ' + arg.dateStr);
            } else if (page === 'attendance') {
                console.log('Date click disabled in attendance page');
            }
        },

        eventClick: (info: any) => {
            const ext = info.event.extendedProps;

            // Behavior berbeda per halaman
            if (page === 'activity') {
                alert(
                    `Event Click - Activity Page:
          nama: ${info.event.extendedProps.userName}
          judul: ${info.event.title}
          tanggal: ${info.event.startStr}
          waktu: ${ext.startTime} - ${ext.endTime}
          aktivitas: ${ext.activity}
          foto: ${ext.photo}`,
                );
            } else if (page === 'attendance') {
                alert(
                    `Event Click - Attendance Page:
          judul: ${info.event.title}
          tanggal: ${info.event.startStr}
          waktu: ${ext.startTime} - ${ext.endTime}
          aktivitas: ${ext.activity}
          foto: ${ext.photo}`,
                );
            }
        },

        eventDidMount: (info: any) => {
            if (!enableEventHover) return;

            // Mapping warna berdasarkan status
            const statusColors: Record<string, { bg: string; text: string }> = {
                hadir: { bg: '#22c55e', text: '#fff' }, // hijau
                telat: { bg: '#f97316', text: '#fff' }, // oranye
                cuti: { bg: '#6b7280', text: '#fff' }, // abu
                ditolak: { bg: '#ef4444', text: '#fff' }, // merah
                drafted: { bg: '#3b82f6', text: '#fff' }, // biru
                disetujui: { bg: '#0ea5e9', text: '#fff' }, // cyan
            };

            const status = info.event.extendedProps?.status || '';
            const statusStyle = statusColors[status];

            if (statusStyle) {
                info.el.style.backgroundColor = statusStyle.bg;
                info.el.style.color = statusStyle.text;
            }

            info.el.addEventListener('mouseenter', () => {
                info.el.dataset.originalBg = info.el.style.backgroundColor;
                info.el.style.backgroundColor = '#1e40af';
                info.el.style.color = '#fff';
            });
            info.el.addEventListener('mouseleave', () => {
                info.el.style.backgroundColor = info.el.dataset.originalBg || '';
                info.el.style.color = '#fff';
            });
        },

        dayCellDidMount: (info: any) => {
            const day = info.date.getDay();
            let dayCellColor = '';
            let disabled = false;

            // Weekend selalu disabled dan abu-abu
            if (day === 0 || day === 6) {
                disabled = true;
                dayCellColor = '#e5e7eb';
            }
            // Hanya ubah warna cell jika enableDayCellColors = true DAN bukan halaman attendance
            if (enableDayCellColors) {
                const dateStr = info.date.toLocaleDateString('sv-SE');
                const eventOnDate = events.find((e) => e.date === dateStr);

                if (eventOnDate) {
                    dayCellColor = getDayCellBackgroundColor(eventOnDate.extendedProps?.status);
                }
            }

            // Apply warna background
            if (dayCellColor) {
                info.el.style.backgroundColor = dayCellColor;
            }

            // Handle disabled state (weekend)
            if (disabled) {
                info.el.style.pointerEvents = 'none';
                info.el.style.opacity = '0.6';
                info.el.style.cursor = 'not-allowed';
            } else {
                // Hover effect hanya jika bukan attendance page
                const originalBg = dayCellColor || '';
                info.el.addEventListener('mouseenter', () => {
                    info.el.style.backgroundColor = '#1e40af';
                    info.el.style.color = '#fff';
                });
                info.el.addEventListener('mouseleave', () => {
                    info.el.style.backgroundColor = originalBg;
                    info.el.style.color = '';
                });
            }
        },
    }));

    return { calendarOptions };
}
