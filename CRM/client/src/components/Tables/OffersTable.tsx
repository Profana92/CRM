import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Resize, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';
export interface Props {
   items: Item[];
}

export interface Item {
   offerNumber: string;
   clientDetails: ClientDetails;
   offerData: OfferData;
}

export interface ClientDetails {
   id: number;
   name: string;
   location: Location;
   email: string;
   loginData?: Login;
   phone: string;
   cell: string;
   picture: Picture;
   offers: string[];
   orders: string[];
   login?: Login;
}

export interface Location {
   street: string;
   city: string;
   country: string;
   postcode: number | string;
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

export interface OfferData {
   uniqueiD: string;
   dateOfCreation: string;
   products: Product[];
   status: string;
   associatedOrder: string;
}

export interface Product {
   name: string;
   amount: number;
}

function OffersTable(props: Props) {
   let grid: any;
   const pageSettings = { pageSize: 10, pageSizes: true };
   const toolbarOptions = ['Search', 'Print', 'PdfExport'];
   const toolbarClick = (args: any) => {
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
               <ColumnDirective field="offerNumber" width="100" textAlign="Right" headerText="Offer number" />
               <ColumnDirective field="clientDetails.name" width="100" textAlign="Right" headerText="Customer name" />
               <ColumnDirective field="clientDetails.email" width="100" textAlign="Right" headerText="E-mail" />
               <ColumnDirective field="clientDetails.cell" width="100" textAlign="Right" headerText="Phone" />
               <ColumnDirective field="offerData.status" width="100" textAlign="Right" headerText="Status" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar, PdfExport]} />
         </GridComponent>
      </>
   );
}

export default OffersTable;
