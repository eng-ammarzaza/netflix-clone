import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";
import cls from "classnames";
import { motion } from "framer-motion";
const Card = ({
  imgURL = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80",
  size,
  id,
  shouldScale = true,
}) => {
  const [imgSrc, setImageSrc] = useState(imgURL);
  const classMap = {
    small: styles.smItem,
    medium: styles.mdItem,
    large: styles.lgItem,
  };
  const handleImgError = () => {
    setImageSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
    );
  };
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };
  return (
    <div className={styles.container}>
      {/* <div className={classMap[size]}> */}
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        // whileHover={{ ...scale }}
        {...shouldHover}
      >
        <Image
          src={imgSrc}
          alt="image"
          layout="fill"
          className={styles.cardImg}
          onError={handleImgError}
        />
        {/* </div> */}
      </motion.div>
    </div>
  );
};
export default Card;
