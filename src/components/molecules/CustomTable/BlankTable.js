import React from "react"
import { useSelector } from "react-redux"
import CustomSpinner from "../../atoms/CustomSpinner"

const BlankTable = () => {
    const { isLoading } = useSelector(state => state.appReducer);
    return (
        <div className="blank-table">
            <h2>
                { isLoading ? <CustomSpinner /> : 'Veri bulunamad─▒' }
            </h2>
        </div>
    )
}

export default BlankTable