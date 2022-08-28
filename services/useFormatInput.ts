export const formatInputAmount = (event: any) => {
  const NUMBER_DOT_COMMA = /^[\d,.]*$/;
  const fieldValue = event.target.value;
  const fieldHasCommaOrDot =
    fieldValue.includes(".") || fieldValue.includes(",");
  const keyIsCommaOrDot = event.key === "." || event.key === ",";

  if (
    !NUMBER_DOT_COMMA.test(event.key) ||
    (keyIsCommaOrDot && fieldHasCommaOrDot)
  )
    event.preventDefault();
  event.target.value = fieldValue.replace(",", ".");
};
