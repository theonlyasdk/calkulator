# calkulator
A simple mathematical expression evaluator that generates and evaluates an AST from an input string.

### AST example
For e.g if I input `1+1+1`, the program will generate the following AST:
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
Though it is a bit buggy as some edge cases are not implemented, it works fine for most simple expressions (try it out yourself).
Bracket evaluation is not supported (i.e `(1 + 2) + 3`, `((32 / 2) - 8) / (32)` and so on)
