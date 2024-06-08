import { ROLE } from "./enum";

export interface EventsInterface {
  id: number;
  status: string;
  name: string;
  event_date: string;
  reauction: any;
  auction_house: AuctionHouse;
  downloadable: {
    url: string;
  };
  inventories: InventoryInterface[];
}

export interface InventoryInterface {
  auction_id: number;
  status: string;
  lot_no: string;
  vehicle_id: number;
  legal_owner: string;
  model: string;
  year: string;
  registration_number: string;
  chasis_number: string;
  engine_number: string;
  transmission: string;
  has_registration_card: boolean;
  has_key: boolean;
  remarks: string;
  reserve_price: number;
  deposit: number;
  buyer_premium: number;
  security_deposit: number;
  is_flat_deposit: boolean;
  is_manual_deposit: boolean;
  bid_increment: number;
  vehicle_type: number;
  images: string[];
  bidder: Bidder;
}

export interface AuctionInterface extends InventoryInterface {
  meta: {
    next: number;
    prev: number;
  };
  event: EventsInterface;
}

interface Bidder {
  user_id: number;
  bid_price: string;
  total_bids: number;
  min_bid: string;
  max_bid: string;
  bidded_at: string | Date;
}

interface AuctionHouse {
  id: number;
  name: string;
  code: string;
  address: string;
  company_registration_number: string;
  auctioneer: Auctioneer;
}

interface Auctioneer {
  id: number;
  name: string;
  nric: string;
  license_no: string;
  license_expired: string;
}

export interface TimeLeft {
  d?: number;
  h?: number;
  m?: number;
  s?: number;
}

/* REPORT */
export interface ReportInterface {
  id: number;
  model: string;
  registration_number: string;
  deposit_required: boolean;
  reserve_price: boolean;
  year_manufacture: string;
  vehicle_type: boolean;
  investigation_report: InvestigationReport;
  auction_house: AuctionHouseReport;
  banker: {
    name: string;
  };
  legal_owner: {
    name: string;
  };
}

