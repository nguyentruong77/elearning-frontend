import { message } from "antd";

export const handleError = (error) => {
  console.error(error);
  if (error?.response?.data?.message) {
    message.error(error?.response?.data?.message);
  }
};
