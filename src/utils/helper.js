export const transformData = (data) => {
    return data.map((item, index) => {
        // Determine the status based on the 'status' field
        let status;
        let statusColor;
        switch (item.status) {
            case 1:
                status = "Active";
                statusColor = "lightgreen";
                break;
            case 0:
                status = "Inactive";
                statusColor = "lightgrey";
                break;
            // Add more cases if there are other status values
            default:
                status = "Unknown";
                statusColor = "lightgrey";
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
        };
    });
}
