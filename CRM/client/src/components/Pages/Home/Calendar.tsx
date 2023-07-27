import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

function Calendar(props) {
   // console.log(props);

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
