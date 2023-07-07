import React, { Suspense } from "react";
import ProductTable from "../ProductTable.jsx";
import { Spin } from "antd";

function Products() {
  return (

    // <Suspense falling={<Spin/>}>
      <ProductTable />
      // </Suspense>
      
  );
}

export default Products;
