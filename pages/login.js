import Head from "next/head";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  //Routing delay with login
  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    console.log("event", e);
    const email = e.target.value;
    setEmail(email);
  };
  async function handleLogin(e) {
    e.preventDefault;
    setIsLoading(true);
    if (email === "ammarzazan00@gmail.com") {
      try {
        const didToken = await magic.auth.loginWithMagicLink({
          email,
        });
        if (didToken) {
          // router.push("/");
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });

          const loggedInResponse = await response.json();
          if (loggedInResponse.done) {
            router.push("/");
          } else {
            setIsLoading(false);
            setUserMsg("Something went wrong logging in");
          }
        }
      } catch (error) {
        // Handle errors if required!
        console.error("Something went wrong logging in", error);
        setIsLoading(false);
      }
      // router.push("/");
    } else {
      setIsLoading(false);
      setUserMsg("Enter a valid email address");
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix: SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Image
            src={"/static/netflix.svg"}
            alt="netflix icon"
            width={128}
            height={34}
            className={styles.logoWrapper}
          />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1>Sign In</h1>
          <div>
            <input
              type="text"
              placeholder="Enter Email Address"
              className={styles.emailInput}
              onChange={handleOnChangeEmail}
            />
            <p className={styles.userMsg}>{userMsg}</p>
          </div>
          <button onClick={handleLogin} className={styles.loginBtn}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          <div>
            <p className={styles.protectedMsg}>
              This page is protected by Google reCAPTCHA
              <br /> to ensure you are not a bot.
            </p>
            <p className={styles.learnmore}>Learn more.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
