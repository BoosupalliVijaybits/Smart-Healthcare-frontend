import {
  banner1,
  banner10,
  banner2,
  banner3,
  doccomputer,
  Gastroenterology,
  heartwith,
  monitor,
  Nurology,
  pationtcall,
  Rhinology,
  surgery,
  Otology,
  Pulmonology,
  Urology,
  Dental,
  Orthopedist,
  Eyecare,
  logo,
  doctor1,
  doctor2,
  doctor3,
  doctor4,
  doctor6,
  review1,
  review2,
  review3,
  review4,
  review5,
  review6,
} from "../assets/image";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import PhoneForwardedOutlinedIcon from "@mui/icons-material/PhoneForwardedOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import HomeIcon from "@mui/icons-material/Home";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

export const navlist = [
  {
    id: 1,
    list: "Home",
    navigation: "/home",
  },
  // {
  //   id: 2,
  //   list: "Appoinment",
  //   navigation: "/contact",
  // },
  {
    id: 3,
    list: "About",
    navigation: "/about",
  },

  {
    id: 4,
    list: "Review",
    navigation: "/review",
  },
  // {
  //   id: 5,
  //   list: "Blog",
  //   navigation: "/profile",
  // },
  {
    id: 6,
    list: "Contact",
    navigation: "/contact",
  },
];

export const logintype = [
  {
    id: 1,
    name: "Patient",
  },
  {
    id: 2,
    name: "Doctor",
  },
  {
    id: 3,
    name: "Admin",
  },
];

export const registertype = [
  {
    id: 1,
    name: "Patient",
  },
  {
    id: 2,
    name: "Doctor",
  },
];

export const genderList = [
  {
    id: 1,
    // name: "Male",
    name: "MALE",
  },

  {
    id: 1,
    // name: "Female",
    name: "FEMALE",
  },
  {
    id: 1,
    // name: "Others",
    name: "OTHERS",
  },
];

export const MaritalStatusList = [
  {
    id: 1,
    name: "Single",
  },
  {
    id: 2,
    name: "Married",
  },
];

export const pationtRegister = [
  {
    id: 1,
    formFeald: "firstName",
    type: "text",
    lable: "First Name *",
    placeholder: "First Name",
  },
  {
    id: 2,
    formFeald: "lastName",
    type: "text",
    lable: "Last Name *",
    placeholder: "Last Name",
  },
  {
    id: 3,
    formFeald: "email",
    type: "text",
    lable: "Your Email *",
    placeholder: "Email",
  },
  {
    id: 4,
    formFeald: "phoneNumber",
    type: "text",
    lable: "Mobile Number *",
    placeholder: "Phone Number",
  },
  {
    id: 5,
    formFeald: "password",
    type: "password",
    lable: "Password *",
    placeholder: "Password",
  },
  {
    id: 6,
    formFeald: "confirmPassword",
    type: "password",
    lable: "Confirm Password *",
    placeholder: "confirm Password",
  },
  {
    id: 7,
    formFeald: "address",
    type: "text",
    lable: "Address *",
    placeholder: "Address",
  },
  {
    id: 8,
    formFeald: "dateofbirth",
    type: "date",
    lable: "Date of Birth *",
    placeholder: "Date of Birth",
  },
  {
    id: 9,
    formFeald: "Maritalstatus",
    type: "dropdown",
    lable: "Marital Status *",
    placeholder: "Marital Status",
    list: [
      {
        id: 1,
        // name: "Single",
        name: "SINGLE",
      },
      {
        id: 2,
        // name: "Married",
        name: "MARRIED",
      },
    ],
  },
  {
    id: 10,
    formFeald: "gender",
    type: "select",
    lable: "Gender *",
    placeholder: "gender",
  },
  // {
  //   id: 11,
  //   formFeald: "preconditions",
  //   type: "text",
  //   lable: "Pre-existing Conditions",
  //   placeholder: "Any existing medical conditions",
  // },
  // {
  //   id: 12,
  //   formFeald: "allergies",
  //   type: "text",
  //   lable: "Allergies",
  //   placeholder: "Allergies",
  // },
  {
    id: 13,
    formFeald: "bloodgroup",
    type: "dropdown",
    lable: "Blood Group *",
    placeholder: "Blood Group",
    list: [
      {
        id: 1,
        name: "A+ (A positive)",
      },
      {
        id: 2,
        name: "A- (A negative)",
      },
      {
        id: 3,
        name: "B+ (B positive)",
      },
      {
        id: 4,
        name: "B- (B negative)",
      },
      {
        id: 5,
        name: "AB+ (AB positive)",
      },
      {
        id: 6,
        name: "AB- (AB negative)",
      },
      {
        id: 7,
        name: "O+ (O positive)",
      },
      {
        id: 8,
        name: "O- (O negative)",
      },
    ],
  },
  {
    id: 14,
    formFeald: "emergencynumber",
    type: "text",
    lable: "Emergency Contact Number *",
    placeholder: "Contact Number",
  },
  {
    id: 15,
    formFeald: "emergencyname",
    type: "text",
    lable: "Emergency Contact Name *",
    placeholder: "Emergency Contact Name",
  },
  // {
  //   id: 16,
  //   formFeald: "insuranceprovider",
  //   type: "text",
  //   lable: "Insurance Provider",
  //   placeholder: "Insurance Provider",
  // },
  // {
  //   id: 17,
  //   formFeald: "policynumber",
  //   type: "text",
  //   lable: "Insurance Policy Number",
  //   placeholder: "Insurance Policy Number",
  // },
  // {
  //   id: 18,
  //   formFeald: "validitydate",
  //   type: "date",
  //   lable: "Insurance Validity Date",
  //   placeholder: "Insurance Validity Date",
  // },
];

