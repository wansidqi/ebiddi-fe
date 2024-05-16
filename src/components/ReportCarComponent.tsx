export const SingleColInFlex = ({
  value,
  valStyle,
}: {
  value: string[];
  valStyle?: string;
}) => {
  return (
    <div className="flex w-full">
      <p className="w-[26%] flex justify-between">
        {value[0]} <span>:</span>
      </p>
      <p
        className={`ml-2 w-[74%] border-b border-[#2C3E50] font-bold ${valStyle}`}
      >
        {value[1]}
      </p>
    </div>
  );
};

export const DoubleColInFlex = ({
  value1,
  value2,
}: {
  value1: string[];
  value2: string[];
}) => {
  return (
    <div className="flex w-full">
      <p className="w-[25.5%] flex justify-between">
        {value1[0]} <span>:</span>
      </p>
      <div className="w-[74.5%] flex">
        <p className={`w-2/4 border-b border-[#2C3E50] font-bold ml-2`}>
          {value1[1]}
        </p>
        <div className="flex w-full">
          <p className="w-auto pl-2">
            {value2[0]} <span>:</span>
          </p>
          <p className="w-[60%] border-b border-[#2C3E50] font-bold ml-2">
            {value2[1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export const SingleColStandalone = ({ value }: { value: string[] }) => {
  return (
    <div className="flex items-center w-full mt-1">
      <div className="w-[12%] flex justify-between">
        {value[0]} <span>:</span>
      </div>
      <div
        className={`ml-2 ${value[1].length < 1 ? "mt-3" : ""} w-[82%] font-bold border-b border-[#2C3E50]`}
      >
        {value[1]}
      </div>
    </div>
  );
};

export const Cols3AllUnderline = ({
  title,
  value1,
  value2,
  value3,
}: {
  title: string;
  value1: string;
  value2: string;
  value3: string;
}) => {
  return (
    <div className="flex w-full mt-1">
      <div className="w-[13.5%] flex justify-between">
        {title} <span>:</span>
      </div>
      <div className="w-full">
        <div className={`ml-2 w-[93.5%] font-bold flex gap-x-3`}>
          <div className="border-b border-[#2C3E50] w-1/3">{value1}</div>
          <div className="border-b border-[#2C3E50] w-1/3">{value2}</div>
          <div className="border-b border-[#2C3E50] w-1/3">{value3}</div>
        </div>
      </div>
    </div>
  );
};

export const Cols2Side = ({
  title,
  value1,
  value2,
}: {
  title: string;
  value1: string[];
  value2: string[];
}) => {
  return (
    <div className="flex w-full">
      <div className="w-[34%] flex justify-between">
        {title} <span>:</span>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-1/2 flex pl-2">
          <p>{value1[0]}</p>
          <p className="ml-1 border-b w-full font-bold border-[#2C3E50]">
            {value1[1]}
          </p>
        </div>
        <div className="w-1/2 flex ">
          <p>{value2[0]}</p>
          <p className="ml-1 border-b w-full font-bold border-[#2C3E50]">
            {value2[1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Cols3ValueUnderine = ({
  value1,
  value2,
  value3,
}: {
  value1: string[];
  value2: string[];
  value3: string[];
}) => {
  return (
    <>
      <section className="flex gap-1 w-full flex-col">
        <div className="flex w-full">
          <p className="w-[44%] flex justify-between">
            {value1[0]} <span>:</span>
          </p>
          <p className="ml-2 w-2/3 border-b border-[#2C3E50] font-bold">
            {value1[1]}
          </p>
        </div>
      </section>
      <section className="flex w-full flex-col gap-1">
        <div className="flex w-full">
          <p className="flex justify-between">
            {value2[0]} <span>:</span>
          </p>
          <p className="ml-2 w-full border-b border-[#2C3E50] font-bold">
            {value2[1]}
          </p>
        </div>
      </section>
      <section className="flex w-full flex-col gap-1">
        <div className="flex w-full">
          <p className="flex justify-between">
            {value3[0]} <span>:</span>
          </p>
          <p className="ml-2 w-full border-b border-[#2C3E50] font-bold">
            {value3[1]}
          </p>
        </div>
      </section>
    </>
  );
};

export const Cols4Value = ({
  title,
  value1,
  value2,
  value3,
  value4,
}: {
  title: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
}) => {
  return (
    <div className="flex w-full mt-1">
      <div className="w-[13.5%] flex justify-between">
        {title} <span>:</span>
      </div>
      <div className="w-full">
        <div className={`ml-2 w-[93.5%] font-bold flex gap-x-3`}>
          <div className="border-b border-[#2C3E50] w-1/4">{value1}</div>
          <div className="border-b border-[#2C3E50] w-1/4">{value2}</div>
          <div className="border-b border-[#2C3E50] w-1/4">{value3}</div>
          <div className="border-b border-[#2C3E50] w-1/4">{value4}</div>
        </div>
      </div>
    </div>
  );
};

export const Cols6Value = ({
  title,
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
}: {
  title: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  value6: string;
}) => {
  return (
    <div className="flex w-full mt-1">
      <div className="w-[13.5%] flex justify-between">
        {title} <span>:</span>
      </div>
      <div className="w-full">
        <div className={`ml-2 w-[93.5%] font-bold flex gap-x-3`}>
          <div className="border-b border-[#2C3E50] w-1/4">{value1}</div>
          <div className="border-b border-[#2C3E50] w-1/4">{value2}</div>
          <div className="border-b border-[#2C3E50] w-1/4">{value3}</div>
          <div className="border-b border-[#2C3E50] w-1/4">{value4}</div>
        </div>
        <div className={`ml-2 w-[93.5%] font-bold flex gap-x-3`}>
          <div className="border-b border-[#2C3E50] w-1/4">{value5}</div>
          <div className="border-b border-[#2C3E50] w-1/4">{value6}</div>
          <div className="w-1/4"></div>
          <div className="w-1/4"></div>
        </div>
      </div>
    </div>
  );
};