export interface InvestigationReport {
  id: number;
  general_condition: string;
  chassis_number: string;
  rochasis_number: string;
  engine_number: any | null;
  roengine_number: string;
  mileage: number;
  transmission: string;
  expaintwork: boolean | null;
  towingtruckno: string;
  withremote: boolean | null;
  withremoteremarks: string;
  withkey: boolean | null;
  withkeyremarks: string;
  roadtax: string;
  withengine: boolean | null;
  withengineremarks: string;
  withgearbox: boolean | null;
  withgearboxremarks: string;
  withaircond: boolean | null;
  withaircondremarks: string;
  withbreak: boolean | null;
  withbreakremarks: string;
  withradiator: boolean | null;
  withradiatorremarks: string;
  withbattery: boolean | null;
  withbatteryremarks: string;
  withalternator: boolean | null;
  withalternatorremarks: string;
  withpowersteering: boolean | null;
  withpowersteeringremarks: string;
  enginecomponentsremarks: string;
  withdashboard: boolean | null;
  withdashboardremarks: string;
  withclock: boolean | null;
  withclockremarks: string;
  withgearknob: boolean | null;
  withgearknobremarks: string;
  withrooflight: boolean | null;
  withrooflightremarks: string;
  withdoorlock: boolean | null;
  withdoorlockremarks: string;
  withsteering: boolean | null;
  withsteeringremarks: string;
  withmetergauge: boolean | null;
  withmetergaugeremarks: string;
  withcigarettelighter: boolean | null;
  withcigarettelighterremarks: string;
  withashtray: boolean | null;
  withashtrayremarks: string;
  withfloormat: boolean | null;
  withfloormatremarks: string;
  withcdchanger: boolean | null;
  withcdchangerremarks: string;
  with3rdbreaklight: boolean | null;
  with3rdbreaklightremarks: string;
  withseatfl: boolean | null;
  withseatflremarks: string;
  withseatfr: boolean | null;
  withseatfrremarks: string;
  withseatbl: boolean | null;
  withseatblremarks: string;
  withseatbr: boolean | null;
  withseatbrremarks: string;
  withseatml: boolean | null;
  withseatmlremarks: string;
  withseatmr: boolean | null;
  withseatmrremarks: string;
  withdoorfl: boolean | null;
  withdoorflremarks: string;
  withdoorfr: boolean | null;
  withdoorfrremarks: string;
  withdoorbl: boolean | null;
  withdoorblremarks: string;
  withdoorbr: boolean | null;
  withdoorbrremarks: string;
  withdoorhandlefl: boolean | null;
  withdoorhandleflremarks: string;
  withdoorhandlefr: boolean | null;
  withdoorhandlefrremarks: string;
  withdoorhandlebl: boolean | null;
  withdoorhandleblremarks: string;
  withdoorhandlebr: boolean | null;
  withdoorhandlebrremarks: string;
  withspeakerfl: boolean | null;
  withspeakerflremarks: string;
  withspeakerfr: boolean | null;
  withspeakerfrremarks: string;
  withspeakerbl: boolean | null;
  withspeakerblremarks: string;
  withspeakerbr: boolean | null;
  withspeakerbrremarks: string;
  withplayercassette: boolean | null;
  withplayercassetteremarks: string;
  withplayercd: boolean | null;
  withplayercdremarks: string;
  withplayermonitor: boolean | null;
  withplayermonitorremarks: string;
  bootinteriorgrade: string;
  bootinteriorgraderemarks: string;
  withsparetyre: boolean | null;
  withsparetyreremarks: string;
  withsparetyrejack: boolean | null;
  withsparetyrejackremarks: string;
  withsparetyretools: boolean | null;
  withsparetyretoolsremarks: string;
  interiorcomponentsremarks: string;
  withspoiler: boolean | null;
  withspoilerremarks: string;
  withordinaryrim: boolean | null;
  withordinaryrimremarks: string;
  withsportrim: boolean | null;
  withsportrimremarks: string;
  withwheelcap: boolean | null;
  withwheelcapremarks: string;
  withsportlightl: boolean | null;
  withsportlightlremarks: string;
  withsportlightr: boolean | null;
  withsportlightrremarks: string;
  withtaillampl: boolean | null;
  withtaillamplremarks: string;
  withtaillampr: boolean | null;
  withtaillamprremarks: string;
  withsidemirrorl: boolean | null;
  withsidemirrorlremarks: string;
  withsidemirrorr: boolean | null;
  withsidemirrorrremarks: string;
  withfrontsignall: boolean | null;
  withfrontsignallremarks: string;
  withfrontsignalr: boolean | null;
  withfrontsignalrremarks: string;
  withsidesignall: boolean | null;
  withsidesignallremarks: string;
  withsidesignalr: boolean | null;
  withsidesignalrremarks: string;
  withexhaustpipe: boolean | null;
  withexhaustpiperemarks: string;
  withantena: boolean | null;
  withantenaremarks: boolean | null;
  withfrontbumper: boolean | null;
  withfrontbumperremarks: string;
  withbackbumper: boolean | null;
  withbackbumperremarks: string;
  withfrontlampl: boolean | null;
  withfrontlamplremarks: string;
  withfrontlampr: boolean | null;
  withfrontlamprremarks: string;
  withwindscreenf: boolean | null;
  withwindscreenfremarks: string;
  withwindscreenb: boolean | null;
  withwindscreenbremarks: string;
  withwipersf: boolean | null;
  withwipersfremarks: string;
  withwipersb: boolean | null;
  withwipersbremarks: string;
  withtailsignall: boolean | null;
  withtailsignallremarks: string;
  withtailsignalr: boolean | null;
  withtailsignalrremarks: string;
  withemblemf: boolean | null;
  withemblemfremarks: string;
  withemblemb: boolean | null;
  withemblembremarks: string;
  withtyresizefl: boolean | null;
  withtyresizeflremarks: string;
  withtyresizefr: boolean | null;
  withtyresizefrremarks: string;
  withtyresizebl: boolean | null;
  withtyresizeblremarks: string;
  withtyresizebr: boolean | null;
  withtyresizebrremarks: string;
  withtyrebrandfl: boolean | null;
  withtyrebrandflremarks: string;
  withtyrebrandfr: boolean | null;
  withtyrebrandfrremarks: string;
  withtyrebrandbl: boolean | null;
  withtyrebrandblremarks: string;
  withtyrebrandbr: boolean | null;
  withtyrebrandbrremarks: string;
  withextdoorhanlderfl: boolean | null;
  withextdoorhanlderflremarks: string;
  withextdoorhanlderfr: boolean | null;
  withextdoorhanlderfrremarks: string;
  withextdoorhanlderbl: boolean | null;
  withextdoorhanlderblremarks: string;
  withextdoorhanlderbr: boolean | null;
  withextdoorhanlderbrremarks: string;
  extcomponentremarks: string;
  vehiclepartsgrade1: string;
  vehiclepartsgrade2: string;
  vehiclepartsgrade3: string;
  vehiclepartsgrade4: string;
  vehiclepartsgrade5: string;
  vehiclepartsgrade6: string;
  vehiclepartsgrade7: string;
  vehiclepartsgrade8: string;
  vehiclepartsgrade9: string;
  vehiclepartsgrade10: string;
  vehiclepartsgrade11: string;
  vehiclepartsgrade12: string;
  vehiclepartsgrade13: string;
  vehiclepartsgrade14: string;
  vehiclepartsgrade15: string;
  vehiclepartsgrade16: string;
  vehiclepartsgrade17: string;
  vehiclepartsgrade18: string;
  vehiclepartsgrade19: string;
  vehiclepartsgrade20: string;
  vehiclepartsgrade21: string;
  vehiclepartsgrade22: string;
  vehiclepartsgrade23: string;
  vehiclepartsgrade24: string;
  vehiclepartsgrade25: string;
  vehiclepartsgrade26: string;
  vehiclepartsgrade27: string;
  vehiclepartsgrade28: string;
  vehiclepartsgrade29: string;
  vehiclepartsgrade30: string;
  vehiclepartsgrade31: string;
  vehiclepartsgrade32: string;
  vehiclepartsgrade33: string;
  vehiclepartsgrade34: string;
  vehiclepartsgrade35: string;
  vehiclepartsgrade36: string;
  vehiclepartsgrade37: string;
  vehiclepartsgrade38: string;
  personalitemremarks: string;
  datein: string;
  timein: string;
  withroadtax: boolean | null;
  withpaintwork: boolean | null;
  withnumberplatef: boolean | null;
  withnumberplatefremarks: string;
  withnumberplateb: boolean | null;
  withnumberplatebremarks: string;
  withantennaf: boolean | null;
  withantennafremarks: string;
  withantennab: boolean | null;
  withantennabremarks: string;
  withrimfl: boolean | null;
  withrimflremarks: string;
  withrimfr: boolean | null;
  withrimfrremarks: string;
  withrimbl: boolean | null;
  withrimblremarks: string;
  withrimbr: boolean | null;
  withrimbrremarks: string;
  withwindowglassfl: boolean | null;
  withwindowglassflremarks: string;
  withwindowglassfr: boolean | null;
  withwindowglassfrremarks: string;
  withwindowglassbl: boolean | null;
  withwindowglassblremarks: string;
  withwindowglassbr: boolean | null;
  withwindowglassbrremarks: string;
  accountno: string;
  repossessionplace: string;
  withinnerrearviewmirror: boolean | null;
  withinnerrearviewmirrorremarks: string;
  withwooferbox: boolean | null;
  withwooferboxremarks: string;
  withamplifier: boolean | null;
  withamplifierremarks: string;
  withcomputerbox: boolean | null;
  withcomputerboxremarks: string;
  withclutch: boolean | null;
  withclutchremarks: string;
  withdoortrimfl: boolean | null;
  withdoortrimflremarks: string;
  withdoortrimfr: boolean | null;
  withdoortrimfrremarks: string;
  withdoortrimbl: boolean | null;
  withdoortrimblremarks: string;
  withdoortrimbr: boolean | null;
  withdoortrimbrremarks: string;
  withreversensor: boolean | null;
  withreversensorremarks: string;
  withenginecondition: string;
  withmaybankseat: boolean | null;
  withmaybankseatremarks: string;
  withmaybankdoorpanelcover: boolean | null;
  withmaybankdoorpanelcoverremarks: string;
  withmaybankheadlamp: boolean | null;
  withmaybankheadlampremarks: string;
  withmaybanktyres: boolean | null;
  withmaybanktyresremarks: string;
  withmaybankdoorhandle: boolean | null;
  withmaybankdoorhandleremarks: string;
  withmaybankrim: boolean | null;
  withmaybankrimremarks: string;
  withmaybankwindowglass: boolean | null;
  withmaybankwindowglassremarks: string;
  withmaybankmudguard: boolean | null;
  withmaybankmudguardremarks: string;
  withmaybankchassistampered: boolean | null;
  withmaybankenginechanged: boolean | null;
  withmaybankroofpillars: boolean | null;
  withmaybankfloorboard: boolean | null;
  withbodycover: boolean | null;
  withcarburetor: boolean | null;
  withspeedometer: boolean | null;
  withgearpedal: boolean | null;
  withchainsprocket: boolean | null;
  withchaincover: boolean | null;
  withstandsingle: boolean | null;
  withstanddouble: boolean | null;
  withbrakepedalf: boolean | null;
  withbrakepedalr: boolean | null;
  withclutchpedalf: boolean | null;
  withrearabsorberl: boolean | null;
  withrearabsorberr: boolean | null;
  withbasketf: boolean | null;
  withstorageboxr: boolean | null;
  withordinaryrimf: boolean | null;
  withordinaryrimr: boolean | null;
  withsportrimf: boolean | null;
  withsportrimr: boolean | null;
  withdiscbrakef: boolean | null;
  withdiscbraker: boolean | null;
  withmudguardf: boolean | null;
  withmudguardr: boolean | null;
  withtyref: boolean | null;
  withtyrer: boolean | null;
  withpedalstandfl: boolean | null;
  withpedalstandfr: boolean | null;
  withpedalstandrl: boolean | null;
  withpedalstandrr: boolean | null;
  withstarterpedal: boolean | null;
  withrearmonoshock: boolean | null;
  withfrontforkl: boolean | null;
  withfrontforkr: boolean | null;
  withecu: boolean | null;
  withrearhandle: boolean | null;
  withignitionkeyswitch: boolean | null;
  withkeyswitchforseat: boolean | null;
  withworkingcondition: boolean | null;
  withbodycoverremarks: string | null;
  withcarburetorremarks: string | null;
  withspeedometerremarks: string | null;
  withgearpedalremarks: string | null;
  withchainsprocketremarks: string | null;
  withchaincoverremarks: string | null;
  withstandsingleremarks: string | null;
  withstanddoubleremarks: string | null;
  withbrakepedalfremarks: string | null;
  withbrakepedalrremarks: string | null;
  withclutchpedalfremarks: string | null;
  withrearabsorberlremarks: string | null;
  withrearabsorberrremarks: string | null;
  withbasketfremarks: string | null;
  withstorageboxrremarks: string | null;
  withordinaryrimfremarks: string | null;
  withordinaryrimrremarks: string | null;
  withsportrimfremarks: string | null;
  withsportrimrremarks: string | null;
  withdiscbrakefremarks: string | null;
  withdiscbrakerremarks: string | null;
  withmudguardfremarks: string | null;
  withmudguardrremarks: string | null;
  withtyrefremarks: string | null;
  withtyrerremarks: string | null;
  withpedalstandflremarks: string | null;
  withpedalstandfrremarks: string | null;
  withpedalstandrlremarks: string | null;
  withpedalstandrrremarks: string | null;
  withstarterpedalremarks: string | null;
  withrearmonoshockremarks: string | null;
  withfrontforklremarks: string | null;
  withfrontforkrremarks: string | null;
  withecuremarks: string | null;
  withrearhandleremarks: string | null;
  withignitionkeyswitchremarks: string | null;
  withkeyswitchforseatremarks: string | null;
  withworkingconditionremarks: string | null;
  brand: string | null;
}

