import React, { useState } from 'react'
import { Datatable } from '../../component/ui/DataTable/Datatable';
import CustomButton from '../../component/ui/customButton/CustomButton';
import { IoFilterSharp } from 'react-icons/io5';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { mandateData, MandateInfoCol } from '../../api/api';

const MandateInfoTbl = () => {
    const [selectData, setSelectData] = useState<(string | number)[]>([]);
    return (
        <>
            {/* --- Bottom Section: Datatable --- */}
            <div className='bg-white rounded-3'>
                <Datatable
                    data={mandateData}
                    columns={MandateInfoCol as any}
                    pagination={true}
                    isLoader={false}
                    tableNm={" Mandate & Bank Info Table"}
                    isSearchBar={true}
                    selectData={selectData as any}
                    setSelectData={setSelectData as any}
                    checkbox={false}
                    height={"calc(100vh - 600px)"}
                    hr={true}
                    tableBtn={
                        <CustomButton
                            text="Filter"
                            variant="transparent"
                            className="border"
                            type="button"
                            icon={<IoFilterSharp />}
                        />
                    }
                >
                    {/* --- Custom Render Logic --- */}
                    {(child: { row: any; column: any }) => (
                        <>
                            {/* 1. Status Column (Green Pill) */}
                            {child.column.field === 'status' && (
                                <div className="d-flex justify-content-center">
                                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-medium" style={{ letterSpacing: '0.5px' }}>
                                        {child.row.status}
                                    </span>
                                </div>
                            )}

                            {/* 2. Action Column (Dots) */}
                            {child.column.field === 'action' && (
                                <div className="d-flex justify-content-center cursor-pointer">
                                    <BiDotsVerticalRounded size={20} className="text-secondary" />
                                </div>
                            )}


                            {/* 5. Default Render */}
                            {child.column.field !== 'status' &&
                                child.column.field !== 'action' &&
                                child.column.field !== 'planId' &&
                                child.column.field !== 'amount' && (
                                    <span className="text-secondary text-sm">
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

export default MandateInfoTbl