export const doctorRegister = [
  {
    id: 1,
    formFeald: "licenseNumber",
    type: "text",
    lable: "LicenseNumber *",
    placeholder: "LicenseNumber",
  },
  {
    id: 2,
    formFeald: "specialization",
    type: "text",
    lable: "Specialization",
    placeholder: "Specialization",
  },
  {
    id: 3,
    formFeald: "firstName",
    type: "text",
    lable: "First Name *",
    placeholder: "First Name",
  },
  {
    id: 4,
    formFeald: "lastName",
    type: "text",
    lable: "Last Name *",
    placeholder: "Last Name",
  },

  {
    id: 5,
    formFeald: "email",
    type: "text",
    lable: "Your Email *",
    placeholder: "Email",
  },
  {
    id: 6,
    formFeald: "phoneNumber",
    type: "text",
    lable: "Mobile Number *",
    placeholder: "Phone Number",
  },
  {
    id: 7,
    formFeald: "clinicname",
    type: "text",
    lable: "Clinic Name *",
    placeholder: "Clinic Name",
  },
  {
    id: 8,
    formFeald: "clinicaddress",
    type: "text",
    lable: "Clinic Address *",
    placeholder: "Clinic Address",
  },
  {
    id: 9,
    formFeald: "qualifications",
    type: "text",
    lable: "Qualifications *",
    placeholder: "Qualifications",
  },
  {
    id: 10,
    formFeald: "experience",
    type: "number",
    lable: "Experience *",
    placeholder: "Experience",
  },
  // {
  //   id: 11,
  //   formFeald: "emergencycontact",
  //   type: "text",
  //   lable: "Emergency Contact *",
  //   placeholder: "Emergency Contact",
  // },
  {
    id: 12,
    formFeald: "dateofbirth",
    type: "date",
    lable: "Date of Birth *",
    placeholder: "Date of Birth",
  },
  {
    id: 13,
    formFeald: "password",
    type: "password",
    lable: "Password *",
    placeholder: "Password",
  },
  {
    id: 14,
    formFeald: "confirmPassword",
    type: "password",
    lable: "Confirm Password *",
    placeholder: "confirm Password",
  },
  // {
  //   id: 15,
  //   formFeald: "Maritalstatus",
  //   type: "dropdown",
  //   lable: "Marital Status *",
  //   placeholder: "Marital Status",
  //   list: [
  //     {
  //       id: 1,
  //       // name: "Single",
  //       name: "SINGLE",
  //     },
  //     {
  //       id: 2,
  //       // name: "Married",
  //       name: "MARRIED",
  //     },
  //   ],
  // },
  {
    id: 10,
    formFeald: "gender",
    type: "select",
    lable: "Gender *",
    placeholder: "gender",
  },
];

export const adminRegister = [
  {
    id: 1,
    formFeald: "firstName",
    type: "text",
    lable: "First Name *",
    placeholder: "First Name",
  },
  {
    id: 2,
    formFeald: "lastName",
    type: "text",
    lable: "Last Name *",
    placeholder: "Last Name",
  },
  {
    id: 3,
    formFeald: "email",
    type: "text",
    lable: "Your Email *",
    placeholder: "Email",
  },
  {
    id: 4,
    formFeald: "phoneNumber",
    type: "text",
    lable: "Mobile Number *",
    placeholder: "Phone Number",
  },
  {
    id: 5,
    formFeald: "password",
    type: "password",
    lable: "Password *",
    placeholder: "Password",
  },
  {
    id: 6,
    formFeald: "confirmPassword",
    type: "password",
    lable: "Confirm Password *",
    placeholder: "confirm Password",
  },
  {
    id: 7,
    formFeald: "address",
    type: "text",
    lable: "Address *",
    placeholder: "Address",
  },
  {
    id: 8,
    formFeald: "dateofbirth",
    type: "date",
    lable: "Date of Birth *",
    placeholder: "Date of Birth",
  },
  {
    id: 9,
    formFeald: "Maritalstatus",
    type: "dropdown",
    lable: "Marital Status *",
    placeholder: "Marital Status",
    list: [
      {
        id: 1,
        name: "Single",
      },
      {
        id: 2,
        name: "Married",
      },
    ],
  },
  {
    id: 10,
    formFeald: "gender",
    type: "select",
    lable: "Gender *",
    placeholder: "gender",
  },
];

export const bannerlist = [
  {
    id: 1,
    img: pationtcall,
    head: "Book Doctor Appointments",
    para: "Quick, Easy, and Convenient!",
  },
  {
    id: 2,
    img: monitor,
    head: "Your Health, Our Priority",
    para: "Book Appointments Anytime",
  },
  {
    id: 3,
    img: heartwith,
    head: "Seamless Scheduling & Tracking",
    para: "Appointment & Medication Management",
  },
  {
    id: 4,
    img: heartwith,
    head: "Your Health Journey Starts Here",
    para: "Schedule Appointments Online",
  },
];

export const special_list = [
  {
    id: 1,
    name: "Surgery",
    img: surgery,
  },
  {
    id: 2,
    name: "Rhinology",
    img: Rhinology,
  },
  {
    id: 3,
    name: "Nurology",
    img: Nurology,
  },
  {
    id: 4,
    name: "Gastroenterology",
    img: Gastroenterology,
  },
  {
    id: 5,
    name: "Otology",
    img: Otology,
  },
  {
    id: 6,
    name: "Pulmonology",
    img: Pulmonology,
  },
  {
    id: 7,
    name: "Urology",
    img: Urology,
  },
  {
    id: 8,
    name: "Dental Care",
    img: Dental,
  },
  {
    id: 9,
    name: "Orthopedist",
    img: Orthopedist,
  },
  {
    id: 10,
    name: "Eye care",
    img: Eyecare,
  },
];

