const sortExpenses = (expenses, typeOfSorting, arrowIsUp) => {
  const allExpenses = [...expenses];
  let sortedExpenses = expenses.map((expense) => expense[typeOfSorting]);

  if (typeOfSorting === "value") {
    sortedExpenses = sortedExpenses.sort((a, b) => (arrowIsUp ? a - b : a + b));
  } else {
    sortedExpenses = sortedExpenses.sort();
  }
  sortedExpenses = sortedExpenses.flatMap((expenseDetail) => {
    const foundExpense = allExpenses.find(
      (expense) => expense[typeOfSorting] === expenseDetail
    );
    let indexOfExpense;
    allExpenses.forEach((expense, i) => {
      if (foundExpense.dateCreated === expense.dateCreated) indexOfExpense = i;
    });

    allExpenses.splice(indexOfExpense, 1);
    return foundExpense;
  });
  return arrowIsUp ? sortedExpenses : sortedExpenses.reverse();
};

export const sortByName = (expenses, arrowIsUp, nameInput) => {
  const sortedExpenses = expenses.filter((expense) =>
    expense.name.toUpperCase().startsWith(nameInput.toUpperCase())
  );

  return arrowIsUp ? sortedExpenses : sortedExpenses.reverse();
};

export const sortByAlphabet = (expenses, arrowIsUp) =>
  sortExpenses(expenses, "name", arrowIsUp);

export const sortByValue = (expenses, arrowIsUp) =>
  sortExpenses(expenses, "value", arrowIsUp);

export const sortByDate = (expenses, arrowIsUp) =>
  sortExpenses(expenses, "dateCreated", arrowIsUp);
