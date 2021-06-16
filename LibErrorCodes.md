# Error Codes (Wrappers/ Libraries)

These are error codes returned by a wrapper/ library done by me.

Any error codes that starts with letters are generic errors produced by the wrapper/ library itself, these errors are either related to the input or errors typed into the wrapper.

1. [`K`](##K) for errors reported where data given to the wrapper/ library is wrong.

2. [`KA`](##KA) for errors that's returned by the fetching part, most likely to be something wrong with the request.

3. [`KC`](##K) for errors that appeared while processing data returned from the API, most likely an error related to the wrapper/ library. :v

## Expected Regular HTTP Error Codes

`404` = Not Found.
`429` = Rate Limit Capped. \*Not sure if this is a thing.

`500` Internal Server Error.
`502` = Bad Gateway.
`503` = Service Not Available.
`504` = Gateway Timeout.

For more information regarding possible error codes, check this [MDN Web Documentation!](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

## K

### K001

Retuned when no results were found.

`ClientError: No Results Found for the... [K001]`

### K002

Retuned when no search parameters are given or when required parameters are missing.

`ClientError: No Search Parameters Given. [K002]`

### K003

When a parameter is not acceptable. Either related by type or length.

`ClientError: Given ... is not Acceptable. [K003]`

---

## KA

### KAOO1

This is handled by the wrapper/ library, scream at me for this.

`Error: No ... Given. [KA001]`

### KA002

Returned when a result is `null`.

`ServerError: Returned response is null. [KA002]`

### KA003

Returned upon failed request, handled by the response server or `HTTPS`

`ServerError: {Enter Generic Error Message Here} [KA003]`

---

## KC

### KC001

Returned while parsing the buffer returned from the endpoint.  
Related to the `Content-Type` header in the request.

`ServerError: Ran into an error while parsing the response [KC001]`

### KC002

Returned after fitering for any statusCode higher than 400 and checking results array.  
Basically an unknown error.

`ServerError: Server returned an unknown error [KC002]`
