const evaluateEmailRes = (resIdx: number): string => {
  if (resIdx === 2) return "This E-Mail Address is already signed up!";
  else if (resIdx === 3) return "The E-Mail Address is badly formatted.";
  else return "There was an error with our server. Please retry.";
};

export default evaluateEmailRes;
