import car from "@/assets/images/car.jpg";
import { InvestigationReport } from "@/interfaces";

export function VehicleInspection({ report }: { report: InvestigationReport }) {
  console.log(report)
  return (
    <div className="">
      <div className="relative">
        <img width={"800px"} className="ml-0" src={car} alt="" />
        {/* top */}
        <Part part="38" item={report?.vehiclepartsgrade38} postion="top-[48%] left-[44%]" />
        <Part part="25" item={report?.vehiclepartsgrade25} postion="top-[48%] left-[18.3%] " />
        <Part part="26" item={report?.vehiclepartsgrade26} postion="top-[48%] left-[25%] " />
        <Part part="13" item={report?.vehiclepartsgrade13} postion="top-[48%] right-[33%] " />
        <Part part="8" item={report?.vehiclepartsgrade8} postion="top-[48%] right-[20%] " />
        {/* right side */}
        <Part part="31" item={report?.vehiclepartsgrade31} postion="bottom-[28%] left-[30.5%]" />
        <Part part="32" item={report?.vehiclepartsgrade32} postion="bottom-[30%] left-[40%]" />
        <Part part="33" item={report?.vehiclepartsgrade33} postion="bottom-[18%] left-[40%]" />
        <Part part="34" item={report?.vehiclepartsgrade34} postion="bottom-[9%] left-[48%]" />
        <Part part="35" item={report?.vehiclepartsgrade35} postion="bottom-[18%] right-[42%]" />
        <Part part="36" item={report?.vehiclepartsgrade36} postion="bottom-[29%] right-[45%]" />
        <Part part="37" item={report?.vehiclepartsgrade37} postion="bottom-[26%] right-[37%]" />
        <Part part="11" item={report?.vehiclepartsgrade11} postion="bottom-[19%] right-[30%]" />
        <Part part="9" item={report?.vehiclepartsgrade9} postion="bottom-[12%] right-[16%]" />
        <Part part="30" item={report?.vehiclepartsgrade30} postion="bottom-[21%] left-[25%]" />
        <Part part="29" item={report?.vehiclepartsgrade29} postion="bottom-[14%] left-[22%]" />
        {/* left side */}
        <Part part="20" item={report?.vehiclepartsgrade20} postion="top-[25%] left-[30.5%]" />
        <Part part="19" item={report?.vehiclepartsgrade19} postion="top-[27%] left-[40%]" />
        <Part part="18" item={report?.vehiclepartsgrade18} postion="top-[15%] left-[40%]" />
        <Part part="17" item={report?.vehiclepartsgrade17} postion="top-[6%] left-[48%]" />
        <Part part="15" item={report?.vehiclepartsgrade15} postion="top-[15%] right-[42%]" />
        <Part part="16" item={report?.vehiclepartsgrade16} postion="top-[26%] right-[45%]" />
        <Part part="14" item={report?.vehiclepartsgrade14} postion="top-[23.5%] right-[37%]" />
        <Part part="12" item={report?.vehiclepartsgrade12} postion="top-[16%] right-[30%]" />
        <Part part="10" item={report?.vehiclepartsgrade10} postion="top-[9%] right-[16%]" />
        <Part part="21" item={report?.vehiclepartsgrade21} postion="top-[18%] left-[25%]" />
        <Part part="22" item={report?.vehiclepartsgrade22} postion="top-[11%] left-[22%]" />
        {/* bottom side */}
        <Part part="24" item={report?.vehiclepartsgrade24} postion="top-[48%] left-[12.3%]" />
        <Part part="23" item={report?.vehiclepartsgrade23} postion="top-[48%] left-[9%]" />
        <Part part="28" item={report?.vehiclepartsgrade28} postion="top-[30%] left-[14.5%]" />
        <Part part="27" item={report?.vehiclepartsgrade27} postion="bottom-[32.5%] left-[14.5%]" />
        {/* front side */}
        <Part part="2" item={report?.vehiclepartsgrade2} postion="top-[48%] right-[12%]" />
        <Part part="7" item={report?.vehiclepartsgrade7} postion="top-[48%] right-[8%]" />
        <Part part="5" item={report?.vehiclepartsgrade5} postion="top-[42%] right-[6.5%]" />
        <Part part="3" item={report?.vehiclepartsgrade3} postion="top-[33%] right-[13%]" />
        <Part part="1" item={report?.vehiclepartsgrade1} postion="bottom-[35%] right-[12%]" />
        <Part part="6" item={report?.vehiclepartsgrade6} postion="top-[29%] right-[8%]" />
        <Part part="4" item={report?.vehiclepartsgrade4} postion="bottom-[31.5%] right-[8%]" />
      </div>
    </div>
  );
}

const Part = ({
  part,
  item,
  postion,
}: {
  part: string;
  item: string;
  postion: string;
}) => {
  return (
    <div className={`absolute rounded-full font-bold text-[13px] ${postion}`}>
      <p className="hidden">{part}</p>
      <p className="">{item}</p>
    </div>
  );
};
