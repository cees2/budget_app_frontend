import React, { useEffect, useState, useReducer } from "react";
import classes from "./ExpensesDetails.module.css";
import { useDispatch } from "react-redux";
import { expensesActions } from "../../../store/ExpensesSlice";
import useExpenseCrud from "../../../hooks/use-expense-crud";
import { Doughnut, Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  getExpensesCategoriesPercentage,
  getTotalSumOfExpenses,
  ARCH_COLORS,
  getExpenseDataOnPeroidOfTime,
  getTypeOfPeroidOfTime,
  expensesChartDataReducer
} from "./services/GetExpensesData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Selectable from "../../UI/Selectable";
import lessThan from "../../../images/less_than.svg";
import greaterThan from "../../../images/greater_than.svg";

const ExpensesDetails = () => {
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // const [expensesChartData, setExpensesChartData] = useState({});
  // const [selectedTypeOfPeroid, setSelectedTypeOfPeroid] = useState("year");
  // const [dateInformation, setDateInformation] = useState();
  const [expensesChartData, expensesDataDispatch] = useReducer(expensesChartDataReducer, {
    data: {},
    selectedTypeOfPeroid: "year",
    dateInformation: "",
  });
  const dispatch = useDispatch();
  const { getExpenses } = useExpenseCrud();
  const expensesTotalValue = getTotalSumOfExpenses(expenses);
  const categoriesPercentage = getExpensesCategoriesPercentage(expenses);

  ChartJS.register(...registerables);

  useEffect(() => {
    if (!expenses.length) {
      getExpenses().then((data) => {
        dispatch(expensesActions.setExpenses(data.data.expenses.reverse()));
        setExpenses(data.data.expenses);
        expensesDataDispatch({type: "setExpensesData", payload: getExpenseDataOnPeroidOfTime(data.data.expenses, "Yearly")})
      });
    }
  }, [expenses]);

  useEffect(() => {
    if (startDate >= endDate) setEndDate(startDate);
  }, [startDate, endDate]);

  const submitDateHandler = () => {};

  const doughnutData = {
    labels: Object.keys(categoriesPercentage),
    datasets: [{ data: Object.values(categoriesPercentage), borderWidth: 3 }],
    backgroundColor: ARCH_COLORS,
  };

  const doughnutOptions = {
    color: "white",
  };

  const chartData = {
    labels: Object.keys(expensesChartData),
    datasets: [
      {
        label: "Expenses value",
        data: Object.values(expensesChartData).map((peroidOfTime) => {
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
    setExpensesChartData(
      getExpenseDataOnPeroidOfTime(
        expenses,
        selectedPeroidOfTimeType,
      )
    );
    setSelectedTypeOfPeroid(getTypeOfPeroidOfTime(selectedPeroidOfTimeType));
    setDateInformation();
  };

  const changePeroidOfTimeTypeHandler = () => {};

  // const selectCaption = `Select ${peroidOfTimeRef.current?.value}`;

  // console.log(selectCaption);

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
          <button type="submit" onClick={submitDateHandler}>
            Submit
          </button>
        </section>
        <section className={classes.expensesOptionsWrapper}>
          <h4>Select peroid of time</h4>
          <Selectable
            options={["Yearly", "Monthly", "Daily"]}
            onSelectChange={changePeroidOfTimeHandler}
          />
          {selectedTypeOfPeroid && (
            <>
              <h4>Select {selectedTypeOfPeroid}</h4>
              <div className={classes.peroidOfTimeNavigationWrapper}>
                <img src={lessThan} alt="Previous" />
                <h5>{dateInformation}</h5>
                <img src={greaterThan} alt="Next" />
              </div>
            </>
          )}
        </section>
      </header>
      <div className={classes.mainContentWrapper}>
        <section className={classes.categoryPercentageWrapper}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <p>
            Total value of expenses: <span>{expensesTotalValue}</span>
          </p>
        </section>
        <section className={classes.expensesValueOnDate}>
          <Chart
            type="bar"
            data={chartData}
            className={classes.expensesValuesChart}
          />
        </section>
      </div>
    </>
  );
};

export default ExpensesDetails;
