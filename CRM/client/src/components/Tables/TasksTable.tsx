import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Resize, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';

function TasksTable(props) {
   const pageSettings = { pageSize: 10, pageSizes: true };
   const sortComparer = (reference, comparer) => {
      if (reference === 'High' && comparer === 'Medium') return -1;
      if (reference === 'Medium' && comparer === 'Low') return -1;
   };
   const toolbarOptions = ['Search', 'Print', 'PdfExport'];
   const selectionSettings = { type: 'Multiple' };

   return (
      <>
         <GridComponent
            dataSource={props.items.data}
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
               <ColumnDirective field="customer.first" width="100" textAlign="Right" headerText="First name" />
               <ColumnDirective field="customer.last" width="100" textAlign="Right" headerText="Last name" />
               <ColumnDirective field="taskDetails.title" width="100" textAlign="Right" headerText="Task" />
               <ColumnDirective field="customer.email" width="100" textAlign="Right" headerText="Email" />
               <ColumnDirective field="customer.location.street" width="200" textAlign="Right" headerText="Address" />
               <ColumnDirective field="taskDetails.createdBy.name" width="100" textAlign="Right" headerText="First name" />
               <ColumnDirective field="taskDetails.createdBy.position" width="100" textAlign="Right" headerText="Position" />
               <ColumnDirective field="taskDetails.priority" width="100" textAlign="Right" headerText="Priority" sortComparer={sortComparer} />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar]} />
         </GridComponent>
      </>
   );
}

export default TasksTable;
