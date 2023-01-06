import React from "react";
import classes from "./HomePage.module.css";
import analysisGraph from "../../images/analysis_graph.svg";
import copyright from "../../images/copyright.svg";
import linkedin from "../../images/linkedin.svg";
import github from "../../images/github.svg";
import { Link } from "react-router-dom";

const HomePage = (props) => {
  const description = props.loggedIn ? (
    <div className={classes.homeDescription}>
      <h2 className={classes.homeHeader}>Welcome!</h2>
      <p className={classes.homeDescriptionParagraph}>
        Thank You for interesting in my app. I hope You will have fun while
        using my app, and will have more control over bugdet. Below you can find
        manual how to use this app:
      </p>
      <p className={classes.homeDescriptionParagraph}>
        <b>Add expense: </b> You can add here your expenses. Every expense
        <b>must</b> have a name, value and category
      </p>
      <p className={classes.homeDescriptionParagraph}>
        <b>My expenses: </b> List of your expenses. If you created an expense by
        mistake you can easily delete it. Every expense is described in details
        there. There is also a possibility to filter expenses list
      </p>
      <p className={classes.homeDescriptionParagraph}>
        <b>Expenses info: </b> You can find two charst there: based on expenses
        categories(doughnut chart) and expense values chart based on given
        peroid of time. In case of doughnut chart you can specify date range you
        want to see your expenses categories.
      </p>
      <p className={classes.homeDescriptionParagraph}>
        <b>Budget plans: </b> Based on expenses data you can make some
        conclusions and plans. When "Completed Plans", or "Incompleted Plans"
        tab is selected first date is a creation date, second is date of
        completion/incompletion. Let's assume 20% of past month expenses was
        entertainment. Then You might want to make plan for next month to lower
        it to 10%. After one month you can mark it as completed, failed, or just
        delete it.
      </p>
    </div>
  ) : (
    <div className={classes.homeDescription}>
      <h2 className={classes.homeHeader}>Budget management app</h2>
      <p className={classes.homeDescriptionParagraph}>
        Welcome to budget management app. Register or log in to get access to
        resources and features of my app. You can find log in button in upper
        left corner.
      </p>
      <p className={classes.homeDescriptionParagraph}>
        Budget app will allow you to control your budget, see all expenses, see
        charts based on expense's categories, and many more features.
      </p>
      <p className={classes.homeDescriptionParagraph}>
        If you need to contact me, feel free to do it. You can use various
        methods which are listed in the footer.
      </p>
    </div>
  );
  return (
    <>
      <section className={classes.homeSection}>
        <img src={analysisGraph} alt="graph" />
        {description}
      </section>
      <footer className={classes.homeFooter}>
        <div className={classes.socialMedias}>
          <a
            href="https://www.linkedin.com/in/damian-mirek-979b0623b/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="linkedin" />
          </a>
          <a href="https://github.com/cees2" target="_blank" rel="noreferrer">
            <img src={github} alt="github" />
          </a>
        </div>
        <div className={classes.copyrightWrapper}>
          <img src={copyright} alt="copyright" />
          <p>Damian Mirek 2023</p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
