/*
===============================================================================
                    FETCH API WITH TYPESCRIPT
===============================================================================

## FETCH API KYA HAI?
Fetch browser ka built-in API hai HTTP requests ke liye.
Koi external library install nahi karni padti.

## FETCH vs AXIOS:
FETCH: Built-in, lightweight, manual JSON parsing
AXIOS: External library, auto JSON parsing, better error handling

===============================================================================
*/

// =================== INTERFACE FOR API RESPONSE ===================

// API response structure define karna
interface todo {
    id: number,         // Todo ID
    title: string,      // Todo title
    completed: boolean  // Completion status
}

// KYU LIKHA: Type-safe API response ke liye
// BENEFIT: data ka type pata hai, autocomplete works

// =================== FETCH WITH ASYNC/AWAIT ===================

// Async function - Fetch API use karke data fetch karna
const fetchData = async () => {
    try {
        // Step 1: HTTP request bhejni
        const response: Response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
        );
        
        // Response object mein:
        // - response.ok: boolean (status 200-299)
        // - response.status: number (HTTP status code)
        // - response.json(): Promise (JSON parse karta hai)
        
        // Optional: Status check karna
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Step 2: JSON parse karna with type
        const data: todo[] = await response.json();
        // Manual type assertion - fetch automatically type nahi karta
        
        return data;  // Type-safe data return
        
    } catch (error) {
        // Error handling
        console.log(error);
        // Network errors, parsing errors, etc.
        
        // Better error handling:
        // if (error instanceof Error) {
        //     console.error("Error message:", error.message);
        // }
    }
}

// KYU LIKHA:
// 1. Built-in API - No installation needed
// 2. Type safety - Manual type assertion
// 3. Two-step process - fetch then json()

// BENEFIT:
// - No external dependencies
// - Lightweight
// - Modern browsers support

// DRAWBACK:
// - Manual JSON parsing
// - Manual error checking (response.ok)
// - Less features than Axios

// =================== CONSUMING THE FUNCTION ===================

// Promise-based consumption
fetchData().then(data => {
    console.log(data);  // data is todo[] | undefined
    
    // Type-safe access
    // data?.forEach(todo => {
    //     console.log(todo.title);  // ✅ Works
    // });
})

// Alternative: async/await consumption
// const main = async () => {
//     const todos = await fetchData();
//     console.log(todos);
// }
// main();

// KYU LIKHA: Function call karke data use karna
// BENEFIT: Async data ko handle kar sakte hain

/*
===============================================================================
                            KEY DIFFERENCES
===============================================================================

## FETCH API:
✅ Built-in - No installation
✅ Lightweight - Small bundle size
❌ Manual JSON parsing - response.json()
❌ Manual error checking - response.ok
❌ Less features - No interceptors, timeouts

## AXIOS:
✅ Auto JSON parsing - response.data
✅ Better error handling - Automatic for 4xx, 5xx
✅ More features - Interceptors, timeouts, cancel
❌ External dependency - npm install needed
❌ Larger bundle - More code

===============================================================================

## FETCH API STEPS:

1. await fetch(url) - HTTP request
2. Check response.ok - Status validation
3. await response.json() - Parse JSON
4. Type assertion - Manual typing
5. Error handling - try/catch

## COMMON PATTERNS:

// GET request
fetch(url)

// POST request
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})

// With headers
fetch(url, {
    headers: { 'Authorization': 'Bearer token' }
})

===============================================================================

## BEST PRACTICES:

✅ Check response.ok before parsing
✅ Type assertion after json()
✅ Proper error handling
✅ Use async/await over .then()
❌ Don't forget await on json()
❌ Don't ignore error cases

## WHEN TO USE:

USE FETCH:
- Simple GET requests
- No external dependencies needed
- Small projects
- Modern browsers only

USE AXIOS:
- Complex API interactions
- Need interceptors
- Better error handling needed
- Older browser support

===============================================================================
*/