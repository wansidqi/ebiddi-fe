import {
  SingleColInFlex,
  DoubleColInFlex,
  SingleColStandalone,
  Cols6Value,
  Cols4Value,
  Cols3AllUnderline,
  Cols3ValueUnderine,
  Cols2Side,
} from "@/components/ReportCarComponent";
import { useTheme } from "@/components/ThemeProvider";
import { useAPIServices } from "@/services";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { VehicleInspection } from ".";
import { InvestigationReport } from "@/interfaces";

export const tickbox = (checking: any) => {
  return checking ? "☑ " : "☐ ";
};

export function ReportCar() {
  const { vehicle_id } = useParams();

  const { useGetItemById } = useAPIServices();
  const { data, isLoading } = useGetItemById(Number(vehicle_id));
  const report = data?.investigation_report;

  const { setTheme } = useTheme();
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
    <div className="text-[#2C3E50] arial report-layout text-left my-7 overflow-auto">
      <main className="pt-5">
        <p className={`text-[22px] font-bold`}>
          Inspection Report -{" "}
          <span className="text-[15px] font-bold">
            {data?.auction_house.auctionhouse_name}{" "}
          </span>
          <span className="text-[9px] font-extralight">
            {data?.auction_house.auctionhouse_address}
          </span>
        </p>
      </main>

      <main className="ml-2 text-[11px]">
        <p className="font-bold text-[13px] border-b w-full border-[#2C3E50]">
          Vehicle Information
        </p>
        <div className="flex my-1 gap-5 w-[95%]">
          <section className="flex gap-1 w-full flex-col">
            <SingleColInFlex value={["Panel", data?.banker.name ?? ""]} />
            <SingleColInFlex value={["Branch", ""]} />
            <SingleColInFlex value={["Time In", report?.timein ?? ""]} />
            <SingleColInFlex
              value={["Reg. No", data?.registration_number ?? ""]}
            />
            <SingleColInFlex
              value={["Model", data?.model ?? ""]}
              valStyle="text-[9px]"
            />
            <SingleColInFlex
              value={["Engine No", report?.engine_number ?? ""]}
            />
            <SingleColInFlex
              value={["RO Engine No", report?.roengine_number ?? ""]}
            />
            <SingleColInFlex
              value={["Transmission", report?.transmission ?? ""]}
            />
          </section>

          <section className="flex w-full flex-col gap-1">
            <DoubleColInFlex
              value1={["Presentation", ""]}
              value2={["Mode", ""]}
            />
            <SingleColInFlex value={["Date In", report?.datein ?? ""]} />
            <DoubleColInFlex
              value1={["Mileage", report?.mileage.toString() ?? ""]}
              value2={[
                "Road Tax",
                (report?.withroadtax ? "☑ " : "☐ ") + report?.roadtax ?? "",
              ]}
            />
            <SingleColInFlex
              value={["General Condition", report?.general_condition ?? ""]}
            />
            <SingleColInFlex
              value={["Chasis No", report?.chassis_number ?? ""]}
            />
            <SingleColInFlex
              value={["RO Chasis No", report?.rochasis_number ?? ""]}
            />
            <DoubleColInFlex
              value1={[
                "Key",
                (report?.withkey ? "☑ " : "☐ ") + report?.withkeyremarks ?? "",
              ]}
              value2={[
                "Remote",
                (report?.withremote ? "☑ " : "☐ ") +
                  report?.withremoteremarks ?? "",
              ]}
            />
          </section>
        </div>
      </main>

      <br />

      <main className="ml-2 text-[11px]">
        <p className="font-bold text-[13px] border-b w-full border-[#2C3E50]">
          Engine Components
        </p>
        <div className="flex my-1 gap-5 w-[95%]">
          <section className="flex gap-1 w-full flex-col">
            <SingleColInFlex
              value={[
                "Engine",
                tickbox(report?.withengine) + report?.withengineremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Gear Box",
                tickbox(report?.withgearbox) + report?.withgearboxremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Air-Cond",
                tickbox(report?.withaircond) + report?.withaircondremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Break",
                tickbox(report?.withbreak) + report?.withbreakremarks,
              ]}
            />
          </section>

          <section className="flex w-full flex-col gap-1">
            <SingleColInFlex
              value={[
                "Radiator",
                tickbox(report?.withradiator) + report?.withradiatorremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Battery",
                tickbox(report?.withbattery) + report?.withbatteryremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Alternator",
                tickbox(report?.withalternator) + report?.withalternatorremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Power Steering",
                tickbox(report?.withpowersteering) +
                  report?.withpowersteeringremarks,
              ]}
            />
          </section>
        </div>
        <SingleColStandalone
          value={["Remark", report?.enginecomponentsremarks ?? ""]}
        />
      </main>

      <br />

      <main className="ml-2 text-[11px]">
        <p className="font-bold text-[13px] border-b w-full border-[#2C3E50]">
          Interior Components
        </p>
        <div className="flex my-1 gap-5 w-[95%]">
          <section className="flex gap-1 w-full flex-col">
            <SingleColInFlex
              value={[
                "Dash Board",
                tickbox(report?.withdashboard) + report?.withdashboardremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Clock",
                tickbox(report?.withclock) + report?.withclockremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Gear Knob",
                tickbox(report?.withgearknob) + report?.withgearknobremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Roof Light",
                tickbox(report?.withrooflight) + report?.withrooflightremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Door Lock",
                tickbox(report?.withdoorlock) + report?.withdoorlockremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Steering",
                tickbox(report?.withsteering) + report?.withsteeringremarks,
              ]}
            />
          </section>

          <section className="flex w-full flex-col gap-1">
            <SingleColInFlex
              value={[
                "Meter Gauge",
                tickbox(report?.withmetergauge) + report?.withmetergaugeremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Cigarette Lighter",
                tickbox(report?.withcigarettelighter) +
                  report?.withcigarettelighterremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Ashtray",
                tickbox(report?.withashtray) + report?.withashtrayremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Floor Mats",
                tickbox(report?.withfloormat) + report?.withfloormatremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "CD Changer",
                tickbox(report?.withcdchanger) + report?.withcdchangerremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "3rd Break Light",
                tickbox(report?.with3rdbreaklight) +
                  report?.with3rdbreaklightremarks,
              ]}
            />
          </section>
        </div>
        <Cols6Value
          title="Seat"
          value1={
            "FL " + tickbox(report?.withseatfl) + report?.withseatflremarks
          }
          value2={
            "FR " + tickbox(report?.withseatfr) + report?.withseatfrremarks
          }
          value3={
            "BL " + tickbox(report?.withseatbl) + report?.withseatblremarks
          }
          value4={
            "BR " + tickbox(report?.withseatbr) + report?.withseatbrremarks
          }
          value5={
            "ML " + tickbox(report?.withseatml) + report?.withseatmlremarks
          }
          value6={
            "MR " + tickbox(report?.withseatmr) + report?.withseatmrremarks
          }
        />
        <Cols4Value
          title="Door Trim"
          value1={
            "FL " +
            tickbox(report?.withdoortrimfl) +
            report?.withdoortrimflremarks
          }
          value2={
            "FR " +
            tickbox(report?.withdoortrimfr) +
            report?.withdoortrimfrremarks
          }
          value3={
            "BL " +
            tickbox(report?.withdoortrimbl) +
            report?.withdoortrimblremarks
          }
          value4={
            "BR " +
            tickbox(report?.withdoortrimbr) +
            report?.withdoortrimbrremarks
          }
        />
        <Cols4Value
          title="Door Handle"
          value1={
            "FL " +
            tickbox(report?.withdoorhandlefl) +
            report?.withdoorhandleflremarks
          }
          value2={
            "FR " +
            tickbox(report?.withdoorhandlefr) +
            report?.withdoorhandlefrremarks
          }
          value3={
            "BL " +
            tickbox(report?.withdoorhandlebl) +
            report?.withdoorhandleblremarks
          }
          value4={
            "BR " +
            tickbox(report?.withdoorhandlebr) +
            report?.withdoorhandlebrremarks
          }
        />
        <Cols4Value
          title="Speaker"
          value1={
            "FL " +
            tickbox(report?.withspeakerfl) +
            report?.withspeakerflremarks
          }
          value2={
            "FR " +
            tickbox(report?.withspeakerfr) +
            report?.withspeakerfrremarks
          }
          value3={
            "BL " +
            tickbox(report?.withspeakerbl) +
            report?.withspeakerblremarks
          }
          value4={
            "BR " +
            tickbox(report?.withspeakerbr) +
            report?.withspeakerbrremarks
          }
        />
        <Cols3AllUnderline
          title="Player"
          value1={
            "Cassette " +
            tickbox(report?.withplayercassette) +
            report?.withplayercassetteremarks
          }
          value2={
            "CD " + tickbox(report?.withplayercd) + report?.withplayercdremarks
          }
          value3={
            "Monitor " +
            tickbox(report?.withplayermonitor) +
            report?.withplayermonitorremarks
          }
        />
        <SingleColStandalone
          value={["Boot Interior Grade", report?.bootinteriorgrade ?? ""]}
        />
        <div className="flex my-1 gap-1 w-[95%]">
          <Cols3ValueUnderine
            value1={[
              "Spare Tyre",
              tickbox(report?.withsparetyre) + report?.withsparetyreremarks,
            ]}
            value2={[
              "Jack",
              tickbox(report?.withsparetyrejack) +
                report?.withsparetyrejackremarks,
            ]}
            value3={[
              "Tools",
              tickbox(report?.withsparetyretools) +
                report?.withsparetyretoolsremarks,
            ]}
          />
        </div>
        <SingleColStandalone
          value={["Remark", report?.interiorcomponentsremarks ?? ""]}
        />
      </main>

      <br />

      <main className="ml-2 text-[11px]">
        <p className="font-bold text-[13px] border-b w-full border-[#2C3E50]">
          Exterior Components
        </p>
        <div className="flex my-1 gap-5 w-[95%]">
          <section className="flex gap-1 w-full flex-col">
            <SingleColInFlex
              value={[
                "Spoiler",
                tickbox(report?.withspoiler) + report?.withspoilerremarks,
              ]}
            />
            <SingleColInFlex
              value={["Paint Work", tickbox(report?.withpaintwork)]}
            />
            <SingleColInFlex
              value={[
                "Wheel Cap",
                tickbox(report?.withwheelcap) + report?.withwheelcapremarks,
              ]}
            />
            <Cols2Side
              title="Number Plate"
              value1={[
                "F",
                tickbox(report?.withnumberplatef) +
                  report?.withnumberplatefremarks,
              ]}
              value2={[
                "B",
                tickbox(report?.withnumberplateb) +
                  report?.withnumberplatebremarks,
              ]}
            />
            <Cols2Side
              title="Sport Light"
              value1={[
                "L",
                tickbox(report?.withsportlightl) + report?.withsportlightl,
              ]}
              value2={[
                "R",
                tickbox(report?.withsportlightr) + report?.withsportlightr,
              ]}
            />
            <Cols2Side
              title="Tail Lamp"
              value1={[
                "L",
                tickbox(report?.withtaillampl) + report?.withtaillamplremarks,
              ]}
              value2={[
                "R",
                tickbox(report?.withtaillampr) + report?.withtaillamprremarks,
              ]}
            />
            <Cols2Side
              title="Side Mirror"
              value1={[
                "L",
                tickbox(report?.withsidemirrorl) +
                  report?.withsidemirrorlremarks,
              ]}
              value2={[
                "R",
                tickbox(report?.withsidemirrorr) +
                  report?.withsidemirrorrremarks,
              ]}
            />
            <Cols2Side
              title="Front Signal"
              value1={[
                "L",
                tickbox(report?.withfrontsignall) +
                  report?.withfrontsignallremarks,
              ]}
              value2={[
                "R",
                tickbox(report?.withfrontsignalr) +
                  report?.withfrontsignalrremarks,
              ]}
            />
            <Cols2Side
              title="Side Signal"
              value1={[
                "L",
                tickbox(report?.withsidesignall) +
                  report?.withsidesignallremarks,
              ]}
              value2={[
                "R",
                tickbox(report?.withsidesignalr) +
                  report?.withsidesignalrremarks,
              ]}
            />
          </section>

          <section className="flex w-full flex-col gap-1">
            <SingleColInFlex
              value={[
                "Exhaust Pipe",
                tickbox(report?.withexhaustpipe) +
                  report?.withexhaustpiperemarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Front Bumper",
                tickbox(report?.withfrontbumper) +
                  report?.withfrontbumperremarks,
              ]}
            />
            <SingleColInFlex
              value={[
                "Back Bumper",
                tickbox(report?.withbackbumper) + report?.withbackbumperremarks,
              ]}
            />
            <Cols2Side
              title="Antena"
              value1={[
                "F",
                tickbox(report?.withantennaf) + report?.withantennafremarks,
              ]}
              value2={[
                "B",
                tickbox(report?.withantennab) + report?.withantennabremarks,
              ]}
            />
            <Cols2Side
              title="Front Lamp"
              value1={[
                "L",
                tickbox(report?.withfrontlampl) + report?.withfrontlamplremarks,
              ]}
              value2={[
                "R",
                tickbox(report?.withfrontlampr) + report?.withfrontlamprremarks,
              ]}
            />
            <Cols2Side
              title="Wind Screen"
              value1={[
                "F",
                tickbox(report?.withwindscreenf) +
                  report?.withwindscreenfremarks,
              ]}
              value2={[
                "B",
                tickbox(report?.withwindscreenb) +
                  report?.withwindscreenbremarks,
              ]}
            />
            <Cols2Side
              title="Wipers"
              value1={[
                "F",
                tickbox(report?.withwipersf) + report?.withwipersfremarks,
              ]}
              value2={[
                "B",
                tickbox(report?.withwipersb) + report?.withwipersbremarks,
              ]}
            />
            <Cols2Side
              title="Tail Signal"
              value1={[
                "L",
                tickbox(report?.withtailsignall) +
                  report?.withtailsignallremarks,
              ]}
              value2={[
                "R",
                tickbox(report?.withtailsignalr) +
                  report?.withtailsignalrremarks,
              ]}
            />
            <Cols2Side
              title="Emblem"
              value1={[
                "F",
                tickbox(report?.withemblemf) + report?.withemblemfremarks,
              ]}
              value2={[
                "B",
                tickbox(report?.withemblemb) + report?.withemblembremarks,
              ]}
            />
          </section>
        </div>
        <Cols4Value
          title="Tyres Size"
          value1={
            "FL " +
            tickbox(report?.withtyresizefl) +
            report?.withtyresizeflremarks
          }
          value2={
            "FR " +
            tickbox(report?.withtyresizefr) +
            report?.withtyresizefrremarks
          }
          value3={
            "BL " +
            tickbox(report?.withtyresizebl) +
            report?.withtyresizeblremarks
          }
          value4={
            "BR " +
            tickbox(report?.withtyresizebr) +
            report?.withtyresizebrremarks
          }
        />
        <Cols4Value
          title="Tyres Brand"
          value1={
            "FL " +
            tickbox(report?.withtyrebrandfl) +
            report?.withtyrebrandflremarks
          }
          value2={
            "FR " +
            tickbox(report?.withtyrebrandfr) +
            report?.withtyrebrandfrremarks
          }
          value3={
            "BL " +
            tickbox(report?.withtyrebrandbl) +
            report?.withtyrebrandblremarks
          }
          value4={
            "BR " +
            tickbox(report?.withtyrebrandbr) +
            report?.withtyrebrandbrremarks
          }
        />
        <Cols4Value
          title="Door Handle"
          value1={
            "FL " +
            tickbox(report?.withdoorhandlefl) +
            report?.withdoorhandleflremarks
          }
          value2={
            "FR " +
            tickbox(report?.withdoorhandlefr) +
            report?.withdoorhandlefrremarks
          }
          value3={
            "BL " +
            tickbox(report?.withdoorhandlebl) +
            report?.withdoorhandleblremarks
          }
          value4={
            "BR " +
            tickbox(report?.withdoorhandlebr) +
            report?.withdoorhandlebrremarks
          }
        />
        <Cols4Value
          title="Rim"
          value1={"FL " + tickbox(report?.withrimfl) + report?.withrimflremarks}
          value2={"FR " + tickbox(report?.withrimfr) + report?.withrimfrremarks}
          value3={"BL " + tickbox(report?.withrimbl) + report?.withrimblremarks}
          value4={"BR " + tickbox(report?.withrimbr) + report?.withrimbrremarks}
        />
        <Cols4Value
          title="Window Glass"
          value1={
            "FL " +
            tickbox(report?.withwindowglassfl) +
            report?.withwindowglassflremarks
          }
          value2={
            "FR " +
            tickbox(report?.withwindowglassfr) +
            report?.withwindowglassfrremarks
          }
          value3={
            "BL " +
            tickbox(report?.withwindowglassbl) +
            report?.withwindowglassblremarks
          }
          value4={
            "BR " +
            tickbox(report?.withwindowglassbr) +
            report?.withwindowglassbrremarks
          }
        />
        <SingleColStandalone
          value={["Remark", report?.extcomponentremarks ?? ""]}
        />
      </main>

      <br />

      <main className="my-20">
        <p className={`text-[22px] font-bold`}>
          Inspection Report -{" "}
          <span className="text-[15px] font-bold">
            {data?.auction_house.auctionhouse_name}{" "}
          </span>
          <span className="text-[9px] font-extralight">
            {data?.auction_house.auctionhouse_address}
          </span>
        </p>
        <div className="flex gap-1 text-[15px] font-bold">
          <p className="w-[8%]">Reg. No</p>
          <p>: {data?.registration_number}</p>
        </div>
        <div className="flex gap-1 text-[15px] font-bold">
          <p className="w-[8%]">Model</p>
          <p>: {data?.model}</p>
        </div>
        <div className="mt-6 pl-2 font-bold text-[13px]">
          <p className="border-b w-full border-[#2C3E50]">Parts Grade</p>
        </div>
        <VehicleInspection report={report as InvestigationReport} />
        <div className="ml-2">
          <p className=" underline font-[17px]">Grading Remark</p>
          <div className="ml-6 mt-3">
            <li>S - Scratched</li>
            <li>C - Cracked</li>
            <li>D - Dented</li>
            <li>R - Rusty</li>
            <li>B - Broken</li>
            <li>G - Gap</li>
            <li>F - Fair</li>
            <li>GD - Good</li>
          </div>
        </div>
      </main>

      <br />
    </div>
  );
}
