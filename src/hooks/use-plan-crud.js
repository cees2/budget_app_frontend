import useHttp from "./use-http";
import { useSelector } from "react-redux";

const usePlanCrud = () => {
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const getPlans = async () => {
    const data = sendRequest({
      url: `/users/${userId}/plans`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  const createPlan = async (planName, planPriority, planStatus) => {
    const data = await sendRequest({
      url: `/users/${userId}/plans`,
      method: "POST",
      body: {
        name: planName,
        priority: planPriority,
        status: planStatus,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  const deletePlan = async (planId) => {
    await sendRequest({
      url: `/users/${userId}/plans/${planId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const updatePlan = async (planId, body) => {
    await sendRequest({
      url: `/users/${userId}/plans/${planId}`,
      method: "PATCH",
      body,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  return {
    getPlans,
    createPlan,
    deletePlan,
    updatePlan,
  };
};

export default usePlanCrud;
