import React from "react";
import { useTimer } from "../../../common/Timer/useTimer.hook";
import "./Timer.scss";

interface IProps {
  endDate: string;
}

export const Timer: React.FC<IProps> = (props: IProps) => {
  const { endDate } = props;

  const { timeLeft } = useTimer(endDate);

  return (
    <div className="counterHeaderTime" data-reactid="694">
      <div className="clockPart"> {timeLeft?.hours}</div>

      <strong> : </strong>
      <div className="clockPart"> {timeLeft?.minutes}</div>

      <strong> : </strong>
      <div className="clockPart"> {timeLeft?.seconds}</div>
    </div>
  );
};
