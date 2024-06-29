import Card from "../card/card";
import styles from "./section-cards.module.css";
import getVideos from "../../lib/getVideos";
import Link from "next/link";
import clsx from "classnames";
const SectionCards = ({
  title,
  size,
  videos = [],
  shouldWrap = false,
  shouldScale,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.cardWrapper}>
        <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
          {videos.map((video, idx) => (
            <Link key={idx} href={`/video/${video.id}`}>
              {/* <Card id={idx} imgURL={video.imgURL} size={size} key={idx} /> */}
              <Card
                id={idx}
                imgURL={video.imgURL}
                size={size}
                shouldScale={shouldScale}
              />
            </Link>
            // <Link key={idx} href={`/video/${video.id}`}>
            //   <a>
            //     <Card id={idx} imgURL={video.imgURL} size={size} key={idx} />
            //   </a>
            // </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default SectionCards;
