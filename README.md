# calkulator
My first time making a calculator for the web. Includes a custom expression evaluator that generates and evaluates AST from a string

### AST example
For e.g if I input `1+1+1`, the following AST is generated:
```json
{
  "type": "BinaryOp",
  "value": "1",
  "left": {
    "type": "BinaryOp",
    "value": "1",
    "left": {
      "type": "number",
      "value": "1"
    },
    "operator": "+",
    "right": {
      "type": "number",
      "value": "1"
    }
  },
  "operator": "+",
  "right": {
    "type": "number",
    "value": "1"
  }
}
```
It's a bit buggy as some edge cases are not implemented, but it does work fine (try it out yourself).
Bracket evaluation is not supported.
