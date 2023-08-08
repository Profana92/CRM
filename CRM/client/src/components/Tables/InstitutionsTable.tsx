import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Resize, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';

function InstitutionsTable(props) {
   console.log('table data', props.items);
   let grid;
   const pageSettings = { pageSize: 10, pageSizes: true };
   const toolbarOptions = ['Search', 'Print', 'PdfExport'];
   const toolbarClick = (args) => {
      if (grid && args.item.id === 'grid_pdfexport') {
         grid.pdfExport();
      }
   };

   return (
      <>
         <GridComponent
            id="grid"
            ref={(g) => (grid = g)}
            dataSource={props.items}
            toolbarClick={toolbarClick}
            allowPaging={true}
            pageSettings={pageSettings}
            allowSorting={true}
            allowResizing={true}
            toolbar={toolbarOptions}
            selectionSettings={{ type: 'Multiple' }}
            allowPdfExport={true}
            loadingIndicator={{ indicatorType: 'Shimmer' }}
         >
            <ColumnsDirective>
               <ColumnDirective field="id" width="100" textAlign="Right" headerText="ID" />
               <ColumnDirective field="name" width="100" textAlign="Right" headerText="Name" />
               <ColumnDirective field="phone" width="100" textAlign="Right" headerText="Phone" />
               <ColumnDirective field="location.street" width="100" textAlign="Right" headerText="Street" />
               <ColumnDirective field="location.city" width="100" textAlign="Right" headerText="City" />
               <ColumnDirective field="location.country" width="100" textAlign="Right" headerText="Country" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar, PdfExport]} />
         </GridComponent>
      </>
   );
}

export default InstitutionsTable;
