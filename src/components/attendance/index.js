import React, { useState, useEffect } from "react";
import {Switch, Route, useRouteMatch, useParam} from 'react-router-dom'


import Header from '../common/header'
import Shift from './shift'
import AttendanceReport from './attendanceReport'
import MemberAttendanceReport from './memberAttendanceReport'


export default function Attendance() {
  const routeMatch = useRouteMatch()
  const [attendanceSummary, setAttendanceSummary] = useState({
    present: 0,
    absent: 0
  })
  return (
    <div className="work">
      <Switch>
        <Route exact path={`${routeMatch.path}/report`}>
          <AttendanceReport
            attendanceSummary={attendanceSummary}
            setAttendanceSummary={setAttendanceSummary}
          />
        </Route>
        <Route path={`${routeMatch.path}/report/:user_type/:id`}>
              <MemberAttendanceReport />
        </Route>
      </Switch>
      {/* <div class="packages" style={{ backgroundColor: "transparent" }}>
        <Shift attendanceSummary={attendanceSummary} />
      </div> */}
    </div>
  );
}
