/* A Small mathematical expression evaluator */

/**
 * Evaluates the string containing a mathematical expression and returns the result
 * @returns {number} Result from evaluation of given mathematical expression
 * @param {string} input Text to be evaluated
 */
function evaluateSimpleMathExpression(input) {
  let result = 0;

  function isNumber(str) {
    return /^\d+(\.\d+)?$/.test(str);
  }

  // Builds an abstract syntax tree for the given string containing a
  // mathematical expression
  function buildAst(input_string) {
    // we dont want whitespace
    input_string.replace(/\s+/g, "");
    const tokens = input_string.match(/\d+(?:\.\d+)?|[+\-*/()]/g);
    if (!tokens) return -1;

    // lets assume the first token is a string and use it
    const rootNode = {
      type: "number",
      value: tokens[0],
    };

    for (let i = 1; i < tokens.length - 1; i += 2) {
      // t1 and t2 in an example expression
      // 1  +  1  +  1 ....
      // |  |  |
      // V  V  V
      // t0 t1 t2 _  _ ......
      // PS: t0 is the first character, we set the rootNode to its value

      const t1 = i < tokens.length ? tokens[i] : null;
      const t2 = i + 1 < tokens.length ? tokens[i + 1] : null;

      // if t1 (the operator) is given but not the right hand operand (a number),
      // throw an error (say, when u input expressions like "1 +")
      if (t1 !== null && t2 === null) {
        throw new Error("Incomplete expression");
      }

      if (!isNumber(t2)) {
        throw new Error("Incomplete expression or invalid number");
      }
      // if the token is any of +, -, *, \ ....
      if (t1.match(/[+\-*/]/g)) {
        rootNode.left = structuredClone(rootNode);
        rootNode.operator = t1;
        rootNode.type = "BinaryOp";
        rootNode.right = {
          type: "number",
          value: t2,
        };
      }
    }
    return rootNode;
  }

  function evaluateAst(node) {
    if (node.type === "number") return parseInt(node.value, 10);
    if (node.type === "BinaryOp") {
      const left = evaluateAst(node.left);
      const right = evaluateAst(node.right);

      if (node.operator === "+") return left + right;
      if (node.operator === "-") return left - right;
      if (node.operator === "/") {
        if (right === 0) throw new Error("Division by zero");
        return left / right;
      }
      if (node.operator === "*") return left * right;
    }
  }

  const ast = buildAst(input);
  // Here we have a working ast, lets print it out as json
  const astAsJson = JSON.stringify(ast, null, 2);

  console.log(`AST as JSON: ${astAsJson}`);
  // now let's evaluate/parse the ast
  result = evaluateAst(ast);
  console.log(`Parse result: ${result}`);

  return result;
}
