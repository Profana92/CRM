import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Resize, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';

function OrdersTable(props) {
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
               <ColumnDirective field="number" width="100" textAlign="Right" headerText="Order number" />
               <ColumnDirective field="client.name" width="100" textAlign="Right" headerText="Customer name" />
               <ColumnDirective field="client.email" width="100" textAlign="Right" headerText="E-mail" />
               <ColumnDirective field="client.cell" width="100" textAlign="Right" headerText="Phone" />
               <ColumnDirective field="orderDetails.associatedOffer" width="100" textAlign="Right" headerText="Associated offer" />
               <ColumnDirective field="orderDetails.status" width="100" textAlign="Right" headerText="Status" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar, PdfExport]} />
         </GridComponent>
      </>
   );
}

export default OrdersTable;
