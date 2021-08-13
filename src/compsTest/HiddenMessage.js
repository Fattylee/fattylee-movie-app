import { useState } from "react";

export const HiddenMessage = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor="showMessage">Toggle Message</label>
      <input
        type="checkbox"
        name="showMessage"
        id="showMessage"
        checked={show}
        onChange={(e) => setShow(!show)}
        data-testid="hide-box"
      />
      {show ? children : null}
    </div>
  );
};
