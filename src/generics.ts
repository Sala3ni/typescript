/*
===============================================================================
                    GENERICS - COMPLETE DETAILED GUIDE
===============================================================================

## GENERICS KYA HAI?
Generics ek tarika hai reusable components banane ka jo different types ke saath
kaam kar sake. Ye type safety maintain karte hue flexibility provide karta hai.

## KYU USE KARTE HAIN?
1. Code Reusability - Ek function multiple types ke liye
2. Type Safety - any type use karne se better
3. Flexibility - Different types ke saath kaam karta hai
4. IntelliSense - Better autocomplete aur type checking

## BINA GENERICS KI PROBLEM:
function wrapInArray(item: any): any[] {
    return [item];  // Type information lost - any return karta hai
}

===============================================================================
*/

// =================== BASIC GENERIC FUNCTION ===================

// Generic function - <T> ek placeholder hai type ke liye
function wrapinArray<T>(item: T): T[] {
  return [item];  // Item ko array mein wrap karke return
}

// Different types ke saath use karna
const stringArray = wrapinArray("masalachai")  // T = string, returns string[]
const numberArray = wrapinArray(42)            // T = number, returns number[]
const objectArray = wrapinArray({flavor : "ginger" }) // T = object, returns object[]

// KYU LIKHA: Ek hi function different types ke liye reuse karne ke liye
// BENEFIT: Type safety maintain hoti hai - stringArray[0].toUpperCase() works!
// REAL-WORLD: Array utilities, Data transformations, Wrapper functions

// =================== MULTIPLE TYPE PARAMETERS ===================

// Generic function with multiple type parameters
function pair <a,b>(a: a, b : b): [ a,b ] {
    return [a,b];  // Tuple return karta hai dono types ke saath
}

// Different type combinations
const pair1 = pair("masala", 30)  // a=string, b=number, returns [string, number]
const pair2 = pair(1, true)       // a=number, b=boolean, returns [number, boolean]
const pair3 = pair({name : "saloni"}, ["chai", "coffee"]) // a=object, b=string[]

// KYU LIKHA: Do different types ko combine karne ke liye
// BENEFIT: Har parameter ka type preserve hota hai
// REAL-WORLD: Key-value pairs, Coordinates, API request-response mapping
// Example: pair(userId, userData), pair(latitude, longitude)

// =================== GENERIC INTERFACES ===================

// Generic interface - flexible container type
interface box<T> {
    content : T  // T koi bhi type ho sakta hai
}

// Different types ke saath interface use karna
const numberbox : box<number> = {content : 123}      // T = number
const stringbox : box<string> = {content : "hello"}  // T = string
const chaibox : box<{flavor: string, price: number}> = {
    content: {flavor: "masala", price: 20}
}  // T = object

// KYU LIKHA: Reusable container types banane ke liye
// BENEFIT: Same structure, different content types
// REAL-WORLD: Response wrappers, State containers, Cache storage
// Example: box<User>, box<Product>, box<Settings>

// =================== REAL-WORLD USE CASE: API RESPONSES ===================

// Generic interface for API responses - sabse common use case
interface ApiResponse<T> {
    data : T         // Actual data - type flexible hai
    status : number  // HTTP status code
    message : string // Response message
}

// Specific type ke saath use karna
const response : ApiResponse<{flavor : string, price : number}> = {
    data : {flavor : "ginger", price : 20},  // Type-safe data
    status : 200,
    message : "success"
}

// Different API responses
const userResponse: ApiResponse<{id: number, name: string}> = {
    data: {id: 1, name: "Amit"},
    status: 200,
    message: "User fetched"
}

const listResponse: ApiResponse<string[]> = {
    data: ["chai", "coffee", "tea"],
    status: 200,
    message: "List fetched"
}

// KYU LIKHA: API responses ka consistent structure maintain karne ke liye
// BENEFIT: 
// 1. Type safety - response.data ka type pata hai
// 2. Reusability - har API ke liye same structure
// 3. IntelliSense - autocomplete works perfectly
// REAL-WORLD: REST APIs, GraphQL, Database queries

// =================== GENERIC CONSTRAINTS ===================

// Generic with constraint - T must have 'length' property
function getLength<T extends { length: number }>(item: T): number {
    return item.length;  // Safe to access length
}

// Works with any type that has length property
getLength("masala chai");     // string has length
getLength([1, 2, 3]);         // array has length
getLength({length: 10});      // object with length property
// getLength(123);            // ❌ ERROR - number doesn't have length

// KYU LIKHA: Generic types ko restrict karne ke liye
// BENEFIT: Type safety + flexibility ka balance
// REAL-WORLD: Array operations, String utilities, Collection processing

