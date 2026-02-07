/*
===============================================================================
            INTERFACES & GENERICS - DETAILED EXPLANATION
===============================================================================

## INTERFACE KYA HAI?
Interface ek contract hai jo object ka structure define karta hai.
Ye compile-time type checking provide karta hai.

## KYU USE KARTE HAIN?
1. Type safety - Wrong data prevent karta hai
2. IntelliSense - Better autocomplete
3. Code documentation - Structure clear dikhta hai
4. Refactoring - Safe code changes

===============================================================================
*/

// =================== BASIC INTERFACE WITH OPTIONAL PROPERTY ===================

// Interface define karna - chai object ka structure
interface chai {
    flavour : string   // Required property - hona hi chahiye
    price : number     // Required property - hona hi chahiye
    milk ?: boolean    // Optional property (? se) - ho bhi sakta hai, na bhi ho
}

// Interface use karna - object create karte time
const masalaChai: chai = {
    flavour : "msala",  // Required property provide ki
    price : 30,         // Required property provide ki
    // milk nahi diya - no error kyunki optional hai
}

// KYU LIKHA: Type safety ke liye - agar wrong property denge toh error aayega
// Example: masalaChai.flavour = 123; // ERROR - string expected

// =================== READONLY PROPERTIES ===================

// Interface with readonly property
interface shop {
    readonly id : number  // Readonly - ek baar set karne ke baad change nahi kar sakte
    name : string         // Normal property - change kar sakte hain
}

const s : shop = { id : 1, name : "chaicode cafe"}
// s.id = 2  // ❌ ERROR - readonly property change nahi kar sakte
s.name = "new cafe" // ✅ Valid - normal property change kar sakte hain

// KYU LIKHA: Immutable data ke liye - ID kabhi change nahi honi chahiye
// Real-world: Database IDs, Configuration values

// =================== FUNCTION TYPE INTERFACE ===================

// Interface for function signature - function ka structure define karta hai
interface discountcalculator {
    (price : number) : number  // Function jo number leta hai aur number return karta hai
}

// Function implement karna jo interface follow kare
const apply50 : discountcalculator = (price : number) => {
  return price - 50;  // Price se 50 minus karke return
}

// Usage
const finalPrice = apply50(100); // Output: 50

// KYU LIKHA: Function signature consistent rakhne ke liye
// Real-world: Callback functions, Event handlers, Strategy pattern

// =================== INTERFACE WITH METHODS ===================

// Interface with method signatures
interface teamachine {
    start() : void  // Method jo kuch return nahi karta
    stop() : void   // Method jo kuch return nahi karta
}

// Object jo interface implement kare
const machine : teamachine = {
    start() {
        console.log("Machine started");  // Start logic
    },
    stop() {
        console.log("Machine stopped");  // Stop logic
    }
}

// Usage
machine.start(); // Output: "Machine started"
machine.stop();  // Output: "Machine stopped"

// KYU LIKHA: Object behavior define karne ke liye
// Real-world: Device controls, State management, API clients

// =================== INDEX SIGNATURE ===================

// Interface with index signature - dynamic properties ke liye
interface chairating {
    [flavor : string ] : number  // Koi bhi string key allowed, value number honi chahiye
}

// Object with dynamic keys
const ratings : chairating = {
    string : 4.5,   // Key: "string", Value: 4.5
    masala : 4,     // Key: "masala", Value: 4
    // Aur bhi keys add kar sakte hain runtime pe
}

// Dynamic access
ratings["ginger"] = 4.2;  // New property add kar sakte hain
ratings["cardamom"] = 4.8;

// KYU LIKHA: Dynamic properties handle karne ke liye
// Real-world: Dictionaries, Maps, Configuration objects, API responses

// =================== DECLARATION MERGING ===================

// Same name ke multiple interfaces automatically merge ho jate hain
interface user {
    name : string  // First declaration
}

interface user {
    age : number   // Second declaration - merge ho jayega pehle wale mein
}

// Final user interface mein dono properties hongi
const u : user = {
    name : "saloni",  // First interface se
    age : 25          // Second interface se
}

// KYU LIKHA: Existing interfaces extend karne ke liye
// Real-world: Third-party library types extend karna, Module augmentation
// Use case: Adding custom properties to existing types

// =================== MULTIPLE INTERFACE INHERITANCE ===================

// Multiple interfaces define karna
interface a { a: string}  // Interface A with property 'a'
interface b { b: string}  // Interface B with property 'b'

// Interface C jo A aur B dono ko extend karta hai
interface c extends a, b { 
    c: string  // C ka apna property
}

// Interface c mein ab teen properties hain: a, b, c
const obj: c = {
    a: "value a",  // Interface a se inherited
    b: "value b",  // Interface b se inherited
    c: "value c"   // Interface c ka own property
}

// KYU LIKHA: Multiple interfaces se properties combine karne ke liye
// Real-world: Mixins, Composition over inheritance, Feature combinations
// Example: interface Admin extends User, Permissions, AuditLog

/*
===============================================================================
                            KEY CONCEPTS SUMMARY
===============================================================================

## 1. BASIC INTERFACE:
- Object structure define karta hai
- Type safety provide karta hai
- Optional properties (?) se flexibility

## 2. READONLY:
- Immutable properties ke liye
- Constructor/initialization mein set karte hain
- Baad mein change nahi kar sakte

## 3. FUNCTION TYPE INTERFACE:
- Function signature define karta hai
- Consistent function types ke liye
- Callbacks aur event handlers mein useful

## 4. METHOD SIGNATURES:
- Object behavior define karta hai
- Implementation details hide karta hai
- Contract-based programming

## 5. INDEX SIGNATURE:
- Dynamic properties allow karta hai
- Dictionary/Map pattern
- Runtime pe keys add kar sakte hain

## 6. DECLARATION MERGING:
- Same name ke interfaces merge ho jate hain
- Existing types extend karne ke liye
- Library augmentation

## 7. MULTIPLE INHERITANCE:
- Multiple interfaces extend kar sakte hain
- Code reuse aur composition
- Complex types build karne ke liye

===============================================================================

## REAL-WORLD USE CASES:

1. BASIC INTERFACE: API response types, Form data
2. READONLY: Configuration, Constants, IDs
3. FUNCTION TYPES: Event handlers, Callbacks, Validators
4. METHODS: Service interfaces, Repository patterns
5. INDEX SIGNATURE: Translations, Settings, Cache
6. DECLARATION MERGING: Extending third-party types
7. MULTIPLE INHERITANCE: Role-based permissions, Feature flags

===============================================================================
*/