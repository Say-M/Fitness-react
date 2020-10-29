import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as config from '../config'
import * as actionTypes from "../../redux/actionTypes";
import SelectFeatureList from './selectFeatureList'
import { FormInputError } from '../common/formInputError'

import { alertShow } from "../common/reduxFunctions";

function AddPackage() {
	const dispatch = useDispatch()
	const initPackageForm = {
		
			package_name: '',
			package_duration: '2 Month',
			package_amount: 0,
			package_status: 0,
			package_features: []
		
	}
	const [addPackageForm, setAddPackageForm] = useState(initPackageForm)

	const [packageFormError, setPackageFormError] = useState({
		package_name: ''
	})

	const updatePackageFormError = (name, error) => {
		setPackageFormError(Object.assign({}, packageFormError, {
			[name]: error
		}))
	}
	const [selectedFeatures, setSelectedFeature] = useState([])

	const ssetSelectedFeature = (list) => {
		console.log(list)
	}

	const updateAddPackageForm = entry => e => {
		setAddPackageForm(
			Object.assign({}, addPackageForm, {
				[entry]: e.target.value
			})
		)
	}


	const handleAddPackageFormSubmit = status => e => {
		e.preventDefault()
		const features = selectedFeatures;
		const data = addPackageForm;
		data.package_status = status;
		data.package_features = features;
		
		fetch(config.server + 'package', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data),
			mode: 'cors'
		})
			.then(response => response.json())
			.then(result => {
				console.log(result)
				dispatch({ type: actionTypes.PACKAGE_UPDATE_TRUE});
			})
			.catch(err => {
				console.log(err);
				alertShow(err)
			})

	}

	

	return (
		<>
			<div className='full bg-white'>
				<form >
					<h6>Add Package</h6>
					<div className='package-input-grp'>
						<label for='package_name'>
							Package Name <span>*</span>
						</label>
						<input
							type='text'
							name=''
							id='package_name'
							placeholder='Enter Package Name'
							value={addPackageForm.package_name}
							onChange={updateAddPackageForm("package_name")}
						/>
						<FormInputError Error={packageFormError.package_name?.length} Msg={packageFormError.package_name} />
					</div>
					<div className='package-input-grp'>
						<label for='package_name'>
							Time Duration <span>*</span>
						</label>
						<select
							name=''
							id=''
							placeholder='Select'
							value={addPackageForm.package_duration}
							onChange={updateAddPackageForm("package_duration")}>
							<option value='2 Month'>2 Month</option>
							<option value='3 Month'>3 Month</option>
							<option value='4 Month'>4 Month</option>
							<option value='5 Month'>5 Month</option>
							<option value='6 Month'>6 Month</option>
							<option value='7 Month'>7 Month</option>
							<option value='8 Month'>8 Month</option>
							<option value='9 Month'>9 Month</option>
							<option value='10 Month'>10 Month</option>
							<option value='11 Month'>11 Month</option>
							<option value='12 Month'>12 Month</option>
						</select>
					</div>
					<div className='package-input-grp'>
						<label for='price'>
							Fee <span>*</span>
						</label>
						<input
							type='number'
							name=''
							id='price'
							placeholder='Fee'
							value={addPackageForm.package_amount}
							onChange={updateAddPackageForm("package_amount")}></input>

					</div>
					<div className='package-input-grp'>
						<label for='textarea'>Description</label>
						<textarea
							name=''
							id='textarea'
							cols='30'
							rows='10'
							placeholder='Description'
						>
						</textarea>
					</div>
					<div
						className='package-input-grp'
						style={{ justifyContent: "center" }}>
						<button type='submit' className='btn-danger br-25 m-5' onClick={handleAddPackageFormSubmit(0)}>
							Save as Draft
							</button>
						<button type='submit' className='btn-success br-25 m-5' onClick={handleAddPackageFormSubmit(1)}>
							Save Package
							</button>
					</div>
				</form>
				<div className='child'>
					<h6>Select Features</h6>
					<SelectFeatureList selectedFeatures={selectedFeatures} setSelectedFeature={setSelectedFeature}/>
				</div>
				<br />
			</div>
		</>
	);
}


export default AddPackage;