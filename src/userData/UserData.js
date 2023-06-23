import React, { useEffect } from 'react';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

// $.DataTable = require('datatables.net')
// require( 'datatables.net-bs' )( window, $ )

const UserData = () => {

    useEffect(() => {
        $(document).ready(function () {
            setTimeout(function(){
            $('#example').DataTable();
             } ,1000);
            })
    }, []);

    return (
        <div>
            <table id="example" class="table table-hover table-bordered">
           <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
          {/* {this.state.data.map((result) => { */}
            {/* return ( */}
             
                 <tr>
                  <td>1</td>
                  <td>abc@aa.com</td>
                  <td>test</td>
                </tr>
             
            {/* ) */}
        {/*}  })} */}
          </tbody>
        </table> 
        </div>
    );
};

export default UserData;