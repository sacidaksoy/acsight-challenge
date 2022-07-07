import React from "react"
import { useSelector } from "react-redux"
import CustomSpinner from "../../atoms/CustomSpinner"

const BlankTable = () => {
    const { isLoading } = useSelector(state => state.appReducer);
    console.log(isLoading);
    return (
        <div className="blank-table">
            <h2>
                { isLoading ? <CustomSpinner /> : 'Veri bulunamadı' }
            </h2>
        </div>
    )
}

export default BlankTable