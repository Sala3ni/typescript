// 1. TYPEOF GUARD - Union type ko narrow karna
function getchai(kind: string | number){ // Parameter string ya number ho sakta hai
    if(typeof kind === "string"){ // Agar string hai toh
        return `making ${kind} chai......`; // String template use karke chai banane ka message
    }
    return `chai order: ${kind}`; // Agar number hai toh order number show karo

}

// 2. OPTIONAL PARAMETER - msg optional hai (? se)
function servechai(msg? : string ){ // msg parameter optional hai
    if(msg){ // Agar msg provide kiya hai toh
        return `serving ${msg}` // Custom message serve karo
    }
    return `serving default masala chai`; // Nahi toh default chai serve karo

}

// 3. LITERAL UNION TYPES - Sirf specific values allowed
function orderchai(size : "small"| "medium" | "large"){ // Sirf ye 3 sizes allowed
    if(size === "small"){ // Agar small size hai
        return "small cutting chai..."; // Cutting chai banao

    }
    if(size === "medium" || size === "large"){ // Agar medium ya large
        return `make extra chai` // Extra chai banao
    }
    return`chai order #${size}` // Ye line kabhi execute nahi hogi (unreachable code)
}

// 4. CLASS DEFINITIONS - Chai types ke liye classes
class kulhadchai{ // Kulhad chai class
    serve(){ // Serve method
        return `serving kulhad chai ` // Kulhad chai serve karne ka message
    }
}

class cutting{ // Cutting chai class
    serve(){ // Serve method
        return `serving cutting chai ` // Cutting chai serve karne ka message
    }
}

// 5. INSTANCEOF GUARD - Class instance check karna
function serve(chai: kulhadchai | cutting){ // Parameter kulhad ya cutting class ka instance
    if(chai instanceof kulhadchai) { // Agar kulhadchai class ka instance hai
        return chai.serve(); // Kulhad chai serve karo
    }
    // Missing else case - cutting chai handle nahi ho raha

}

// 6. TYPE DEFINITION - Object structure define karna
type  chaiorder = { // Chai order ka structure
    type: string ; // Chai ka type (string)
    sugar: number // Sugar ki quantity (number)
}

// 7. CUSTOM TYPE GUARD - Apna type checking function
function ischaqiorder(obj:any):obj is chaiorder{ // Return type 'obj is chaiorder' type predicate hai
    return( // Multiple conditions check kar rahe hain
        typeof obj === "object" && // Object hai ya nahi
        obj !==null&& // Null nahi hai
        typeof obj.type === "string" && // type property string hai
        typeof obj.sugar === "number" // sugar property number hai
    )
}

// 8. CUSTOM TYPE GUARD USAGE - Apne type guard ka use
function serveorder(item: chaiorder | string ){ // Parameter object ya string
    if(ischaqiorder (item)){ // Agar valid chaiorder object hai
        return `serving ${item.type} chai with ${item.sugar} sugar`; // Object properties access kar sakte hain
    }
    return `serving custom chai : ${item}`; // String case handle karo
}

// 9. DISCRIMINATED UNION TYPES - Common property se differentiate
type maslachai = {type : "masala" ; spicelevel: number}; // Masala chai type
type ginger = {type : "ginger" ; amount: number}; // Ginger chai type
type elaichai = {type : "elaichi" ; aroma: number}; // Elaichi chai type

// 10. UNION OF DISCRIMINATED TYPES
type chai = maslachai | ginger | elaichai; // Teen types ka union

// 11. SWITCH CASE WITH DISCRIMINATED UNIONS
function makechaiorder(order: chai ){ // Parameter koi bhi chai type ho sakta hai
    switch(order.type) { // Common 'type' property se differentiate
        case "masala": // Agar masala type hai
            return `maslachai with spice level ${order.spicelevel}`; // TypeScript knows ye maslachai hai
        case "ginger": // Agar ginger type hai
            return `ginger chai with amount ${order.amount}`; // TypeScript knows ye ginger hai
        case "elaichi": // Agar elaichi type hai
            return `elaichai with aroma ${order.aroma}`; // TypeScript knows ye elaichai hai
    }
}