export const detail_list = [
  {
    id: 1,
    img: <PersonPinCircleOutlinedIcon className="white f3 fs-2" />,
    big_txt: <>located near you</>,
    min_txt: "Within 30 Minutes",
  },
  {
    id: 2,
    img: <HeadsetMicOutlinedIcon className="white f3 fs-2" />,
    big_txt: "24 / 7 Available",
    min_txt: "Call Us Anytime",
  },
  {
    id: 2,
    img: <PhoneForwardedOutlinedIcon className="white f3 fs-2" />,
    big_txt: "Contact Us Free",
    min_txt: "+91 989456 88845",
  },
];

export const clint_review = [
  {
    id: 1,
    name: "Alice Johnson",
    img: review1,
    dis: "Satisfied Patient",
    para: "The doctors here are truly professional and caring. My experience has been nothing but excellent!",
  },
  {
    id: 2,
    name: "Michael Smith",
    img: review2,
    dis: "Happy Client",
    para: "Booking appointments is so easy, and the consultation process is seamless. Highly recommend!",
  },
  {
    id: 3,
    name: "Sophia Williams",
    img: review3,
    dis: "Grateful Visitor",
    para: "A top-notch healthcare facility with modern technology and caring professionals.",
  },
  {
    id: 4,
    name: "Daniel Brown",
    img: review4,
    dis: "Pleased Patient",
    para: "I received exceptional treatment and care. The online medical record system is very helpful.",
  },
  {
    id: 5,
    name: "Emma Davis",
    img: review5,
    dis: "Health Enthusiast",
    para: "This healthcare center is efficient and user-friendly. The teleconsultation feature is a lifesaver!",
  },
  {
    id: 6,
    name: "James Wilson",
    img: review6,
    dis: "Regular Patient",
    para: "Their smart health solutions have made my life so much easier. Excellent service and support!",
  },
];

export const SideNavList = [
  {
    id: 1,
    name: "Home",
    navi: "/",
    icon: HomeIcon,
    sub: [
      {
        list: "/",
      },
      {
        list: "/patient/home",
      },
    ],
  },
  {
    id: 2,
    name: "Doctors",
    navi: "/patient/doctors",
    icon: Diversity1RoundedIcon,
    sub: [
      {
        list: "/patient/doctors/detail",
      },
    ],
  },
  {
    id: 2,
    name: "My Appointments",
    navi: "/patient/appointment",
    icon: OpenInNewOutlinedIcon,
    sub: [
      // {
      //   list: "/patient/doctors",
      // },
      {
        list: "/patient/appointment/detail",
      },
    ],
  },
  {
    id: 3,
    name: "Medication Tracking",
    navi: "/patient/medicationtracking",
    icon: TrendingUpOutlinedIcon,
  },
  {
    id: 4,
    name: "History",
    navi: "/pationt/history",
    icon: HistoryOutlinedIcon,
  },
  // {
  //   id: 4,
  //   name: "Reviews",
  //   navi: "/patient/review",
  //   icon: ReviewsOutlinedIcon,
  // },
  // {
  //   id: 5,
  //   name: "About Us",
  //   navi: "/patient/about",
  //   icon: InfoOutlinedIcon,
  // },
  {
    id: 6,
    name: "Contact us",
    navi: "/patient/contact",
    icon: ContactsOutlinedIcon,
  },
  {
    id: 7,
    name: "Notification",
    navi: "/patient/notification",
    icon: CircleNotificationsOutlinedIcon,
  },
  {
    id: 8,
    name: "Logout",
    navi: "logout",
    icon: LogoutOutlinedIcon,
  },
];

export const doctorSideNavList = [
  {
    id: 1,
    name: "Dashboard",
    navi: "/",
    icon: DashboardRoundedIcon,
    sub: [
      {
        list: "/",
      },
      {
        list: "/doctor/dashboard",
      },
    ],
  },
  {
    id: 1,
    name: "Time Slots",
    navi: "/doctor/timeslots",
    icon: PendingActionsOutlinedIcon,
  },
  // {
  //   id: 1,
  //   name: "Patients Request",
  //   navi: "/doctor/patient-request",
  //   icon: CampaignOutlinedIcon,
  // },
  {
    id: 2,
    name: "Todays Appointments",
    navi: "/doctor/today-appointment",
    icon: CampaignOutlinedIcon,
    sub: [
      {
        list: "/doctor/today-appointment/detail",
      },
    ],
  },
  {
    id: 2,
    name: "UpComming Appointments",
    navi: "/doctor/upcomming-appointment",
    icon: TodayRoundedIcon,

    sub: [
      {
        list: "/doctor/upcomming-appointment/detail",
      },
    ],
  },
  {
    id: 3,
    name: "My Patients",
    navi: "/doctor/patient",
    icon: TrendingUpOutlinedIcon,
    sub: [
      {
        list: "/doctor/patient/detail",
      },
    ],
  },
  // {
  //   id: 4,
  //   name: "History",
  //   navi: "/pationt/history",
  //   icon: HistoryOutlinedIcon,
  // },
  // {
  //   id: 4,
  //   name: "Reviews",
  //   navi: "/patient/review",
  //   icon: ReviewsOutlinedIcon,
  // },
  // {
  //   id: 5,
  //   name: "About Us",
  //   navi: "/patient/about",
  //   icon: InfoOutlinedIcon,
  // },
  {
    id: 6,
    name: "Contact us",
    navi: "/doctor/contact",
    icon: ContactsOutlinedIcon,
  },
  {
    id: 7,
    name: "Notification",
    navi: "/doctor/notification",
    icon: CircleNotificationsOutlinedIcon,
  },
  {
    id: 8,
    name: "Logout",
    navi: "logout",
    icon: LogoutOutlinedIcon,
  },
];

