import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

function Calendar() {
   return (
      <ScheduleComponent>
         <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
   );
}

export default Calendar;