// 12. 'IN' OPERATOR - Property existence check
function brew (order: maslachai | ginger) { // Sirf masala ya ginger allowed
    if("spicelevel" in order) { // Agar spicelevel property exist karti hai
        return `brewing masala chai with spice level ${order.spicelevel}`; // Masala chai hai
    }
    if("amount" in order) { // Agar amount property exist karti hai
        return `brewing ginger chai with amount ${order.amount}`; // Ginger chai hai
    }
}

// 13. UNKNOWN TYPE GUARD - Runtime type checking
function isstringarray ( arr : unknown): arr is string[] { // Unknown type ko string array check karna
    return Array.isArray(arr) && arr.every(item => typeof item === "string"); // Array hai aur har element string hai
}

/*
===============================================================================
                        TYPE NARROWING - COMPLETE REVISION GUIDE
===============================================================================

## TYPE NARROWING KYA HAI?
Type Narrowing matlab hai ki ek BROAD TYPE (jaise string | number) ko 
SPECIFIC TYPE (sirf string ya sirf number) mein convert karna runtime checks ke through.

## JAVASCRIPT vs TYPESCRIPT DIFFERENCE:

JavaScript mein:
function getchai(kind) {
    if(typeof kind === "string") {
        return `making ${kind} chai`; // kind string hai, but JS ko pata nahi
    }
    return `order: ${kind}`; // kind number hai, but JS ko pata nahi
}

TypeScript mein:
function getchai(kind: string | number) {
    if(typeof kind === "string") {
        return `making ${kind} chai`; // TS KNOWS: kind is definitely string
    }
    return `order: ${kind}`; // TS KNOWS: kind is definitely number
}

## TYPE NARROWING TECHNIQUES:

### 1. TYPEOF GUARD
- Union type ko specific type mein narrow karne ke liye
- Runtime pe type check karta hai
- Example: typeof variable === "string"

### 2. OPTIONAL PARAMETERS (?)
- Parameter optional banane ke liye
- undefined handling ke liye
- Example: function(msg?: string)

### 3. LITERAL UNION TYPES
- Sirf specific values allow karne ke liye
- Typos prevent karne ke liye
- Example: "small" | "medium" | "large"

### 4. INSTANCEOF GUARD
- Class instances ko differentiate karne ke liye
- Object ka constructor check karta hai
- Example: obj instanceof ClassName

### 5. CUSTOM TYPE GUARDS
- Complex objects ko validate karne ke liye
- Runtime safety provide karta hai
- Example: function isType(obj: any): obj is Type

### 6. DISCRIMINATED UNIONS
- Related types ko group karne ke liye
- Common property se differentiate
- Switch cases mein useful

### 7. 'IN' OPERATOR
- Object properties ke basis pe type determine
- Property existence check
- Example: "property" in object

### 8. UNKNOWN TYPE
- any ka safe alternative
- Type guards force karta hai
- Better type safety

## KYU PADHTE HAIN TYPE NARROWING?

1. TYPE SAFETY: Runtime errors prevent karne ke liye
2. INTELLISENSE: Better autocomplete aur suggestions
3. REFACTORING: Code changes safe aur easy
4. DOCUMENTATION: Code self-documenting ban jata hai
5. TEAM WORK: Large teams mein consistent code

## JAVASCRIPT MEIN PROBLEMS:
- Runtime pe pata chalta hai error
- No autocomplete for specific types
- Typos easily ho jate hain
- No compile-time checking

## TYPESCRIPT SOLUTION:
- Compile time pe error catch
- Perfect autocomplete
- Type safety guaranteed
- Better developer experience

## BEST PRACTICES:
1. Hamesha type guards use karo union types ke saath
2. any type avoid karo, unknown use karo
3. Custom type guards banao complex objects ke liye
4. Discriminated unions use karo related types ke liye
5. Optional parameters properly handle karo

===============================================================================
*/