export const adminSideNavList = [
  {
    id: 1,
    name: "Dashboard",
    navi: "/",
    icon: DashboardRoundedIcon,
    sub: [
      {
        list: "/",
      },
      {
        list: "/admin/dashboard",
      },
    ],
  },
  {
    id: 2,
    name: "Doctors Request",
    navi: "/admin/doctor/request",
    icon: CampaignOutlinedIcon,
    sub: [
      {
        list: "/admin/doctor/request/detail",
      },
    ],
  },
  // {
  //   id: 2,
  //   name: "Pationts Request",
  //   navi: "/admin/patient/request",
  //   icon: AssignmentIndOutlinedIcon,
  //   sub: [
  //     {
  //       list: "/doctor/patient/detail",
  //     },
  //   ],
  // },
  {
    id: 3,
    name: "Doctors",
    navi: "/admin/doctor",
    icon: Diversity1RoundedIcon,
    sub: [
      {
        list: "/admin/doctor/detail",
      },
      {
        list: "/admin/doctor/time-slots",
      },
    ],
  },
  {
    id: 3,
    name: "Patients",
    navi: "/admin/patient",
    icon: PeopleOutlineRoundedIcon,
    sub: [
      {
        list: "/admin/patient/detail",
      },
    ],
  },
  // {
  //   id: 4,
  //   name: "History",
  //   navi: "/pationt/history",
  //   icon: HistoryOutlinedIcon,
  // },
  // {
  //   id: 4,
  //   name: "Reviews",
  //   navi: "/patient/review",
  //   icon: ReviewsOutlinedIcon,
  // },
  // {
  //   id: 5,
  //   name: "About Us",
  //   navi: "/patient/about",
  //   icon: InfoOutlinedIcon,
  // },
  // {
  //   id: 6,
  //   name: "Contact us",
  //   navi: "/admin/contact",
  //   icon: ContactsOutlinedIcon,
  // },
  {
    id: 7,
    name: "Notification",
    navi: "/admin/notification",
    icon: CircleNotificationsOutlinedIcon,
  },
  {
    id: 8,
    name: "Logout",
    navi: "logout",
    icon: LogoutOutlinedIcon,
  },
];

export const cards = [
  {
    id: 1,
    number: "300",
    text: "Today's Appointments",
    icon: TodayRoundedIcon,
    navi: "/doctor/today-appointment",
  },
  {
    id: 2,
    number: "120",
    text: "Patients Request",
    icon: CampaignOutlinedIcon,
    navi: "/doctor/patient-request",
  },

  {
    id: 3,
    number: "80",
    text: "Completed",
    icon: HowToRegRoundedIcon,
    navi: "/doctor/patient",
  },
  {
    id: 4,
    number: "2",
    text: "Postponed",
    icon: PendingActionsOutlinedIcon,
    navi: "/doctor/today-appointment",
  },
];

export const admincards = [
  {
    id: 2,
    number: "0",
    text: "Doctor Request",
    icon: CampaignOutlinedIcon,
    navi: "/admin/doctor/request",
  },
  // {
  //   id: 4,
  //   number: "2",
  //   text: "Patients Request",
  //   icon: AssignmentIndOutlinedIcon,
  //   navi: "/admin/patient/request",
  // },
  {
    id: 1,
    number: "0",
    text: "Doctors",
    icon: Diversity1RoundedIcon,
    navi: "/admin/doctor",
  },

  {
    id: 3,
    number: "0",
    text: "Patients",
    icon: Diversity3RoundedIcon,
    navi: "/admin/patient",
  },
];

export const profileinput = [
  {
    id: 1,
    formFeald: "firstName",
    type: "text",
    lable: "First Name",
    placeholder: "First Name",
  },
  {
    id: 2,
    formFeald: "lastName",
    type: "text",
    lable: "Last Name",
    placeholder: "Last Name",
  },
  {
    id: 3,
    formFeald: "email",
    type: "text",
    lable: "Your Email",
    placeholder: "Email",
  },
  {
    id: 4,
    formFeald: "phoneNumber",
    type: "text",
    lable: "Mobile Number",
    placeholder: "Phone Number",
  },
  {
    id: 7,
    formFeald: "address",
    type: "text",
    lable: "Address",
    placeholder: "Address",
  },
  {
    id: 8,
    formFeald: "dateofbirth",
    type: "date",
    lable: "Date of Birth",
    placeholder: "Date of Birth",
  },
  {
    id: 9,
    formFeald: "Maritalstatus",
    type: "select",
    lable: "Marital Status",
    firstoption: "Select your marital Status",
    placeholder: "Marital Status",
    list: [
      {
        id: 1,
        name: "Single",
      },
      {
        id: 2,
        name: "Married",
      },
    ],
  },
  {
    id: 10,
    formFeald: "gender",
    type: "select",
    lable: "Gender",
    placeholder: "gender",
    firstoption: "Select your gender",
    list: [
      {
        id: 1,
        name: "Male",
      },
      {
        id: 2,
        name: "Female",
      },
      {
        id: 3,
        name: "Others",
      },
    ],
  },
  // {
  //   id: 11,
  //   formFeald: "preconditions",
  //   type: "text",
  //   lable: "Pre-existing Conditions",
  //   placeholder: "Any existing medical conditions",
  // },
  // {
  //   id: 12,
  //   formFeald: "allergies",
  //   type: "text",
  //   lable: "Allergies",
  //   placeholder: "Allergies",
  // },
  {
    id: 13,
    formFeald: "bloodgroup",
    type: "select",
    lable: "Blood Group",
    placeholder: "Blood Group",
    list: [
      {
        id: 1,
        name: "A+ (A positive)",
      },
      {
        id: 2,
        name: "A- (A negative)",
      },
      {
        id: 3,
        name: "B+ (B positive)",
      },
      {
        id: 4,
        name: "B- (B negative)",
      },
      {
        id: 5,
        name: "AB+ (AB positive)",
      },
      {
        id: 6,
        name: "AB- (AB negative)",
      },
      {
        id: 7,
        name: "O+ (O positive)",
      },
      {
        id: 8,
        name: "O- (O negative)",
      },
    ],
  },
  {
    id: 14,
    formFeald: "emergencynumber",
    type: "text",
    lable: "Emergency Contact Number",
    placeholder: "Contact Number",
  },
  {
    id: 15,
    formFeald: "emergencyname",
    type: "text",
    lable: "Emergency Contact Name",
    placeholder: "Emergency Contact Name",
  },
];

