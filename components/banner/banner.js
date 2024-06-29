import Image from "next/image";
import styles from "./banner.module.css";
import { useRouter } from "next/router";
const Banner = ({ title, subTitle, imageURL, videoID }) => {
  const router = useRouter();
  const handleOnPlay = () => {
    router.push(`/video/${videoID}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h4 className={styles.subTitle}>{subTitle}</h4>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src="/play_arrow_24dp.svg"
                alt="play"
                width={32}
                height={32}
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imageURL})`,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};
export default Banner;
