import React, { useState } from 'react'
import { Datatable } from '../../component/ui/DataTable/Datatable';
import { columns, tableData } from '../../api/api';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import CustomButton from '../../component/ui/customButton/CustomButton';
import { IoFilterSharp } from 'react-icons/io5';
interface Props {
    setShowCusDtl: () => void
}
const CustomerTbl: React.FC<Props> = ({ setShowCusDtl }) => {
    const [selectData, setSelectData] = useState([]);
    return (
        <>
            <Datatable
                data={tableData}
                columns={columns as any}
                pagination={false}
                isLoader={false}
                tableNm={"Customer information Logs"}
                isSearchBar={true}
                selectData={selectData as any}
                setSelectData={setSelectData as any}
                checkbox={false}
                height={"auto"}
                rowClick={() => setShowCusDtl()}
                hr={false}
                tableBtn={
                    <CustomButton
                        text="Filter"
                        variant="transparent"
                        className="bg-none"
                        type="button"
                        icon={<div className="position-relative">
                            <IoFilterSharp width="20" height="20" />
                            <span className="filter-dot"></span>
                        </div>
                        }
                    />
                }
            >
                {/* Custom Render */}
                {(child: { row: any; column: any }) => (
                    <>
                        {/* Customer Info */}
                        {child.column.field === 'customerInfo' && (
                            <div className="d-flex flex-column">
                                <span className="fw-bold text-dark primary" style={{ fontSize: '13px' }}>{child.row.name}</span>
                                <small className="text-muted">{child.row.phone}</small>
                            </div>
                        )}

                        {/* Transaction ID */}
                        {child.column.field === 'transactionId' && (
                            <span className="text-secondary">{child.row.transactionId}</span>
                        )}

                        {/* Start Date Time (Purple Badge) */}
                        {child.column.field === 'startDateTime' && (
                            <div
                                style={{ backgroundColor: "#5e14c51e" }}
                                className="py-1 rounded-4"
                            >
                                <span style={{ color: "#5E14C5" }} className="text-sm">
                                    {child.row.startDateTime}
                                </span>
                            </div>
                        )}
                        {child.column.field === 'status' && (

                            <span style={{ color: "#2a6900ff" }} className="text-sm">
                                {child.row.status}
                            </span>
                        )}
                        {/* Action */}
                        {child.column.field === 'action' && (
                            <div className="text-center cursor-pointer">
                                <BiDotsVerticalRounded size={18} />
                            </div>
                        )}

                        {/* Default */}
                        {child.column.field !== 'customerInfo' &&
                            child.column.field !== 'transactionId' &&
                            child.column.field !== 'startDateTime' &&
                            child.column.field !== 'status' &&
                            child.column.field !== 'action' && (
                                <span className="text-secondary small">{child.row[child.column.field]}</span>
                            )}
                    </>
                )}
            </Datatable>
        </>
    )
}

export default CustomerTbl