export const doctorprofileinput = [
  {
    id: 1,
    formFeald: "firstName",
    type: "text",
    lable: "First Name",
    placeholder: "First Name",
  },
  {
    id: 2,
    formFeald: "lastName",
    type: "text",
    lable: "Last Name",
    placeholder: "Last Name",
  },
  {
    id: 3,
    formFeald: "licenseNumber",
    type: "text",
    lable: "License Number",
    placeholder: "License Number",
  },
  {
    id: 4,
    formFeald: "qualification",
    type: "text",
    lable: "Qualification",
    placeholder: "Qualification",
  },
  {
    id: 5,
    formFeald: "specialization",
    type: "text",
    lable: "Specialization",
    placeholder: "Specialization",
  },
  {
    id: 6,
    formFeald: "email",
    type: "text",
    lable: "Your Email",
    placeholder: "Email",
  },
  {
    id: 7,
    formFeald: "phoneNumber",
    type: "text",
    lable: "Mobile Number",
    placeholder: "Phone Number",
  },
  {
    id: 8,
    formFeald: "clinicAddress",
    type: "text",
    lable: "Clinic Address",
    placeholder: "Clinic Address",
  },
  {
    id: 9,
    formFeald: "clinicName",
    type: "text",
    lable: "Clinic Name",
    placeholder: "Clinic Name",
  },
  {
    id: 10,
    formFeald: "experience",
    type: "text",
    lable: "Experience",
    placeholder: "Experience",
  },
  {
    id: 11,
    formFeald: "dateofbirth",
    type: "date",
    lable: "Date of Birth",
    placeholder: "Date of Birth",
  },
  {
    id: 12,
    formFeald: "gender",
    type: "select",
    lable: "Gender",
    placeholder: "gender",
    firstoption: "Select your gender",
    list: [
      {
        id: 1,
        name: "Male",
      },
      {
        id: 2,
        name: "Female",
      },
      {
        id: 3,
        name: "Others",
      },
    ],
  },
];

export const adminprofileinput = [
  {
    id: 1,
    formFeald: "name",
    type: "text",
    lable: "Name",
    placeholder: "Name",
  },
  {
    id: 2,
    formFeald: "role",
    type: "text",
    lable: "Role",
    placeholder: "Role",
    value: "Admin",
  },
  {
    id: 3,
    formFeald: "email",
    type: "text",
    lable: "Your Email",
    placeholder: "Email",
  },
  {
    id: 4,
    formFeald: "phoneNumber",
    type: "text",
    lable: "Mobile Number",
    placeholder: "Phone Number",
  },
  {
    id: 5,
    formFeald: "dateofbirth",
    type: "date",
    lable: "Date of Birth",
    placeholder: "Date of Birth",
  },
  {
    id: 6,
    formFeald: "gender",
    type: "select",
    lable: "Gender",
    placeholder: "gender",
    firstoption: "Select your gender",
    list: [
      {
        id: 1,
        name: "Male",
      },
      {
        id: 2,
        name: "Female",
      },
      {
        id: 3,
        name: "Others",
      },
    ],
  },
];

export const appoinmrntList = [
  {
    id: 1,
    name: "Request",
  },
  {
    id: 2,
    name: "Confirmd",
  },
  {
    id: 3,
    name: "Completed",
  },
];

export const doctorappoinmrnt = [
  {
    id: 1,
    name: "Today",
  },
  {
    id: 2,
    name: "Postponed",
  },
  // {
  //   id: 3,
  //   name: "Completed",
  // },
];

export const appointmentList = [
  {
    id: 1,
    doctorName: "Dr. Rajesh Kumar",
    specialization: "Cardiologist",
    appointmentDate: "10 Mar 2025",
    appointmentTime: "10:30 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    doctorName: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    appointmentDate: "15 Mar 2025",
    appointmentTime: "11:00 AM",
    status: "Pending",
  },
  {
    id: 3,
    doctorName: "Dr. Sunil Patil",
    specialization: "Orthopedic Surgeon",
    appointmentDate: "20 Mar 2025",
    appointmentTime: "2:00 PM",
    status: "Cancelled",
  },
  {
    id: 4,
    doctorName: "Dr. Meera Nair",
    specialization: "Gynecologist",
    appointmentDate: "22 Mar 2025",
    appointmentTime: "4:00 PM",
    status: "Completed",
  },
  {
    id: 5,
    doctorName: "Dr. Akash Gupta",
    specialization: "Dentist",
    appointmentDate: "25 Mar 2025",
    appointmentTime: "9:30 AM",
    status: "Pending",
  },
  {
    id: 6,
    doctorName: "Dr. Neha Verma",
    specialization: "Neurologist",
    appointmentDate: "28 Mar 2025",
    appointmentTime: "12:00 PM",
    status: "Confirmed",
  },
  {
    id: 7,
    doctorName: "Dr. Sanjay Malhotra",
    specialization: "Psychiatrist",
    appointmentDate: "30 Mar 2025",
    appointmentTime: "3:00 PM",
    status: "Cancelled",
  },
  {
    id: 8,
    doctorName: "Dr. Arjun Singh",
    specialization: "General Physician",
    appointmentDate: "2 Apr 2025",
    appointmentTime: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 9,
    doctorName: "Dr. Ritu Sharma",
    specialization: "Pediatrician",
    appointmentDate: "5 Apr 2025",
    appointmentTime: "11:30 AM",
    status: "Pending",
  },
  {
    id: 10,
    doctorName: "Dr. Anil Kapoor",
    specialization: "ENT Specialist",
    appointmentDate: "8 Apr 2025",
    appointmentTime: "1:00 PM",
    status: "Confirmed",
  },
  {
    id: 11,
    doctorName: "Dr. Anil Kapoor",
    specialization: "ENT Specialist",
    appointmentDate: "8 Apr 2025",
    appointmentTime: "1:00 PM",
    status: "Completed",
  },
];

