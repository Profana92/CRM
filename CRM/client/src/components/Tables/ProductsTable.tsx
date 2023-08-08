import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Resize, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';

function ProductsTable(props) {
   let grid;
   const pageSettings = { pageSize: 10, pageSizes: true };
   const toolbarOptions = ['Search', 'Print', 'PdfExport'];
   const toolbarClick = (args) => {
      if (grid && args.item.id === 'grid_pdfexport') {
         grid.pdfExport();
      }
   };
   function imageTemplate(props) {
      const image = props.image;
      return <img src={image} alt={'Product image'} className="w-10 ml-auto" />;
   }
   function priceTemplate(props) {
      return props.price + ' $';
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
               <ColumnDirective field="title" width="100" textAlign="Right" headerText="Title" />
               <ColumnDirective field="description" width="100" textAlign="Right" headerText="Description" />
               <ColumnDirective field="category" width="100" textAlign="Right" headerText="Category" />
               <ColumnDirective width="100" textAlign="Right" headerText="Price" template={priceTemplate} />
               <ColumnDirective width="100" textAlign="Right" headerText="Image" template={imageTemplate} />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar, PdfExport]} />
         </GridComponent>
      </>
   );
}

export default ProductsTable;
