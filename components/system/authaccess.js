/*
# License: MIT
# Created By: Lightnet
*/

import { useSession } from "next-auth/react";
import Sign from "./sign";

export default function AuthAccess({children}) {
  const { status } = useSession();

  // session check while loading
  if (status === "loading") {
    return(<>
      <div>Loading...</div>
    </>)
  }

  if (status === "authenticated") {
    return(<>
      {children}
    </>)
  }

  return (<>
    <Sign></Sign>
  </>)
}