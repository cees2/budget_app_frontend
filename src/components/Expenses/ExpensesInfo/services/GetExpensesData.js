export const ARCH_COLORS = [
  "#f2ac29",
  "#b0e000",
  "#43ff2e",
  "#02ede1",
  "#026ced",
  "#8302ed",
  "#22e071",
];

export const MONTHS = [
  { name: "January", days: 31 },
  { name: "February", days: 28 }, // do poprawy !!!!
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 },
];

export const getExpensesCategoriesPercentage = (expenses) => {
  const totalSumOfExpenses = getTotalSumOfExpenses(expenses);

  const categoriesPercentage = {};

  expenses.forEach((expense) => {
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
  targetDate = new Date(Date.now()).getFullYear()
) => {
  const data = {};
  switch (peroid) {
    //YEARLY
    case "":
      expenses.forEach((expense) => {
        const year = new Date(expense.dateCreated).getFullYear();
        if (!data[year]) data[year] = expense.value;
        else data[year] += expense.value;
      });
      break;
    //MONTHLY
    case "year":
      MONTHS.forEach((month) => {
        data[month.name] = 0;
      });
      expenses.forEach((expense) => {
        const year = new Date(expense.dateCreated).getFullYear();
        if (year === +targetDate) {
          const month = new Date(expense.dateCreated).getMonth();
          if (!data[MONTHS[month].name])
            data[MONTHS[month].name] = expense.value;
          else data[MONTHS[month].name] += expense.value;
        }
      });
      break;
    case "month":
      const dateMonthStart = new Date(targetDate).getTime();
      let indexOfMonth = -1;
      MONTHS.forEach((month, i) => {
        if (month.name === String(targetDate).split(" ")[0]) indexOfMonth = i;
      });
      const dateMonthEnd =
        new Date(targetDate).getTime() +
        1000 * 60 * 60 * 24 * MONTHS[indexOfMonth]?.days; // do poprawy: luty(przestepny)
      for (let i = 1; i <= MONTHS[indexOfMonth]?.days; i++) data[i] = 0;
      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.dateCreated);
        if (
          expenseDate.getTime() >= dateMonthStart &&
          expenseDate.getTime() <= dateMonthEnd
        ) {
          const dayOfExpense = expenseDate.getDate();
          data[dayOfExpense] += expense.value;
        }
      });
      break;
    default:
      return expenses;
  }
  return data;
};

export const getTypeOfPeroidOfTime = (peroid) => {
  if (peroid === "Yearly") return "";
  else if (peroid === "Monthly") return "year";
  else return "month";
};

const getTypeOfDateLabel = (
  typeCurrentValue,
  selectedType,
  expenses,
  increment = true
) => {
  let changedValue = increment ? ++typeCurrentValue : --typeCurrentValue;
  let targetDate = "";
  const currentYear = new Date(Date.now()).getFullYear();
  const currentMonth = new Date(Date.now()).getMonth();
  if (changedValue > 0) {
    changedValue--;
    targetDate =
      selectedType === "year"
        ? `${currentYear}`
        : `${MONTHS[currentMonth].name} ${currentYear}`;
  } else {
    const changedValueAbs = Math.abs(changedValue);
    let oldestExpense = new Date(Date.now());
    expenses.forEach((expense) => {
      const currentExpense = new Date(expense.dateCreated).getTime();
      if (currentExpense < oldestExpense.getTime())
        oldestExpense = new Date(currentExpense);
    });
    if (selectedType === "year") {
      // MONTHLY
      let selectedYear = currentYear - changedValueAbs;
      if (
        expenses.every(
          (expense) =>
            new Date(expense.dateCreated).getFullYear() > selectedYear
        )
      ) {
        targetDate = `${oldestExpense.getFullYear()}`;
        changedValue = -(currentYear - oldestExpense.getFullYear());
      } else targetDate = `${currentYear - changedValueAbs}`;
    } else {
      // DAILY
      const now = new Date(Date.now());
      const oldestExpenseYear = oldestExpense.getFullYear();
      const oldestExpenseMonht = oldestExpense.getMonth();
      let msCounter = 0;
      for (let i = 0; i < changedValueAbs; i++) {
        if (i === 0) {
          const dayOfMonth = now.getDate() - 1;
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const seconds = now.getSeconds();
          const ms = now.getMilliseconds();
          msCounter +=
            (dayOfMonth * 24 + hours) * 3600000 +
            (minutes * 60 + seconds) * 1000 +
            ms +
            10;
        } else {
          const currentMonth = new Date(
            now.getTime() - msCounter - 1000
          ).getMonth();
          const currentYear = new Date(now.getTime() - msCounter).getFullYear();
          if (
            currentYear >= oldestExpenseYear &&
            currentMonth > oldestExpenseMonht
          ) {
            msCounter += MONTHS[currentMonth].days * 24 * 60 * 60 * 1000;
          } else break;
        }
      }
      const targetYear = new Date(now.getTime() - msCounter).getFullYear();
      const targetMonth =
        MONTHS[new Date(now.getTime() - msCounter).getMonth()].name;
      targetDate = `${targetMonth} ${targetYear}`;
    }
  }

  return { targetDate, changedValue };
};

export const expensesChartDataReducer = (state, action) => {
  switch (action.type) {
    case "setExpensesData":
      return { ...state, data: action.payload };
    case "setTypeOfPeroid":
      let dateInfo;
      switch (action.payload.type) {
        case "Monthly":
          dateInfo = new Date(Date.now()).getFullYear();
          break;
        case "Daily":
          const date = new Date(Date.now());
          dateInfo = `${MONTHS[date.getMonth()].name} ${date.getFullYear()}`;
          break;
        default:
          dateInfo = Date.now();
      }
      return {
        ...state,
        selectedTypeOfPeroid: action.payload.caption,
        dateInformation: dateInfo,
        typeOfDateCounter: 0,
      };
    case "incrementTypeOfCoutner":
      const { targetDate, changedValue: incrementedValue } = getTypeOfDateLabel(
        state.typeOfDateCounter,
        state.selectedTypeOfPeroid,
        action.payload.expenses
      );
      const data = getExpenseDataOnPeroidOfTime(
        action.payload.expenses,
        state.selectedTypeOfPeroid,
        targetDate
      );
      return {
        ...state,
        data,
        typeOfDateCounter: incrementedValue,
        dateInformation: targetDate,
      };
    case "decrementTypeOfCoutner":
      const { targetDate: newTargetDate, changedValue: decrementedValue } =
        getTypeOfDateLabel(
          state.typeOfDateCounter,
          state.selectedTypeOfPeroid,
          action.payload.expenses,
          false
        );
      const newData = getExpenseDataOnPeroidOfTime(
        action.payload.expenses,
        state.selectedTypeOfPeroid,
        newTargetDate
      );
      return {
        ...state,
        data: newData,
        typeOfDateCounter: decrementedValue,
        dateInformation: newTargetDate,
      };
    default:
      return state;
  }
};