// =================== GENERIC CLASSES ===================

// Generic class - reusable data structure
class Storage<T> {
    private items: T[] = [];  // Array of type T
    
    add(item: T): void {
        this.items.push(item);  // Type-safe add
    }
    
    get(index: number): T | undefined {
        return this.items[index];  // Type-safe get
    }
    
    getAll(): T[] {
        return this.items;  // Return all items
    }
}

// Different types ke saath class use karna
const chaiStorage = new Storage<string>();
chaiStorage.add("masala");  // ✅ Valid
chaiStorage.add("ginger");  // ✅ Valid
// chaiStorage.add(123);    // ❌ ERROR - number not allowed

const priceStorage = new Storage<number>();
priceStorage.add(20);   // ✅ Valid
priceStorage.add(25);   // ✅ Valid

// KYU LIKHA: Type-safe collections banane ke liye
// BENEFIT: Reusable data structures with type safety
// REAL-WORLD: Cache implementations, State management, Data stores

// =================== GENERIC WITH DEFAULT TYPES ===================

// Generic with default type
interface Config<T = string> {  // Default type = string
    value: T;
    label: string;
}

// Default type use hoga
const config1: Config = {  // T = string (default)
    value: "dark-mode",
    label: "Theme"
}

// Custom type specify kar sakte hain
const config2: Config<number> = {  // T = number
    value: 100,
    label: "Max Items"
}

// KYU LIKHA: Common use case ke liye default provide karna
// BENEFIT: Flexibility + convenience
// REAL-WORLD: Configuration objects, Settings, Options

// =================== GENERIC UTILITY FUNCTIONS ===================

// Generic function for array operations
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];  // Return first element or undefined
}

const first1 = firstElement(["chai", "coffee"]);  // string | undefined
const first2 = firstElement([1, 2, 3]);           // number | undefined

// Generic function for object property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];  // Type-safe property access
}

const chai = { flavor: "masala", price: 20 };
const flavor = getProperty(chai, "flavor");  // string
const price = getProperty(chai, "price");    // number
// getProperty(chai, "invalid");             // ❌ ERROR - key doesn't exist

// KYU LIKHA: Type-safe utility functions banane ke liye
// BENEFIT: Reusable + type-safe operations
// REAL-WORLD: Array utilities, Object helpers, Data transformations

/*
===============================================================================
                            KEY CONCEPTS SUMMARY
===============================================================================

## 1. BASIC GENERICS (<T>):
- Type placeholder
- Function/class reusable banata hai
- Type safety maintain karta hai

## 2. MULTIPLE TYPE PARAMETERS (<T, U>):
- Multiple types handle karne ke liye
- Independent type parameters
- Flexible combinations

## 3. GENERIC INTERFACES:
- Reusable type definitions
- Container types
- API response structures

## 4. GENERIC CONSTRAINTS (extends):
- Type ko restrict karna
- Specific properties ensure karna
- Type safety + flexibility

## 5. GENERIC CLASSES:
- Reusable data structures
- Type-safe collections
- State management

## 6. DEFAULT TYPES:
- Common use case ke liye default
- Optional type specification
- Convenience + flexibility

===============================================================================

## GENERICS vs ANY:

ANY TYPE (❌ Avoid):
function wrap(item: any): any[] {
    return [item];  // Type information lost
}
const result = wrap("chai");  // result is any[]
// result[0].toUpperCase();   // No type checking!

GENERICS (✅ Prefer):
function wrap<T>(item: T): T[] {
    return [item];  // Type preserved
}
const result = wrap("chai");  // result is string[]
result[0].toUpperCase();      // ✅ Type-safe!

===============================================================================

## REAL-WORLD USE CASES:

1. API RESPONSES: ApiResponse<User>, ApiResponse<Product[]>
2. STATE MANAGEMENT: State<AppState>, Action<PayloadType>
3. DATA STRUCTURES: List<T>, Stack<T>, Queue<T>
4. PROMISES: Promise<User>, Promise<string>
5. REACT COMPONENTS: Component<Props>, useState<State>
6. DATABASE QUERIES: Query<User>, Repository<Entity>
7. CACHING: Cache<string, User>, Map<K, V>
8. VALIDATION: Validator<FormData>, Result<T, Error>

===============================================================================

## BEST PRACTICES:

✅ DO:
- Use descriptive type parameter names (T, U, K, V)
- Add constraints when needed (extends)
- Use generics for reusable code
- Prefer generics over any

❌ DON'T:
- Over-complicate with too many type parameters
- Use generics when simple types work
- Forget to add constraints when needed
- Use any instead of generics

===============================================================================
*/