export const todayAppoinment = [
  {
    id: 1,
    doctorName: "Dr. Rajesh Kumar",
    specialization: "Cardiologist",
    appointmentDate: "10 Mar 2025",
    appointmentTime: "10:30 AM",
    status: null,
  },
  {
    id: 2,
    doctorName: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    appointmentDate: "15 Mar 2025",
    appointmentTime: "11:00 AM",
    status: null,
  },
  {
    id: 3,
    doctorName: "Dr. Sunil Patil",
    specialization: "Orthopedic Surgeon",
    appointmentDate: "20 Mar 2025",
    appointmentTime: "2:00 PM",
    status: null,
  },
  {
    id: 4,
    doctorName: "Dr. Meera Nair",
    specialization: "Gynecologist",
    appointmentDate: "22 Mar 2025",
    appointmentTime: "4:00 PM",
    status: null,
  },
  {
    id: 5,
    doctorName: "Dr. Akash Gupta",
    specialization: "Dentist",
    appointmentDate: "25 Mar 2025",
    appointmentTime: "9:30 AM",
    status: null,
  },
  {
    id: 6,
    doctorName: "Dr. Neha Verma",
    specialization: "Neurologist",
    appointmentDate: "28 Mar 2025",
    appointmentTime: "12:00 PM",
    status: null,
  },
];
export const postAppoinment = [
  {
    id: 1,
    doctorName: "Dr. Rajesh Kumar",
    specialization: "Cardiologist",
    appointmentDate: "10 Mar 2025",
    appointmentTime: "10:30 AM",
    status: "Pending",
  },
  {
    id: 2,
    doctorName: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    appointmentDate: "15 Mar 2025",
    appointmentTime: "11:00 AM",
    status: "Pending",
  },
];

export const completeAppoinment = [
  {
    id: 1,
    name: "Rajesh Kumar",
    age: 20,
    date: "2025-03-10",
    time: "10:30 AM",
    doctor: "Dr. Rajesh Kumar",
  },
  {
    id: 2,
    name: "Priya Sharma",
    age: 28,
    date: "2025-03-15",
    time: "11:00 AM",
    doctor: "Dr. Priya Sharma",
  },
  {
    id: 3,
    name: "Sunil Patil",
    age: 40,
    date: "2025-03-20",
    time: "2:00 PM",
    doctor: "Dr. Sunil Patil",
  },
  {
    id: 4,
    name: "Amit Verma",
    age: 18,
    date: "2025-03-21",
    time: "3:30 PM",
    doctor: "Dr. Sunil Patil",
  },
  {
    id: 5,
    name: "Neha Gupta",
    age: 20,
    date: "2025-03-22",
    time: "5:00 PM",
    doctor: "Dr. Sunil Patil",
  },
  {
    id: 6,
    name: "Karan Mehta",
    age: 30,
    date: "2025-03-23",
    time: "6:30 PM",
    doctor: "Dr. Sunil Patil",
  },
];

export const medicineslist = [
  {
    id: 1,
    name: "Paracetamol",
    dosage: "500mg",
    time: "Morning, Night",
    food: "Before Food",
    startDate: "01 Mar 2025",
    endDate: "10 Mar 2025",
    status: "Ongoing",
  },
  {
    id: 2,
    name: "Amoxicillin",
    dosage: "250mg",
    time: "Afternoon",
    food: "After Food",
    startDate: "02 Mar 2025",
    endDate: "12 Mar 2025",
    status: "Completed",
  },
  {
    id: 3,
    name: "Crocin",
    dosage: "650mg",
    time: "Morning, Night",
    food: "Before Food",
    startDate: "05 Mar 2025",
    endDate: "15 Mar 2025",
    status: "Skipped",
  },
  {
    id: 4,
    name: "Calcium Tablet",
    dosage: "1000mg",
    time: "Morning",
    food: "After Food",
    startDate: "07 Mar 2025",
    endDate: "17 Mar 2025",
    status: "Ongoing",
  },
  {
    id: 5,
    name: "Dolo 650",
    dosage: "650mg",
    time: "Afternoon",
    food: "After Food",
    startDate: "10 Mar 2025",
    endDate: "20 Mar 2025",
    status: "Ongoing",
  },
  {
    id: 6,
    name: "Dolo 650",
    dosage: "650mg",
    time: "Afternoon",
    food: "After Food",
    startDate: "10 Mar 2025",
    endDate: "20 Mar 2025",
    status: "Ongoing",
  },
  {
    id: 7,
    name: "Dolo 650",
    dosage: "650mg",
    time: "Afternoon",
    food: "After Food",
    startDate: "10 Mar 2025",
    endDate: "20 Mar 2025",
    status: "Ongoing",
  },
  {
    id: 8,
    name: "Dolo 650",
    dosage: "650mg",
    time: "Afternoon",
    food: "After Food",
    startDate: "10 Mar 2025",
    endDate: "20 Mar 2025",
    status: "Ongoing",
  },
];

