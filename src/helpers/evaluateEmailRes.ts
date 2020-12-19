const evaluateEmailRes = (resIdx: number): string => {
  if (resIdx === 2) return "This E-Mail Address is already signed up!";
  else if (resIdx === 3) return "Please put in a valid E-Mail Address.";
  else return "Oops... something went wrong. Please retry.";
};

export default evaluateEmailRes;
