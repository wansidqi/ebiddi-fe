import { useAuctionContext } from "@/Context/store/auction-context";
import { DynamicDrawer } from "@/components";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { convertDateTime, numWithComma } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { Fragment } from "react";

export function Profile() {
  const columns = [
    "Timestamp",
    "Description",
    "Type",
    "Amount",
    "Available Balance",
    "	Deposited Account",
  ];

  const { USER } = useAuctionContext();
  const depoInfo = USER?.credits;

  const { useGetTx } = useAPIServices();
  const { data: txs } = useGetTx();

  return (
    <Container className="">
      <div className="text-center">
        <p className="text-5xl sm:text-6xl text-primary my-4">PROFILE</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-y-10 sm:mx-16">
        <main className="w-full border">
          <p className="text-center py-3 bg-primary font-bold text-black">
            Personal Information
          </p>
          <div className="m-4">
            <KeyValue title="Username" value="0112345678900" />
            <KeyValue title="Name" value="IQBAL" />
            <KeyValue title="I/C" value="012345678900" />
            <KeyValue title="Address" value="SELAMAT DATANG" />
            <KeyValue title="Postcode" value="12345" />
            <KeyValue title="City" value="" />
            <KeyValue title="Email" value="test@test.com" />
            <KeyValue title="Mobile No" value="01139849635" />
            <div className="flexcenter gap-3 my-5">
              <DynamicDrawer btnName="Update Password" title="Change Password">
                <Fragment>
                  <div className="grid items-start gap-4 sm:px-4">
                    <div className="grid gap-2">
                      <Input
                        className="sm:pr-36 sm:my-2"
                        type="password"
                        placeholder="Current Password"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        className="sm:pr-36 sm:my-2"
                        type="password"
                        placeholder="New Password"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        className="sm:pr-36 sm:my-2"
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <Button>Save changes</Button>
                  </div>
                </Fragment>
              </DynamicDrawer>

              <DynamicDrawer btnName="Update Email" title="Change Password">
                <Fragment>
                  <div className="grid items-start gap-4 sm:px-4">
                    <div className="grid gap-2">
                      <Input
                        className="sm:pr-36 sm:my-2"
                        type="password"
                        placeholder="ebiddi@email.com"
                      />
                    </div>
                    <Button>Save changes</Button>
                  </div>
                </Fragment>
              </DynamicDrawer>
            </div>
          </div>
        </main>

        <main className="w-full border">
          <p className="text-center py-3 bg-primary font-bold text-black">
            Biddi Deposit
          </p>
          <div className="flexcenter-col h-full">
            <div className="m-4">
              <p className="my-8 text-4xl text-center sm:text-6xl">
                RM 19,350.00
              </p>
              <div className="flexcenter gap-3 my-5">
                <DynamicDrawer
                  btnName="View Transactions"
                  title="Transactions"
                  description="List of transaction histories"
                >
                  <div className="overflow-y-auto max-h-[300px] sm:max-h-[500px] w-full custom-scrollbar sm:overflow-y-auto sm:overflow-x-hidden text-center">
                    <table className="min-w-full divide-y">
                      <thead className="bg-secondary">
                        <tr>
                          {columns.map((col, i) => (
                            <th
                              key={i}
                              className="px-6 py-3 left text-sm sm:text-lg font-medium uppercase tracking-wider"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y text-center text-xs sm:text-sm">
                        {txs?.map((tx, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {convertDateTime(tx.timestamp)}
                            </td>
                            <td className="text-left px-6 py-4 whitespace-nowrap">
                              {tx.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {tx.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              RM{numWithComma(tx.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              RM{numWithComma(tx.balance)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {tx.credit_account}
                            </td>
                          </tr>
                        ))}
                        {txs?.map((tx, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {convertDateTime(tx.timestamp)}
                            </td>
                            <td className="text-left px-6 py-4 whitespace-nowrap">
                              {tx.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {tx.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              RM{numWithComma(tx.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              RM{numWithComma(tx.balance)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {tx.credit_account}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </DynamicDrawer>
              </div>
            </div>
          </div>
        </main>

        <main className="w-full border sm:col-span-2">
          <p className="text-center py-3 bg-primary font-bold text-black">
            Deposit Information
          </p>
          <div className="m-4">
            <div className="text-center sm:mx-20 overflow-y-hidden sm:px-20">
              <table className="min-w-full divide-y">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-3 w-[70%] left text-sm sm:text-lg font-medium uppercase tracking-wider">
                      Auction House
                    </th>
                    <th className="px-6 py-3 left text-sm sm:text-lg font-medium uppercase tracking-wider">
                      Deposit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y text-center text-xs sm:text-sm">
                  {depoInfo?.map((item, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.auction_house.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        RM{numWithComma(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <main className="w-full border sm:col-span-2">
          <p className="text-center py-3 bg-primary font-bold text-black">
            Company Information
          </p>
          <div className="m-4">
            <div className="text-center sm:mx-20 overflow-y-hidden sm:px-20">
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
                  {USER?.companies.map((item, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.registration_no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.address}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </Container>
  );
}

function KeyValue({ title, value }: { title: string; value: string }) {
  return (
    <p>
      {title}: <span className="text-primary">{value}</span>
    </p>
  );
}