export const prescriptionsview = [
  {
    medicineName: "Paracetamol",
    dosage: "500mg",
    timeToTake: "Morning & Night",
    startDate: "2025-03-01",
    endDate: "2025-03-07",
    afterFood: "Yes",
  },
  {
    medicineName: "Amoxicillin",
    dosage: "250mg",
    timeToTake: "Afternoon",
    startDate: "2025-03-02",
    endDate: "2025-03-10",
    afterFood: "No",
  },
  {
    medicineName: "Vitamin D",
    dosage: "1000 IU",
    timeToTake: "Morning",
    startDate: "2025-03-05",
    endDate: "2025-04-05",
    afterFood: "Yes",
  },
  {
    medicineName: "Ibuprofen",
    dosage: "400mg",
    timeToTake: "Night",
    startDate: "2025-03-03",
    endDate: "2025-03-07",
    afterFood: "No",
  },
  {
    medicineName: "Cetirizine",
    dosage: "10mg",
    timeToTake: "Before Bed",
    startDate: "2025-03-01",
    endDate: "2025-03-05",
    afterFood: "Yes",
  },
  {
    medicineName: "Metformin",
    dosage: "500mg",
    timeToTake: "Morning & Evening",
    startDate: "2025-03-02",
    endDate: "2025-04-02",
    afterFood: "Yes",
  },
  {
    medicineName: "Aspirin",
    dosage: "75mg",
    timeToTake: "Morning",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    afterFood: "No",
  },
];

export const adminrequestdoctorsList = [
  {
    doctorId: "DOC1001",
    specialization: "Cardiologist",
    firstName: "Arjun",
    lastName: "Kumar",
    email: "arjun.kumar@example.com",
    phoneNumber: "+91 98765 43210",
    clinicName: "Heart Care Clinic",
    clinicAddress: "123, MG Road, Chennai, India",
    qualifications: "MBBS, MD (Cardiology)",
    experience: "10 years",
    emergencyContact: "+91 91234 56789",
    dateOfBirth: "15-08-1980",
    password: "password123",
    confirmPassword: "password123",
    maritalStatus: "Married",
    gender: "Male",
    profileImage: "https://example.com/profile/arjun.jpg",
    accept: false,
  },
  {
    doctorId: "DOC1002",
    specialization: "Dermatologist",
    firstName: "Meera",
    lastName: "Iyer",
    email: "meera.iyer@example.com",
    phoneNumber: "+91 87654 32109",
    clinicName: "Skin Care Clinic",
    clinicAddress: "45, Residency Road, Bangalore, India",
    qualifications: "MBBS, MD (Dermatology)",
    experience: "8 years",
    emergencyContact: "+91 99887 66554",
    dateOfBirth: "20-05-1985",
    password: "meeraDerm@123",
    confirmPassword: "meeraDerm@123",
    maritalStatus: "Single",
    gender: "Female",
    profileImage: "https://example.com/profile/meera.jpg",
    accept: false,
  },
  {
    doctorId: "DOC1003",
    specialization: "Neurologist",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    phoneNumber: "+91 76543 21098",
    clinicName: "Brain Health Center",
    clinicAddress: "78, Connaught Place, Delhi, India",
    qualifications: "MBBS, DM (Neurology)",
    experience: "12 years",
    emergencyContact: "+91 98876 55443",
    dateOfBirth: "12-11-1978",
    password: "neurologyPro@2023",
    confirmPassword: "neurologyPro@2023",
    maritalStatus: "Married",
    gender: "Male",
    profileImage: "https://example.com/profile/rahul.jpg",
    accept: false,
  },
  {
    doctorId: "DOC1004",
    specialization: "Pediatrician",
    firstName: "Priya",
    lastName: "Nair",
    email: "priya.nair@example.com",
    phoneNumber: "+91 65432 10987",
    clinicName: "Little Angels Hospital",
    clinicAddress: "23, Marine Drive, Mumbai, India",
    qualifications: "MBBS, MD (Pediatrics)",
    experience: "7 years",
    emergencyContact: "+91 97765 44332",
    dateOfBirth: "05-09-1990",
    password: "pediatrics@Priya",
    confirmPassword: "pediatrics@Priya",
    maritalStatus: "Single",
    gender: "Female",
    profileImage: "https://example.com/profile/priya.jpg",
    accept: false,
  },
  {
    doctorId: "DOC1005",
    specialization: "Orthopedic",
    firstName: "Suresh",
    lastName: "Menon",
    email: "suresh.menon@example.com",
    phoneNumber: "+91 54321 09876",
    clinicName: "Bone & Joint Clinic",
    clinicAddress: "56, Banjara Hills, Hyderabad, India",
    qualifications: "MBBS, MS (Orthopedics)",
    experience: "15 years",
    emergencyContact: "+91 96654 33221",
    dateOfBirth: "22-02-1975",
    password: "orthoSuresh@987",
    confirmPassword: "orthoSuresh@987",
    maritalStatus: "Married",
    gender: "Male",
    profileImage: "https://example.com/profile/suresh.jpg",
    accept: false,
  },
];

