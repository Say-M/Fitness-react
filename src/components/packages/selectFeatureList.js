import React, { useState, useEffect } from "react";
import * as config from '../config'
import { useSelector, useDispatch } from "react-redux";


export default function SelectFeatureList(props) {
    const jwtToken = useSelector(state=>state.user.jwtToken)
    const dispatch = useDispatch()
    const [loadFirstTime, setLoadFirstTime] = useState(true);
    const updateFeatueDataStatus = useSelector(
        state => state.appSettings.featureListGetStatus
    );
    const [featureList, setFeatureList] = useState([])
    const [filteredFeatureList, setFilteredFeatureList] = useState([])

    useEffect(() => {
        const fetchData = () => {
            fetch(config.server + 'feature', {
                headers: {
                    "Authorization": "Bearer " + jwtToken
                }
                
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.ok) {
                        setFeatureList(result.message)
                        
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (loadFirstTime | updateFeatueDataStatus) {
            fetchData()
            setLoadFirstTime(false)
            dispatch({ type: "FEATURE_LIST_GET_STATUS_FALSE" });
        }
    }, [updateFeatueDataStatus])

    useEffect(() => {
        const arr = featureList.filter(f => f.training_type == props.trainingType)
        console.log(arr)
        setFilteredFeatureList(arr)
    },[props.trainingType, featureList])


 

    const featureListView = filteredFeatureList.map((feature, index) => {
        let status = feature.feature_status;
        if (status == 1)
            return (
                <div className='block' key={index}>
                    <label className='btn'>
                        <input type='checkbox' name='' id={feature.feature_id} autoComplete='off'
                            checked={props.selectedFeatures.some(id => id == feature.feature_id)}
                            onChange={(e) => {
                                let id = e.target.id;
                                if (e.target.checked) {
                                    // setSelectedFeatures(old => [...old, id])
                                    props.setSelectedFeature(old => [...old, id])
                                }
                                else {
                                    // setSelectedFeatures(selectedFeatures.filter(feature => feature != id))
                                    props.setSelectedFeature(props.selectedFeatures.filter(feature => feature != id))
                                    
                                }
                            }}
                        />
                    </label>
                    {feature.feature_name}
                </div>)
        else {
            return (null)
        }

    })

    return (
        <div className="options">
            {featureListView}
        </div>
    )
}