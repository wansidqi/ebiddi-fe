import { EventsInterface, InventoryInterface } from "@/interfaces";

const auctionItems: InventoryInterface[] = [
  {
    img: [
      "https://4kwallpapers.com/images/wallpapers/bmw-z4-ac-schnitzer-acs4-4-0i-2021-5k-8k-1280x1280-4780.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu-Gj5attrgxZsmESiKjHoIqmlxhIeR3jYGHouG0h7HQ&s",
    ],
    legalOwner: "Wan Ahmad Sidqi",
    lot: "CO432",
    model: "BMW Z4",
    registrationNo: "BPL1998",
    report: "",
    reservedPrice: "RM 600,000",
    yearManufacture: 2021,
    chasisNumber: "YV1944817V5241501",
    engineNumber: "B230PR68211630C477",
    hasKey: true,
    registrationCard: false,
    transmissionType: "auto",
    remarks:
      "(RM1,000.00 SECURITY DEPOSIT. REFUNDABLE AFTER TRANFERS NAME WITHIN 6 MONTHS)",
  },
  {
    img: [
      "https://4kwallpapers.com/images/wallpapers/bmw-z4-ac-schnitzer-acs4-4-0i-2021-5k-8k-1280x1280-4780.jpg",
    ],
    legalOwner: "Wan Ahmad Sidqi",
    lot: "CO432",
    model: "BMW Z4",
    registrationNo: "BPL1998",
    report: "",
    reservedPrice: "RM 600,000",
    yearManufacture: 2021,
    chasisNumber: "YV1944817V5241501",
    engineNumber: "B230PR68211630C477",
    hasKey: true,
    registrationCard: false,
    transmissionType: "auto",
    remarks:
      "(RM1,000.00 SECURITY DEPOSIT. REFUNDABLE AFTER TRANFERS NAME WITHIN 6 MONTHS)",
  },
  {
    img: [
      "https://4kwallpapers.com/images/wallpapers/bmw-z4-ac-schnitzer-acs4-4-0i-2021-5k-8k-1280x1280-4780.jpg",
    ],
    legalOwner: "Wan Ahmad Sidqi",
    lot: "CO432",
    model: "BMW Z4",
    registrationNo: "BPL1998",
    report: "",
    reservedPrice: "RM 600,000",
    yearManufacture: 2021,
    chasisNumber: "YV1944817V5241501",
    engineNumber: "B230PR68211630C477",
    hasKey: true,
    registrationCard: false,
    transmissionType: "auto",
    remarks:
      "(RM1,000.00 SECURITY DEPOSIT. REFUNDABLE AFTER TRANFERS NAME WITHIN 6 MONTHS)",
  },
  {
    img: [
      "https://4kwallpapers.com/images/wallpapers/bmw-z4-ac-schnitzer-acs4-4-0i-2021-5k-8k-1280x1280-4780.jpg",
    ],
    legalOwner: "Wan Ahmad Sidqi",
    lot: "CO432",
    model: "BMW Z4",
    registrationNo: "BPL1998",
    report: "",
    reservedPrice: "RM 600,000",
    yearManufacture: 2021,
    chasisNumber: "YV1944817V5241501",
    engineNumber: "B230PR68211630C477",
    hasKey: true,
    registrationCard: false,
    transmissionType: "auto",
    remarks:
      "(RM1,000.00 SECURITY DEPOSIT. REFUNDABLE AFTER TRANFERS NAME WITHIN 6 MONTHS)",
  },
  {
    img: [
      "https://4kwallpapers.com/images/wallpapers/bmw-z4-ac-schnitzer-acs4-4-0i-2021-5k-8k-1280x1280-4780.jpg",
    ],
    legalOwner: "Wan Ahmad Sidqi",
    lot: "CO432",
    model: "BMW Z4",
    registrationNo: "BPL1998",
    report: "",
    reservedPrice: "RM 600,000",
    yearManufacture: 2021,
    chasisNumber: "YV1944817V5241501",
    engineNumber: "B230PR68211630C477",
    hasKey: true,
    registrationCard: false,
    transmissionType: "auto",
    remarks:
      "(RM1,000.00 SECURITY DEPOSIT. REFUNDABLE AFTER TRANFERS NAME WITHIN 6 MONTHS)",
  },
  {
    img: [
      "https://4kwallpapers.com/images/wallpapers/bmw-z4-ac-schnitzer-acs4-4-0i-2021-5k-8k-1280x1280-4780.jpg",
    ],
    legalOwner: "Wan Ahmad Sidqi",
    lot: "CO432",
    model: "BMW Z4",
    registrationNo: "BPL1998",
    report: "",
    reservedPrice: "RM 600,000",
    yearManufacture: 2021,
    chasisNumber: "YV1944817V5241501",
    engineNumber: "B230PR68211630C477",
    hasKey: true,
    registrationCard: false,
    transmissionType: "auto",
    remarks:
      "(RM1,000.00 SECURITY DEPOSIT. REFUNDABLE AFTER TRANFERS NAME WITHIN 6 MONTHS)",
  },
  {
    img: [
      "https://4kwallpapers.com/images/wallpapers/bmw-z4-ac-schnitzer-acs4-4-0i-2021-5k-8k-1280x1280-4780.jpg",
    ],
    legalOwner: "Wan Ahmad Sidqi",
    lot: "CO432",
    model: "BMW Z4",
    registrationNo: "BPL1998",
    report: "",
    reservedPrice: "RM 600,000",
    yearManufacture: 2021,
    chasisNumber: "YV1944817V5241501",
    engineNumber: "B230PR68211630C477",
    hasKey: true,
    registrationCard: false,
    transmissionType: "auto",
    remarks:
      "(RM1,000.00 SECURITY DEPOSIT. REFUNDABLE AFTER TRANFERS NAME WITHIN 6 MONTHS)",
  },
];

export const mockEvents: EventsInterface[] = [
  {
    id: "1",
    name: "Frenzy Corps",
    date: "29 May 2024",
    time: "10:00 pm",
    location: "Elmina",
    hoster: "Frenzy Corps",
    auctioner: "Maybank (NO36677)",
    event_date: "2024-12-01T00:00:00",
    live: new Date("2024-12-01T00:00:00"),
    auctionItems,
  },
  {
    id: "2",
    name: "CIMB Bank Berhad",
    date: "29 May 2024",
    time: "10:00 pm",
    location: "Maybank Kuala Lumpur",
    hoster: "PJ Automart Sdn Bhd",
    auctioner: "TAN CHI SIANG (NO36677)",
    live: new Date("2024-12-01T00:00:00"),
    auctionItems,
  },
  {
    id: "3",
    name: "Bank Islam Berhad",
    date: "29 May 2024",
    time: "10:00 pm",
    location: "Maybank Kuala Lumpur",
    hoster: "PJ Automart Sdn Bhd",
    auctioner: "TAN CHI SIANG (NO36677)",
    live: new Date("2024-01-01T00:00:00"),
    auctionItems,
  },
  {
    id: "4",
    name: "Maybank Berhad",
    date: "29 May 2024",
    time: "10:00 pm",
    location: "Maybank Kuala Lumpur",
    hoster: "PJ Automart Sdn Bhd",
    auctioner: "TAN CHI SIANG (NO36677)",
    live: new Date(Date.now() + 20000),
    auctionItems,
  },
];
