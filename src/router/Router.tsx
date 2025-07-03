/** @jsxImportSource react **/
import { StaticRouter, BrowserRouter } from "react-router-dom";
import { Routes } from "../pages/Routes";

export default function Router(props: any) {
  const pathname = props?.url?.pathname || window.location.href

  if (typeof window === 'undefined') {
    return (
      <StaticRouter location={pathname} >
        <Routes {...props} />
      </StaticRouter>
    );
  } else {
    return (
      <BrowserRouter >
        <Routes {...props} />
      </BrowserRouter>
    );
  }
}
