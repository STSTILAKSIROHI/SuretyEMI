import React, { useState } from 'react'
import { FaEye, FaFileInvoice } from "react-icons/fa";
import CustomButton from '../../component/ui/customButton/CustomButton';
import { Datatable } from '../../component/ui/DataTable/Datatable';
import { transactionColumns, transactionData } from '../../api/api';

const TranTbl = () => {


    const [selectData, setSelectData] = useState([]);

    return (
        <>
            <div className='pe-3 ps-3 mt-3'>
                <Datatable
                    data={transactionData}
                    columns={transactionColumns as any}
                    pagination={true}
                    isLoader={false}
                    tableNm="Recent Transactions"
                    icon={"💳"}
                    isSearchBar={true}
                    selectData={selectData as any}
                    setSelectData={setSelectData as any}
                    checkbox={false}
                    height={"calc(100vh - 425px)"}
                    hr={true}
                >
                    {(child: { row: any; column: any }) => (
                        <>
                            {child.column.field === 'transactionId' && (
                                <span className="fw-semibold text-primary" style={{ cursor: 'pointer' }}>
                                    {child.row.transactionId}
                                </span>
                            )}

                            {/* 2. Payment Status (Green Pill) */}
                            {child.column.field === 'paymentStatus' && (
                                <div className="d-flex justify-content-center">
                                    <span
                                        className={`px-3 py-1 rounded-pill text-xs fw-bold text-uppercase ${child.row.paymentStatus === 'paid'
                                            ? 'bg-success bg-opacity-10 text-success'
                                            : 'bg-warning bg-opacity-10 text-warning'
                                            }`}
                                        style={{ fontSize: '11px', letterSpacing: '0.5px' }}
                                    >
                                        {child.row.paymentStatus}
                                    </span>
                                </div>
                            )}

                            {/* 3. Actions Column */}
                            {child.column.field === 'actions' && (
                                <div className="d-flex align-items-center justify-content-center gap-2">
                                    <CustomButton
                                        type='button'
                                        variant='transparent'
                                        className="text-secondary p-0"
                                        icon={<FaEye size={16} />}
                                        onClick={() => console.log("View", child.row.transactionId)}
                                    />
                                    <CustomButton
                                        type='button'
                                        variant='transparent'
                                        className="text-primary p-0"
                                        icon={<FaFileInvoice size={15} />}
                                        onClick={() => console.log("Invoice", child.row.transactionId)}
                                    />
                                </div>
                            )}

                            {/* 4. Default Render for Text Fields */}
                            {child.column.field !== 'transactionId' &&
                                child.column.field !== 'paymentStatus' &&
                                child.column.field !== 'actions' && (
                                    <span className="text-sm text-secondary fw-medium">
                                        {child.row[child.column.field]}
                                    </span>
                                )}
                        </>
                    )}
                </Datatable>
            </div>
        </>
    )
}

export default TranTbl