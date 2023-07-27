import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Resize, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';

function OffersTable(props) {
   let grid;
   const pageSettings = { pageSize: 10, pageSizes: true };
   const toolbarOptions = ['Search', 'Print', 'PdfExport'];
   const toolbarClick = (args) => {
      if (grid && args.item.id === 'grid_pdfexport') {
         grid.pdfExport();
      }
   };
   const data = [...props.items]
      .map((item) => {
         const { name, email, cell, offers } = item;
         const result = offers.map((offer) => ({
            name,
            email,
            cell,
            offer: {
               uniqueiD: offer.uniqueiD,
               dateOfCreation: offer.dateOfCreation,
               products: offer.products,
               status: offer.status,
               associatedOrder: offer.associatedOrder,
            },
         }));
         return result;
      })
      .flat();

   return (
      <>
         <GridComponent
            id="grid"
            ref={(g) => (grid = g)}
            dataSource={data}
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
               <ColumnDirective field="offer.uniqueiD" width="100" textAlign="Right" headerText="Offer number" />
               <ColumnDirective field="name" width="100" textAlign="Right" headerText="Customer name" />
               <ColumnDirective field="email" width="100" textAlign="Right" headerText="E-mail" />
               <ColumnDirective field="cell" width="100" textAlign="Right" headerText="Phone" />
               <ColumnDirective field="offer.dateOfCreation" width="100" textAlign="Right" headerText="Date of creation" />
               <ColumnDirective field="offer.associatedOrder" width="100" textAlign="Right" headerText="Associated order" />
               <ColumnDirective field="offer.status" width="100" textAlign="Right" headerText="Email" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar, PdfExport]} />
         </GridComponent>
      </>
   );
}

export default OffersTable;
