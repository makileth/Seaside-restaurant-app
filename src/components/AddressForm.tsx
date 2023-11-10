import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

const AddressForm = () => {
  return (
    <form action="">
      <div>
        <AddressElement
          options={{ mode: "shipping" }}
          onChange={(event) => {
            if (event.complete) {
              const address = event.value.address
              console.log(event);
            }
          }}
        />
      
      </div>
    </form>
  );
};

export default AddressForm;
