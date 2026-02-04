/*
===============================================================================
                        TYPESCRIPT OBJECTS - COMPLETE BEGINNER GUIDE
===============================================================================

## OBJECT KYA HAI?
Object ek data structure hai jo related properties aur methods ko ek saath store karta hai.
JavaScript mein objects key-value pairs hote hain, TypeScript mein type safety add hoti hai.

## JAVASCRIPT vs TYPESCRIPT OBJECTS:

JavaScript mein:
const chai = {
    name: "masala chai",
    price: 20
};
chai.name = 123;  // No error, but wrong type!

TypeScript mein:
const chai = {
    name: "masala chai",  // TS infers: string
    price: 20            // TS infers: number
};
chai.name = 123;  // ERROR: Type 'number' is not assignable to type 'string'

===============================================================================
*/

// =================== BASIC OBJECT CREATION ===================

// 1. OBJECT LITERAL - Sabse common way
const chai = {
    name: "masala chai",    // TypeScript automatically infers: string
    price: 20,              // TypeScript automatically infers: number
    available: true         // TypeScript automatically infers: boolean
};

// Object properties access karna
console.log(chai.name);     // "masala chai"
console.log(chai.price);    // 20

// Properties modify karna
chai.price = 25;            // ✅ Valid - same type
chai.available = false;     // ✅ Valid - same type

// ❌ GALAT - Wrong type assign karna
// chai.name = 123;         // ERROR: Type 'number' is not assignable to type 'string'
// chai.price = "expensive"; // ERROR: Type 'string' is not assignable to type 'number'

// =================== EXPLICIT TYPE ANNOTATION ===================

// Object ka type explicitly define karna
const explicitChai: {
    name: string;
    price: number;
    available: boolean;
} = {
    name: "ginger chai",
    price: 22,
    available: true
};

// =================== OPTIONAL PROPERTIES ===================

// Optional properties - ho bhi sakte hain, na bhi ho
const flexibleChai: {
    name: string;           // Required
    price: number;          // Required
    description?: string;   // Optional (? se)
    discount?: number;      // Optional
} = {
    name: "cardamom chai",
    price: 30
    // description aur discount nahi diye - no error!
};

// Optional properties safely access karna
console.log(flexibleChai.description?.toUpperCase()); // Safe access with ?.
console.log(flexibleChai.discount || 0);              // Default value

// =================== READONLY PROPERTIES ===================

const readonlyChai: {
    readonly id: number;        // Readonly - change nahi kar sakte
    readonly createdAt: Date;   // Readonly
    name: string;               // Normal - change kar sakte hain
    price: number;
} = {
    id: 1,
    createdAt: new Date(),
    name: "special chai",
    price: 35
};

// ✅ SAHI - Normal properties change kar sakte hain
readonlyChai.name = "premium chai";
readonlyChai.price = 40;

// ❌ GALAT - Readonly properties change nahi kar sakte
// readonlyChai.id = 2;           // ERROR
// readonlyChai.createdAt = new Date(); // ERROR

// =================== NESTED OBJECTS ===================

// Object ke andar object
const chaiShop = {
    name: "Chai Point",
    location: {
        city: "Delhi",
        area: "CP",
        pincode: 110001
    },
    menu: {
        masala: { price: 20, available: true },
        ginger: { price: 22, available: true },
        cardamom: { price: 25, available: false }
    },
    owner: {
        name: "Ramu Kaka",
        experience: 15,
        contact: {
            phone: "9876543210",
            email: "ramu@chaipoint.com"
        }
    }
};

// Nested properties access karna
console.log(chaiShop.location.city);           // "Delhi"
console.log(chaiShop.menu.masala.price);       // 20
console.log(chaiShop.owner.contact.phone);     // "9876543210"

// Safe nested access with optional chaining
console.log(chaiShop.owner.contact?.email);    // Safe access

// =================== METHODS IN OBJECTS ===================

const chaiMaker = {
    name: "Chai Master",
    experience: 10,
    
    // Method - function inside object
    makeChai: function(type: string, sugar: number): string {
        return `Making ${type} chai with ${sugar} sugar by ${this.name}`;
    },
    
    // Arrow function method (this binding different hoti hai)
    calculatePrice: (type: string, size: string): number => {
        const basePrice = type === "special" ? 30 : 20;
        return size === "large" ? basePrice * 1.5 : basePrice;
    },
    
    // Shorthand method syntax
    serveChai(order: string) {
        return `Serving ${order} - prepared by ${this.name}`;
    },
    
    // Method with optional parameters
    addExtras(milk?: boolean, sugar?: number) {
        let extras = "";
        if (milk) extras += " with milk";
        if (sugar) extras += ` with ${sugar} sugar`;
        return `Chai${extras}`;
    }
};

// Methods call karna
console.log(chaiMaker.makeChai("masala", 2));
console.log(chaiMaker.calculatePrice("special", "large"));
console.log(chaiMaker.serveChai("ginger chai"));
console.log(chaiMaker.addExtras(true, 3));

// =================== OBJECT DESTRUCTURING ===================

const chaiOrder = {
    id: 101,
    type: "masala chai",
    price: 25,
    customer: "Amit",
    extras: {
        milk: true,
        sugar: 2,
        ginger: true
    }
};

// Basic destructuring
const { id, type, price } = chaiOrder;
console.log(id, type, price); // 101, "masala chai", 25

// Destructuring with renaming
const { customer: customerName, price: chaiPrice } = chaiOrder;
console.log(customerName, chaiPrice); // "Amit", 25

// Nested destructuring
const { extras: { milk, sugar, ginger } } = chaiOrder;
console.log(milk, sugar, ginger); // true, 2, true

