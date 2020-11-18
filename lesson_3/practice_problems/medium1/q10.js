// Question 10

// Consider these two simple functions:
function foo(param = "no") {
  return "yes";
}

function bar(param = "no") {
  return param === "no" ? "yes" : "no";
}

// What will the following function invocation return?
console.log(bar(foo()));
//  => "no"