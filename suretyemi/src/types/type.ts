export interface DistributorDtlData {
    businessName: string | undefined;
    id: string;
    profile: {
        distributorName: string;
        companyType: string;
        distributorCode: string;
        avatar: string;
    };
    meta: {
        createdDate: string;
        createdBy: string;
    };
    personalInfo: {
        fullName: string;
        mobileNumber: string;
        altMobileNumber: string;
        aadhaarNo: string;
        panNo: string;
        emailId: string;
    };
    businessInfo: {
        businessName: string;
        gstNumber: string;
        licenseNumber: string;
        emailId: string;
        mobileNumber: string;
    };
    otherInfo: {
        bankDetails: {
            accountHolderName: string;
            bankName: string;
            accountNumber: string;
            ifscCode: string;
            upiId: string;
        };
        referenceContact: {
            personName: string;
            contactNumber: string;
            address: string;
        };
        primaryAddress: {
            fullAddress: string;
        };
    };
    businessId: string;
    businessLicenseNo: string;
    businessContactDetails: string;
    contactPerson: string;
    address: string;
    kYCVerification: "verified" | "pending" | "failed" | string;
    CreatedDate: string;
    status: "Active" | "Inactive" | "Pending" | boolean | string;
    document: any[]
}



/**
 * Types
 */
type IconComponent = React.ComponentType<
    | { width?: number | string; height?: number | string; className?: string }
    | React.SVGProps<SVGSVGElement>
>;

export interface SubMenuItem {
    childtitle: string;
    childlink: string;
    childicon?: string;
}

export interface MenuItem {
    title: string;
    link?: string; // parent top-level link if exists
    icon: IconComponent;
    child?: SubMenuItem[]; // if has children
    isHeadr?: boolean; // header-like non-clickable item
}

/**
 * Props to Navmenu
 */
export interface NavmenuProps {
    menus: MenuItem[];
    collapsed: boolean;
    isHovered: boolean;
}
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