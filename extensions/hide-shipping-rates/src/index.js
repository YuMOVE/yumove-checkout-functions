// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").InputQuery} InputQuery
* @typedef {import("../generated/api").FunctionResult} FunctionResult
* @typedef {import("../generated/api").Operation} Operation
*/

// The @shopify/shopify_function package will use the default export as your function entrypoint
export default
/**
* @param {InputQuery} input
* @returns {FunctionResult}
*/
  (input) => {

    let toHide = input.cart.deliveryGroups
      // Filter for delivery groups with a shipping address containing the affected state or province
      .filter(group => group.deliveryAddress?.zip &&
        ( (group.deliveryAddress.zip).slice(0, 2) == "GY" || (group.deliveryAddress.zip).slice(0, 2) == "JE"  ) )
      // Collect the delivery options from these groups
      .flatMap(group => group.deliveryOptions)
      // Construct a rename operation for each, adding the message to the option title
      .map(option => /** @type {Operation} */({
        hide: {
          deliveryOptionHandle: option.handle
        }
      }));

    // The @shopify/shopify_function package applies JSON.stringify() to your function result
    // and writes it to STDOUT
    return {
      operations: toHide
    };
  };
