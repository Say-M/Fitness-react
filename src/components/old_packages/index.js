import React from "react";

import Header from "../common/header";
import PackageFeatureSummary from "./packageFeatureSummary";
import AllPackage from "./allPackage";
// import AddPackage from "./addPackage";
// import { EditPackageModal } from "./editModal";

function Package() {
  return (
    <div className="work">
      {/* <Header title="Packages" icon="icon-package" /> */}
      <div
        className="packages"
        style={{ backgroundColor: "transparent" }}
      >
        <PackageFeatureSummary />
        <AllPackage />
        {/* <AddPackage /> */}
      </div>
    </div>
  );
}

export default Package;
