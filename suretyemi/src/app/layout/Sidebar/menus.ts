import { TbLayoutDashboard } from "react-icons/tb";
import {
  HiOutlineBuildingLibrary,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineReceiptPercent,
  HiOutlineArchiveBoxArrowDown,
} from "react-icons/hi2";
import {
  AiOutlineCheckCircle,
  AiOutlineFile,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";


export const menuItems = [
  {
    title: "Dashboard",
    icon: TbLayoutDashboard,
    link: "dashboard",
  },
  {
    title: "Distributor",
    icon: HiOutlineUser, // Using 'User' icon for Distributor
    link: "distributor",
  },
  {
    title: "KYC Verify",
    icon: AiOutlineCheckCircle, // Using 'CheckCircle' for verify
    link: "kycverify",
  },
  {
    title: "Commission Config",
    icon: HiOutlineAdjustmentsHorizontal, // Using 'Adjustments' for config
    link: "commission-config",
  },
  {
    title: "Commission Dash",
    icon: HiOutlineReceiptPercent, // Using 'Percent' for commission
    link: "commission-dash",
  },
  {
    title: "Distributor wallet",
    icon: HiOutlineBuildingLibrary, // Using 'Library' as a stand-in for wallet/vault
    link: "distributor-wallet",
  },
  {
    title: "Seller wallet",
    icon: HiOutlineBuildingLibrary, // Using 'Library' as a stand-in for wallet/vault
    link: "seller-wallet",
  },
  {
    title: "Transaction Log",
    icon: AiOutlineFile, // Using 'File' for log
    link: "transaction-log",
  },
  {
    title: "Withdrawal request",
    icon: HiOutlineArchiveBoxArrowDown, // Using 'ArchiveBoxArrowDown' for withdrawal
    link: "withdrawal-request",
  },
  {
    title: "Mandate management",
    icon: HiOutlineCog6Tooth, // Using 'Cog' for management
    link: "mandate-management",
  },
  {
    title: "Settings",
    icon: AiOutlineSetting,
    link: "settings",
  },
  {
    title: "Logout",
    icon: AiOutlineLogout,
    link: "/",
  },
];