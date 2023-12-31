import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Resize, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';
export interface Props {
   items: Item[];
}

export interface Item {
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

function ClientsTable(props: Props) {
   let grid: any;
   const pageSettings = { pageSize: 10, pageSizes: true };
   const toolbarOptions = ['Search', 'Print', 'PdfExport'];
   const toolbarClick = (args: any) => {
      if (grid && args.item.id === 'grid_pdfexport') {
         grid.pdfExport();
      }
   };
   function offersTemplate(props: { offers: string[] }) {
      if (props.offers.length > 0) return props.offers.join(', ');
      else return 'No Data';
   }
   function ordersTemplate(props: { orders: string[] }) {
      if (props.orders.length > 0) return props.orders.join(', ');
      else return 'No Data';
   }
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
               <ColumnDirective field="email" width="100" textAlign="Right" headerText="E-mail" />
               <ColumnDirective field="location.city" width="100" textAlign="Right" headerText="City" />

               <ColumnDirective width="100" textAlign="Right" headerText="Offers" template={offersTemplate} />
               <ColumnDirective width="100" textAlign="Right" headerText="Offers" template={ordersTemplate} />

               {/*  <ColumnDirective width="100" textAlign="Right" headerText="Image" template={imageTemplate} /> */}
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar, PdfExport]} />
         </GridComponent>
      </>
   );
}

export default ClientsTable;
