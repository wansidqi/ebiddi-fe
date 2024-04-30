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
import { useEffect } from "react";

export function ReportCar() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <div className="text-[#2C3E50] arial report-layout text-left my-7 overflow-auto">
      <main className="pt-5">
        <p className={`text-[22px] font-bold`}>
          Inspection Report -{" "}
          <span className="text-[15px] font-bold">
            Maroof Store (M) Sdn Bhd{" "}
          </span>
          <span className="text-[9px] font-extralight">
            83, Jalan Kabus, Kuala Ampang, 68000 Ampang, Selangor
          </span>
        </p>
      </main>

      <main className="ml-2 text-[11px]">
        <p className="font-bold text-[13px] border-b w-full border-[#2C3E50]">
          Vehicle Information
        </p>
        <div className="flex my-1 gap-5 w-[95%]">
          <section className="flex gap-1 w-full flex-col">
            <SingleColInFlex value={["Panel", "Maybank, Ipoh - Perak"]} />
            <SingleColInFlex value={["Branch", ""]} />
            <SingleColInFlex value={["Time In", "5.40 pm"]} />
            <SingleColInFlex value={["Reg. No", "AKA1785"]} />
            <SingleColInFlex
              value={["Model", "PERODUA MYVI 1.3"]}
              valStyle="text-[9px]"
            />
            <SingleColInFlex value={["Engine No", ""]} />
            <SingleColInFlex value={["RO Engine No", "T98B28D"]} />
            <SingleColInFlex value={["Transmission", "Auto"]} />
          </section>

          <section className="flex w-full flex-col gap-1">
            <DoubleColInFlex
              value1={["Presentation", ""]}
              value2={["Mode", ""]}
            />
            <SingleColInFlex value={["Date In", ""]} />
            <DoubleColInFlex
              value1={["Mileage", "188282"]}
              value2={["Road Tax", "☑ 27 JAN 2024"]}
            />
            <SingleColInFlex value={["General Condition", "Fair"]} />
            <SingleColInFlex value={["Chasis No", ""]} />
            <SingleColInFlex value={["RO Chasis No", "PM2M602S002218139"]} />
            <DoubleColInFlex
              value1={["Key", "☑ 1pcs"]}
              value2={["Remote", "☐ No"]}
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
            <SingleColInFlex value={["Engine", "☑ Fair"]} />
            <SingleColInFlex value={["Gear Box", "☑ Fair"]} />
            <SingleColInFlex value={["Air-Cond", "☑ Fair"]} />
            <SingleColInFlex value={["Break", "☑ Fair"]} />
          </section>

          <section className="flex w-full flex-col gap-1">
            <SingleColInFlex value={["Radiator", "☑ Fair"]} />
            <SingleColInFlex value={["Battery", "☑ Fair"]} />
            <SingleColInFlex value={["Alternator", "☑ Fair"]} />
            <SingleColInFlex value={["Power Steering", "☑ Fair"]} />
          </section>
        </div>
        <SingleColStandalone value={["Remark", "Fair"]} />
      </main>

      <br />

      <main className="ml-2 text-[11px]">
        <p className="font-bold text-[13px] border-b w-full border-[#2C3E50]">
          Interior Components
        </p>
        <div className="flex my-1 gap-5 w-[95%]">
          <section className="flex gap-1 w-full flex-col">
            <SingleColInFlex value={["Dash Board", "☑ Fair"]} />
            <SingleColInFlex value={["Clock", "☑ Fair"]} />
            <SingleColInFlex value={["Gear Knob", "☑ Fair"]} />
            <SingleColInFlex value={["Roof Light", "☑ Fair"]} />
            <SingleColInFlex value={["Door Lock", "☑ Fair"]} />
            <SingleColInFlex value={["Steering", "☑ Fair"]} />
          </section>

          <section className="flex w-full flex-col gap-1">
            <SingleColInFlex value={["Meter Gauge", "☑ Fair"]} />
            <SingleColInFlex value={["Cigarette Lighter", "☑ Fair"]} />
            <SingleColInFlex value={["Ashtray", "☑ Fair"]} />
            <SingleColInFlex value={["Floor Mats", "☑ Fair"]} />
            <SingleColInFlex value={["CD Changer", "☑ Fair"]} />
            <SingleColInFlex value={["3rd Break Light", "☑ Fair"]} />
          </section>
        </div>
        <Cols6Value
          title="Seat"
          value1="FL ☑  Fair"
          value2="FR ☑  Fair"
          value3="BL ☑  Fair"
          value4="BR ☑  Fair"
          value5="ML ☐  No"
          value6="MR ☐  No"
        />
        <Cols4Value
          title="Door Trim"
          value1="FL ☑ Fair"
          value2="FR ☑  Fair"
          value3="BL ☑  Fair"
          value4="BR ☑  Fair"
        />
        <Cols4Value
          title="Door Handle"
          value1="FL ☑ Fair"
          value2="FR ☑  Fair"
          value3="BL ☑  Fair"
          value4="BR ☑  Fair"
        />
        <Cols4Value
          title="Speaker"
          value1="FL ☑ Fair"
          value2="FR ☑  Fair"
          value3="BL ☑  Fair"
          value4="BR ☑  Fair"
        />
        <Cols3AllUnderline
          title="Player"
          value1="Cassette ☐  No"
          value2="CD ☐  No"
          value3="Monitor ☑  UBAHSUAI"
        />
        <SingleColStandalone value={["Boot Interior Grade", ""]} />
        <div className="flex my-1 gap-1 w-[95%]">
          <Cols3ValueUnderine
            value1={["Spare Tyre", "☑ Fair"]}
            value2={["Jack", "☐ No"]}
            value3={["Tools", "☐ No"]}
          />
        </div>
        <SingleColStandalone value={["Remark", "Fair"]} />
      </main>

      <br />

      <main className="ml-2 text-[11px]">
        <p className="font-bold text-[13px] border-b w-full border-[#2C3E50]">
          Exterior Components
        </p>
        <div className="flex my-1 gap-5 w-[95%]">
          <section className="flex gap-1 w-full flex-col">
            <SingleColInFlex value={["Spoiler", "☐  No"]} />
            <SingleColInFlex value={["Paint Work", "☐  No"]} />
            <SingleColInFlex value={["Wheel Cap", "☑  4pcs"]} />
            <Cols2Side
              title="Number Plate"
              value1={["F", "☑  Fair"]}
              value2={["B", "☑  Fair"]}
            />
            <Cols2Side
              title="Sport Light"
              value1={["L", "☑  Fair"]}
              value2={["R", "☑  CRACK"]}
            />
            <Cols2Side
              title="Tail Lamp"
              value1={["L", "☑  Fair"]}
              value2={["R", "☑  Fair"]}
            />
            <Cols2Side
              title="Side Mirror"
              value1={["L", "☑  CALAR"]}
              value2={["R", "☑  CALAR"]}
            />
            <Cols2Side
              title="Front Signal"
              value1={["L", "☑  Fair"]}
              value2={["R", "☑  Fair"]}
            />
            <Cols2Side
              title="Side Signal"
              value1={["L", "☑  Fair"]}
              value2={["R", "☑  Fair"]}
            />
          </section>

          <section className="flex w-full flex-col gap-1">
            <SingleColInFlex value={["Exhaust Pipe", "☑  STANDARD"]} />
            <SingleColInFlex value={["Front Bumper", "☑  CALAR , GAP"]} />
            <SingleColInFlex value={["Back Bumper", "☑  CALAR"]} />
            <Cols2Side
              title="Antena"
              value1={["F", "☐  No"]}
              value2={["B", "☐  No"]}
            />
            <Cols2Side
              title="Front Lamp"
              value1={["L", "☑  Fair"]}
              value2={["R", "☑  Fair"]}
            />
            <Cols2Side
              title="Wind Screen"
              value1={["F", "☑  Fair"]}
              value2={["B", "☑  Fair"]}
            />
            <Cols2Side
              title="Wipers"
              value1={["F", "☑  2 pcs"]}
              value2={["B", "☑  1 pcs"]}
            />
            <Cols2Side
              title="Tail Signal"
              value1={["L", "☑  Fair"]}
              value2={["R", "☑  Fair"]}
            />
            <Cols2Side
              title="Emblem"
              value1={["F", "☑  Fair"]}
              value2={["B", "☑  Fair"]}
            />
          </section>
        </div>
        <Cols4Value
          title="Tyres Size"
          value1="FL ☑  175/65R14"
          value2="FR ☑  175/65R14"
          value3="BL ☑  175/65R14"
          value4="BR ☑  175/65R14"
        />
        <Cols4Value
          title="Tyres Brand"
          value1="FL ☑ TOYO"
          value2="FR ☑ TOYO"
          value3="BL ☑ TOYO"
          value4="BR ☑ TOYO"
        />
        <Cols4Value
          title="Door Handle"
          value1="FL ☑ Fair"
          value2="FR ☑ Fair"
          value3="BL ☑ Fair"
          value4="BR ☑ Fair"
        />
        <Cols4Value
          title="Rim"
          value1="FL ☑ ORIGINAL"
          value2="FR ☑ ORIGINAL"
          value3="BL ☑ ORIGINAL"
          value4="BR ☑ ORIGINAL"
        />
        <Cols4Value
          title="Window Glass"
          value1="FL ☑ Fair"
          value2="FR ☑ Fair"
          value3="BL ☑ Fair"
          value4="BR ☑ Fair"
        />
        <SingleColStandalone value={["Remark", "Fair"]} />
      </main>
    </div>
  );
}
