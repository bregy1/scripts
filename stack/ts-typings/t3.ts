

export enum Actions {
    A = 'A',
    B = 'B',
    C = 'C'
}
export enum Prefix {
    X = 'X',
    Y = 'Y'
}

type actType = keyof typeof Actions
type preType = keyof typeof Prefix

type resultsArr = {[key1 in actType]: {[key2 in preType]: string}};

var A: resultsArr; 

// structure of resultsArr:
/*
    A: {
        X: string,
        Y: string
    },
    B: {
        X: string,
        Y: string
    },
    C: {
        X: string,
        Y: string
    }

*/

type together = typeof Prefix & typeof Actions;
type allowed = keyof together;

const mixFunc = (a: actType, b: preType) => { 
    const aKeys = Object.keys(a) as actType[]
    const bKeys = Object.keys(b) as preType[]

    const results = []
    aKeys.forEach(ak => {
        bKeys.forEach(bk => {
            const c = ak + bk as typeof ak & typeof bk
            results.push((ak + bk) as typeof ak + bk)
        })
    })

    return results;  
}


function printSome(arg: allowed): void {
    console.log('value taken:', arg);
}


printSome(Actions.A)
printSome(Actions.B)
printSome(Actions.C)



