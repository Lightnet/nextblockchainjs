import { useSession } from "next-auth/react";
import Sign from "../components/system/sign";
//import Link from 'next/link';
import AuthAccess from "../components/system/authaccess";
import AccountSection from "../components/account/accountsection";
import BlockQuery from "../components/block/blockquery";

export default function Page() {
  const { data: session } = useSession()

  //check var change status.
  //useEffect(async () => {
    //console.log("status:",status);
  //},[status]);

  // index page
  return (<>
    <AuthAccess>
      <Sign></Sign>
      <label> Signed in as {session?.user.name} </label>

      <BlockQuery></BlockQuery>

      <div style={{height:'100%'}}>
        <AccountSection></AccountSection>
      </div>
      
    </AuthAccess>
  </>)
}
/*

*/