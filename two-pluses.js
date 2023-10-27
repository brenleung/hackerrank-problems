'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'twoPluses' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function checkValidity(currLoc, plusLoc) {
    console.log(currLoc, plusLoc);
    for (let i = 0; i < currLoc.length; i++) {
        if (plusLoc.includes(currLoc[i])) {
            console.log(false)
            return false;
        }
    }
    console.log(true)
    return true;
}

function getProduct(plus_0, plus_1) {
    return (1 + ((plus_0-1) * 4)) * (1 + ((plus_1-1) * 4));
}

function twoPluses(grid, n, m) {
    let plus_0 = 1;
    let plus_0_loc = [];
    let plus_1 = 1;
    let plus_1_loc = [];
    let plus_2 = 1;
    let plus_2_loc = [];
    
    // n = vertical
    // m = horziontal
    // if there are always two good pluses, we can ignore the edges
    for (let i = 1; i < n-1; i++) {  // vertical
        for (let j = 1; j < m-1; j++) {  // horizontal
            console.log(i,j)
            if (grid[i][j] == 'B') {
                continue;
            }
            else { // check for creation of plus
                let currLoc = [];
                let currPlus = 1;
                currLoc.push(String(i)+","+String(j));
                while (i-currPlus >= 0 && i+currPlus < n && j-currPlus >= 0 && j+currPlus < m) {
                    if (grid[i-currPlus][j] == 'G' && grid[i+currPlus][j] == 'G' && grid[i][j-currPlus] == 'G' && grid[i][j+currPlus] == 'G') {
                        // add locations
                        currLoc.push(String(i-currPlus)+","+String(j));
                        currLoc.push(String(i+currPlus)+","+String(j));
                        currLoc.push(String(i)+","+String(j-currPlus));
                        currLoc.push(String(i)+","+String(j+currPlus));
                        
                        currPlus++;
                        if (currPlus > Math.min(plus_0, plus_1) && currPlus > 1 && plus_0_loc.length != 0) {
                            if (((plus_0 >= plus_1) && (checkValidity(currLoc, plus_0_loc) == false)) || ((plus_1 >= plus_0) && (checkValidity(currLoc, plus_1_loc) == false))) {
                                if ((plus_1 == plus_0) && ((checkValidity(currLoc, plus_1_loc) == true) || (checkValidity(currLoc, plus_0_loc) == true))) {
                                    continue;
                                }
                                if (getProduct(plus_2, currPlus) > getProduct(plus_0, plus_1)) {
                                    plus_1 = plus_2;
                                    plus_1_loc = plus_2_loc;
                                    continue;
                                }
                                console.log("splicing lol");
                                currLoc.splice(currLoc.length-4, 4);
                                currPlus--;
                                break;  // leave if it would not be able to go anywhere
                            }
                        }
                    }
                    else {
                        break;
                    }
                }
                
                if (currPlus > Math.min(plus_0, plus_1) && currPlus > 1) {
                    if (plus_0 >= plus_1) { // replace plus_1, check validity of plus_0
                        console.log("checking to replace plus 1")
                        if (checkValidity(currLoc, plus_0_loc)) {
                            plus_2 = plus_1;
                            plus_2_loc = plus_1_loc;
                            plus_1 = currPlus;   
                            plus_1_loc = currLoc;
                            console.log("replacing plus_1_loc");
                            console.log("Still", plus_0_loc, plus_1_loc);
                            break;
                        }
                    }
                    if (plus_0 <= plus_1) {
                        console.log("checking to replace plus 0")
                        if (checkValidity(currLoc, plus_1_loc)) {
                            plus_2 = plus_0;
                            plus_2_loc = plus_0_loc;
                            plus_0 = currPlus;
                            plus_0_loc = currLoc;
                            console.log("replacing plus_0_loc bottom")
                        }
                    }
                    
                    console.log("Still", plus_0_loc, plus_1_loc);
                }
            }
        }
    }
    
    console.log(plus_0, plus_1);
    return getProduct(plus_0, plus_1);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = twoPluses(grid, n, m);

    ws.write(result + '\n');

    ws.end();
}
