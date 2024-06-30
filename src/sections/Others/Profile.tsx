import { useStoreContext } from "@/Context";
import { DynamicDrawer } from "@/components";
import { Container } from "@/components/Container";
import { Input } from "@/components/ui/input";
import { ROLE } from "@/enum";
import { convertDateTime, numWithComma } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LiveDialog, Receipt } from "..";


export function Profile() {
  const columns = [
    "Timestamp",
    "Description",
    "Type",
    "Amount",
    "Available Balance",
    "	Deposited Account",
  ];

  const { USER } = useStoreContext();
  const depoInfo = USER?.credits;

  const navigate = useNavigate();

  const { useGetTx, useChangeEmail } = useAPIServices();
  const { data: txs } = useGetTx();

  const { mutateAsync: changeEmail } = useChangeEmail();

  const onChangeEmail = () => {
    changeEmail({ email: emailInput, id: USER?.id.toString() as string });
  };

  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    if (USER && USER?.email) setEmailInput(USER?.email);
  }, []);

  useEffect(() => {
    if (!USER) navigate("/");
  }, []);

  return (
    <Container className="">
      <LiveDialog />
      <div className="relative flexcenter w-full"></div>
      <div className="text-center">
        <p className="text-5xl sm:text-6xl text-primary my-4">PROFILE</p>
      </div>
      <div
        className={`${USER?.role === ROLE.BIDDER ? "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-y-10" : "flexcenter"} sm:mx-16`}
      >
        <main
          className={
            USER?.role === ROLE.BIDDER
              ? "w-full border"
              : "w-1/2 border col-span-2"
          }
        >
          <p className="text-center py-3 bg-primary font-bold text-black">
            Personal Information
          </p>
          <div className="m-4 sm:mx-10 my-5">
            <KeyValue title="Username" value={USER?.nric ?? ""} />
            <KeyValue title="Name" value={USER?.name ?? ""} />
            <KeyValue title="I/C" value={USER?.nric ?? ""} />
            <KeyValue title="Address" value={USER?.address ?? ""} />
            <KeyValue title="Postcode" value={USER?.postal_code ?? ""} />
            <KeyValue title="City" value="" />
            <KeyValue title="Email" value={USER?.email ?? ""} />
            <KeyValue title="Mobile No" value={USER?.mobile_no ?? ""} />

            <div className="flexcenter gap-3 my-5">
              <DynamicDrawer
                btnName="Update Password"
                title="Change Password"
                footerBtnTitle="Save Changes"
                footerButtonCallback={() => {}}
              >
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
                  </div>
                </Fragment>
              </DynamicDrawer>

              <DynamicDrawer
                btnName="Update Email"
                title="Change Email"
                footerBtnTitle="Save changes"
                footerButtonCallback={onChangeEmail}
              >
                <Fragment>
                  <div className="grid items-start gap-4 sm:px-4">
                    <div className="grid gap-2">
                      <Input
                        onChange={(e) => setEmailInput(e.target.value)}
                        value={emailInput}
                        className="sm:pr-36 sm:my-2"
                        type="email"
                        placeholder={USER?.email}
                      />
                    </div>
                  </div>
                </Fragment>
              </DynamicDrawer>
            </div>
          </div>
        </main>

        {USER?.role === ROLE.BIDDER && (
          <Fragment>
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
                      footerBtnTitle="Close"
                      footerButtonCallback={() => {}}
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
                          </tbody>
                        </table>
                      </div>
                    </DynamicDrawer>
                  </div>
                </div>
              </div>
            </main>

            <Receipt />

            <main className="w-full border sm:col-span-3">
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

            <main className="w-full border sm:col-span-3">
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
                      {USER?.companies?.map((item, i) => (
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
          </Fragment>
        )}
      </div>
    </Container>
  );
}

function KeyValue({ title, value }: { title: string; value: string }) {
  return (
    <p className="flex gap-x-2">
      <p className="w-20">{title}</p>
      <span> : </span>
      <span className="text-primary">{value}</span>
    </p>
  );
}
