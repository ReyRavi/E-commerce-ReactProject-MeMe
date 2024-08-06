import Notify from "../../../../assets/image/Notification.png";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import "./Style.scss";
import useSubscribe from "../../../FooterContainer/Subscribe/useSubscribe";

export default function SubscribeBanner() {
  const { email, handleOnChange, handleSubscribe } = useSubscribe();

  return (
    <div className="subscribe-wrapper">
      <div className="subscribe-image">
        <img src={Notify} alt="Notify" />
      </div>
      <h2 className="heading u-h3">please subscribe to get updates</h2>
      <p className="u-h5"> signup with your email to get latest updates</p>
      <form>
        <input
          type="text"
          placeholder="enter your email"
          value={email}
          onChange={handleOnChange}
        />
        <TextButton
          items="subscribe"
          isprimary={true}
          onClick={handleSubscribe as any}
        />
      </form>
    </div>
  );
}
