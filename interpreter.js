function runBF() {
    const code = document.getElementById('code').value;
    const outputElement = document.getElementById('output');
    outputElement.innerText = ''; 

    const MEM_SIZE = 8; 
    const memory = new Uint8Array(MEM_SIZE); 
    let ptr = 0;   
    let pc = 0;    
    let output = "";

    // Jump Map for loops
    const stack = [];
    const jumps = {};
    for (let i = 0; i < code.length; i++) {
        if (code[i] === '[') stack.push(i);
        else if (code[i] === ']') {
            const start = stack.pop();
            jumps[start] = i;
            jumps[i] = start;
        }
    }

    while (pc < code.length) {
        switch (code[pc]) {
            case '>': ptr = (ptr + 1) % MEM_SIZE; break; // Wrap right
            case '<': ptr = (ptr - 1 + MEM_SIZE) % MEM_SIZE; break; // Wrap left
            case '+': memory[ptr]++; break;
            case '-': memory[ptr]--; break;
            case '.': output += String.fromCharCode(memory[ptr]); break;
            case ',': 
                const val = prompt("Input (1 char):");
                memory[ptr] = val ? val.charCodeAt(0) : 0;
                break;
            case '[': if (memory[ptr] === 0) pc = jumps[pc]; break;
            case ']': if (memory[ptr] !== 0) pc = jumps[pc]; break;
        }
        pc++;
    }
    outputElement.innerText = output || "Done.";
}
