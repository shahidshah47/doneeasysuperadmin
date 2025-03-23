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
            totalRevenue: item.total_revenue ? `<span class="text-[#5825EB]">AED</span> <span>${item.total_revenue}</span>` : "AED 0",
            totalSpending: item.pending_revenue ? `<span class="text-[#5825EB]">AED</span> <span>${item.pending_revenue}</span>` : "AED 0",
            status: status,
            verticalSubscribed: item.verticles_count,
            registeredDate: `${item.created_at.split('T')[0]}<br>${item.created_at.split('T')[1].split('.')[0]}`,
            statusColor: statusColor,
            textColor: textColor
        };
    });
}

export const formatToMonthDayYear = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

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
        { label: "Added By", value: getUserAddedBy(company?.added_by?.name) }
    ];
}

export const getLegalDocsDetails = (user) => {
    return [
        { label: "Emirates ID", value: user?.emirates_id },
        { label: "TRN", value: user?.trn }
    ]
}

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
            logo: user.company?.company_logo?.file_path || '',
            name: user.company?.company_name || 'N/A',
        },
        fullName: {
            profilePicture: user.profile_picture?.file_path || '',
            name: user.name || 'N/A',
        },
        role: user.designation || 'N/A',
        contact: {
            email: user.email || 'N/A',
            mobile: user.mobile_number || 'N/A',
        },
        totalRevenue: user.total_revenue || 0,
        totalSpending: user.pending_revenue || 0,
        verticalsSubscribed: user.verticles_count || 0,
        registeredOn: user.created_at || 'N/A',
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
        "Active": 1,
        "Deactivated": 2,
        "Inactive": 3,
        "Monitory": 4,
        "Banned": 5
    };
    
    return statusMap[status] || null; // Return null if status is not found
};

export const convertTimeTo12HourFormat = (time24) => {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = time24.split(':');

    // Convert hours to a number
    let hour = parseInt(hours, 10);

    // Determine AM or PM
    const period = hour >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hour = hour % 12 || 12;

    // Format the time as "hh:mm:ss AM/PM"
    const time12 = `${hour.toString().padStart(2, '0')}:${minutes}:${seconds} ${period}`;

    return time12;
};

// Utility function to convert API response to table format
export const convertAppointmentData = (appointment) => {

    let status;
    let statusColor;
    let textColor;
    switch (appointment.status) {
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
            logo: appointment.user.profile_picture?.file_path || '',
            name: appointment.user.name || 'N/A',
        },
        title: {
            name: appointment.order.title,
            description: appointment.order.description
        },
        verticle: {
            image: appointment.order.verticle.image_path,
            name: appointment.order.verticle.name
        },
        orderType: appointment.order.type === 1 ? "One-time" : "Reoccuring",
        expectedDateAndTime: appointment.delivery_date + " " + convertTimeTo12HourFormat(appointment.delivery_time),
        orderAmount: appointment.order.total_budget
    };
};
