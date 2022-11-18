import React from "react";
import classes from "./HomePage.module.css";
import analysisGraph from "../../images/analysis_graph.svg";
import copyright from "../../images/copyright.svg";
import linkedin from "../../images/linkedin.svg";
import github from "../../images/github.svg";

const HomePage = () => {
  return (
    <>
      <section className={classes.homeSection}>
        <img src={analysisGraph} alt="graph" />
        <div className={classes.homeDescription}>
          <h2 className={classes.homeHeader}>Budget management app</h2>
          <p className={classes.homeDescriptionParagraph}>
            Welcome to budget management app. Register or log in to get access
            to resources and features of my app.
          </p>
          <p className={classes.homeDescriptionParagraph}>
            If you need to contact me, feel free to do it. You can use various
            methods which are listed in the footer.
          </p>
        </div>
      </section>
      <footer className={classes.homeFooter}>
        <div className={classes.socialMedias}>
          <img src={linkedin} alt="linkedin" />
          <img src={github} alt="github" />
        </div>
        <div className={classes.copyrightWrapper}>
          <img src={copyright} alt="copyright" />
          <p>Damian Mirek 2022</p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
