import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
const config = require("./../config");

function AddMember() {
	const jwtToken = useSelector(state=>state.user.jwtToken)
	const [memberFormData, setMemberFormData] = useState({});

	

	const updateFormData = entry => e => {
		setMemberFormData(
			Object.assign({}, memberFormData, {
				[entry]: e.target.value,
			})
		);
	};

	const imageToBase64 = (file, cb) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			cb(reader.result);
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	};

	useEffect(e => {
		document.querySelector("#Email").addEventListener("blur", event => {
			console.log(event.target.value);
			fetch(config.server + "user/check_by_email", {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + jwtToken
				},
				method: "POST",
				mode: "cors",
				body: JSON.stringify({ email: event.target.value }),
			})
				.then(response => response.json())
				.then(res => {
					console.log(res);
					if (res.message.length) {
						console.log(res.message[0])
						let data = Object.assign({}, memberFormData, {
							username: res.message[0]?.username ? res.message[0]?.username : memberFormData.username,
							firstname: res.message[0]?.user_firstname ? res.message[0]?.user_firstname : memberFormData.firstname,
							lastname: res.message[0]?.user_lastname ? res.message[0]?.user_lastname : memberFormData.lastname,
							// email: res.message[0]?.user_email,
							gender: res.message[0]?.user_gender ? res.message[0]?.user_gender : memberFormData.gender,
							phone: res.message[0]?.user_phone ? res.message[0]?.user_phone : memberFormData.phone,
							maritialStatus: res.message[0]?.user_maretial_status ? res.message[0]?.user_maretial_status : memberFormData.maritialStatus,
							profession: res.message[0]?.user_profession ? res.message[0]?.user_profession : memberFormData.profession,
							userType: res.message[0]?.user_type ? res.message[0]?.user_type : memberFormData.userType,
							birthdate: res.message[0]?.user_dob ? res.message[0]?.user_dob : memberFormData.birthdate,
							bloodGroup: res.message[0]?.user_blood_group ? res.message[0]?.user_blood_group : memberFormData.bloodGroup,
							address: res.message[0]?.user_address ? res.message[0]?.user_address : memberFormData.address,
							userId: res.message[0]?.user_id ? res.message[0]?.user_id : memberFormData.userId, 
						});
						console.log(data)
						setMemberFormData(data);
					}
					else{
						setMemberFormData(Object.assign({}, memberFormData,{userId: null}))
					}
				})
				.catch(err => {
					console.log(err);
				});
		});
	}, []);

	const handleSubmitMemberForm = e => {
		console.log(memberFormData);
		fetch(config.server + "info", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			mode: "cors",
			body: JSON.stringify(memberFormData),
		})
			.then(response => response.json())
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='add_member'>
			<p className='header'>Add Member</p>
			<form className='form'>
				<span className='form_block'>
					<label htmlFor='Email'>Email : </label>
					<input
						type='text'
						name=''
						id='Email'
						placeholder='Email'
						value={memberFormData.email}
						onChange={updateFormData("email")}
					/>
				</span>
				<span className='form_block'>
					<label htmlFor='name'>First Name : </label>
					<input
						type='text'
						name=''
						id='name'
						placeholder='First Name'
						value={memberFormData.firstname}
						onChange={updateFormData("firstname")}
					/>
				</span>
				<span className='form_block'>
					<label htmlFor='lastname'>Last Name : </label>
					<input
						type='text'
						name=''
						id='name'
						placeholder='Last Name'
						value={memberFormData.lastname}
						onChange={updateFormData("lastname")}
					/>
				</span>
				<span className='form_block'>
					<label htmlFor='phone'>Phone : </label>
					<input
						type='text'
						name=''
						id='phone'
						placeholder='Phone'
						value={memberFormData.phone}
						onChange={updateFormData("phone")}
					/>
				</span>
				<span className='form_block'>
					<label htmlFor='birth'>Date of Birth : </label>
					<input
						type='text'
						name=''
						id='birth'
						placeholder='Date'
						value={memberFormData.birthdate}
						onChange={updateFormData("birthdate")}
					/>
				</span>
				<span className='form_block'>
					<label htmlFor='Address'>Address : </label>
					<input
						type='text'
						name=''
						id='Address'
						placeholder='Address'
						value={memberFormData.address}
						onChange={updateFormData("address")}
					/>
				</span>

				<span className='form_block'>
					<label htmlFor='Profession'>Profession : </label>
					<input
						type='text'
						name=''
						id='Profession'
						placeholder='Profession'
						value={memberFormData.profession}
						onChange={updateFormData("profession")}
					/>
				</span>
				<span className='form_block'>
					<label htmlFor='Package'>Package : </label>
					<input
						type='text'
						name=''
						id='Package'
						placeholder='Package'
						value={memberFormData.package}
						onChange={updateFormData("package")}
					/>
				</span>
				<span className='form_block'>
					<label htmlFor='Gender'>Gender : </label>
					<div className='box'>
						<input
							type='radio'
							name='gender'
							id='female'
							value='female'
							onChange={updateFormData("gender")}
							checked={memberFormData.gender == "female"}
						/>
						<label htmlFor='female'>Female</label>
						<br />
						<input
							type='radio'
							name='gender'
							id='male'
							value='male'
							onChange={updateFormData("gender")}
							checked={memberFormData.gender == "male"}
						/>
						<label htmlFor='male'>Male</label>
					</div>
				</span>
				<span className='form_block'>
					<label htmlFor='maritial_status'>Maritial Status : </label>
					<div className='box'>
						<input
							type='radio'
							name='status'
							id='married'
							value='married'
							checked={memberFormData.maritialStatus == "married"}
							onChange={updateFormData("maritialStatus")}
						/>
						{"  "}
						<label htmlFor='married'>Married</label>
						<br />
						<input
							type='radio'
							name='status'
							id='unmarried'
							value='unmarried'
							checked={memberFormData.maritialStatus == "unmarried"}
							onChange={updateFormData("maritialStatus")}
						/>{" "}
						{"  "}
						<label htmlFor='unmarried'>Unmaried</label>
					</div>
				</span>
				<span className='form_block'>
					<label htmlFor='blood_group'>Blood Group:</label>
					<select
						name='blood_group'
						id='blood_group'
						value={memberFormData.bloodGroup}
						onChange={updateFormData("bloodGroup")}>
						<option value='A+'>A+</option>
						<option value='A-'>A-</option>
						<option value='B+'>B+</option>
						<option value='B-'>B-</option>
						<option value='O+'>O+</option>
						<option value='0-'>0-</option>
						<option value='AB+'>AB+</option>
						<option value='AB-'>AB-</option>
					</select>
				</span>
				<span className='form_block'>
					<label htmlFor='shift'>Shift:</label>
					<select
						name='shift'
						id='shift'
						value={memberFormData.shift}
						onChange={updateFormData("shift")}>
						<option value='day'>Day</option>
						<option value='evening'>Evening</option>
						<option value='night'>Night</option>
					</select>
				</span>

				<span className='form_block'>
					<label htmlFor=''>User Type : </label>
					<div className='box'>
						<input
							type='radio'
							name='user_type'
							id='trainey'
							value='trainee'
							onChange={updateFormData("userType")}
							checked={memberFormData.userType == "trainee"}
						/>
						<label htmlFor='trainee'>Trainee</label>
						<br />
						<input
							type='radio'
							name='user_type'
							id='Trainer'
							value='trainer'
							onChange={updateFormData("userType")}
							checked={memberFormData.userType == "trainer"}
						/>
						<label htmlFor='trainer'>Trainer</label>
						<br />
						<input
							type='radio'
							name='user_type'
							id='Stuff'
							value='stuff'
							onChange={updateFormData("userType")}
							checked={memberFormData.userType == "stuff"}
						/>
						<label htmlFor='stuff'>Stuff</label>
					</div>
				</span>
				<span className='form_block'>
					<label htmlFor='upload_photo'>Upload photo :</label>
					<div className='upload-image btn'>
						<span>Upload your photo</span>
						<input
							type='file'
							
							onChange={e => {
								console.log(e.target.files);
								imageToBase64(e.target.files[0], res => {
									setMemberFormData(
										Object.assign({}, memberFormData, {
											image: res,
										})
									);
								});
							}}
						/>
					</div>
				</span>
				<span className='form_block'>
					<label htmlFor='payment'>Payment</label>
					<select
						name='payment'
						id='payment'
						value={memberFormData.payment}
						onChange={updateFormData("payment")}>
						<option value='paid'>Paid</option>
						<option value='due'>Due</option>
					</select>
				</span>
				<br />
				<br />

				<a href='#' className='btn btn-submit' onClick={handleSubmitMemberForm}>
					SUBMIT
				</a>
				<br />
				<a href='#' className='btn btn-generate'>
					Generate Tocken
				</a>
			</form>

			<div className='pending_order'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					className='image'>
					<path d='M0 0h24v24H0z' fill='none' />
					<path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
				</svg>
				<p className='Pending_order'>You Have 0 Pending order</p>
				<p className='Pending_order2'>
					You Have 0 Pending order request check below to review them
				</p>
				<a href='#' className='btn btn-check'>
					Check Order Summery
				</a>
				<br />
			</div>
		</div>
	);
}

export default AddMember;
