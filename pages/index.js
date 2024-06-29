import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/section-cards/section-cards";
import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
} from "../lib/getVideos";
import { redirectUser } from "../utils/redirectUser";
const inter = Inter({ subsets: ["latin"] });
export async function getServerSideProps(context) {
  const disneyVideos = await getVideos("disney trailer");
  const prodVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();
  const { userId, token } = await redirectUser(context);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  console.log({ watchItAgainVideos });

  return {
    props: {
      disneyVideos,
      prodVideos,
      travelVideos,
      popularVideos,
      watchItAgainVideos,
    },
  };
}
export default function Home({
  disneyVideos,
  prodVideos,
  travelVideos,
  popularVideos,
  watchItAgainVideos,
}) {
  // startFetchMyQuery();
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar username="Mayaluis@gmail.com" />
      <Banner
        videoID="ndl1W4ltcmg"
        title="THE WITCHER"
        subTitle="Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts."
        imageURL="/witcher.jpg"
      />

      <div className={styles.sectionWrapper}>
        <SectionCards title={"Disney"} size={"large"} videos={disneyVideos} />
        <SectionCards title={"Travel"} size={"small"} videos={travelVideos} />
        <SectionCards
          title={"Productivity"}
          size={"medium"}
          videos={prodVideos}
        />
        <SectionCards title={"Popular"} size={"small"} videos={popularVideos} />
        <SectionCards
          title="Watch it again"
          videos={watchItAgainVideos}
          size="small"
        />
      </div>
    </div>
  );
}
