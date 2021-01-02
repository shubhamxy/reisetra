import React from 'react'
import { Heading, Text, TextContainer } from '../components/shared/Typography'

const Shiping = () => (
  <TextContainer>
    <div
      style={{
        display: `flex`,
        justifyContent: `center`,
        flexDirection: `column`,
        alignItems: `center`
      }}
    >
      <Heading>Shiping</Heading>
      <Text>
        <p>
          We strive to deliver products purchased from Reisetra in excellent
          condition and in the fastest time possible. Also, for all the
          purchases of Rs. 10199* or more, we will deliver the order to your
          doorstep free of cost. A shipping charge will be applicable to all
          orders under Rs. 10199.
        </p>
        <ul>
          <li>
            If the order is cancelled, lost or un-delivered to your preferred
            location, we will refund the complete order amount including any
            shipping charges, if paid online.
          </li>
          <li>
            If you return an order delivered to you, order shipping charges will
            not be refunded. However if you self-ship your returns, we will
            reimburse self-shipment charges based onshop.reisetra.com's Returns
            Policy. For accounts whose return behavior violate our fair usage
            policy, a delivery charge of Rs. 149 will be levied on all orders,
            irrespective of order value.
          </li>
        </ul>
        <p>
          *Order value is calculated after applying discounts/VAT/GST or any
          other applicable charges.
        </p>
        <p>
          In order to save our customers money, we may use amazon or other
          fulfillment service. All orders are typically dispatched within one
          day of the payment being verified.
        </p>
      </Text>
    </div>
  </TextContainer>
)

export default Shiping
