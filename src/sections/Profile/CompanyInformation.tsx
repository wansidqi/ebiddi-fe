import { Pagination } from "@/components";
import { useStoreContext } from "@/Context";

export const CompanyInformation = () => {
  const { USER } = useStoreContext();
  const companies = USER?.companies;
  const { PaginationUI, currData } = Pagination(companies);

  return (
    <main className="w-full">
      <div className="m-4">
        <div className="text-center overflow-y-hidden sm:mx-10">
          <table className="min-w-full divide-y">
            <thead className="bg-secondary">
              <tr className="text-[11px]">
                <th className="px-6 py-3 left text-xs sm:text-lg font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 left text-xs sm:text-lg font-medium uppercase tracking-wider">
                  Registration No.
                </th>
                <th className="px-6 py-3 left text-xs sm:text-lg font-medium uppercase tracking-wider">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y text-center text-xs sm:text-sm">
              {currData?.map((item, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.company_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.company_reg_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.company_address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {PaginationUI}
    </main>
  );
};
