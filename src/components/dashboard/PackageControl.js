import React from 'react';


function PackageControl() {
    return (
        <div className="control">
                    <div className="btn">
                        <img src={require("../../material/icons/add.png")} className="btn_img" alt="" srcSet=""/>
                        <p className="btn_title">Add Package</p>

                    </div>
                    <div className="btn">
                        <img src={require("../../material/icons/edit.png")} className="btn_img" alt="" srcSet=""/>
                        <p className="btn_title">Edit Package</p>
                    </div>
                    <div className="btn">
                        <img src={require("../../material/icons/delete.png")} className="btn_img" alt="" srcSet=""/>
                        <p className="btn_title">Delete Package</p>
                    </div>
                </div>
    )
}

export default PackageControl;