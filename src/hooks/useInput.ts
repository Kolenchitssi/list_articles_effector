import React, { useState } from 'react';

export default function useInput(initialValue: any) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
}

// пример использования

/*
const myInput = () => {
  const username = useInput('');
  const password = useInput('');
  return (
    <div>
      <input {...username} type='text' placeholder='username' />
      <input {...password} type='text' placeholder='password' />
      <button onClick-{()=> console.log(username.value, password.value)}> Click </button>
    </div>
  );
};
*/
