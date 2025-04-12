export const green = { bgColor: "#D6FFEF", color: "#00995C" };
export const yellow = { bgColor: "#FCEED9", color: "#DC8B13" };
export const red = { bgColor: "#FFE5E5", color: "#FF5555" };
export const gray = { bgColor: "#E7E7EB", color: "#575672" };
export const blue = { bgColor: "#CCDDFF", color: "#5B93FF" };

export const mapStyles = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#f5f5f5",
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#f5f5f5",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#bdbdbd",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#e5e5e5",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#ffffff",
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#dadada",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
    {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
            {
                color: "#e5e5e5",
            },
        ],
    },
    {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#c9c9c9",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
];

export const productsContants = [
    {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
    },
    {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4
    },
    {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
    },
    {
        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 5
    },
    {
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4
    },
    {
        id: '1005',
        code: 'av2231fwg',
        name: 'Brown Purse',
        description: 'Product Description',
        image: 'brown-purse.jpg',
        price: 120,
        category: 'Accessories',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4
    },
    {
        id: '1006',
        code: 'bib36pfvm',
        name: 'Chakra Bracelet',
        description: 'Product Description',
        image: 'chakra-bracelet.jpg',
        price: 32,
        category: 'Accessories',
        quantity: 5,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
    },
    {
        id: '1007',
        code: 'mbvjkgip5',
        name: 'Galaxy Earrings',
        description: 'Product Description',
        image: 'galaxy-earrings.jpg',
        price: 34,
        category: 'Accessories',
        quantity: 23,
        inventoryStatus: 'INSTOCK',
        rating: 5
    },
    {
        id: '1008',
        code: 'vbb124btr',
        name: 'Game Controller',
        description: 'Product Description',
        image: 'game-controller.jpg',
        price: 99,
        category: 'Electronics',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 4
    },
    {
        id: '1009',
        code: 'cm230f032',
        name: 'Gaming Set',
        description: 'Product Description',
        image: 'gaming-set.jpg',
        price: 299,
        category: 'Electronics',
        quantity: 63,
        inventoryStatus: 'INSTOCK',
        rating: 3
    },
    {
        id: '1010',
        code: 'plb34234v',
        name: 'Gold Phone Case',
        description: 'Product Description',
        image: 'gold-phone-case.jpg',
        price: 24,
        category: 'Accessories',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4
    },
    {
        id: '1011',
        code: '4920nnc2d',
        name: 'Green Earbuds',
        description: 'Product Description',
        image: 'green-earbuds.jpg',
        price: 89,
        category: 'Electronics',
        quantity: 23,
        inventoryStatus: 'INSTOCK',
        rating: 4
    },
    {
        id: '1012',
        code: '250vm23cc',
        name: 'Green T-Shirt',
        description: 'Product Description',
        image: 'green-t-shirt.jpg',
        price: 49,
        category: 'Clothing',
        quantity: 74,
        inventoryStatus: 'INSTOCK',
        rating: 5
    },
    {
        id: '1013',
        code: 'fldsmn31b',
        name: 'Grey T-Shirt',
        description: 'Product Description',
        image: 'grey-t-shirt.jpg',
        price: 48,
        category: 'Clothing',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 3
    },
    {
        id: '1014',
        code: 'waas1x2as',
        name: 'Headphones',
        description: 'Product Description',
        image: 'headphones.jpg',
        price: 175,
        category: 'Electronics',
        quantity: 8,
        inventoryStatus: 'LOWSTOCK',
        rating: 5
    },
    {
        id: '1015',
        code: 'vb34btbg5',
        name: 'Light Green T-Shirt',
        description: 'Product Description',
        image: 'light-green-t-shirt.jpg',
        price: 49,
        category: 'Clothing',
        quantity: 34,
        inventoryStatus: 'INSTOCK',
        rating: 4
    },
];

export const paymentTermsStatus = (status) => {
    switch (status) {
        case 1: 
            return { gradient: "text-red-500", statusText: "Un-Paid" }
        case 2: 
            return { gradient: "text-blue-500", statusText: "Active" }
        case 3: 
            return { gradient: "text-yellow-500", statusText: "Disputed" }
        case 4: 
            return { gradient: "text-gray-500", statusText: "Refunded" }
        case 5: 
            return { gradient: "text-green-500", statusText: "Paid" }
        case 6: 
            return { gradient: "text-red-500", statusText: "Canceled" }
        case 7: 
            return { gradient: "text-purple-500", statusText: "Requested" }
        default:
            return { gradient: "text-gray-500", statusText: "Unknown" }
    }
};

export const getOrderStatus = (status) => {
    switch (status) {
        case 1:
            return { ...green, statusText: "Active" }
        case 2:
            return { ...red, statusText: "Canceled" }
        case 3:
            return { ...green, statusText: "Accepted" }
        case 4:
            return { ...yellow, statusText: "Pending Payment" }
        case 5:
            return { ...gray, statusText: "Out of Scope" }
        case 6:
            return { ...green, statusText: "Completed" }
        case 7:
            return { ...gray, statusText: "Delivered" }
        default:
            break;
    }
}

export const getRequestStatus = (status) => {
    switch (status) {
        case 1:
            return { ...green, statusText: "Active" }
        case 2:
            return { ...red, statusText: "Canceled" }
        case 3:
            return { ...green, statusText: "Accepted" }
        case 4:
            return { ...yellow, statusText: "Pending Payment" }
        case 5:
            return { ...gray, statusText: "Out of Scope" }
        case 6:
            return { ...green, statusText: "Completed" }
        case 7:
            return { ...gray, statusText: "Delivered" }
        default:
            break;
    }
}

export const getUserStatus = (status) => {
    switch (status) {
        case 1:
            return { ...green, statusText: "Active" }
        case 2:
            return { ...gray, statusText: "Deactivated" }
        case 3:
            return { ...gray, statusText: "In-active" }
        case 4:
            return { ...yellow, statusText: "Monitory" }
        case 5:
            return { ...red, statusText: "Banned" }
    }
}

export const getUserRole = (type) => {
    switch (type) {
        case 3:
            return "Manager";
        default:
            return "Admin";
    }
}