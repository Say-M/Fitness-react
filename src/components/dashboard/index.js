import React from 'react';

import Header from '../common/header'
import PackageControl from './PackageControl';
import DataRepresentation from './DataRepresentation'
import Activities from './Activities'
import AddMember from '../common/AddMember'

function Dashboard() {
    return (
			<div className='work'>
				{/* <div className="title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg_icon"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                    <p class="nav_text">Dashboard</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg_icon2"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    <input type="text" name="search" id="" placeholder="Search"/>
                </div> */}
				<div className='functions'>
					<div className='main-functions'>
						<PackageControl />
						<DataRepresentation />
						<Activities />
					</div>

					<AddMember />
				</div>
			</div>
		);
}

export default Dashboard;