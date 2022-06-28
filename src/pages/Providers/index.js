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

    const [editValues, setEditValues] = useState(null);


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
            onClick: async (provider) => {
                console.log("provider", provider);
                setModalShow(true);
                setEditValues(
                    {
                        ...provider
                    }
                )
                console.log(editValues);
            }
        },
    ]

    // providerID, baseURL, fromName, username, password

    return (
        <>
            <div className='product-list-container main-container padding-vertical-80'>
                <GlobalFilter tableInstance={tableInstance} placeholder={'Search'} />
                <CustomTable
                    tableColumns={COLUMNS}
                    tableData={providers}
                    tableRow={4}
                    ref={tableInstance}
                    searchBar
                    icons={ICONS}
                    fetchProducts={fetchProducts}
                />
                <div className='product-list-bottom'>
                    <button onClick={() => setModalShow(true)}>Create New Provider</button>
                </div>
            </div>
            <CustomModal
                title={'New Provider'}
                inputs={inputs}
                select={enums}
                onOk={modalShow}
                editValues={editValues}
                fetchProducts={fetchProducts}
                onClose={() => setModalShow(false)}
            />
        </>
    );
}
export default Providers;