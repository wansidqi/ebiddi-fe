import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  AuctionInterface,
  CreditInterface,
  EventsInterface,
} from "@/interfaces";
import { useStoreContext } from "@/Context";

const AuctionLiveView = () => {
  const { id: param_id } = useParams();
  const navigate = useNavigate();
  const { USER: getUser } = useStoreContext();

  const [event, setEvent] = useState<EventsInterface>();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [auction, setAuction] = useState<AuctionInterface>();
  const [credits, setCredits] = useState<CreditInterface[]>([]);
  const [isBidding, setIsBidding] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [btnTitle, setBtnTitle] = useState("");
  const [channel, setChannel] = useState({
    bid: "",
    response: "",
    auction: "",
    timer: "",
    status: "status",
  });
  const [bids, setBids] = useState([]);
  const [bidStatus, setBidStatus] = useState(0);
  const [timer, setTimer] = useState(0);
  const [amount, setAmount] = useState({
    current: 0,
    next: 0,
    highest_user_id: 0,
    highest_user_name: "",
  });
  const [bkeyCounter, setBkeyCounter] = useState(0);
  const [total, setTotal] = useState({
    connection: 0,
    bidder: 0,
  });

  const clickBid = () => {
    if (channel.bid) {
      sendAuditTrail(amount.next);
      //   emit(channel.bid, {
      //     user_id: getUser?.id,
      //     name: getUser?.name,
      //     amount: amount.next,
      //   });
    }
  };

  const goToEvent = () => {
    navigate("/events");
  };

  const callAuctionAPI = async (id: any) => {
    const url = `https://api.e-biddi.com/api/auction/${id}`;
    try {
      const response = await axios.get(url);
      setAuction(response.data.data);
      getCredit();
      getEvent();
    } catch (error) {
      console.error(error);
    }
  };

  const isBidDisabled = () => {
    if (
      isBtnDisabled ||
      !isBidding ||
      !canBid() ||
      amount.highest_user_id === getUser?.id
    ) {
      return true;
    }
    return false;
  };

  const reset = () => {
    setAuction(undefined);
    setBids([]);
    setAmount({
      current: 0,
      next: 0,
      highest_user_id: 0,
      highest_user_name: "",
    });
  };

  const canBid = () => {
    if (!auction) return;
    return (
      (amount.next < 100000 &&
        getAvailableCredit() >=
          auction.deposit + auction.buyer_premium + auction.security_deposit) ||
      (amount.next >= 100000 &&
        getAvailableCredit() >=
          0.05 * amount.current +
            auction.buyer_premium +
            auction.security_deposit)
    );
  };

  const getCredit = async () => {
    if (!getUser) {
      return;
    }

    const url = `https://api.e-biddi.com/api/profile/${getUser.id}/auctionhouse/${event?.auction_house.id}/credits`;
    try {
      const response = await axios.get(url);
      setCredits(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAvailableCredit = () => {
    return Math.max(...credits.map((credit) => credit.amount), 0);
  };

  const showNumber = () => {
    if (!isBidding) {
      return "WAITING";
    }

    if (amount.highest_user_id === getUser?.id) {
      return "HIGHEST BID";
    }

    if (!canBid()) {
      return "INSUFFICIENT DEPOSIT";
    }

    return amount.next;
  };

  const sendAuditTrail = (amount: any) => {
    if (!auction?.auction_id) {
      return;
    }

    const data = {
      event_id: param_id,
      auction_id: auction.auction_id,
      type: "BID",
      user_id: getUser?.id,
      bid_amount: amount,
    };

    axios.post("https://api.e-biddi.com/api/auction/log", data);
  };

  const getEvent = async () => {
    const url = `https://api.e-biddi.com/api/events/${param_id}/minimal`;
    try {
      const response = await axios.get(url);
      setEvent(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const decreasePageCount = () => {
    if (getUser) {
      //   emit("bidder_out", 0);
    }
  };

  const changedLockState = () => {
    setIsBtnDisabled((prevState) => !prevState);
  };

  return (
    <div>
      {!getUser ? (
        <div className="container">
          <p className="text-left">
            <button
              className="btn btn-lg bg-dark text-white"
              onClick={goToEvent}
            >
              <i className="fa fa-chevron-left"></i> Back
            </button>
          </p>
          <h3 className="text-warning">
            <strong>AUCTION LIVE VIEW</strong>
          </h3>
          <div className="row justify-content-md-center mt-5">
            <div className="col-md-6 col-lg-3">
              <div className="widget-bg-color-icon card-box fadeInDown animated">
                <div className="bg-icon bg-icon-info pull-left">
                  <i className="fas fa-2x fa-eye text-info"></i>
                </div>
                <div className="text-right">
                  <h2 className="text-dark">
                    <b>{total.connection}</b>
                  </h2>
                  <p className="text-muted">Total Viewing</p>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="widget-bg-color-icon card-box fadeInDown animated">
                <div className="bg-icon bg-icon-info pull-left">
                  <i className="fas fa-2x fa-gavel text-info"></i>
                </div>
                <div className="text-right">
                  <h2 className="text-dark">
                    <b>{total.bidder}</b>
                  </h2>
                  <p className="text-muted">Total Bidder</p>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="container-fluid"
          style={{ paddingLeft: "3em", paddingRight: "3em", paddingTop: "2em" }}
        >
          <div>
            {!auction?.auction_id ? (
              <div>
                <div className="d-flex justify-content-center">
                  <div className="row text-center">
                    <img
                      className="mx-auto d-block img-fluid"
                      src="/assets/bidding-page-empty.jpg"
                      style={{ border: "none" }}
                      alt="Waiting"
                    />
                  </div>
                </div>
                <div className="row justify-content-md-center mt-4">
                  <h1>Waiting</h1>
                </div>
                <div className="row justify-content-md-center">
                  <h6>
                    Please be patient, we are still waiting for Auctioneer
                    input. The auction will start soon. Do not leave this page
                    till auction start. Thank you.
                  </h6>
                </div>
              </div>
            ) : (
              <div className="mb-5">
                <div>
                  <div className="row mb-4">
                    <div className="card-deck col-md-12">
                      <div className="card">
                        <div className="card-body">
                          <h5 style={{ fontSize: "1.5em" }}>
                            LOT {auction?.lot_no}
                          </h5>
                          <img
                            src={auction?.images[0]}
                            className="rounded img-fluid mb-3"
                            style={{ width: "100%", height: "17em" }}
                            alt="Auction Item"
                          />
                          {/* Additional auction details and bid history can be rendered here */}
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-body text-center">
                          <div className="my-auto">
                            <h5
                              style={{ fontSize: "3.2em" }}
                              className="text-info"
                            >
                              {showNumber()}
                            </h5>
                            <button
                              className="btn btn-info btn-lg mt-4"
                              onClick={clickBid}
                              disabled={isBidDisabled()}
                            >
                              {btnTitle}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <h6>Bid History</h6>
                          <ul className="list-group">
                            {bids.map((bid: any, index) => (
                              <li className="list-group-item" key={index}>
                                {bid.name} - {bid.amount}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="card-deck col-md-12">
                      <div className="card">
                        <div className="card-body text-center">
                          <h6 className="text-muted">Timer</h6>
                          <h5 className="text-danger">{timer}</h5>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <div className="text-right">
                            <button
                              className="btn btn-danger"
                              onClick={changedLockState}
                            >
                              {isBtnDisabled ? "Unlock" : "Lock"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
