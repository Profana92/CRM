import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Resize, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';

function OffersTable(props) {
   console.log(props.items);
   let grid;
   const pageSettings = { pageSize: 10, pageSizes: true };
   const toolbarOptions = ['Search', 'Print', 'PdfExport'];
   const toolbarClick = (args) => {
      if (grid && args.item.id === 'grid_pdfexport') {
         grid.pdfExport();
      }
   };
   // if (props.items) {
   //    const data = props.items
   //       .map((item) => {
   //          const { name, email, cell, offers } = item;
   //          const result = offers.map((offer) => ({
   //             name,
   //             email,
   //             cell,
   //             offer: {
   //                uniqueiD: offer.uniqueiD,
   //                dateOfCreation: offer.dateOfCreation,
   //                products: offer.products,
   //                status: offer.status,
   //                associatedOrder: offer.associatedOrder,
   //             },
   //          }));
   //          return result;
   //       })
   //       .flat();
   // }
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
               <ColumnDirective field="offerNumber" width="100" textAlign="Right" headerText="Offer number" />
               <ColumnDirective field="clientDetails.name" width="100" textAlign="Right" headerText="Customer name" />
               <ColumnDirective field="clientDetails.email" width="100" textAlign="Right" headerText="E-mail" />
               <ColumnDirective field="clientDetails.cell" width="100" textAlign="Right" headerText="Phone" />
               <ColumnDirective field="offer.status" width="100" textAlign="Right" headerText="Status" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar, PdfExport]} />
         </GridComponent>
      </>
   );
}

export default OffersTable;
