export const iterateEventAuction = [
  {
    id: 1,
    name: "Past Auction",
    event_date: "2024-05-15T14:00:00Z",
    auction_house: {
      name: "Christie's",
    },
  },
  {
    id: 2,
    name: "Current Auction",
    event_date: "2024-06-09T16:30:00Z",
    auction_house: {
      name: "Sotheby's",
    },
  },
  {
    id: 3,
    name: "Future Auction",
    event_date: "2024-07-20T10:00:00Z",
    auction_house: {
      name: "Bonhams",
    },
  },
];

//TODO list page (when event is past)

export const eventInListPage = {
  event: {
    id: 1,
    name: "Luxury Car Auction",
    status: "Approved",
    date: "2024-06-15T10:00:00Z",
  },
};

export const auctionInListPage = [
  {
    lot_no: 1,
    auction_id: 101,
    registration_number: "ABC1234",
    model: "Toyota Camry",
    legal_owner: "John Doe",
    year: 2018,
    reserve_price: 50000,
    status: "HOLD",
  },
  {
    lot_no: 2,
    auction_id: 102,
    registration_number: "DEF5678",
    model: "Honda Accord",
    legal_owner: "Jane Smith",
    year: 2019,
    reserve_price: 55000,
    status: "SOLD",
  },
  {
    lot_no: 3,
    auction_id: 103,
    registration_number: "GHI9012",
    model: "Nissan Altima",
    legal_owner: "Robert Brown",
    year: 2020,
    reserve_price: 60000,
    status: "AVAILABLE",
    buyer_premium: 1000,
  },
  {
    lot_no: 4,
    auction_id: 104,
    registration_number: "JKL3456",
    model: "Ford Focus",
    legal_owner: "Emily Davis",
    year: 2017,
    reserve_price: 45000,
    status: "HOLD",
    buyer_premium: 1000,
  },
  {
    lot_no: 5,
    auction_id: 105,
    registration_number: "MNO7890",
    model: "Chevrolet Malibu",
    legal_owner: "Michael Wilson",
    year: 2016,
    reserve_price: 40000,
    status: "SOLD",
    buyer_premium: 1000,
  },
];

//TODO event page (when event is not start)

export const event = {
  id: 1,
  name: "Luxury Car Auction",
  event_date: "2024-06-20T10:00:00Z",
  auction_house: {
    name: "Prestige Auctions",
    auctioneer: {
      name: "John Doe",
      license_no: "AUC123456",
    },
  },
};
