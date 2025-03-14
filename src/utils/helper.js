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
        { label: "Added By", value: getUserAddedBy(company?.added_by) }
    ];
}

export const getLegalDocsDetails = (user) => {
    return [
        { label: "Emirates ID", value: user?.emirates_id },
        { label: "TRN", value: user?.trn }
    ]
}