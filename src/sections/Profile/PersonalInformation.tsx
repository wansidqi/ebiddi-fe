import { DynamicDrawer } from "@/components";
import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";
import { ComponentType, Fragment, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  FileLock2,
  FolderPen,
  IdCard,
  LucideProps,
  Mail,
  MapPinHouse,
  Milestone,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const PersonalInformation = () => {
  const { USER } = useStoreContext();
  const { useChangeEmail } = useAPIServices();

  const { mutateAsync: changeEmail } = useChangeEmail();

  const [emailInput, setEmailInput] = useState("");

  const onChangeEmail = () => {
    changeEmail({ email: emailInput, id: USER?.id.toString() as string });
  };

  return (
    <div className="my-10 mx-0 lg:mx-5 lg:my-0">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
        <Cards
          Icon={IdCard}
          title="Username / IC"
          value={USER?.nric ?? "n/a"}
        />
        <Cards Icon={FolderPen} title="Name" value={USER?.name ?? "n/a"} />
        <Cards
          Icon={MapPinHouse}
          title="Address"
          value={USER?.address ?? "n/a"}
        />
        <Cards
          Icon={Milestone}
          title="Postcode"
          value={USER?.postal_code ?? "n/a"}
        />
        <Cards Icon={MapPinHouse} title="City" value="n/a" />

        <Cards
          Icon={Phone}
          title="Mobile No"
          value={USER?.mobile_no ?? "n/a"}
        />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7 mt-7">
        <Cards
          Icon={Mail}
          title="Email"
          value={USER?.email ?? "n/a"}
          Footer={
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
          }
        />

        <Cards
          Icon={FileLock2}
          title="Password"
          value={"************"}
          Footer={
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
          }
        />
      </div>
    </div>
  );
};

function Cards({
  title,
  value,
  Icon,
  Footer,
  className,
}: {
  title: string;
  value: string;
  Icon: ComponentType<LucideProps>;
  Footer?: JSX.Element;
  className?: string;
}) {
  return (
    <Card className={cn("w-[250px] xl:w-[350px]", className)}>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="">{title}</div>
          <Icon className="text-primary h-5 w-5" />
        </CardTitle>
        <CardDescription>{value}</CardDescription>
      </CardHeader>
      {Footer && <CardFooter className="flex justify-end">{Footer}</CardFooter>}
    </Card>
  );
}
