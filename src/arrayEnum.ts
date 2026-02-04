/*
===============================================================================
                    ARRAYS, TUPLES & ENUMS - COMPLETE GUIDE
===============================================================================

## ARRAYS KYA HAIN?
Arrays ek data structure hai jo same type ke multiple values store karta hai.
TypeScript mein arrays type-safe hote hain.

## TUPLES KYA HAIN?
Tuples fixed length aur fixed type order ke arrays hote hain.
Har position ka type predefined hota hai.

## ENUMS KYA HAIN?
Enums named constants ka collection hai.
Related values ko group karne ke liye use karte hain.

===============================================================================
*/

// =================== BASIC ARRAYS ===================

// String array - sabse common way
const chaiflavour : string[] = ["masala", "ginger", "cardamom", "green"];
// Type annotation: string[] - sirf strings allowed

// Number array
const chaiPrice:number[] = [20,23,23,45];
// Har element number hona chahiye

// Alternative array syntax - Generic type
const rating: Array<number> = [4.5, 4.2, 4.8, 4.0]
// Array<number> same hai string[] ke - dono valid syntax

// =================== OBJECT ARRAYS ===================

// Type define karna object ke liye
type chai = {
    name : string;
    price : number;
}

// Object array - type chai ke objects ka array
const menu:chai[] = [
    {name: "masala", price: 20},
    {name: "ginger", price: 23},
    {name: "cardamom", price: 23},
    {name: "green", price: 45}
]

// Array mein new object add karna
menu.push({name: "black", price: 30}) // ✅ Valid - chai type match karta hai
// menu.push({name: "lemon"}) // ❌ ERROR - price missing

// =================== READONLY ARRAYS ===================

// Readonly array - modify nahi kar sakte
const cities : readonly string[] = ["Delhi", "Mumbai", "Kolkata"];
// cities.push("Chennai"); // ❌ ERROR - readonly array mein push nahi kar sakte
// cities[0] = "Bangalore"; // ❌ ERROR - elements change nahi kar sakte

// =================== MULTIDIMENSIONAL ARRAYS ===================

// 2D array - array of arrays
const table : number[][] = // number[][] means array of number arrays
 [[1,2,3],   // First row
 [4,5,6]];   // Second row

// Access karna: table[row][column]
// console.log(table[0][1]); // Output: 2
// console.log(table[1][2]); // Output: 6

// =================== TUPLES - FIXED LENGTH ARRAYS ===================

// Basic tuple - fixed length aur type order
let chaituple : [string, number ]; // Exactly 2 elements: string, then number
chaituple = ["masala", 20];        // ✅ Valid - correct order
// chaituple= [20,"masala" ]       // ❌ ERROR - wrong order
// chaituple = ["masala", 20, true] // ❌ ERROR - extra element

// =================== OPTIONAL TUPLE ELEMENTS ===================

// Tuple with optional element
let userinfo : [string ,number, boolean?]; // Third element optional
userinfo = ["hitesh", 25, ];        // ✅ Valid - optional element missing
userinfo= ["rahul", 30, false];     // ✅ Valid - all elements present
// userinfo = ["amit"];             // ❌ ERROR - required number missing

// =================== READONLY TUPLES ===================

// Readonly tuple - elements change nahi kar sakte
const location : readonly[number,number] = [12.34, 56.78]; // Latitude, Longitude
// location[0] = 15.67; // ❌ ERROR - readonly tuple modify nahi kar sakte

// =================== LABELED TUPLES ===================

// Tuple with labels - better readability
const chaiitems : [name: string, price: number ]= ["masala", 20, ];
// Labels sirf documentation ke liye - functionality same hai
// Access: chaiitems[0] for name, chaiitems[1] for price

// =================== BASIC ENUMS ===================

// Numeric enum - default values 0, 1, 2...
enum cupsize {
    small,    // 0
    medium,   // 1
    large     // 2
}

// Enum use karna
const size = cupsize.medium  // Value: 1
console.log(size);           // Output: 1
console.log(cupsize.small);  // Output: 0
console.log(cupsize.large);  // Output: 2

// =================== ENUMS WITH CUSTOM VALUES ===================

// Enum with custom starting value
enum status {
    pending = 100,  // Custom starting value
    served,         // 101 (auto-increment)
    cancelled       // 102 (auto-increment)
}

