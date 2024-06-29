import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../../lib/magic-client";
const NavBar = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState();
  const [username, setUsername] = useState("");
  const [didToken, setDidToken] = useState("");
  useEffect(() => {
    async function getUsername() {
      try {
        // const { email } = await magic.user.getMetadata();
        const { email, issuer } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();
        // console.log({ didToken });
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    }
    getUsername();
  }, []);
  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };
  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      // await magic.user.logout();
      // console.log(await magic.user.isLoggedIn());
      // router.push("/login");
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/" legacyBehavior>
          <a>
            <div className={styles.logoWrapper}>
              <Image
                src="/netflix.svg"
                alt="Netflix logo"
                width={128}
                height={34}
              />
            </div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <p className={styles.username}>{username} </p>
              <Image
                src={"/moreicon.svg"}
                alt="netflix icon"
                width={24}
                height={24}
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignout}>
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
export default NavBar;
