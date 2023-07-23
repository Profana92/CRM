import { Table, Header, HeaderRow, HeaderCell, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useSort, HeaderCellSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useState } from 'react';
import { useTheme } from '@table-library/react-table-library/theme';

function onSortChange(action, state) {
   console.log(action, state);
}
function TableProducts(props) {
   const BASELINE_THEME = {
      Table: ' --data-table-library_margin: 0 auto;   --data-table-library_grid-template-columns:  70px 25% 25% 125px 1fr  minmax(100px, 150px); @media only screen and (max-width: 1024px) {--data-table-library_grid-template-columns:  25% 50% 0% 0% 0% 25%}',
      Header: '',
      Body: '',
      BaseRow: `
        
      `,
      HeaderRow: `
        color: #000; background-color: rgb(241 245 249); font-family: 'Montserrat', sans-serif;
      `,
      Row: `
        color: #000;
    
        &.disabled {
          color: #000;
        }
    
        &:hover {
          color: #000;
        }
    
        &:not(:last-of-type) > .td {
          border-bottom: 1px solid #000;
        }
      `,
      BaseCell: `
        padding: 6px 12px;
      `,
      HeaderCell: `
        font-weight: bold;
        border-bottom: 1px solid #000;
    
        .resizer-handle {
          background-color:#000;
        }
    
        svg,
        path {
          fill: currentColor;
        }
      

  
      `,
      Cell: `
        &:focus {
          outline: dotted;
          outline-width: 1px;
          outline-offset: -1px;
        }
      `,
   };
   const theme = useTheme(BASELINE_THEME);

   console.log(props.products.data);
   const [search, setSearch] = useState('');
   const handleSearch = (event) => {
      pagination.fns.onSetPage(0);
      setSearch(event.target.value);
   };

   const data = { nodes: props.products.data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())) };
   const pagination = usePagination(data, {
      state: {
         page: 0,
         size: 10,
      },
   });
   const sort = useSort(
      data,
      {
         onChange: onSortChange,
      },
      {
         sortFns: {
            ID: (array) => array.sort((a, b) => a.id - b.id),
            TITLE: (array) => array.sort((a, b) => a.title.localeCompare(b.title)),
            PRICE: (array) => array.sort((a, b) => a.price - b.price),
            CATEGORY: (array) => array.sort((a, b) => a.category.localeCompare(b.category)),
         },
      },
   );
   return (
      <div className="max-w-screen-xl mx-auto text-sm">
         <div className="h-12 flex items-center">
            <label htmlFor="search">
               Search by Title:
               <input id="search" type="text" onChange={handleSearch} className="h-6 border-2 mx-5 w-52" />
            </label>
         </div>
         <Table data={data} sort={sort} pagination={pagination} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
            {(tableList) => (
               <>
                  <Header>
                     <HeaderRow>
                        <HeaderCellSort
                           sortKey="ID"
                           resize={{
                              resizerWidth: 15,
                              resizerHighlight: '#98d8ff',
                              minWidth: 50,
                           }}
                        >
                           Nr.
                        </HeaderCellSort>
                        <HeaderCellSort
                           className="foo"
                           sortKey="TITLE"
                           resize={{
                              resizerWidth: 15,
                              resizerHighlight: '#98d8ff',
                              minWidth: 100,
                           }}
                        >
                           Title
                        </HeaderCellSort>
                        <HeaderCell
                           resize={{
                              resizerWidth: 15,
                              resizerHighlight: '#98d8ff',
                              minWidth: 150,
                           }}
                        >
                           Description
                        </HeaderCell>
                        <HeaderCellSort
                           sortKey="PRICE"
                           resize={{
                              resizerWidth: 15,
                              resizerHighlight: '#98d8ff',
                              minWidth: 100,
                           }}
                        >
                           Price $
                        </HeaderCellSort>
                        <HeaderCellSort
                           sortKey="CATEGORY"
                           resize={{
                              resizerWidth: 15,
                              resizerHighlight: '#98d8ff',
                              minWidth: 100,
                           }}
                        >
                           Category
                        </HeaderCellSort>
                        <HeaderCell
                           resize={{
                              resizerWidth: 15,
                              resizerHighlight: '#98d8ff',
                              minWidth: 150,
                           }}
                        >
                           Description
                        </HeaderCell>
                     </HeaderRow>
                  </Header>
                  <Body>
                     {tableList.map((item) => (
                        <Row key={item.id} item={item}>
                           <Cell>{item.id}</Cell>
                           <Cell>{item.title}</Cell>
                           <Cell>{item.description}</Cell>
                           <Cell>{item.price}</Cell> <Cell>{item.category}</Cell>
                           <Cell>
                              <img src={item.image} className="w-16 h-16 m-auto" />
                           </Cell>
                        </Row>
                     ))}
                  </Body>
               </>
            )}
         </Table>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

            <span>
               Page:
               {pagination.state.getPages(data.nodes).map((_, index) => (
                  <button
                     key={index}
                     type="button"
                     style={{
                        fontWeight: pagination.state.page === index ? 'bold' : 'normal',
                        margin: '0 5px',
                     }}
                     onClick={() => pagination.fns.onSetPage(index)}
                  >
                     {index + 1}
                  </button>
               ))}
            </span>
         </div>
      </div>
   );
}

export default TableProducts;
