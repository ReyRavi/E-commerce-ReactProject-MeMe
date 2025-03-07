import { TextButton } from "../../ui-kit/TextButton/TextButton.view";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "../../../hook/useWindowSize.hook";
import "./Style.scss";

export const Page404 = () => {
  const history = useHistory();
  const [width, height] = useWindowSize();

  return (
    <div
      className="error-container"
      style={{ minHeight: height, minWidth: width }}
    >
      <div className="error-container-wrapper">
        <h1 className="u-h2 error-head">PAGE NOT FOUND!</h1>
        <p className="error-text">
          Either you aren't cool enough to visit this page or it doesn't exist{" "}
          <em className="page404__container__desc--text">
            . . . like your social life.
          </em>
        </p>
        <TextButton
          items="Back To Home"
          isSecondary={true}
          className="ErrorBtn"
          onClick={() => {
            history.push("/");
          }}
        />
      </div>
    </div>
  );
};
