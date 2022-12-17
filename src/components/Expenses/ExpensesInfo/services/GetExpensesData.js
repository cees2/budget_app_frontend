export const ARCH_COLORS = [
  "#f2ac29",
  "#b0e000",
  "#43ff2e",
  "#02ede1",
  "#026ced",
  "#8302ed",
  "#22e071",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const DAYOFWEEK = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

export const getExpensesCategoriesPercentage = (expenses) => {
  const totalSumOfExpenses = getTotalSumOfExpenses(expenses);

  const categoriesPercentage = {};

  expenses.forEach((expense) => {
    // do poprawy ??
    if (categoriesPercentage[expense.category]) {
      categoriesPercentage[expense.category] +=
        Math.trunc((expense.value / totalSumOfExpenses) * 10000) / 100;
    } else
      categoriesPercentage[expense.category] =
        Math.trunc((expense.value / totalSumOfExpenses) * 10000) / 100;
  });

  return categoriesPercentage;
};

export const getTotalSumOfExpenses = (expenses) => {
  return expenses.reduce((acc, curVal) => (acc += curVal.value), 0);
};

export const getExpenseDataOnPeroidOfTime = (
  expenses,
  peroid,
) => {
  const data = {};
  switch (peroid) {
    case "Yearly":
      expenses.forEach((expense) => {
        const year = new Date(expense.dateCreated).getFullYear();
        if (!data[year]) data[year] = expense.value;
        else data[year] += expense.value;
      });
      break;
    case "Monthly":
      MONTHS.forEach((month) => {
        data[month] = 0;
      });
      expenses.forEach((expense) => {
        const month = new Date(expense.dateCreated).getMonth();
        if (!data[MONTHS[month]]) data[MONTHS[month]] = expense.value;
        else data[MONTHS[month]] += expense.value;
      });
      break;
    // case "Weekly":
    //   DAYOFWEEK.forEach((day) => (data[day] = []));
    //   const currentDate = new Date();
    //   let currentDay = currentDate.getDay() - 1;
    //   if (currentDay < 0) currentDay = 6;
    //   const hours = currentDate.getHours();
    //   const minutes = currentDate.getMinutes();
    //   const seconds = currentDate.getSeconds();
    //   const msSinceMidnight = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
    //   const dateOfWeekBeginning =
    //     currentDate.getTime() -
    //     (24 * 60 * 60 * 1000 * currentDay +
    //       msSinceMidnight +
    //       specificWeek * 1000 * 60 * 60 * 24 * 7);
    //   let dateOfWeekEnd;
    //   if (specificWeek === 0) dateOfWeekEnd = currentDate.getTime();
    //   else dateOfWeekEnd = dateOfWeekBeginning + 1000 * 60 * 60 * 24 * 7;

    //   expenses.forEach((expense) => {
    //     const dateObj = new Date(expense.dateCreated);
    //     if (
    //       dateObj.getTime() >= dateOfWeekBeginning &&
    //       dateObj.getTime() <= dateOfWeekEnd
    //     ) {
    //       data[DAYOFWEEK[currentDay]].push(expense);
    //     }
    //   });
    //   break;
    default:
      return expenses;
  }
  return data;
};

export const getTypeOfPeroidOfTime = (peroid) => {
  if (peroid === "Yearly") return "year";
  else return "month";
  // else if (peroid === "Weekly") return "week";
};

export const expensesChartDataReducer = (state, action) => {
  switch(action.type){
    case "setExpensesData":
      return {...state, action.payload}
      break;
    default:
      return state;
  }
}