import { Container, Paper, Typography } from "@mui/material";
import React from "react";
// import BannerImg from "../Banner/banner2.jpg";
import BannerImg from "../Banner/background.gif";
import Carousel from "./Carousel";
import Typewriter from "typewriter-effect";

const styles = {
  banner: {
    backgroundImage: `url(${BannerImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
  },
  bannerContent: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
};

const Banner = () => {
  return (
    <Paper style={styles.banner}>
      <Container maxWidth={false} style={styles.bannerContent}>
        <div className="tagline" style={styles.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
              color: "blue",
            }}
          >
            <Typewriter
              // options={{
              //   strings: ["Block Pharma"],
              //   autoStart: true,
              //   loop: true,
              // }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Block Pharma")
                  .callFunction(() => {
                    // console.log("String typed out!");
                  })
                  // .pauseFor(2500)
                  // .deleteAll()
                  // .callFunction(() => {
                  //   // console.log("All strings were deleted");
                  // })
                  .start();
              }}
            />
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            <Typewriter
              options={{
                strings: [
                  "Fight the Black Market",
                  "Detect Counterfiet Drugs",
                  "Togather towards Safer Pharma",
                ],
                autoStart: true,
                loop: true,
                cursor: "_",
              }}
            />
            {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. */}
          </Typography>
        </div>
        {/* <Carousel /> */}
      </Container>
    </Paper>
  );
};

export default Banner;
