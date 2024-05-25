import React from "react";

function Productdata() {
    return (
        < React.Fragment >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="mt-2">Product Data</h5>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Supplier ID</th>
                                    <th>Category ID</th>
                                    <th>Unit</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ React.Fragment >
    );
}

export default Productdata;