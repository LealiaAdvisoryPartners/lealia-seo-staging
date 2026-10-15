import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pushPageContext } from "@/lib/tracking/datalayer";

/** Em cada mudança de página envia ao dataLayer o caminho sem identificadores. */
const PageContextTracker = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    pushPageContext(pathname);
  }, [pathname]);
  return null;
};

export default PageContextTracker;
