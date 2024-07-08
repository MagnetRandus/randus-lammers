// // Define tree types
// type Tree = "appleTree" | "orangeTree" | "cherryTree";

// // Define fruit types based on the tree
// type FruitOptions<T> = T extends "appleTree" ? "apple" | "greenApple" : T extends "orangeTree" ? "orange" | "mandarin" : T extends "cherryTree" ? "cherry" | "blackCherry" : never;

// // pickTree function using generics
// function pickTree<T extends Tree>(tree: T, fruits: FruitOptions<T>[]): string {
//   return `You picked ${fruits.join(", ")} from the ${tree}.`;
// }

// // Example usage
// const result = pickTree("appleTree", ["apple", "greenApple"]); // Valid
// console.log(result); // Output: You picked apple, greenApple from the appleTree.

// const invalidResult = pickTree("appleTree", ["apple", "mandarin"]); // Type error
// // Argument of type '"mandarin"' is not assignable to parameter of type '"apple" | "greenApple"'.
