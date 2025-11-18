import React, { use, useState } from 'react';
import { HiOutlinePencil, HiOutlineEye, HiOutlineTrash } from "react-icons/hi2"; // Import icons
import Avatar from '../../component/ui/Avatar/Avatar';
import { Datatable } from '../../component/ui/DataTable/Datatable';
import CustomButton from '../../component/ui/customButton/CustomButton';
import StatusBadge from '../../component/ui/CustomBadge/StatusBadge';
import ToggleSwitch from '../../component/ui/ToggleSwitch/ToggleSwitch';
import { MdMarkEmailUnread, MdOutlineConnectWithoutContact } from 'react-icons/md';
import { IoFilterSharp, IoLocationSharp } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

// 1. Define the shape of your data (Matched to your real-world data)
export interface DistributorData {
    id: number | string;
    businessName: string;
    businessId: string;
    businessLicenseNo: string;
    businessContactDetails: string;
    contactPerson: string;
    address: string;
    kYCVerification: "verified" | "pending" | "failed" | string;
    status: "Active" | "Inactive" | "Pending" | boolean | string;
    CreatedDate: string;
    [key: string]: any;
}

// 2. Define Column Definition
type ColumnDef<T> = {
    field: keyof T | (string & {});
    header: React.ReactNode;
    sorting?: boolean;
    align?: "left" | "right" | "center";
    width?: string;
};

// 3. Update Props
interface OrgTableProps {
    data: any[]; // Use specific type
    columns: any[]; // Use specific type
}

const DistirbutorTbl: React.FC<OrgTableProps> = ({ data, columns }) => {
    const [selectData, setSelectData] = useState<(string | number)[]>([]);
    const navigate = useNavigate();

    return (
        <div>
            <Datatable
                data={data}
                columns={columns}
                pagination={true}
                isLoader={false}
                tableNm="Distributor List"
                icon={"📦"}
                isSearchBar={true}
                checkbox={true} // Enable checkboxes
                selectData={selectData}
                setSelectData={setSelectData}
                tableBtn={
                    <div className='d-flex gap-3' >
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
                        <CustomButton text="Add Distributor"
                            type='button'
                            onClick={() => { navigate('/createdistirbutor') }}
                        />
                    </div>}
            >
                {/* Custom Render Function */}
                {(child: { row: DistributorData; column: ColumnDef<DistributorData> }) => (
                    <>
                        {/* --- 1. Business Name Column (Avatar + Name + ID) --- */}
                        {child.column.field === 'businessName' && (
                            <div className="d-flex align-items-center gap-3">
                                <Avatar
                                    name={child.row.businessName}
                                    size="40px"
                                    rounded
                                // className="shadow-sm"
                                />
                                <div className="d-flex flex-column">
                                    <span className="fw-semibold primary">
                                        {child.row.businessName}
                                    </span>
                                    <span className="text-muted" >
                                        ID: {child.row.businessId}
                                    </span>
                                </div>
                            </div>
                        )}
                        {child.column.field === 'businessContactDetails' && (
                            <div className="d-grid">
                                <span className="text-sm"> <MdOutlineConnectWithoutContact className="secondary text-primary" width="13" height="13" /> {child.row.businessContactDetails}</span>
                                <span className="text-sm "><MdMarkEmailUnread className="secondary text-primary" width="13" height="13" />  {child.row.email}</span>
                            </div>
                        )}
                        {child.column.field === 'address' && (
                            <div className="d-flex align-items-center gap-1">
                                <IoLocationSharp className="secondary text-primary" width="13" height="13" /> <span className="text-sm  "> {child.row.address}</span>
                            </div>
                        )}
                        {child.column.field === 'contactdetails' && (
                            // <span className="text-sm d-flex align-items-center "> <IoIosPerson className="secondary text-primary" width="13" height="13" /> {child.row.contactdetails}</span>
                            <div className="d-grid">
                                <span className="text-sm">  {child.row.contactPerson}</span>
                                <span className="text-sm "> {child.row.email}</span>
                            </div>
                        )}
                        {child.column.field === 'status' && (
                            <ToggleSwitch checked={true} label='' onChange={() => { }} />
                        )}


                        {/* --- 3. KYC Verification Column (Colored Text) --- */}
                        {child.column.field === 'kYCVerification' && (
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <StatusBadge
                                    label={child.row.kYCVerification}
                                    icon="hugeicons:customer-support"
                                    variant="success"
                                    style={{ fontSize: "10px" }}
                                />
                            </div>
                        )}

                        {/* --- 4. Action Column (Icons) --- */}
                        {child.column.field === 'actions' && (
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <button className="btn btn-sm btn-light text-primary rounded-circle p-2" title="View">
                                    <HiOutlineEye size={16} />
                                </button>
                                <button className="btn btn-sm btn-light text-info rounded-circle p-2" title="Edit">
                                    <HiOutlinePencil size={16} />
                                </button>
                                <button className="btn btn-sm btn-light text-danger rounded-circle p-2" title="Delete">
                                    <HiOutlineTrash size={16} />
                                </button>
                            </div>
                        )}

                        {child.column.field === 'CreatedDate' &&
                            (
                                <div
                                    style={{ backgroundColor: "#5e14c51e" }}
                                    className="py-1 rounded-4"
                                >
                                    <span style={{ color: "#5E14C5" }} className="text-sm">
                                        {child.row.CreatedDate}
                                    </span>
                                </div>
                            )}

                        {/* --- 6. Default Render for other columns (Address, License, Date, etc.) --- */}
                        {child.column.field !== 'businessName' &&
                            child.column.field !== 'status' &&
                            child.column.field !== 'kYCVerification' &&
                            child.column.field !== 'businessId' &&
                            child.column.field !== 'contactPerson' &&
                            child.column.field !== 'actions' &&
                            child.column.field !== 'address' &&
                            child.column.field !== 'CreatedDate' &&
                            child.column.field !== 'businessContactDetails' && (
                                <div className="text-sm text-secondary">
                                    {child.row[child.column.field]}
                                </div>
                            )}
                    </>
                )}
            </Datatable>
        </div>
    );
};

export default DistirbutorTbl;