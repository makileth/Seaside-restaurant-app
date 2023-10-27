import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

const AddressForm = () => {
  return (
    <form action="">
      <div>
        <label htmlFor="address">Address</label>
        <AddressElement
          options={{ mode: "shipping" }}
          onChange={(event) => {
            if (event.complete) {
              const address = event.value.address
              console.log(event);
            }
          }}
        />
        <input type="text" id="address" />
      </div>
    </form>
  );
};

export default AddressForm;