export const admindoctorsList = [
  {
    doctorId: "DOC1001",
    specialization: "Cardiologist",
    firstName: "Arjun",
    lastName: "Kumar",
    email: "arjun.kumar@example.com",
    phoneNumber: "+91 98765 43210",
    clinicName: "Heart Care Clinic",
    clinicAddress: "123, MG Road, Chennai, India",
    qualifications: "MBBS, MD (Cardiology)",
    experience: "10 years",
    emergencyContact: "+91 91234 56789",
    dateOfBirth: "15-08-1980",
    password: "password123",
    confirmPassword: "password123",
    maritalStatus: "Married",
    gender: "Male",
    profileImage: "https://example.com/profile/arjun.jpg",
    accept: false,
  },
  {
    doctorId: "DOC1002",
    specialization: "Dermatologist",
    firstName: "Meera",
    lastName: "Iyer",
    email: "meera.iyer@example.com",
    phoneNumber: "+91 87654 32109",
    clinicName: "Skin Care Clinic",
    clinicAddress: "45, Residency Road, Bangalore, India",
    qualifications: "MBBS, MD (Dermatology)",
    experience: "8 years",
    emergencyContact: "+91 99887 66554",
    dateOfBirth: "20-05-1985",
    password: "meeraDerm@123",
    confirmPassword: "meeraDerm@123",
    maritalStatus: "Single",
    gender: "Female",
    profileImage: "https://example.com/profile/meera.jpg",
    accept: false,
  },
  {
    doctorId: "DOC1003",
    specialization: "Neurologist",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    phoneNumber: "+91 76543 21098",
    clinicName: "Brain Health Center",
    clinicAddress: "78, Connaught Place, Delhi, India",
    qualifications: "MBBS, DM (Neurology)",
    experience: "12 years",
    emergencyContact: "+91 98876 55443",
    dateOfBirth: "12-11-1978",
    password: "neurologyPro@2023",
    confirmPassword: "neurologyPro@2023",
    maritalStatus: "Married",
    gender: "Male",
    profileImage: "https://example.com/profile/rahul.jpg",
    accept: false,
  },
  {
    doctorId: "DOC1004",
    specialization: "Pediatrician",
    firstName: "Priya",
    lastName: "Nair",
    email: "priya.nair@example.com",
    phoneNumber: "+91 65432 10987",
    clinicName: "Little Angels Hospital",
    clinicAddress: "23, Marine Drive, Mumbai, India",
    qualifications: "MBBS, MD (Pediatrics)",
    experience: "7 years",
    emergencyContact: "+91 97765 44332",
    dateOfBirth: "05-09-1990",
    password: "pediatrics@Priya",
    confirmPassword: "pediatrics@Priya",
    maritalStatus: "Single",
    gender: "Female",
    profileImage: "https://example.com/profile/priya.jpg",
    accept: false,
  },
  {
    doctorId: "DOC1005",
    specialization: "Orthopedic",
    firstName: "Suresh",
    lastName: "Menon",
    email: "suresh.menon@example.com",
    phoneNumber: "+91 54321 09876",
    clinicName: "Bone & Joint Clinic",
    clinicAddress: "56, Banjara Hills, Hyderabad, India",
    qualifications: "MBBS, MS (Orthopedics)",
    experience: "15 years",
    emergencyContact: "+91 96654 33221",
    dateOfBirth: "22-02-1975",
    password: "orthoSuresh@987",
    confirmPassword: "orthoSuresh@987",
    maritalStatus: "Married",
    gender: "Male",
    profileImage: "https://example.com/profile/suresh.jpg",
    accept: false,
  },
];

export const doctorTimeSlote = {
  data: [
    // ---- 2025-04-09 ----
    {
      id: "s1",
      date: "2025-04-09",
      startTime: "10:00",
      endTime: "10:20",
      clinicName: "Omega Clinic",
      booked: false,
    },
    {
      id: "s2",
      date: "2025-04-09",
      startTime: "10:20",
      endTime: "10:40",
      clinicName: "Omega Clinic",
      booked: true,
    },
    {
      id: "s3",
      date: "2025-04-09",
      startTime: "10:40",
      endTime: "11:00",
      clinicName: "Omega Clinic",
      booked: false,
    },
    {
      id: "s4",
      date: "2025-04-09",
      startTime: "11:00",
      endTime: "11:20",
      clinicName: "Omega Clinic",
      booked: false,
    },
    {
      id: "s5",
      date: "2025-04-09",
      startTime: "11:20",
      endTime: "11:40",
      clinicName: "Omega Clinic",
      booked: true,
    },
    {
      id: "s6",
      date: "2025-04-09",
      startTime: "11:40",
      endTime: "12:00",
      clinicName: "Omega Clinic",
      booked: false,
    },

    // ---- 2025-04-10 ----
    {
      id: "s7",
      date: "2025-04-10",
      startTime: "10:00",
      endTime: "10:20",
      clinicName: "Alpha Clinic",
      booked: true,
    },
    {
      id: "s8",
      date: "2025-04-10",
      startTime: "10:20",
      endTime: "10:40",
      clinicName: "Alpha Clinic",
      booked: true,
    },
    {
      id: "s9",
      date: "2025-04-10",
      startTime: "10:40",
      endTime: "11:00",
      clinicName: "Alpha Clinic",
      booked: false,
    },
    {
      id: "s10",
      date: "2025-04-10",
      startTime: "11:00",
      endTime: "11:20",
      clinicName: "Alpha Clinic",
      booked: false,
    },
    {
      id: "s11",
      date: "2025-04-10",
      startTime: "11:20",
      endTime: "11:40",
      clinicName: "Alpha Clinic",
      booked: true,
    },
    {
      id: "s12",
      date: "2025-04-10",
      startTime: "11:40",
      endTime: "12:00",
      clinicName: "Alpha Clinic",
      booked: false,
    },

    // ---- 2025-04-20 ----
    {
      id: "s13",
      date: "2025-04-20",
      startTime: "10:00",
      endTime: "10:20",
      clinicName: "Delta Clinic",
      booked: false,
    },
    {
      id: "s14",
      date: "2025-04-20",
      startTime: "10:20",
      endTime: "10:40",
      clinicName: "Delta Clinic",
      booked: false,
    },
    {
      id: "s15",
      date: "2025-04-20",
      startTime: "10:40",
      endTime: "11:00",
      clinicName: "Delta Clinic",
      booked: true,
    },
    {
      id: "s16",
      date: "2025-04-20",
      startTime: "11:00",
      endTime: "11:20",
      clinicName: "Delta Clinic",
      booked: true,
    },
    {
      id: "s17",
      date: "2025-04-20",
      startTime: "11:20",
      endTime: "11:40",
      clinicName: "Delta Clinic",
      booked: false,
    },
    {
      id: "s18",
      date: "2025-04-20",
      startTime: "11:40",
      endTime: "12:00",
      clinicName: "Delta Clinic",
      booked: true,
    },
  ],
};
