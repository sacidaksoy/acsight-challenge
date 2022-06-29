import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { Form, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { ProvideService } from '../../../service';
import moment from 'moment';
import { enums } from '../../../constants/constants';

const CustomTable = forwardRef(({ tableColumns, tableData, tableRow, icons, fetchProducts }, ref) => {

    const dispatch = useDispatch();
    
    const columns = useMemo(() => tableColumns);
    const data = useMemo(() => tableData);

    const instance = useTable({
        columns,
        data,
        initialState: { pageSize: tableRow },
        autoResetPage: false,
    },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        pageOptions,
        gotoPage,
        pageCount,
        prepareRow,
        state: { pageIndex, pageSize },
    } = instance;

    const handlePageClick = (data) => {
        gotoPage(data.selected);
    }

    useImperativeHandle(ref, () => instance);

    const handleStatusProvider = async (id, status) => {
        dispatch({ type: 'SET_LOADING', payload: true })
        let convertedStatus;
        try {
            const data = await ProvideService.statusProvider(id, status);
            console.log("stat values: ", id, convertedStatus, "data", data);
            fetchProducts();
        }
        catch (error) {
            console.log(error)
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    };

    return (

        <div className='inner-table'>
            <Table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {
                                    headerGroup.headers.map((column, index) => {
                                        return <th {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                            </span>
                                        </th>
                                    })
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row, index) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} key={index}>
                                    {
                                        row.cells.map((cell, index) => {
                                            if (cell.column.id === 'password') {
                                                return <td className="hidetext" key={index}>{cell.value}</td>
                                            } else if (cell.column.id === 'status') {
                                                return (<td key={row.original.id}>
                                                    <Form.Check
                                                        type="switch"
                                                        id="custom-switch"
                                                        disabled={row.original.partnerID === 0 ? true : false}
                                                        defaultChecked={row.original.status}
                                                        onClick={() =>handleStatusProvider(row.original.id, !row.original.status)}
                                                    />
                                                </td>)
                                            } else if (cell.column.id === 'providerID') {
                                                let cellValue;
                                                enums.map(item => {
                                                    if (row.original.providerID === item.value)
                                                        return cellValue = item.option;
                                                })
                                                return <td key={index}>{cellValue}</td>
                                            } else if (cell.column.id === 'updatedWhen') {
                                                return <td key={index}>{moment(cell.value).format('MM-DD-YYYY hh:mm a')}</td>
                                            } else {
                                                return <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            }
                                        })
                                    }
                                    <td>
                                        <div className='table-product-icons'>
                                            {icons.map(icon => (
                                                <img src={icon.image} alt="" key={icon.id} onClick={() => icon.onClick(row.original)} />
                                            ))}
                                        </div></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table >
            <div className='table-pagination'>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <ReactPaginate
                    previousLabel={'Önceki'}
                    nextLabel={'Sonraki'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
});

export default CustomTable;