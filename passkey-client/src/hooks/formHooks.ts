import { useState } from 'react';

const useForm = <T>(callback: () => void, initState: T) => {
  const [inputs, setInputs] = useState<T>(initState);

  const handleSubmit = (event: React.SyntheticEvent) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export { useForm };
