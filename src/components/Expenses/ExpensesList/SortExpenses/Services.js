// do poprawy: Czy kazdy typ sortowania ma miec swoja implementacje, sprawdzic jak bylo w portfolio na githubie

const sortExpenses = (expenses, typeOfSorting, arrowIsUp) => {
  const allExpenses = [...expenses];
  const sortedExpenses = expenses
    .map((expense) => expense[typeOfSorting])
    .sort()
    .flatMap((expenseDetail) => {
      const foundExpense = allExpenses.find(
        (expense) => expense[typeOfSorting] === expenseDetail
      );
      let indexOfExpense;
      allExpenses.forEach((expense, i) => {
        if (foundExpense.dateCreated === expense.dateCreated)
          indexOfExpense = i;
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
