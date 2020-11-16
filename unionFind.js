"use strict"
// quick-find algorithm for dynamic connectivity
// parent array is used to implement forest of trees
// parent array elements point to their parent 
// root elements point to themselves

export const quf = function(n) {
  // initialize n sites with integers 0..n-1
  //  initially each element points to itself
  let parent = [ ...Array(n).keys()].map(x => x);
  return {
    getParent: () => parent,
    validate: (p) => {
      if (p < 0 || p >= n)
        throw new Error("invalid p");
    }
  }
}
// count number of components
const count = function() {
}

// true if p & q are connected, false otherwise
const connected = function(p, q) {
}

// return integer component of given site
const find = function(p) {
}

// merge two sites if in different components
// add connection between p and q
const union = function(p, q) {
}
