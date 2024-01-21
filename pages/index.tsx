import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

const Home = () => {
  const { data } = useCurrentUser();
  const user = data?.currentUser;

  return (
    <>
      <h1 className="text-green-500 text-3xl">netfilx clone</h1>
      <p className="text-white">login as {user?.name}</p>
      <p className="text-white">login as {user?.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Log Out
      </button>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
