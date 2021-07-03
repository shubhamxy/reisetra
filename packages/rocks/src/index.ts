function test(x: number, y: number) {
  console.log("this is a function from the shared library rocks");
  return x + y;
}

export {
  test,
}
