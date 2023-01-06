import React, { useEffect, useState, useReducer } from "react";
import classes from "./ExpensesDetails.module.css";
import { useDispatch } from "react-redux";
import { expensesActions } from "../../../store/ExpensesSlice";
import useExpenseCrud from "../../../hooks/use-expense-crud";
import { Doughnut, Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  ARCH_COLORS,
  getExpenseDataOnPeroidOfTime,
  getTypeOfPeroidOfTime,
  expensesChartDataReducer,
} from "./services/chartData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Selectable from "../../UI/Selectable";
import lessThan from "../../../images/less_than.svg";
import greaterThan from "../../../images/greater_than.svg";
import { MONTHS } from "./services/chartData";
import {
  getCategoriesDataOnPeroid,
  getExpensesCategoriesPercentage,
  getTotalSumOfExpenses,
} from "./services/doughnutData";

const ExpensesDetails = () => {
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expensesChartData, expensesDataDispatch] = useReducer(
    expensesChartDataReducer,
    {
      data: {},
      selectedTypeOfPeroid: "",
      dateInformation: "",
      typeOfDateCoutner: 0,
    }
  );
  const [categoriesPercentage, setCategoriesPercentage] = useState(
    getExpensesCategoriesPercentage(expenses)
  );
  const [dateRandeError, setDateRangeError] = useState(false);
  const dispatch = useDispatch();
  const { getExpenses } = useExpenseCrud();
  const expensesTotalValue = getTotalSumOfExpenses(expenses);

  ChartJS.register(...registerables);

  console.log(categoriesPercentage);

  useEffect(() => {
    if (!expenses.length) {
      getExpenses().then((data) => {
        dispatch(expensesActions.setExpenses(data.data.expenses.reverse()));
        setExpenses(data.data.expenses);
        expensesDataDispatch({
          type: "setExpensesData",
          payload: getExpenseDataOnPeroidOfTime(data.data.expenses, ""),
        });
      });
    }
  }, [expenses]);

  useEffect(() => {
    if (startDate >= endDate) setEndDate(startDate);
  }, [startDate, endDate]);

  useEffect(() => {
    setCategoriesPercentage(getExpensesCategoriesPercentage(expenses));
  }, [expenses]);

  const submitDateHandler = () => {
    if (dateRandeError) setDateRangeError((prevState) => !prevState);
    if (startDate === null || endDate === null) {
      setDateRangeError(true);
      return;
    }
    const categories = getCategoriesDataOnPeroid(expenses, startDate, endDate);

    if (!categories) {
      setDateRangeError("No expenses on given peroid of time");
    } else setCategoriesPercentage(categories);
  };

  let doughnutData;

  if (!categoriesPercentage) {
    doughnutData = {};
  } else
    doughnutData = {
      labels: Object.keys(categoriesPercentage),
      datasets: [{ data: Object.values(categoriesPercentage), borderWidth: 3 }],
      // backgroundColor: ARCH_COLORS,
    };

  const doughnutOptions = {
    color: "white",
  };

  const chartData = {
    labels: Object.keys(expensesChartData?.data),
    datasets: [
      {
        label: "Expenses value",
        data: Object.values(expensesChartData.data).map((peroidOfTime) => {
          if (Array.isArray(peroidOfTime))
            return peroidOfTime.reduce(
              (acc, expense) => (acc += expense.value),
              0
            );
          return peroidOfTime;
        }),
      },
    ],
  };

  const changePeroidOfTimeHandler = (selectedPeroidOfTimeType) => {
    expensesDataDispatch({
      type: "setTypeOfPeroid",
      payload: {
        caption: getTypeOfPeroidOfTime(selectedPeroidOfTimeType),
        type: selectedPeroidOfTimeType,
      },
    });
    if (selectedPeroidOfTimeType === "Daily") {
      expensesDataDispatch({
        type: "setExpensesData",
        payload: getExpenseDataOnPeroidOfTime(
          expenses,
          getTypeOfPeroidOfTime(selectedPeroidOfTimeType),
          `${MONTHS[new Date().getMonth()].name} ${new Date().getFullYear()}`
        ),
      });
    } else
      expensesDataDispatch({
        type: "setExpensesData",
        payload: getExpenseDataOnPeroidOfTime(
          expenses,
          getTypeOfPeroidOfTime(selectedPeroidOfTimeType)
        ),
      });
  };

  const previousPeroid = () => {
    expensesDataDispatch({
      type: "decrementTypeOfCoutner",
      payload: {
        expenses,
      },
    });
  };

  const nextPeroid = () => {
    expensesDataDispatch({
      type: "incrementTypeOfCoutner",
      payload: {
        expenses,
      },
    });
  };

  return (
    <>
      <header className={classes.expInfoHeader}>
        <section className={classes.dateWrapper}>
          <div className={classes.singleDateInput}>
            <h4 className={classes.headersCaption}>Select start date</h4>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              wrapperClassName={classes.dateInput}
            />
          </div>
          <div className={classes.singleDateInput}>
            <h4 className={classes.headersCaption}>Select end date</h4>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              wrapperClassName={classes.dateInput}
            />
          </div>
          <button
            type="submit"
            onClick={submitDateHandler}
            className={classes.submitDateRange}
          >
            Submit
          </button>
          {dateRandeError && (
            <h5 style={{ color: "red" }}>Choose proper date ranges.</h5>
          )}
        </section>
        <section className={classes.expensesOptionsWrapper}>
          <h4>Select peroid of time</h4>
          <Selectable
            options={["Yearly", "Monthly", "Daily"]}
            onSelectChange={changePeroidOfTimeHandler}
            customClass={classes.peroidOfTimeSelectable}
          />
          {expensesChartData.selectedTypeOfPeroid && (
            <>
              <h4 className={classes.selectPeroidOfTime}>
                Select {expensesChartData.selectedTypeOfPeroid}
              </h4>
              <div className={classes.peroidOfTimeNavigationWrapper}>
                <div className={classes.arrow} onClick={previousPeroid}>
                  <img src={lessThan} alt="Previous" />
                </div>
                <h5>{expensesChartData.dateInformation}</h5>
                <div className={classes.arrow} onClick={nextPeroid}>
                  <img src={greaterThan} alt="Next" />
                </div>
              </div>
            </>
          )}
        </section>
      </header>
      <div className={classes.mainContentWrapper}>
        <section className={classes.categoryPercentageWrapper}>
          {!dateRandeError &&
            Object.keys(categoriesPercentage).length !== 0 && (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            )}
        </section>
        <section className={classes.expensesValueOnDate}>
          <Chart
            type="bar"
            data={chartData}
            className={classes.expensesValuesChart}
          />
        </section>
      </div>
      <p className={classes.expensesInTotal}>
        Total value of expenses:{" "}
        <span>{Math.trunc(expensesTotalValue * 100) / 100} zł</span>
      </p>
    </>
  );
};

export default ExpensesDetails;
