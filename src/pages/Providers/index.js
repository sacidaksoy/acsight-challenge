// packages
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomTable from '../../components/molecules/CustomTable';
import { COLUMNS } from './constants';
import GlobalFilter from '../../components/molecules/CustomTable/GlobalFilter';
import editIcon from '../../assets/icons-edit.svg';
import { ProvideService } from "../../service";
import CustomModal from '../../components/molecules/CustomModal';
import { enums, inputs } from '../../constants/constants';

function Providers() {
    const dispatch = useDispatch();
    const tableInstance = useRef(null);
    const [modalShow, setModalShow] = useState(false);

    const [modalLabel, setModalLabel] = useState("");
    const [editValues, setEditValues] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    const providers = useSelector((state) => state.provideReducer.providers);
    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: 'SET_LOADING', payload: true })
            try {
                const { data } = await ProvideService.getProvider();
                dispatch({ type: "SET_PROVIDER", payload: data.data.partnerProviders });
            } catch (error) {
                console.log(error)
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false })
            }
        };

        fetchProducts();
    }, [])

    // function as props
    const fetchProducts = async () => {
        dispatch({ type: 'SET_LOADING', payload: true })
        try {
            const { data } = await ProvideService.getProvider();
            dispatch({ type: "SET_PROVIDER", payload: data.data.partnerProviders });
        } catch (error) {
            console.log(error)
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    };


    const ICONS = [
        {
            id: 1,
            image: editIcon,
            onClick: async (provider) => { // row.original
                console.log("provider", provider);
                if (provider.partnerID !== 0) {
                    setModalLabel("Edit Provider");
                    setModalShow(true);
                    setEditValues(
                        {
                            ...provider
                        }
                    )
                } else {
                    setErrorMessage(`You can not edit ${provider.fromName}`);
                    setModalLabel("Error");
                    setModalShow(false);
                }
               
                // console.log(editValues);
            }
        },
    ]

    return (
        <>
            <div className='product-list-container main-container padding-vertical-80'>
                <GlobalFilter tableInstance={tableInstance} placeholder={'Search'} />
                <CustomTable
                    tableColumns={COLUMNS}
                    tableData={providers}
                    tableRow={6}
                    ref={tableInstance}
                    // searchBars
                    icons={ICONS}
                    fetchProducts={fetchProducts}
                />
                <div className='product-list-bottom'>
                    <button onClick={() => {setModalLabel("New Provider"); setModalShow(true)}}>Create New Provider</button>
                </div>
            </div>
            <CustomModal
                title={modalLabel}
                inputs={inputs}
                select={enums}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                onOk={modalShow}
                editValues={editValues}
                setEditValues={setEditValues}
                fetchProducts={fetchProducts}
                onClose={() => setModalShow(false)}
            />
        </>
    );
}
export default Providers;