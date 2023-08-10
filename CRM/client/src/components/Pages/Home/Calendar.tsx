import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

export interface CalendarPropsInterface {
   items: Item[];
}

export interface Item {
   Id: number;
   Subject: string;
   StartTime: Date;
   EndTime: Date;
   IsAllDay: boolean;
   Status: string;
   Priority: string;
}

function Calendar(props: CalendarPropsInterface) {
   const data: object[] = props.items || [];
   const fieldsData = {
      id: 'Id',
      subject: { name: 'Subject' },
      isAllDay: { name: 'IsAllDay' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
   };
   const eventSettings = { dataSource: data, fields: fieldsData };
   return (
      <ScheduleComponent selectedDate={new Date(2023, 8, 15, 0, 0)} eventSettings={eventSettings} startHour="08:00" endHour="19:00">
         <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
   );
}

export default Calendar;
