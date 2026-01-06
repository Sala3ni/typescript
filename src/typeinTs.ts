// TYPE INFERENCE - TypeScript automatically infers type as 'string'
let drink = "chai"; // TypeScript samajh gaya ki ye string hai
drink = "chai"; // Valid assignment

// TYPE INFERENCE - TypeScript infers type as 'number' (union type: 1 | 2)
let cups = Math.random() > 0.5 ? 1 : 2; // TypeScript ne samjha ki ye number hai

// TYPE INFERENCE - Automatically inferred as 'string'
let channelName = "chaiaurcode"; // No explicit type needed

// TYPE ANNOTATION - Explicitly declaring type as 'string'
let chaiflavour: string = " masala chai"; // Hum ne manually bataya ki ye string hai
chaiflavour = " ginger chai"; // Valid string assignment

// TYPE ANNOTATION - Explicitly declaring type as 'boolean'
let chaiorder: boolean = true; // Manual type declaration