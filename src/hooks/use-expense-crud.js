import useHttp from "./use-http";
import { useSelector } from "react-redux";

const useExpenseCrud = () => {
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const getExpenses = async () => {
    const data = sendRequest({
      url: `/users/${userId}/expenses`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  const createExpense = async (expenseName, expenseValue, expenseCategory) => {
    const data = await sendRequest({
      url: `/users/${userId}/expenses`,
      method: "POST",
      body: {
        name: expenseName,
        value: expenseValue,
        category: expenseCategory,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  const deleteExpense = async (expenseId) => {
    await sendRequest({
      url: `/users/${userId}/expenses/${expenseId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return {
    getExpenses,
    createExpense,
    deleteExpense,
  };
};

export default useExpenseCrud;