// Destructuring with default values
// const { discount = 0, deliveryTime = 15 } = chaiOrder;
// console.log(discount, deliveryTime); // 0, 15 (default values)

// =================== OBJECT SPREAD OPERATOR ===================

const baseChai = {
    type: "tea",
    hot: true,
    price: 20
};

// Spread operator - object copy aur extend karna
const masalaChai = {
    ...baseChai,        // baseChai ki sari properties copy
    type: "masala",     // Override existing property
    spices: ["cardamom", "ginger", "cinnamon"], // Add new property
    price: 25           // Override price
};

console.log(masalaChai);
// { type: "masala", hot: true, price: 25, spices: [...] }

// Multiple objects merge karna
const chaiExtras = {
    milk: true,
    sugar: 2
};

const customerInfo = {
    name: "Rahul",
    phone: "9876543210"
};

const fullOrder = {
    ...baseChai,
    ...chaiExtras,
    ...customerInfo,
    orderTime: new Date()
};

// =================== OBJECT METHODS (Built-in) ===================

const sampleChai = {
    name: "Sample Chai",
    price: 20,
    available: true,
    ingredients: ["tea", "milk"]
};

// Object.keys() - Sari keys ka array
const keys = Object.keys(sampleChai);
console.log(keys); // ["name", "price", "available", "ingredients"]

// Object.values() - Sari values ka array
const values = Object.values(sampleChai);
console.log(values); // ["Sample Chai", 20, true, ["tea", "milk"]]

// Object.entries() - Key-value pairs ka array
const entries = Object.entries(sampleChai);
console.log(entries); 
// [["name", "Sample Chai"], ["price", 20], ["available", true], ...]

// Object.assign() - Objects merge karna
const newChai = Object.assign({}, sampleChai, { price: 25, discount: 5 });

// =================== DYNAMIC PROPERTY ACCESS ===================

const dynamicChai = {
    "masala-chai": 25,
    "ginger-chai": 22,
    "cardamom-chai": 30,
    "green-tea": 20
};

// Bracket notation - dynamic keys ke liye
const chaiType = "masala-chai";
console.log(dynamicChai[chaiType]); // 25

// Dynamic property names
const propertyName = "price";
const dynamicObject = {
    name: "Dynamic Chai",
    [propertyName]: 35,  // Computed property name
    [`${chaiType}-special`]: true
};

// =================== OBJECT TYPE GUARDS ===================

// Object type checking
function isChaiOrder(obj: any): obj is { name: string; price: number } {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.name === "string" &&
        typeof obj.price === "number"
    );
}

// Usage
const unknownData: any = { name: "Test Chai", price: 20 };

if (isChaiOrder(unknownData)) {
    // TypeScript ab jaanta hai ki ye valid chai order hai
    console.log(unknownData.name.toUpperCase()); // Safe to use string methods
    console.log(unknownData.price * 1.1);        // Safe to use number operations
}

// =================== OBJECT IMMUTABILITY ===================

// Object.freeze() - Object ko immutable banana
const frozenChai = Object.freeze({
    name: "Frozen Chai",
    price: 30
});

// ❌ GALAT - Frozen object modify nahi kar sakte
// frozenChai.price = 35;  // Error in strict mode
// frozenChai.name = "New"; // Error in strict mode

// Object.seal() - Properties add/delete nahi kar sakte, modify kar sakte hain
const sealedChai = Object.seal({
    name: "Sealed Chai",
    price: 25
});

sealedChai.price = 30;  // ✅ Modify kar sakte hain
// sealedChai.discount = 5; // ❌ New property add nahi kar sakte

// =================== FACTORY PATTERN ===================

// Objects create karne ke liye function
function createChaiOrder(type: string, price: number, customer: string) {
    return {
        id: Math.random(),
        type,
        price,
        customer,
        createdAt: new Date(),
        status: "pending" as "pending" | "preparing" | "ready" | "delivered"
    };
}

const order1 = createChaiOrder("masala", 25, "John");
const order2 = createChaiOrder("ginger", 22, "Jane");

/*
===============================================================================
                                BEST PRACTICES
===============================================================================

## KYA KARNA CHAHIYE:
✅ Object properties ke liye descriptive names use karo
✅ Optional properties (?) properly handle karo
✅ Readonly properties immutable data ke liye use karo
✅ Type annotations use karo complex objects ke liye
✅ Object destructuring use karo clean code ke liye
✅ Spread operator use karo objects copy/merge ke liye
✅ Type guards use karo unknown objects ke liye

## KYA NAHI KARNA CHAHIYE:
❌ Object properties ko directly modify mat karo agar readonly hain
❌ Nested objects ko deeply modify mat karo without proper checks
❌ any type use mat karo objects ke liye
❌ Object methods mein arrow functions use mat karo agar this chahiye
❌ Dynamic property access without proper validation
❌ Objects ko mutate mat karo agar immutability chahiye

## OBJECT CREATION METHODS:
1. Object Literal: { key: value }
2. Object Constructor: new Object()
3. Object.create(): Object.create(prototype)
4. Factory Functions: function createObject()
5. Classes: class MyClass

## OBJECT ACCESS PATTERNS:
1. Dot notation: obj.property
2. Bracket notation: obj["property"]
3. Destructuring: const { prop } = obj
4. Optional chaining: obj?.prop?.subProp

## OBJECT MODIFICATION:
1. Direct assignment: obj.prop = value
2. Object.assign(): Object.assign(target, source)
3. Spread operator: { ...obj, newProp: value }
4. Delete operator: delete obj.prop

===============================================================================
*/