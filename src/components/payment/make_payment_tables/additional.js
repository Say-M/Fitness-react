import React, { useState } from "react";

export default function AdditionalTable(props) {
  return (
    <table class="table" style={props.display ? {} : { display: 'none'}}>
      <thead>
        <tr>
          <th scope="col">Payment Title</th>
          <th scope="col">Amount</th>
          <th scope="col">Due</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
    </table>
  );
}
