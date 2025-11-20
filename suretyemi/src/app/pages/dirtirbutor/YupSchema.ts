import * as Yup from "yup";
// --- Validation Schemas per Step ---
const phoneRegExp = /^[6-9]\d{9}$/;
const panRegExp = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadhaarRegExp = /^\d{12}$/;
const gstRegExp = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const ifscRegExp = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const pinCodeRegExp = /^[1-9][0-9]{5}$/;
// Step 0: Personal Info
export const personalInfoSchema = Yup.object().shape({
  fullName: Yup.string().min(3, "Name is too short").required("Full Name is required"),
  mobile: Yup.string().matches(phoneRegExp, "Invalid mobile number").required("Mobile number is required"),
  alternateMobile: Yup.string().matches(phoneRegExp, "Invalid mobile number").notRequired(), // Optional
  email: Yup.string().email("Invalid email address").required("Email is required"),
  aadhaar: Yup.string().matches(aadhaarRegExp, "Invalid Aadhaar number (12 digits)").required("Aadhaar is required"),
  pan: Yup.string().matches(panRegExp, "Invalid PAN number").required("PAN number is required"),
  profilePicture: Yup.mixed().required("Profile picture is required"),
});

// Step 1: Business Details
export const businessDetailsSchema = Yup.object().shape({
  businessName: Yup.string().required("Business Name is required"),
  typeofBusiness: Yup.string().required("Business Type is required"),
  businessGSTNo: Yup.string().matches(gstRegExp, "Invalid GST Number").required("GST Number is required"),
  businessLicenseNo: Yup.string().required("License Number is required"),
  businessEmail: Yup.string().email("Invalid email").required("Business Email is required"),
  businessContactNo: Yup.string().matches(phoneRegExp, "Invalid contact number").required("Business Contact is required"),
  OrgAddress1: Yup.string().required("Address Line 1 is required"),
  OrgAddress2: Yup.string().required("Address Line 2 is required"),
  City: Yup.string().required("City is required"),
  State: Yup.string().required("State is required"),
  Country: Yup.string().required("Country is required"),
  Pincode: Yup.string().matches(pinCodeRegExp, "Invalid Pincode").required("Pincode is required"),
});

// Step 2: Documents
export const documentsSchema = Yup.object().shape({
  aadhaarFront: Yup.mixed().required("Aadhaar Front image is required"),
  aadhaarBack: Yup.mixed().required("Aadhaar Back image is required"),
  panCard: Yup.mixed().required("PAN Card image is required"),
  gstCert: Yup.mixed().required("GST Certificate is required"),
  securityCheque: Yup.mixed().required("Security Cheque is required"),
  bankStatement: Yup.mixed().required("Bank Statement is required"),
});

// Step 3: Other Details
export const otherDetailsSchema = Yup.object().shape({
  accountHolderName: Yup.string().required("Account Holder Name is required"),
  bankName: Yup.string().required("Bank Name is required"),
  accountNumber: Yup.string().min(9, "Invalid Account Number").max(18, "Invalid Account Number").required("Account Number is required"),
  ifscCode: Yup.string().matches(ifscRegExp, "Invalid IFSC Code").required("IFSC Code is required"),
  upiId: Yup.string().matches(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID").required("UPI ID is required"),
  referencePersonName: Yup.string().required("Reference Person Name is required"),
  referenceContactNumber: Yup.string().matches(phoneRegExp, "Invalid contact number").required("Reference Contact is required"),
  address1: Yup.string().required("Reference Address is required"),
});

// Step 4: Commission / Cost
// Validation here depends on if you strictly require a plan selection before submitting
export const commissionCostSchema = Yup.object().shape({
  // Example: If you set 'isPlanSelected' to true in your Modal
  // isPlanSelected: Yup.boolean().oneOf([true], "Please select a plan to proceed"),
});



// --- Instructions Data ---
export const formInstructions = [
  // Step 0: Personal Info
  [
    { apiNm: "Enter the distributor's full legal name as per government ID." },
    { apiNm: "Mobile number must be unique and linked with active Aadhaar." },
    { apiNm: "Alternate mobile number is optional but recommended." },
    { apiNm: "Enter valid PAN & Aadhaar details for verification." },
    { apiNm: "Ensure email address is correct for login communication." },
    { apiNm: "Review all information before proceeding to the next step." }
  ],
  // Step 1: Business Details
  [
    { apiNm: "Provide the registered business name as on the license." },
    { apiNm: "Select the appropriate business entity type." },
    { apiNm: "GST Number is mandatory for tax purposes." },
    { apiNm: "Ensure the address matches the proof of business documents." },
    { apiNm: "Business email will be used for official invoicing." }
  ],
  // Step 2: Documents
  [
    { apiNm: "Upload clear, colored scans of original documents." },
    { apiNm: "Supported formats: JPG, PNG, PDF. Max size 5MB." },
    { apiNm: "Ensure edges of the documents are not cropped." },
    { apiNm: "Aadhaar front and back must be uploaded separately." },
    { apiNm: "Bank statement should be of the last 3 months." }
  ],
  // Step 3: Other Details
  [
    { apiNm: "Bank account must belong to the distributor or business." },
    { apiNm: "Ensure IFSC code matches the branch correctly." },
    { apiNm: "Reference contact should be a verified individual." },
    { apiNm: "UPI ID is required for instant small transactions." }
  ],
  // Step 4: Commission/Cost
  [
    { apiNm: "Select a subscription plan to proceed." },
    { apiNm: "Review the recurring cost details carefully." },
    { apiNm: "OTP verification is required to confirm the plan." },
    { apiNm: "Payment will be initiated after OTP verification." }
  ]
];