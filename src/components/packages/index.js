import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Header from "../common/header";
import PackageFeatureSummary from "./packageFeatureSummary";
import AllPackage from "./allPackage";
// import AddPackage from "./addPackage";
// import { EditPackageModal } from "./editModal";

function Package() {
  let path = useRouteMatch();
  return (
    <div className="work">
      <Switch>
        <Route path={`${path.path}/packages`}>
          <AllPackage />
        </Route>
        <Route path={`${path.path}/feature`}>
          <PackageFeatureSummary />
        </Route>
      </Switch>
    </div>
  );
}

export default Package;
