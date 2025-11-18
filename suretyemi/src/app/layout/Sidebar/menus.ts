import { TbLayoutDashboard, TbTicket } from "react-icons/tb";
import {
  HiOutlineBuildingOffice,
  HiOutlineBuildingLibrary,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineEye,
  HiOutlineChartBar,
  HiOutlinePhoneArrowDownLeft,
  HiOutlineCodeBracket,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineUsers,
  HiOutlineReceiptPercent,
  HiOutlineExclamationCircle,
  HiOutlineArchiveBoxArrowDown,
} from "react-icons/hi2";
import { BiCube, BiServer } from "react-icons/bi";
import {
  AiOutlineCheckCircle,
  AiOutlineCi,
  AiOutlineFile,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";

// We will also need these icons for the wallet and transaction items
// (Assuming you have react-icons/hi installed as well, not just hi2)
// If not, I will use the closest from your list.
// --- Using only the icons you provided: ---

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
    link: "kyc-verify",
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