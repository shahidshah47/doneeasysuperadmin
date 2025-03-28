export const transformData = (data) => {
  return data.map((item, index) => {
    // Determine the status based on the 'status' field
    let status;
    let statusColor;
    let textColor;
    switch (item.status) {
      case 1:
        status = "Active";
        statusColor = "#D6FFEF";
        textColor = "#00995C";
        break;
      case 0:
        status = "Inactive";
        statusColor = "#E7E7EB";
        textColor = "#0E0D35";
        break;
      case 2:
        status = "Monitory";
        statusColor = "#FCEED9";
        textColor = "#DC8B13";
        break;
      case 3:
        status = "Banned";
        statusColor = "#FFE5E5";
        textColor = "#FF5555";
        break;
      // Add more cases if there are other status values
      default:
        status = "Unknown";
        statusColor = "lightgrey";
        textColor = "#000";
    }

    return {
      ...item,
      id: item.id,
      companyName: item.company.company_name,
      companyImage: item.company.company_logo.file_path,
      name: item.name,
      managerImage: item.profile_picture.file_path,
      contactEmail: `${item.mobile_number}<br><span class="text-[#5825EB]">${item.email}</span>`,
      totalRevenue: item.total_revenue
        ? `<span class="text-[#5825EB]">AED</span> <span>${item.total_revenue}</span>`
        : "AED 0",
      totalSpending: item.pending_revenue
        ? `<span class="text-[#5825EB]">AED</span> <span>${item.pending_revenue}</span>`
        : "AED 0",
      status: status,
      verticalSubscribed: item.verticles_count,
      registeredDate: `${item.created_at.split("T")[0]}<br>${
        item.created_at.split("T")[1].split(".")[0]
      }`,
      statusColor: statusColor,
      textColor: textColor,
    };
  });
};

export const formatToMonthDayYear = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getUserAddedBy = (addedBy) => {
  return addedBy || "Steve Smith" || "---";
};

export const getCompanyDetails = (company) => {
  return [
    { label: "Company ID", value: `ID ${company?.id}` },
    { label: "No. of Employees", value: company?.company_size },
    { label: "HQ Phone No.", value: company?.phone },
    { label: "HQ Email", value: company?.email },
    { label: "Joined Date", value: formatToMonthDayYear(company?.created_at) },
    { label: "Added By", value: getUserAddedBy(company?.added_by?.name) },
  ];
};

export const getLegalDocsDetails = (user) => {
  return [
    { label: "Emirates ID", value: user?.emirates_id },
    { label: "TRN", value: user?.trn },
  ];
};

// Utility function to convert API response to table format
export const convertUserData = (user) => {
  let status;
  let statusColor;
  let textColor;
  switch (user.status) {
    case 1:
      status = "Active";
      statusColor = "#D6FFEF";
      textColor = "#00995C";
      break;
    case 2:
      status = "Deactivated";
      statusColor = "#E7E7EB";
      textColor = "#0E0D35";
      break;
    case 3:
      status = "Inactive";
      statusColor = "#E7E7EB";
      textColor = "#575672";
      break;
    case 4:
      status = "Monitory";
      statusColor = "#FCEED9";
      textColor = "#DC8B13";
      break;
    case 5:
      status = "Banned";
      statusColor = "#FFE5E5";
      textColor = "#FF5555";
      break;
    // Add more cases if there are other status values
    default:
      status = "Unknown";
      statusColor = "lightgrey";
      textColor = "#000";
  }

  return {
    id: user.id,
    companyName: {
      logo: user.company?.company_logo?.file_path || "",
      name: user.company?.company_name || "N/A",
    },
    fullName: {
      profilePicture: user.profile_picture?.file_path || "",
      name: user.name || "N/A",
    },
    role: user.designation || "N/A",
    contact: {
      email: user.email || "N/A",
      mobile: user.mobile_number || "N/A",
    },
    totalRevenue: user.total_revenue || 0,
    totalSpending: user.pending_revenue || 0,
    verticalsSubscribed: user.verticles_count || 0,
    registeredOn: user.created_at || "N/A",
    status,
    statusId: user.status,
    statusColor,
    textColor,
    action: {
      view: () => handleView(user.id),
      delete: () => handleDelete(user.id),
      share: () => handleShare(user.id),
    },
  };
};

// Example event handlers
const handleView = (id) => {
  console.log(`Viewing user ${id}`);
};

const handleDelete = (id) => {
  console.log(`Deleting user ${id}`);
};

const handleShare = (id) => {
  const editScreenUrl = `https://yourwebsite.com/edit/${id}`;
  navigator.clipboard.writeText(editScreenUrl);
  console.log(`Copied URL: ${editScreenUrl}`);
};

export const getStatusId = (status) => {
  const statusMap = {
    Active: 1,
    Deactivated: 2,
    Inactive: 3,
    Monitory: 4,
    Banned: 5,
  };

  return statusMap[status] || null; // Return null if status is not found
};

export const convertTimeTo12HourFormat = (time24) => {
  if (time24.search("hour") > -1) return time24;
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = time24.split(":");

  // Convert hours to a number
  let hour = parseInt(hours, 10);

  // Determine AM or PM
  const period = hour >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hour = hour % 12 || 12;

  // Format the time as "hh:mm:ss AM/PM"
  const time12 =
    minutes && seconds && period
      ? `${hour.toString().padStart(2, "0")}:${minutes}:${seconds} ${period}`
      : "---";

  return time12;
};

