import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { isRomanNumberValid, isDecimalNumberValid, toDecimal, toRoman, MIN_DECIMAL_VALUE, MAX_DECIMAL_VALUE, MIN_ROMAN_VALUE, MAX_ROMAN_VALUE } from "./Roman";
import "./styles.css";

export default function App() {
  const defaultDecimal = Math.round(Math.random() * MAX_DECIMAL_VALUE);
  const defaultRoman = toRoman(defaultDecimal);
  const [romanNumber, setRomanNumber] = useState(defaultRoman);
  const [romanNumberValid, setRomanNumberValid] = useState(isRomanNumberValid(defaultRoman));
  const [decimalNumber, setDecimalNumber] = useState(defaultDecimal);
  const [decimalNumberValid, setDecimalNumberValid] = useState(isRomanNumberValid(defaultRoman));

  const onRomanNumberChange = event => {
    const romanNumber = event.target.value.toUpperCase();
    setRomanNumber(romanNumber);
    setRomanNumberValid(isRomanNumberValid(romanNumber));
    if (isRomanNumberValid(romanNumber)) {
      const decimal = toDecimal(romanNumber);
      setDecimalNumber(decimal);
      setDecimalNumberValid(true);
    } else {
      setDecimalNumber("");
    }
  };

  const onDecimalNumberChange = event => {
    const decimalNumber = event.target.value;
    if (isDecimalNumberValid(decimalNumber)) {
      setDecimalNumberValid(true);
      setRomanNumberValid(true);
      setRomanNumber(toRoman(decimalNumber));
    } else {
      setDecimalNumberValid(false);
      setRomanNumber("");
    }
    setDecimalNumber(decimalNumber);
  };

  return (
    <Card style={{ margin: "10px" }}>
      <Card.Header>Roman - Decimal converter</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="formRomanNumber">
            <Form.Label>Roman Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter roman number"
              value={romanNumber}
              onChange={onRomanNumberChange}
              className={`form-control ${romanNumberValid ? "is-valid" : "is-invalid"}`}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter valid roman number from "{MIN_ROMAN_VALUE}" to "{MAX_ROMAN_VALUE}"
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDecimalNumber">
            <Form.Label>Decimal Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter decimal number"
              value={decimalNumber}
              onChange={onDecimalNumberChange}
              className={`form-control ${decimalNumberValid ? "is-valid" : "is-invalid"}`}
              pattern="\d*"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter valid decimal number from {MIN_DECIMAL_VALUE} to {MAX_DECIMAL_VALUE}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
