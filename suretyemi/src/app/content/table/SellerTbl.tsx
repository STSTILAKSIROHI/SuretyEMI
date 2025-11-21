import React, { useState } from 'react'
import { Datatable } from '../../component/ui/DataTable/Datatable';
import { sellerData, sellerTableData } from '../../api/api';
import CustomButton from '../../component/ui/customButton/CustomButton';
import { IoFilterSharp, IoLocationSharp } from 'react-icons/io5';
import Avatar from '../../component/ui/Avatar/Avatar';
import { MdMarkEmailUnread, MdOutlineConnectWithoutContact } from 'react-icons/md';
import ToggleSwitch from '../../component/ui/ToggleSwitch/ToggleSwitch';
import StatusBadge from '../../component/ui/CustomBadge/StatusBadge';
import { useNavigate } from 'react-router-dom';

const SellerTbl = () => {
    const [selectData, setSelectData] = useState<(string | number)[]>([]);
    const navigate = useNavigate();
    return (
        <div className='mt-3'>
            <Datatable
                data={sellerData}
                columns={sellerTableData as any}
                pagination={true}
                isLoader={false}
                tableNm="Sellers info Table"
                icon={"📦"}
                isSearchBar={true}
                selectData={selectData as any}
                setSelectData={setSelectData as any}
                checkbox={false}
                rowClick={() => navigate('/distributor/details/sellerdashboard')}
                height={"calc(100vh - 625px)"}
                hr={true}
                tableBtn={
                    <div className='d-flex gap-3'>
                        <CustomButton
                            text="Filter"
                            variant="transparent"
                            className="bg-none"
                            type="button"
                            icon={
                                <div className="position-relative">
                                    <IoFilterSharp width="20" height="20" />
                                    <span className="filter-dot"></span>
                                </div>
                            }
                        />
                        <CustomButton
                            text="Add seller"
                            type='button'
                        // onClick={() => { navigate('/distributor/create') }}
                        />
                    </div>
                }
            >
                {/* Custom Render Function */}
                {(child: { row: any; column: any }) => (
                    <>
                        {/* --- 1. Business Name Column --- */}
                        {child.column.field === 'sellerName' && (
                            <div className="d-flex align-items-center gap-3">
                                <Avatar
                                    name={child.row.sellerName}
                                    size="40px"
                                    rounded
                                />
                                <div className="d-flex flex-column">
                                    <span className="fw-semibold primary">
                                        {child.row.sellerName}
                                    </span>
                                    <span className="text-muted small">
                                        ID: {child.row.id}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* --- 2. Contact Details (Email + Phone) --- */}
                        {child.column.field === 'SellerContactDetails' && (
                            <div className="d-grid gap-1">
                                <span className="text-sm d-flex align-items-center gap-2">
                                    <MdOutlineConnectWithoutContact className="text-primary" size={14} />
                                    {child.row.contactdetails}
                                </span>
                                <span className="text-sm d-flex align-items-center gap-2">
                                    <MdMarkEmailUnread className="text-primary" size={14} />
                                    {child.row.SellerContactDetails}
                                </span>
                            </div>
                        )}

                        {/* --- 3. Address --- */}
                        {child.column.field === 'address' && (
                            <div className="d-flex align-items-start gap-1">
                                <IoLocationSharp className="text-primary mt-1" size={14} style={{ minWidth: '14px' }} />
                                <span className="text-sm text-truncate" style={{ maxWidth: '200px' }}>
                                    {child.row.address}
                                </span>
                            </div>
                        )}

                        {/* --- 4. Secondary Contact (If redundant, consider removing) --- */}
                        {child.column.field === 'contactdetails' && (
                            <div className="d-grid">
                                <span className="text-sm fw-medium">{child.row.contactdetails}</span>
                                <span className="text-sm text-muted">{child.row.SellerContactDetails}</span>
                            </div>
                        )}

                        {/* --- 5. Status Toggle --- */}
                        {child.column.field === 'status' && (
                            <ToggleSwitch
                                checked={child.row.status === 'Active'}
                                label=''
                                onChange={() => { console.log("Toggle ID:", child.row.id) }}
                            />
                        )}

                        {/* --- 6. KYC Verification --- */}
                        {child.column.field === 'kYCVerification' && (
                            <div className="d-flex justify-content-center">
                                <StatusBadge
                                    label={child.row.kYCVerification}
                                    variant={
                                        child.row.kYCVerification === 'Verified' ? 'success' :
                                            child.row.kYCVerification === 'Rejected' ? 'danger' : 'warning'
                                    }
                                    style={{ fontSize: "11px", padding: "4px 10px" }}
                                />
                            </div>
                        )}

                        {/* --- 7. Created Date --- */}
                        {child.column.field === 'CreatedDate' && (
                            <div className="py-1 px-2 rounded-3 text-center" style={{ backgroundColor: "#f3e8ff" }}>
                                <span style={{ color: "#5E14C5", fontSize: "13px", fontWeight: "500" }}>
                                    {child.row.CreatedDate}
                                </span>
                            </div>
                        )}

                        {/* --- 8. Actions --- */}
                        {child.column.field === 'actions' && (
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <CustomButton type='button' variant='transparent' className="text-primary btn-sm" text="View" />
                            </div>
                        )}

                        {/* --- 9. Default Render (Catch-all for simple text) --- */}
                        {child.column.field !== 'sellerName' &&
                            child.column.field !== 'status' &&
                            child.column.field !== 'kYCVerification' &&
                            child.column.field !== 'actions' &&
                            child.column.field !== 'address' &&
                            child.column.field !== 'SellerContactDetails' &&
                            child.column.field !== 'CreatedDate' &&
                            child.column.field !== 'contactdetails' &&
                            // Make sure 'sellerLicenseNo' falls through here
                            (
                                <div className="text-sm text-secondary">
                                    {child.row[child.column.field]}
                                </div>
                            )
                        }
                    </>
                )}
            </Datatable>
        </div>
    )
}

export default SellerTbl
