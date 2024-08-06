import React from "react";
import { onChange, onClick } from "../../../../../constant/Types";

export const DeliveryDetails = () => {
  const [pin, setPin] = React.useState("");
  const [pinError, setPinError] = React.useState<string>("");
  const [valid, setIsValid] = React.useState<boolean>(false);

  const handleChange = (e: onChange) => {
    setPin(e.target.value);
    setIsValid(false);
  };

  const handeValidate = () => {
    let fields = pin;
    let formIsValid = true;
    let pinError = "";

    if (!fields) {
      formIsValid = false;
      pinError = "Please enter an Pincode.";
    } else if (fields.length !== 6) {
      formIsValid = false;
      pinError = "Invalid Pincode, Please try again.";
    }
    setPinError(pinError);
    return formIsValid;
  };

  React.useEffect(() => {
    if (pinError === "") {
      return;
    }
    const timer = setTimeout(() => {
      setPinError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [pinError]);

  const handleClick = (e: onClick) => {
    e.preventDefault();
    if (handeValidate()) {
      setIsValid(true);
    }
  };

  return (
    <div className="pincode-checker">
      <form className="pincode-checker__form pincode-checker__form--show u-h4">
        <input
          type="number"
          placeholder="Enter Pincode"
          name="pincode"
          className="pincode-checker__form--input"
          value={pin}
          onChange={handleChange}
        />

        <button className="pincode-checker__form--button" onClick={handleClick}>
          Check
        </button>
      </form>
      {valid && (
        <div className="pincode-checker__response">
          <p>
            Item is available at -{" "}
            <span style={{ fontWeight: "bold" }}> {pin}</span>
          </p>
        </div>
      )}

      {pinError !== "" && (
        <div className="pincode-checker__response">
          <p style={{ color: "red" }}>{pinError}</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryDetails;
