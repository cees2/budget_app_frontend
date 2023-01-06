export const getCategoriesDataOnPeroid = (expenses, startDate, endDate) => {
  const categoriesPercentage = {};
  expenses?.forEach((expense) => {
    const expenseDate = new Date(expense.dateCreated).getTime();
    if (startDate <= expenseDate && endDate >= expenseDate) {
      if (!Object.keys(categoriesPercentage).includes(expense.category)) {
        categoriesPercentage[expense.category] = expense.value;
      } else categoriesPercentage[expense.category] += expense.value;
    }
  });

  if (Object.keys(categoriesPercentage).length) return categoriesPercentage;
  return false;
};

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
