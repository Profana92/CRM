import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Resize, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { useEffect, useState } from 'react';
function TasksTable(props) {
   const pageSettings = { pageSize: 10, pageSizes: true };
   const sortComparer = (reference, comparer) => {
      if (reference === 'High' && comparer === 'Medium') return -1;
      if (reference === 'Medium' && comparer === 'Low') return 0;
   };
   const toolbarOptions = ['Search', 'Print', 'PdfExport'];
   const selectionSettings = { type: 'Multiple' };
   const [tasksDataCombined, setTasksDataCombined] = useState({});
   // Client ids extraction into array of numbers
   const clientsIds = props.items.data.map((item) => {
      return item.clientId;
   });
   async function getClientsData() {
      // using client ids to extract clients Data.
      try {
         const response = await axios.get(`/api/clients`);
         let result = [];
         for (let id of clientsIds) {
            result.push(
               ...response.data.filter((item) => {
                  return item.id == id;
               }),
            );
         }
         let combinedResult = [];
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
