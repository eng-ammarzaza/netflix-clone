import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import Head from "next/head";
import clsx from "classnames";
import NavBar from "../../components/nav/navbar";
import { getYoutubeVideoById } from "../../lib/getVideos";
import Like from "../../components/icons/like-icon";
import DisLike from "../../components/icons/dislike-icon";
import { useEffect, useState } from "react";
export async function getStaticProps(context) {
  //data to fetch from API
  const video = {
    title: "Gifted",
    publishTime: "1990-01-01",
    description:
      "Frank, a single man raising his child prodigy niece Mary, is drawn into a custody battle with his mother. From the director of 500 days of summer",
    channelTitle: "Paramount Pictures",
    viewCount: 10000,
  };
  const videoId = context.params.videoId;

  const videoArray = await getYoutubeVideoById(videoId);
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["_InqQJRqGW4", "HbPeXsdamT4", "ndl1W4ltcmg"];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;
  const router = useRouter();
  const videoId = router.query.videoId;
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);

  //bind modal to appElemet : To allow react modal to hide the content of the page while the modal is open
  Modal.setAppElement("#__next");

  const runRatingService = async (favourited) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  useEffect(() => {
    const handleLikeDislikeService = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      });
      const data = await response.json();

      if (data.length > 0) {
        const favourited = data[0].favourited;
        if (favourited === 1) {
          setToggleLike(true);
        } else if (favourited === 0) {
          setToggleDisLike(true);
        }
      }
    };
    handleLikeDislikeService();
  }, [videoId]);

  const handleToggleDislike = async () => {
    setToggleDisLike(!toggleDisLike);
    setToggleLike(toggleDisLike);

    const val = !toggleDisLike;
    const favourited = val ? 0 : 1;
    const response = await runRatingService(favourited);
  };

  const handleToggleLike = async () => {
    const val = !toggleLike;
    setToggleLike(val);
    setToggleDisLike(toggleLike);

    const favourited = val ? 1 : 0;
    const response = await runRatingService(favourited);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.container}>
        <NavBar />

        <Modal
          isOpen={true}
          contentLabel="Watch the video"
          onRequestClose={() => router.back()}
          overlayClassName={styles.overlay}
          className={styles.modal}
        >
          <iframe
            id="ytplayer"
            type="text/html"
            width="100%"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
            // src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
            className={styles.videoPlayer}
          ></iframe>
          <div className={styles.likeDislikeBtnWrapper}>
            <div className={styles.likeBtnWrapper}>
              <button onClick={handleToggleLike}>
                <div className={styles.btnWrapper}>
                  <Like selected={toggleLike} />
                </div>
              </button>
            </div>
            <button onClick={handleToggleDislike}>
              <div className={styles.btnWrapper}>
                <DisLike selected={toggleDisLike} />
              </div>
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
              <div className={styles.col1}>
                <p className={styles.publishTime}>{publishTime}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
              </div>
              <div className={styles.col2}>
                <p className={clsx(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>Cast: </span>
                  <span className={styles.channelTitle}>{channelTitle}</span>
                </p>
                <p className={clsx(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>View Count: </span>
                  <span className={styles.channelTitle}>{viewCount}</span>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Video;
