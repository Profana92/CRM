import {
   ColumnDirective,
   ColumnsDirective,
   Filter,
   GridComponent,
   Group,
   Inject,
   Page,
   Sort,
   Resize,
   Toolbar,
   SelectionType,
} from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { useEffect, useState } from 'react';
export interface Clientid {
   belongsTo: number;
   clientId: number;
   taskId: number;
   title: string;
   dateOfCreation: Date;
   priority: string;
   createdBy: number;
   calendarData: CalendarData;
}

export interface CalendarData {
   Id: number;
   Subject: string;
   StartTime: string;
   EndTime: string;
   IsAllDay: boolean;
   Status: string;
   Priority: string;
}
export interface Props {
   items: Items;
}

export interface Items {
   data: Datum[];
   status: number;
   statusText: string;
   headers: ItemsHeaders;
   config: Config;
   request: Request;
}

export interface Config {
   transitional: Transitional;
   adapter: string[];
   transformRequest: null[];
   transformResponse: null[];
   timeout: number;
   xsrfCookieName: string;
   xsrfHeaderName: string;
   maxContentLength: number;
   maxBodyLength: number;
   env: Request;
   headers: ConfigHeaders;
   method: string;
   url: string;
}

export interface Request {}

export interface ConfigHeaders {
   Accept: string;
}

export interface Transitional {
   silentJSONParsing: boolean;
   forcedJSONParsing: boolean;
   clarifyTimeoutError: boolean;
}

export interface Datum {
   belongsTo: number;
   clientId: number;
   taskId: number;
   title: string;
   dateOfCreation: Date;
   priority: string;
   createdBy: number;
   calendarData: CalendarData;
}

export interface CalendarData {
   Id: number;
   Subject: string;
   StartTime: string;
   EndTime: string;
   IsAllDay: boolean;
   Status: string;
   Priority: string;
}

export interface ItemsHeaders {
   'access-control-allow-origin': string;
   'content-length': string;
   'content-type': string;
   date: string;
   etag: string;
   'x-powered-by': string;
}
export interface ResponseItemInterface {
   id: number;
   name: string;
   location: Location;
   email: string;
   login: Login;
   phone: string;
   cell: string;
   picture: Picture;
   offers: string[];
   orders: string[];
}

export interface Location {
   street: string;
   city: string;
   country: string;
   postcode: string;
}

export interface Login {
   uuid: string;
   username: string;
   password: string;
}

export interface Picture {
   large: string;
   medium: string;
   thumbnail: string;
}

function TasksTable(props: Props) {
   const pageSettings = { pageSize: 10, pageSizes: true };
   const sortComparer = (reference: string, comparer: string) => {
      if (reference === 'High' && comparer === 'Medium') return -1;
      if (reference === 'Medium' && comparer === 'Low') return 0;
   };
   const toolbarOptions = ['Search', 'Print', 'PdfExport'];
   const selectionSettings = { type: 'Multiple' as SelectionType };
   const [tasksDataCombined, setTasksDataCombined] = useState({});
   // Client ids extraction into array of numbers
   const clientsIds = props.items.data.map((item: Clientid) => {
      return item.clientId;
   });
   async function getClientsData() {
      // using client ids to extract clients Data.
      try {
         const response = await axios.get(`/api/clients`);
         let result = [];
         for (let id of clientsIds) {
            result.push(
               ...response.data.filter((item: ResponseItemInterface) => {
                  return item.id == id;
               }),
            );
         }
         let combinedResult: Object[] = [];
         for (let task of props.items.data) {
            const creatorData = await axios.get(`/api/users?id=${task.createdBy}`);

            const user = result.find((item) => {
               return item.id === task.clientId;
            });

            combinedResult = [
               ...combinedResult,
               {
                  ...task,
                  user: { ...user },
                  creator: { ...creatorData.data[0], nameCombined: `${creatorData.data[0].firstname} ${creatorData.data[0].lastName}` },
               },
            ];
         }
         setTasksDataCombined(combinedResult);
      } catch (error) {
         console.error(error);
      }
   }
   useEffect(() => {
      getClientsData();
   }, []);

   return (
      <>
         <GridComponent
            dataSource={tasksDataCombined}
            allowPaging={true}
            pageSettings={pageSettings}
            allowSorting={true}
            allowResizing={true}
            toolbar={toolbarOptions}
            selectionSettings={selectionSettings}
            allowPdfExport={true}
            loadingIndicator={{ indicatorType: 'Shimmer' }}
         >
            <ColumnsDirective>
               <ColumnDirective field="user.name" width="100" textAlign="Right" headerText="Customer name" />
               <ColumnDirective field="title" width="100" textAlign="Right" headerText="Task" />
               <ColumnDirective field="user.email" width="100" textAlign="Right" headerText="Email" />
               <ColumnDirective field="user.location.city" width="200" textAlign="Right" headerText="Address" />
               <ColumnDirective field="creator.nameCombined" width="100" textAlign="Right" headerText="First name" />
               <ColumnDirective field="creator.position" width="100" textAlign="Right" headerText="Position" />
               <ColumnDirective field="priority" width="100" textAlign="Right" headerText="Priority" sortComparer={sortComparer} />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar]} />
         </GridComponent>
      </>
   );
}

export default TasksTable;
