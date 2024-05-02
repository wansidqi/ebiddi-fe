import { useTheme } from "@/components/ThemeProvider";
import { useAPIServices } from "@/services";
import { useEffect } from "react";
import { tickbox } from "./ReportCar";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export function ReportMotor() {
  const { setTheme } = useTheme();

  const { vehicle_id } = useParams();

  const { useGetItemById } = useAPIServices();
  const { data, isLoading } = useGetItemById(Number(vehicle_id));
  const report = data?.investigation_report;

  function showGrade(val: number) {
    switch (val) {
      case 0:
        return "Fair";
      case 1:
        return "Good";
      case 2:
        return "Bad";
    }
  }

  const reports = [
    {
      title: "ENGINE",
      data: report?.withengine,
      remark: report?.withengineremarks,
    },
    {
      title: "COVER",
      data: report?.withbodycover,
      remark: report?.withbodycoverremarks,
    },
    {
      title: "BATTERY",
      data: report?.withbattery,
      remark: report?.withbatteryremarks,
    },
    {
      title: "CARBURETOR/INJECTION",
      data: report?.withcarburetor,
      remark: report?.withcarburetorremarks,
    },
    {
      title: "SPEEDO METER",
      data: report?.withspeedometer,
      remark: report?.withspeedometerremarks,
    },
    {
      title: "CHAIN & SPROCKET",
      data: report?.withchainsprocket,
      remark: report?.withchainsprocketremarks,
    },
    {
      title: "CHAIN COVER",
      data: report?.withbodycover,
      remark: report?.withbodycoverremarks,
    },
    {
      title: "ORDINARY RIM (FRONT)",
      data: report?.withordinaryrimf,
      remark: report?.withordinaryrimfremarks,
    },
    {
      title: "ORDINARY RIM (REAR)",
      data: report?.withordinaryrimr,
      remark: report?.withordinaryrimrremarks,
    },
    {
      title: "SPORT RIM (FRONT)",
      data: report?.withsportrimf,
      remark: report?.withsportrimfremarks,
    },
    {
      title: "SPORT RIM (REAR)",
      data: report?.withsportrimr,
      remark: report?.withsportrimrremarks,
    },
    {
      title: "EXHAUST PIPE",
      data: report?.withexhaustpipe,
      remark: report?.withexhaustpiperemarks,
    },
    {
      title: "STAND (SINGLE)",
      data: report?.withstandsingle,
      remark: report?.withstandsingleremarks,
    },
    {
      title: "STAND (DOUBLE)",
      data: report?.withstanddouble,
      remark: report?.withstanddoubleremarks,
    },
    {
      title: "GEAR PEDAL",
      data: report?.withgearpedal,
      remark: report?.withgearpedalremarks,
    },
    {
      title: "PEDAL STAND (FRONT LEFT)",
      data: report?.withpedalstandfl,
      remark: report?.withpedalstandflremarks,
    },
    {
      title: "PEDAL STAND (FRONT RIGHT)",
      data: report?.withpedalstandfr,
      remark: report?.withpedalstandfrremarks,
    },
    {
      title: "PEDAL STAND (REAR LEFT)",
      data: report?.withpedalstandrl,
      remark: report?.withpedalstandrlremarks,
    },
    {
      title: "PEDAL STAND (REAR RIGHT)",
      data: report?.withpedalstandrr,
      remark: report?.withpedalstandrrremarks,
    },
    {
      title: "BRAKE PEDAL (FRONT WHEEL)",
      data: report?.withbrakepedalf,
      remark: report?.withbrakepedalfremarks,
    },
    {
      title: "BRAKE PEDAL (REAR WHEEL)",
      data: report?.withbrakepedalr,
      remark: report?.withbrakepedalrremarks,
    },
    {
      title: "CLUTCH PEDAL (FRONT)",
      data: report?.withclutchpedalf,
      remark: report?.withclutchpedalfremarks,
    },
    {
      title: "STARTER PEDAL",
      data: report?.withstarterpedal,
      remark: report?.withstarterpedalremarks,
    },
    {
      title: "REAR MONOSHOCK",
      data: report?.withrearmonoshock,
      remark: report?.withrearmonoshockremarks,
    },
    {
      title: "REAR ABSORBER (LEFT)",
      data: report?.withrearabsorberl,
      remark: report?.withrearabsorberlremarks,
    },
    {
      title: "REAR ABSORBER (RIGHT)",
      data: report?.withrearabsorberr,
      remark: report?.withrearabsorberrremarks,
    },
    {
      title: "FRONT FORK (LEFT)",
      data: report?.withfrontforkl,
      remark: report?.withfrontforklremarks,
    },
    {
      title: "FRONT FORK (RIGHT)",
      data: report?.withfrontforkr,
      remark: report?.withfrontforkrremarks,
    },
    {
      title: "SEAT",
      data: report?.withmaybankseat,
      remark: report?.withmaybankseatremarks,
    },
    {
      title: "REAR HANDLE",
      data: report?.withrearhandle,
      remark: report?.withrearhandleremarks,
    },
    {
      title: "IGNITION KEY SWITCH",
      data: report?.withignitionkeyswitch,
      remark: report?.withignitionkeyswitchremarks,
    },
    {
      title: "KEY SWITCH FOR SEAT",
      data: report?.withkeyswitchforseat,
      remark: report?.withkeyswitchforseatremarks,
    },
    {
      title: "SIDE MIRROR (LEFT)",
      data: report?.withsidemirrorl,
      remark: report?.withsidemirrorlremarks,
    },
    {
      title: "SIDE MIRROR (RIGHT)",
      data: report?.withsidemirrorr,
      remark: report?.withsidemirrorrremarks,
    },
    {
      title: "BASKET (FRONT)",
      data: report?.withbasketf,
      remark: report?.withbasketfremarks,
    },
    {
      title: "STORAGE BOX (REAR)",
      data: report?.withstorageboxr,
      remark: report?.withstorageboxrremarks,
    },
    {
      title: "BRAKE (FRONT)",
      data: report?.withdiscbrakef,
      remark: report?.withdiscbrakefremarks,
    },
    {
      title: "BRAKE (REAR)",
      data: report?.withdiscbraker,
      remark: report?.withdiscbrakerremarks,
    },
    {
      title: "MUD GUARD (FRONT)",
      data: report?.withmudguardf,
      remark: report?.withmudguardfremarks,
    },
    {
      title: "MUD GUARD (REAR)",
      data: report?.withmudguardr,
      remark: report?.withmudguardrremarks,
    },
    {
      title: "TYRE (FRONT)",
      data: report?.withtyref,
      remark: report?.withtyrefremarks,
    },
    {
      title: "TYRE (REAR)",
      data: report?.withtyrer,
      remark: report?.withtyrerremarks,
    },
    {
      title: "PLATE NUMBER (FRONT)",
      data: report?.withnumberplatef,
      remark: report?.withnumberplatefremarks,
    },
    {
      title: "PLATE NUMBER (REAR)",
      data: report?.withnumberplateb,
      remark: report?.withnumberplatebremarks,
    },
    {
      title: "REAR LAMP",
      data: report?.withtaillampl,
      remark: report?.withtaillamplremarks,
    },
    {
      title: "HEAD LAMP",
      data: report?.withmaybankheadlamp,
      remark: report?.withmaybankheadlampremarks,
    },
    {
      title: "BRAKE LIGHT",
      data: report?.with3rdbreaklight,
      remark: report?.with3rdbreaklightremarks,
    },
    {
      title: "FRONT SIGNAL (LEFT)",
      data: report?.withfrontsignall,
      remark: report?.withfrontsignallremarks,
    },
    {
      title: "FRONT SIGNAL (RIGHT)",
      data: report?.withfrontsignalr,
      remark: report?.withfrontsignalrremarks,
    },
    {
      title: "REAR SIGNAL (LEFT)",
      data: report?.withtailsignall,
      remark: report?.withtailsignallremarks,
    },
    {
      title: "REAR SIGNAL (RIGHT)",
      data: report?.withtailsignalr,
      remark: report?.withtailsignalrremarks,
    },
  ];

  useEffect(() => {
    setTheme("light");
  }, []);

  if (isLoading)
    return (
      <div className="flexcenter h-screen">
        <LoaderCircle size={"100px"} className="animate-spin" />
      </div>
    );

  return (
    <div className="report-layout arial text-[#2C3E50] text-[9px] overflow-auto">
      <main className="mt-14 border-b border-[#2C3E50]">
        <p className="text-[15px] font-bold">INSPECTION REPORT --</p>
        <p className="text-[11px] mt-6">VEHICLE INFORMATION</p>
      </main>

      <main className="grid grid-cols-10 gap-x-1 mt-6">
        <>
          <div className="flex">Panel</div>
          <Underline className="col-span-3">
            :{data?.banker.name ?? ""}
          </Underline>
          <div className="">Presentation</div>
          <Underline className="col-span-2">:</Underline>
          <div className="">Mode</div>
          <Underline className="col-span-2">:</Underline>
        </>
        <>
          <div className="">Branch</div>
          <Underline className="col-span-3">:</Underline>
          <div className="">Date In</div>
          <Underline className="col-span-2">:{report?.datein}</Underline>
          <div className="">Time In</div>
          <Underline className="col-span-2">:{report?.timein}</Underline>
        </>
        <>
          <div className="">Model</div>
          <Underline className="col-span-3">:HONDA RS150R REPSOL</Underline>
          <div className="">Mileage</div>
          <Underline className="col-span-2">:{report?.mileage}</Underline>
          <div className="">Key</div>
          <Underline className="col-span-2">
            : {tickbox(report?.withkey) + report?.withkeyremarks}
          </Underline>
        </>
        <>
          <div className="">Reg No.</div>
          <Underline className="col-span-3">
            :{data?.registration_number}
          </Underline>
          <div className="">Road Tax</div>
          <Underline className="col-span-2">
            : {tickbox(report?.withroadtax) + report?.roadtax}
          </Underline>
          <div className="">Remote</div>
          <Underline className=" col-span-2">
            :{tickbox(report?.withremote) + report?.withremoteremarks}
          </Underline>
        </>
        <>
          <div className="">Engine No.</div>
          <Underline className="col-span-3">:{report?.engine_number}</Underline>
          <div className="">Chassis No.</div>
          <Underline className="col-span-5">
            :{report?.chassis_number}
          </Underline>
        </>
        <>
          <div className="">RO Engine No.</div>
          <Underline className="col-span-3">
            :{report?.roengine_number}
          </Underline>
          <div className="">RO Chassis No.</div>
          <Underline className="col-span-5">
            :{report?.rochasis_number}
          </Underline>
        </>
        <>
          <div className="">Transmission</div>
          <Underline className="col-span-3">:{report?.transmission}</Underline>
          <div className="">General Condition</div>
          <Underline className="col-span-5">
            :{report?.general_condition}
          </Underline>
        </>
      </main>

      <br />

      <main className="flex gap-8">
        <table className="border-collapse border border-[#2C3E50] w-1/2 mt-2">
          <thead className="">
            <tr>
              <th className="border border-[#2C3E50] text-center">No</th>
              <th className="border border-[#2C3E50] px-4">Items</th>
              <th className="border border-[#2C3E50]">Condition</th>
              <th className="border border-[#2C3E50] px-4">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {reports.slice(0, 26).map((report, index) => (
              <tr key={index}>
                <BorderGray className="border border-[#2C3E50] text-center">
                  {index + 1}
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] pr-1">
                  {report.title}
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] text-center text-[11px]">
                  {showGrade(report.data as any)}
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] px-4">
                  {/* {report.remark} */}
                </BorderGray>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="border-collapse border border-[#2C3E50] w-1/2 mt-2">
          <thead className="">
            <tr>
              <th className="border border-[#2C3E50] text-center">No</th>
              <th className="border border-[#2C3E50] px-4">Items</th>
              <th className="border border-[#2C3E50]">Condition</th>
              <th className="border border-[#2C3E50] px-4">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {reports.slice(26).map((report, index) => (
              <tr key={index}>
                <BorderGray className="border border-[#2C3E50] text-center">
                  {index + 1}
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] pr-1">
                  {report.title}
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] text-center text-[11px]">
                  {showGrade(report.data as any)}
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] px-4">
                  {/* {report.remark} */}
                </BorderGray>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <br />

      <main className="flex">
        <div className="border-l border-t border-b border-[#2C3E50] pr-20 pb-12">
          Remarks:
        </div>
        <div className="border border-[#2C3E50] w-full">
          {report?.extcomponentremarks}
        </div>
      </main>
    </div>
  );
}

const Underline = ({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`border-b border-[#2C3E50] ${className}`}>{children}</div>
  );
};

const BorderGray = ({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode;
}) => {
  return <td className={`border border-[#2C3E50] ${className}`}>{children}</td>;
};
