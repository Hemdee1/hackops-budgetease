interface API {
  get: (url: string) => Promise<any>;
  post: (url: string, data: object) => Promise<any>;
}

// const baseUrl = "http://localhost:5000";
const baseUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export const API: API = {
  async get(url: string): Promise<any> {
    try {
      const response = await fetch(baseUrl + url, {
        method: "GET",
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers here as needed
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData };
      }

      const responseData = await response.json();
      return { data: responseData };
    } catch (error) {
      // console.error("There was a problem with your fetch operation:", error);
      return { error };
    }
  },

  async post(url: string, data: object): Promise<any> {
    try {
      const response = await fetch(baseUrl + url, {
        method: "POST",
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json", // You can adjust the content type as per your requirement
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData };
      }

      const responseData = await response.json();
      return { data: responseData };
    } catch (error) {
      // console.error("There was a problem with your fetch operation:", error);
      return { error };
    }
  },
};
