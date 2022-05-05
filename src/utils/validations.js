export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid Email Address";
  }
  return error;
};

export const validatePassword = (value) => {
  let error;
  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  if (!value) {
    error = "Required";
  } else if (!strongPassword.test(value)) {
    error =
      "Invalid Password (should contain at least one lowercase letter, one uppercase letter, one number, one special character and at least eight characters long)";
  }
  return error;
};
