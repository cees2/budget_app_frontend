const DOMAIN = ` http://127.0.0.1:3000/api/v1`;

const useHttp = () => {
  const sendRequest = async (requestDetails) => {
    try {
      const response = await fetch(`${DOMAIN}${requestDetails.url}`, {
        headers: requestDetails.headers || null,
        body: requestDetails.body ? JSON.stringify(requestDetails.body) : null,
        method: requestDetails.method || "GET",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      return data;
    } catch (err) {
      throw err;
    }
  };

  return { sendRequest };
};

export default useHttp;