// Utility function to convert API response to table format
export const convertAppointmentData = (appointment) => {
  let status;
  let statusColor;
  let textColor;
  switch (appointment.progress_status) {
    case 1:
      status = "Active";
      statusColor = "#D6FFEF";
      textColor = "#00995C";
      break;
    case 2:
      status = "Deactivated";
      statusColor = "#E7E7EB";
      textColor = "#0E0D35";
      break;
    case 3:
      status = "Inactive";
      statusColor = "#E7E7EB";
      textColor = "#575672";
      break;
    case 4:
      status = "Monitory";
      statusColor = "#FCEED9";
      textColor = "#DC8B13";
      break;
    case 5:
      status = "Banned";
      statusColor = "#FFE5E5";
      textColor = "#FF5555";
      break;
    // Add more cases if there are other status values
    default:
      status = "Unknown";
      statusColor = "lightgrey";
      textColor = "#000";
  }

  return {
    id: appointment.id,
    organizationName: {
      logo: appointment.user.profile_picture?.file_path || "",
      name: appointment.user.name || "N/A",
    },
    title: {
      name: appointment.order.title,
      description: appointment.order.description,
    },
    verticle: {
      image: appointment.order.verticle.image_path,
      name: appointment.order.verticle.name,
    },
    orderTypeId: appointment.order.type,
    orderType: appointment.order.type === 1 ? "One-time" : "Reoccuring",
    expectedDateAndTime:
      appointment.delivery_date +
      " " +
      convertTimeTo12HourFormat(appointment.delivery_time),
    orderAmount: appointment.order.total_budget,
    payment: getAppointPaymentStatus(appointment.paid_percentage),
    progressState: getAppointProgressStatus(appointment.progress_status),
  };
};

export const getAppointPaymentStatus = (paidPercentage) => {
  switch (paidPercentage) {
    case "100":
      return { name: "Released", bgColor: "#D6FFEF", color: "#00995C" };
    case "50":
      return { name: "Half Done", bgColor: "#D6FFEF", color: "#00995C" };
    default:
      return { name: "Pending", bgColor: "#FFE5E5", color: "#FF5555" };
  }
};

export const getAppointProgressStatus = (status) => {
  switch (status) {
    case 1:
      return { name: "Started", bgColor: "#D6FFEF", color: "#00995C" };
    case 2:
      return { name: "Reached", bgColor: "#D6FFEF", color: "#00995C" };
    case 3:
      return { name: "Working", bgColor: "#D6FFEF", color: "#00995C" };
    case 4:
      return { name: "Finished", bgColor: "#D6FFEF", color: "#00995C" };
    case 5:
      return { name: "Issue Reported", bgColor: "#FFE5E5", color: "#FF5555" };
    case 6:
      return { name: "Need More Time", bgColor: "#FFE5E5", color: "#FF5555" };
    case 7:
      return { name: "Nearly Finish", bgColor: "#D6FFEF", color: "#00995C" };
    case 8:
      return {
        name: "Need More Material",
        bgColor: "#FFE5E5",
        color: "#FF5555",
      };
    case 9:
      return {
        name: "Pending From Client",
        bgColor: "#FFE5E5",
        color: "#FF5555",
      };
    default:
      return { name: "Other", bgColor: "#E7E7EB", color: "#575672" };
  }
};

export const formatDateAndTime = (inputDate, inputTime = null) => {
  // Part 1: Convert date to "Sat, 19 Nov 2023" format
  const date = new Date(inputDate);
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Part 2: Convert time to "05:48 PM" format if provided
  let formattedTime = "";
  if (inputTime) {
    const [hours, minutes, seconds] = inputTime.split(":");
    const timeDate = new Date();
    timeDate.setHours(hours, minutes, seconds || 0);

    formattedTime = timeDate
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
  }

  return {
    formattedDate,
    formattedTime,
    // Combined string if both date and time are provided
    formattedDateTime: inputTime
      ? `${formattedDate}, ${formattedTime}`
      : formattedDate,
  };
};

export const getOrderType = (type) => {
  switch (type) {
    case 1:
      return "One-time";
    case 2:
      return "Reoccurring";
    default:
      break;
  }
};

export function getOrdinalNumber(index) {
  const suffixes = ["th", "st", "nd", "rd"];
  const mod10 = index % 10;
  const mod100 = index % 100;

  if (mod10 === 1 && mod100 !== 11) return `${index}st`;
  if (mod10 === 2 && mod100 !== 12) return `${index}nd`;
  if (mod10 === 3 && mod100 !== 13) return `${index}rd`;
  return `${index}th`;
}

export const formatDate = (inputDate) => {
  if (!inputDate) return "";

  const date = new Date(inputDate);

  return date
    .toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", ""); // Removes the comma after the day
};

export const formatTime = (timeString) => {
  if (!timeString) return "";

  const [hours, minutes] = timeString.split(":").map(Number);
  let period = hours >= 12 ? "PM" : "AM";
  let formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period} `;
};