export interface AuctionHouseReport {
  id: number;
  auctionhouse_code: string;
  auctionhouse_name: string;
  auctionhouse_address: string;
}

export interface Transactions {
  id: number;
  amount: number;
  balance: number;
  description: string;
  credit_account: string;
  timestamp: string;
  type: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  nric: string;
  mobile_no: string;
  office_phone_no: string;
  address: string;
  state: string | null;
  postal_code: string;
  temp_password: boolean;
  user_agreement: boolean;
  created_at: string;
  role: ROLE;
  credits: [
    {
      id: number;
      credit_id: number;
      amount: number;
      auction_house: {
        id: number;
        code: string;
        name: string;
      };
    },
    {
      id: number;
      credit_id: number;
      amount: number;
      auction_house: {
        id: number;
        code: string;
        name: string;
      };
    },
  ]; //TODO
  companies: [
    {
      name: string;
      registration_no: string;
      address: string;
    },
  ];
}

export interface Contract {
  //TODO
  registration_no: number;
  model: string;
  bidder: string;
  ownership: string;
  date: string;
  auction_house: string;
  actions: string;
}

export interface CreditInterface {
  id: number;
  auctionhouse_id: number;
  amount: number;
  auction_house: {
    id: number;
    code: string;
    name: string;
  };
}

export interface Payload {
  event_id: string;
  auction_id: string;
  status: string;
  bid: {
    start: number;
    next: number;
    current: number;
    up: number;
  };
  timer: {
    tick: number;
    call: number;
  };
  bidders: {
    all: string[];
    highest_amount: number;
    highest_user_id: number;
    highest_user_name: string;
  };
}
