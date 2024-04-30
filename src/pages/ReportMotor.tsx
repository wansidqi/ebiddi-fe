import { useTheme } from "@/components/ThemeProvider";
import { useEffect } from "react";

export function ReportMotor() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <div className="report-layout arial text-[#2C3E50] text-[9px] overflow-auto">
      <main className="mt-14 border-b border-[#2C3E50]">
        <p className="text-[15px] font-bold">INSPECTION REPORT --</p>
        <p className="text-[11px] mt-6">VEHICLE INFORMATION</p>
      </main>

      <main className="grid grid-cols-10 gap-x-1 mt-6">
        <>
          <div className="">Panel</div>
          <Underline className="col-span-3">2</Underline>
          <div className="">Presentation</div>
          <Underline className="col-span-2">:</Underline>
          <div className="">Mode</div>
          <Underline className="col-span-2">:</Underline>
        </>
        <>
          <div className="">Branch</div>
          <Underline className="col-span-3">:</Underline>
          <div className="">Date In</div>
          <Underline className="col-span-2">:</Underline>
          <div className="">Time In</div>
          <Underline className="col-span-2">:</Underline>
        </>
        <>
          <div className="">Model</div>
          <Underline className="col-span-3">:HONDA RS150R REPSOL</Underline>
          <div className="">Mileage</div>
          <Underline className="col-span-2">:</Underline>
          <div className="">Key</div>
          <Underline className="col-span-2">: ☑ NO KEY</Underline>
        </>
        <>
          <div className="">Reg No.</div>
          <Underline className="col-span-3">:</Underline>
          <div className="">Road Tax</div>
          <Underline className="col-span-2">: ☐ 0</Underline>
          <div className="">Remote</div>
          <Underline className=" col-span-2">:☑ NO</Underline>
        </>
        <>
          <div className="">Engine No.</div>
          <Underline className="col-span-3">:</Underline>
          <div className="">Chassis No.</div>
          <Underline className="col-span-5">:</Underline>
        </>
        <>
          <div className="">RO Engine No.</div>
          <Underline className="col-span-3">:</Underline>
          <div className="">RO Chassis No.</div>
          <Underline className="col-span-5">:</Underline>
        </>
        <>
          <div className="">Transmission</div>
          <Underline className="col-span-3">:Manual with Clutch</Underline>
          <div className="">General Condition</div>
          <Underline className="col-span-5">:</Underline>
        </>
      </main>

      <br />

      <main className="flex gap-8">
        <table className="border-collapse border border-[#2C3E50] w-1/2 mt-2">
          <thead className="">
            <tr>
              <th className="border border-[#2C3E50] px-1 text-center">No</th>
              <th className="border border-[#2C3E50] px-4">Items</th>
              <th className="border border-[#2C3E50]">Condition</th>
              <th className="border border-[#2C3E50] px-4">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 26 }).map((_, index) => (
              <tr key={index}>
                <BorderGray className="border border-[#2C3E50] px-1 text-center">
                  {index + 1}
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] px-4">
                  CARBURETOR/INJECTION
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] text-[11px] text-center">
                  Fair
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] px-4"></BorderGray>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="border-collapse border border-[#2C3E50] w-1/2 mt-2">
          <thead className="">
            <tr>
              <th className="border border-[#2C3E50] px-1 text-center">No</th>
              <th className="border border-[#2C3E50] px-4">Items</th>
              <th className="border border-[#2C3E50]">Condition</th>
              <th className="border border-[#2C3E50] px-4">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 26 }).map((_, index) => (
              <tr key={index}>
                <BorderGray className="border border-[#2C3E50] px-1 text-center">
                  {index + 1}
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] px-4">
                  CARBURETOR/INJECTION
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] text-[11px] text-center">
                  Fair
                </BorderGray>
                <BorderGray className="border border-[#2C3E50] px-4"></BorderGray>
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
        <div className="border border-[#2C3E50] w-full"></div>
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
