import React, { useState } from "react";
import { validate } from "../utils/validate";

export const useForm = (rules) => {
  let [values, setForm] = useState({});
  const [errors, setError] = useState({});

  const register = (name) => {
    return {
      error: errors[name],
      value: values[name] || "",
      onChange: (ev) => setForm({ ...values, [name]: ev.target.value }),
    };
  };
  const _validate = () => {
    const errorObject = validate(rules, values);
    setError(errorObject);
    return Object.keys(errorObject).length === 0;
  };
  return {
    values,
    errors,
    register,
    validate: _validate,
  };
};