console.log(status.pending);   // Output: 100
console.log(status.served);    // Output: 101
console.log(status.cancelled); // Output: 102

// =================== STRING ENUMS ===================

// String enum - explicit string values
enum chaiTypes {
    MASALA = "masala",
    GINGER = "ginger", 
    CARDAMOM = "cardamom",
    GREEN = "green"
}

// String enum use karna
const selectedChai = chaiTypes.MASALA; // Value: "masala"
console.log(selectedChai); // Output: "masala"

// Function mein enum use karna
function makeChai(type: chaiTypes) {
    return `Making ${type} chai`;
}

console.log(makeChai(chaiTypes.GINGER)); // Output: "Making ginger chai"

// =================== HETEROGENEOUS ENUMS ===================

// Mixed string aur number values (avoid karo!)
enum mixedEnum {
    YES = 1,
    NO = "no",
    MAYBE = 0
}

// ❌ Best practice: Avoid heterogeneous enums

// =================== CONST ENUMS ===================

// Const enum - compile time pe inline ho jata hai
const enum directions {
    UP = "up",
    DOWN = "down",
    LEFT = "left", 
    RIGHT = "right"
}

// Usage - compile time pe value replace ho jati hai
const move = directions.UP; // Compiled: const move = "up";

// =================== REVERSE MAPPING ===================

// Numeric enums mein reverse mapping hoti hai
enum orderStatus {
    PLACED = 1,
    CONFIRMED = 2,
    DELIVERED = 3
}

console.log(orderStatus.PLACED);    // Output: 1
console.log(orderStatus[1]);        // Output: "PLACED" (reverse mapping)
console.log(orderStatus[2]);        // Output: "CONFIRMED"

// String enums mein reverse mapping nahi hoti
// console.log(chaiTypes["masala"]);   // Output: undefined

// =================== COMPUTED ENUMS ===================

// Enum with computed values
enum sizes {
    SMALL = 1,
    MEDIUM = SMALL * 2,  // 2
    LARGE = MEDIUM * 2   // 4
}

console.log(sizes.SMALL);   // Output: 1
console.log(sizes.MEDIUM);  // Output: 2
console.log(sizes.LARGE);   // Output: 4

// =================== ENUM AS FUNCTION PARAMETER ===================

// Function jo enum parameter leta hai
function processOrder(status: orderStatus, size: cupsize) {
    return `Order status: ${orderStatus[status]}, Size: ${cupsize[size]}`;
}

// Function call with enum values
console.log(processOrder(orderStatus.CONFIRMED, cupsize.large));
// Output: "Order status: CONFIRMED, Size: large"

// =================== ARRAY OF ENUM VALUES ===================

// Enum values ka array
const allChaiTypes: chaiTypes[] = [
    chaiTypes.MASALA,
    chaiTypes.GINGER,
    chaiTypes.CARDAMOM,
    chaiTypes.GREEN
];

// Enum values iterate karna
allChaiTypes.forEach(type => {
    console.log(`Available: ${type}`);
});

/*
===============================================================================
                                BEST PRACTICES
===============================================================================

## ARRAYS:
✅ DO:
- Consistent types use karo: string[] ya number[]
- Readonly arrays immutable data ke liye
- Type annotations explicit rakho complex cases mein
- Array methods use karo (map, filter, reduce)

❌ DON'T:
- Mixed types avoid karo (use union types if needed)
- any[] type use mat karo
- Direct index access without bounds checking

## TUPLES:
✅ DO:
- Fixed structure data ke liye use karo
- Labels use karo better readability ke liye
- Optional elements properly handle karo
- Readonly tuples immutable data ke liye

❌ DON'T:
- Long tuples avoid karo (use objects instead)
- Tuple ko array ki tarah treat mat karo

## ENUMS:
✅ DO:
- String enums prefer karo numeric enums se
- Descriptive names use karo
- Const enums performance ke liye
- PascalCase naming convention follow karo

❌ DON'T:
- Heterogeneous enums avoid karo
- Generic names mat use karo
- Runtime mein enum values modify mat karo

## WHEN TO USE WHAT:
- Arrays: Same type ke multiple values
- Tuples: Fixed structure with different types
- Enums: Related constants group karne ke liye
- Objects: Complex structured data ke liye

===============================================================================
*/
