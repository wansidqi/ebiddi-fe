import { useStoreContext } from "@/Context";
import { LoadingPage } from "@/components";
import { getToken, TOKEN } from "@/datasource/sessionStorage.datasource";
import { ROLE } from "@/enum";
import { Outlet, Navigate } from "react-router-dom";

export function RequireNoAuth() {
  const { USER, dev } = useStoreContext();
  if (USER === undefined) return <LoadingPage />;

  if (dev) {
    return <Outlet />;
  } else {
    return !USER ? <Outlet /> : <Navigate to="/events" />;
  }
}

export function RequireBidderAuth() {
  const { USER, dev } = useStoreContext();
  if (USER === undefined) return <LoadingPage />;

  if (dev) {
    return <Outlet />;
  } else {
    return USER?.role === ROLE.BIDDER ? <Outlet /> : <Navigate to="/login" />;
  }
}

export function RequireAuctioneerAuth() {
  const { USER, dev } = useStoreContext();
  if (USER === undefined) return <LoadingPage />;

  if (dev) {
    return <Outlet />;
  } else {
    return USER?.role === ROLE.AUCTIONEER ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  }
}

export function RequireVerificationToken() {
  const { dev } = useStoreContext();
  const token = getToken(TOKEN.auth);
  if (token === undefined) return <LoadingPage />;

  if (dev) {
    return <Outlet />;
  } else {
    return token ? <Outlet /> : <Navigate to="/login" />;
  }
}
