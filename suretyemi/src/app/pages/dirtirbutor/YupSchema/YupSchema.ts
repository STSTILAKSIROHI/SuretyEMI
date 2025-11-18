import * as Yup from "yup";

// Step 0: Organization Details
export const personalinfo = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required"),

  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid mobile number")
    .required("Mobile number is required"),

  alternateMobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid alternate mobile number")
    .optional(), // or .required("") if you want required

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  aadhaar: Yup.string()
    .matches(/^\d{12}$/, "Aadhaar must be 12 digits")
    .required("Aadhaar number is required"),

  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter a valid PAN number")
    .required("PAN number is required"),
});


export const OrgServiceConfigSchema = Yup.object().shape({
  AssignNo: Yup.string().required("Assign Number is required").matches(/^\d{10}$/, "Assign Number must be 10 digits"),
  Service: Yup.array().of(Yup.string()).min(1, "At least one service must be selected").required("Service is required"),
  MaxCall: Yup.string().required("Max concurrent calls is required").matches(/^[0-9]+$/, "Only numbers are allowed").max(3, "Maximum 3 digits allowed"),
  DefaultIVR: Yup.string().required("Default IVR is required"),
  PreferredLang: Yup.array().of(Yup.string()).min(1, "Select at least one language").required("Preferred language is required"),
  WelcomeScript: Yup.string().required("Welcome Script is required").max(500, "Welcome script cannot exceed 500 characters"),
  TwoFactorAuth: Yup.boolean(),
  CallRecording: Yup.boolean(),
  StorageCapacity: Yup.string().when("CallRecording", { is: true, then: (schema) => schema.required("Storage capacity is required when call recording is enabled"), otherwise: (schema) => schema.notRequired(), }),
  RecordingRetention: Yup.string().when("CallRecording", { is: true, then: (schema) => schema.required("Recording retention period is required when call recording is enabled"), otherwise: (schema) => schema.notRequired(), }),
  IntegratedServices: Yup.boolean(),
  TicketServices: Yup.boolean(),
});

export const OtherConfigSchema = Yup.object().shape({
  BranchLimit: Yup.string().required("Branch Limit is required"),
  UserLimit: Yup.string().required("User Limit is required"),
  OrgLogo: Yup.mixed().required("Organization Logo is required").test("fileFormat", "Only PNG files are allowed",
    (value) => {
      if (!value) return false;
      if (typeof value === "string") return value.endsWith(".png");
      return value && (value as File).type === "image/png";
    }
  ),

  Favicon: Yup.mixed()
    .required("Favicon is required")
    .test(
      "fileFormat",
      "Only PNG files are allowed",
      (value) => {
        if (!value) return false;
        if (typeof value === "string") return value.endsWith(".png");
        return value && (value as File).type === "image/png";
      }
    ),

  Width: Yup.string().required("Width is required").matches(/^\d+$/, "Width must be numeric"),

  height: Yup.string().required("Height is required").matches(/^\d+$/, "Height must be numeric"),

  Metakeyword: Yup.string().max(100, "Meta keyword cannot exceed 100 characters").nullable(),

  MetaDes: Yup.string().max(200, "Meta description cannot exceed 200 characters").nullable(),
});

// Step 3: SMS Config
export const smsConfigSchema = Yup.object().shape({
  vendor: Yup.string().required("Vendor is required"),

  // Conditional: For "Other" vendor
  ApiMethod: Yup.string().when("vendor", {
    is: "Other",
    then: (schema) => schema.required("API Method is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  ApiUrl: Yup.string().when("vendor", {
    is: "Other",
    then: (schema) =>
      schema
        .required("API URL is required")
        .matches(
          /^(https?:\/\/)[\w.-]+(\.[\w\.-]+)+[/#?]?.*$/,
          "Enter a valid URL"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Conditional: For other vendors (Soft-Tech, etc.)
  smsType: Yup.string().when("vendor", {
    is: (val: string) => val && val !== "Other",
    then: (schema) => schema.required("SMS Type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  username: Yup.string().when("vendor", {
    is: (val: string) => val && val !== "Other",
    then: (schema) =>
      schema
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),

  authKey: Yup.string().when("vendor", {
    is: (val: string) => val && val !== "Other",
    then: (schema) =>
      schema
        .required("Auth Key is required")
        .min(5, "Auth Key must be at least 5 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),

  senderId: Yup.string().when("vendor", {
    is: (val: string) => val && val !== "Other",
    then: (schema) =>
      schema
        .required("Sender ID is required")
        .min(3, "Sender ID must be at least 3 characters")
        .max(15, "Sender ID must be 15 characters or less"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

// Step 4: Mail Config
export const MailConfigSchema = Yup.object().shape({
  Active: Yup.boolean().required(),

  host: Yup.string()
    .trim()
    .required("Host is required")
    .matches(
      /^(?!.*\s)([\w.-]+)\.([a-z]{2,})$/,
      "Enter a valid host name (e.g., smtp.gmail.com)"
    ),

  port: Yup.string()
    .required("Port is required")
    .matches(/^\d+$/, "Port must be a number")
    .min(2, "Invalid port number")
    .max(5, "Invalid port number"),

  username: Yup.string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(100, "Username cannot exceed 100 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),

  fromEmail: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("From Email ID is required"),

  tlsEnabled: Yup.boolean()
    .required()
    .oneOf([true, false], "TLS setting must be specified"),
});

// intergration model velidation 

export const Apiintergration = Yup.object().shape({
  serviceName: Yup.string().required("Service Name is required").max(25, "Must be at most 25 characters").min(8, "Must be at least 8 characters"),
  description: Yup.string().required("Service Description is required"),
  steps: Yup.array().of(
    Yup.object().shape({
      apiUrl: Yup.string().required("API Path is required"),
      reqType: Yup.string().required("Request Type is required"),
      contentType: Yup.string().required("Content Type is required"),
      reqPayload: Yup.string().required("Request Payload is required"),
      authType: Yup.string().required("Authentication Type is required"),
      username: Yup.string().when("authType", { is: "Basic", then: (schema) => schema.required("Username is required"), otherwise: (schema) => schema.notRequired() }),
      password: Yup.string().when("authType", { is: "Basic", then: (schema) => schema.required("Password is required"), otherwise: (schema) => schema.notRequired(), }),
      reqData: Yup.array().of(Yup.object().shape({
        type: Yup.string().required("Input Type is required"), label: Yup.string().required("Input label Name is required"), payloadVal: Yup.string().required("Payload is required"),
        dropDownValues: Yup.array().when("inputType", {
          is: (inputType: string) =>
            inputType === "DROPDOWN" || inputType === "RADIO",
          then: (schema: any) =>
            Yup.array().of(
              Yup.object().shape({
                value: Yup.string().required("Option Value is required"),
              })
            ),
        }),
      })
      ),
      successData: Yup.array().of(Yup.object().shape({ key: Yup.string().required("Key is required"), type: Yup.string().required("Type is required"), value: Yup.mixed().required("Value is required"), })),
      failedData: Yup.array().of(Yup.object().shape({ key: Yup.string().required("Key is required"), type: Yup.string().required("Type is required"), value: Yup.mixed().required("Value is required"), })),
      ExceptionData: Yup.array().of(Yup.object().shape({ key: Yup.string().required("Key is required"), type: Yup.string().required("Type is required"), value: Yup.mixed().required("Value is required"), })),
    })
  ),
});