import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovies from "@/hooks/useMovies";
import useFavorites from '@/hooks/useFavorites';
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

const Home = () => {
  const { data: movies = [] } = useMovies();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModal();

  return (
    <div>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies.data} />
        <MovieList title="My List" data={favorites.data} />
      </div>
    </div>
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
