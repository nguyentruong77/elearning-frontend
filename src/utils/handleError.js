import { message } from "antd";

export const handleError = (error) => {
  console.error(error);
  if (error?.response?.message) {
    message.error(error?.response?.data?.message);
  }
};
