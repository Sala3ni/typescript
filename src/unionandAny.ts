// UNION TYPES - Multiple types allow karta hai (number YA string)
let subs : number | string = "1M"; // Ye variable number ya string dono ho sakta hai
// subs = 1000000; // Valid - number
// subs = "1.5M"; // Valid - string

// LITERAL TYPES - Sirf specific values allow karta hai
let apiREqueststatus: "pending" | "success" | "error" = "pending";
// apiREqueststatus = "loading"; // ERROR - ye value allowed nahi hai
// apiREqueststatus = "success"; // Valid - allowed value

// LITERAL UNION - Sirf 3 specific string values allowed
let airlineseat: "aisle"| "middle"| "window"= "aisle";
// airlineseat = "front"; // ERROR - ye seat type exist nahi karta

// Valid assignment - allowed literal value
airlineseat = "window";

// Array of strings - TypeScript automatically infer karta hai
const orders = ["12 cups", "20 cups", "5 cups"]; // Type: string[]

// UNION with undefined - Variable ho sakta hai string ya undefined
let currentorder : string | undefined; // Initially undefined

// Loop through orders array
for(let order of orders){
    if(order === "20 cups"){
        currentorder = order; // string assign ho raha hai
        break;
    }
    currentorder = "11cups"; // Ye line problematic hai - loop ke har iteration mein set ho raha
}

console.log (currentorder); // Output: "20 cups"

// =================== ANY TYPE CONCEPT ===================
// ANY TYPE - TypeScript ki type checking disable kar deta hai (AVOID KARO!)

//  GALAT WAY - Any use karna
let badExample: any = "hello";
badExample = 42; // No error
badExample = true; // No error
badExample.foo.bar.baz; // No error, but runtime mein crash hoga!

// SAHI WAY - Proper types use karna
let goodExample: string | number = "hello";
// goodExample = true; // ERROR - boolean allowed nahi

// ANY KAB USE KARE:
// 1. Legacy JavaScript code migrate karte time
// 2. Third-party library jiska type definition nahi hai
// 3. Dynamic content (JSON parsing) - lekin unknown better hai

// =================== CODE IMPROVEMENTS ===================
// CURRENT CODE MEIN ISSUE:
// Line 29: currentorder = "11cups"; - Ye har iteration mein set ho raha
// BETTER APPROACH:
let betterCurrentOrder: string | undefined;
for(let order of orders){
    if(order === "20 cups"){
        betterCurrentOrder = order;
        break;
    }
    // Else case sirf last mein set karo
}
if(!betterCurrentOrder){
    betterCurrentOrder = "No matching order";
}
