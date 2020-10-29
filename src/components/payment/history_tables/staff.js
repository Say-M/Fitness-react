import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as config from "../../config";
import DefaultPic from "../../../material/SVG/persons/abid.svg";


export default function StaffHistoryTable(props) {
    const jwtToken = useSelector((state) => state.user.jwtToken);
    const [loadState, setLoadState] = useState(1);
    const [paymentList, setPaymentList] = useState([]);
    const [filteredPaymentList, setFilteredPaymentList] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            fetch(
                config.server +
                "payment/history/staff?date=" +
                props?.date,
                {
                    headers: {
                        Authorization: "Bearer " + jwtToken,
                    },
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.ok) {
                        setPaymentList(result.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        // if (loadState) {
        fetchData();
        // setLoadState(false);
        // }
    }, [loadState, props.date]);

    useEffect(
        (e) => {
            if (props.searchName.length == 0) setFilteredPaymentList(paymentList);
            else {
                let arr = paymentList.filter(
                    (mem) =>
                        mem.name.toLowerCase().indexOf(props.searchName.toLowerCase()) > -1
                );
                setFilteredPaymentList(arr);
            }
        },
        [props.searchName, paymentList]
    );

    const paymentListView = filteredPaymentList.map((member, index) => {
        member.status =
            member.paid < 1
                ? "unpaid"
                : member.paid < member.fee - member.discount
                    ? "due"
                    : "paid";
        return (
            <tr key={index}>
                <td>
                    <img
                        src={member.image ? member.user_image : DefaultPic}
                        alt=""
                        class="member-image-small"
                    />
                </td>
                <td>{member?.name}</td>
                <td>{member?.email}</td>
                <td>{member?.phone}</td>
                <td>{member?.paid}</td>
                <td>{member?.due}</td>
                <td class="selectnon">
                    <p
                        class="active mt-2"
                        style={
                            member?.status == "unpaid"
                                ? { backgroundColor: config.redColorCode }
                                : member?.status == "due"
                                    ? { backgroundColor: config.warningColorCode }
                                    : {}
                        }
                    >
                        {member?.status}
                    </p>
                </td>
            </tr>
        )
    })

    return (
        <table className="table" style={props.display ? {} : { display: 'none' }}>
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Due</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {paymentListView}
            </tbody>
        </table>
    )
}