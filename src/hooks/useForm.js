import { useState } from "react";

export const useForm = (initialData) => {
  const [state, setstate] = useState(initialData);

  const handleChange = (e) => {
    setstate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return [state, handleChange];
};
