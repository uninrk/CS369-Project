// โค้ดต่อไปนี้เป็น React ดังนั้นจะไม่ได้อธิบายรายละเอียดของโค้ดมาก

// import logo from './logo.svg';
// import './App.css';
// import DataTable from 'react-data-table-component';
// import { useEffect, useState, useCallback } from 'react';
// import React, { useMemo } from 'react';

// function App() {
//   const [data, setData] = useState(null);
//   const [datafilter, setDataFilter] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Get Data From API
//   const fetchDataForPosts = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/products`);
//       if (!response.ok) {
//         throw new Error(`HTTP error: Status ${response.status}`);
//       }
//       const postsData = await response.json();
//       setData(postsData.data[0]);
//       setDataFilter(postsData.data[0]);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       setData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchDataForPosts();
//   }, []);

//   const HeaderColumns =
//     [
//       {
//         name: 'ProductID',
//         selector: row => row.ProductID
//       },
//       {
//         name: 'ProductName',
//         selector: row => row.productName
//       },
//       {
//         name: 'Unit',
//         selector: row => row.Unit
//       },
//     ];
//   const datas = []

//   //set state เปิด - ปิด form
//   const [statusAdd, setStatusAdd] = useState(false);
//   function handleFilter(event) {
//     const newData = datafilter.filter(row => {
//       return row.CompanyName.toLowerCase().includes(event.target.value.toLowerCase())
//     })
//     setData(newData)
//   }
//   function handleClickAdd(event) {
//     setStatusAdd(true)
//   }
//   function handleClickCloseForm(event) {
//     setStatusAdd(false)
//   }
//   const [formValue, setFormValue] = useState({ CompanyName: '', Phone: '' })
//   const handlePostShip = (e) => {
//     const { name, value } = e.target;
//     setFormValue({ ...formValue, [name]: value });
//   }
//   //กด submit post data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const allInputValue = { CompanyName: formValue.CompanyName, Phone: formValue.Phone }
//     console.log(allInputValue)

//     let res = await fetch("http://localhost:8080/api/products", {
//       method: "POST",
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify(allInputValue)
//     })

//     let resjson = await res.json();
//     if (res.status === 200) {
//       setStatusAdd(false)
//       fetchDataForPosts();
//       return (
//         alert('Yes')

//       );
//     } else {
//       return (
//         alert('No')
//       );
//     }

//   }

//   //handle Del From DataBase
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [toggleCleared, setToggleCleared] = useState(false);
//   const handleRowSelected = React.useCallback(state => {
//     setSelectedRows(state.selectedRows);
//     console.log(state.selectedRows)
//     console.log(selectedRows)
//     console.log(setSelectedRows)
//   }, []);

//   const contextActions = React.useMemo(() => {

//     //กด delete
//     const handleDelete = (id) => {

//       if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.CompanyName)}?`)) {
//         setToggleCleared(!toggleCleared);
//         console.log(selectedRows)

//         const shipperIDs = selectedRows.map(item => item.ShipperID);
//         shipperIDs.forEach(shipperID => {
//           fetch(`http://localhost:8080/api/products/${shipperID}`, {
//             method: "DELETE",
//             headers: { 'content-type': 'application/json' },
//           })
//             .then(res => {
//               if (res.status === 200) {
//                 setStatusAdd(false);
//                 fetchDataForPosts();
//                 console.log(`ShipperID ${shipperID} deleted successfully`);
//               } else {
//                 console.error(`Failed to delete ShipperID ${shipperID}`);
//               }
//             })
//             .catch(error => {
//               console.error(`Error deleting ShipperID ${shipperID}:`, error);
//             });
//         });

//         // Optionally, you can show a confirmation message here after all requests are completed
//         alert('Delete requests sent for selected rows');
//       }

//     };

//     return (
//       <button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
//         Delete
//       </button>
//     );
//   }, [data, selectedRows, toggleCleared]);


//   return (
//     <div className='container'>
//       <div style={{ alignSelf: 'end', display: 'flex', justifyContent: 'space-evenly', gap: '0.5rem' }}>

//         {statusAdd === false &&
//           <div>

//             <a href='http://localhost:8080/report/products' style={{ margin: '0 0.5rem 0 0.5rem' }}><button>REPORT</button></a>
//             <button onClick={handleClickAdd}>+</button>
//             <input type='text' placeholder='Search Company Name' onChange={handleFilter} style={{ margin: '0 0.5rem 0 0.5rem' }} />
//           </div>}

//         {statusAdd === true && <button onClick={handleClickCloseForm}>X</button>}

//       </div>
//       {statusAdd === false &&
//         <div>
//           <DataTable
//             theme="default"
//             title="Product Data"
//             columns={HeaderColumns}
//             selectableRows
//             contextActions={contextActions}
//             onSelectedRowsChange={handleRowSelected}
//             clearSelectedRows={toggleCleared}
//             data={data || datas}
//           />
//         </div>}

//       {statusAdd === true &&
//         <div>
//           <form
//             style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}
//             onSubmit={handleSubmit}
//             method="POST"
//           >
//             <div><h4>เพิ่มข้อมูล</h4></div>
//             <div>
//               <input
//                 type="text"
//                 placeholder="CompanyName"
//                 name="CompanyName"
//                 value={formValue.CompanyName}
//                 onChange={handlePostShip}

//               />
//             </div>
//             <div >
//               <input
//                 type="text"
//                 placeholder="Phone"
//                 name="Phone"
//                 value={formValue.Phone}
//                 onChange={handlePostShip}

//               />
//             </div>

//             <div>
//               <button
//                 type="submit"
//               >
//                 submit
//               </button>
//             </div>

//           </form>
//         </div>}

//     </div>
//   );
// }

// export default App;



import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
//import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/products')
      .then((Response) => Response.json())
      .then((findresponse) => {
        this.setState({
          data: findresponse,
        });
      });
  }

  handleProductClick = (productName) => {
    // Perform the action you want when the product name is clicked
    alert(`You clicked on ${productName}`);
    // You can also navigate to a detail page or perform other actions here
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='mt-2'>Product Data</h1>
            {<table class="table table-striped">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {data.map((productData, index) => (
                  <tr key={index}>
                    <td><a href="#"
                      className="no-style-link" onClick={() => this.handleProductClick(productData.ProductName)}>
                      {productData.ProductName}
                    </a></td>
                    <td>{productData.Price}</td>
                    <td>
                      {productData.Image ? (
                        <img
                          src={URL.createObjectURL(new Blob([new Uint8Array(productData.Image.data)], { type: 'image/jpeg' }))}
                          alt={productData.ProductName}
                          style={{ width: '100px', height: 'auto' }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/100";
                          }}
                        />
                      ) : (
                        <span>Image not available</span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
            }
          </div>
        </div>
      </div >
    );
  }
}

export default App;
