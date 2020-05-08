@{%
const moo = require("moo");

const lexer = moo.compile({
    ws: /[ \t]/,
    decimal:  /[0-9]+(?:(?:\.)?[0-9]*)/,
    nullKW: ['null','vide'],
    symbolChar: [
        'infini',
        'infty',
        'infinity',
        'in',
        'dans',
        ],
    numberSetChar: [
        'réel',
        'reel',
        'réels',
        'reels',
        'complexes',
        'complexe',
        'complex',
        'complexs',
        'decimal',
        'décimal',
        'decimaux',
        'décimaux',
        'rationel',
        'rationels',
        'rationnel',
        'rationnels'
        ],
    sumTypeOperatorKW: [
        'somme',
        'somm',
        'som',
        'produit',
        'produi',
        'produ',
        'prod',
        'pro',
        'union',
        'unio',
        'uni',
        'intersection',
        'intersectio',
        'intersecti',
        'intersect'
        ],
    sumTypeOperatorStartKW: ['bas','bottom'],
    sumTypeOperatorEndKW: ['haut','top'],
    sumTypeOperatorContentKW: ['de','content'],
    envEndKW: ['end','fin'],
    greekChar: [
        'alpha',
        'beta',
        'gamma',
        'delta',
        'epsilon',
        'zeta',
        'eta',
        'theta',
        'iota',
        'kappa',
        'lambda',
        'mu',
        'nu',
        'xi',
        'omikron',
        'pi',
        'rho',
        'sigma',
        'tau',
        'upsilon',
        'phi',
        'chi',
        'psi',
        'omega',
        'Alpha',
        'Beta',
        'Gamma',
        'Delta',
        'Epsilon',
        'Zeta',
        'Eta',
        'Theta',
        'Iota',
        'Kappa',
        'Lambda',
        'Mu',
        'Nu',
        'Xi',
        'Omikron',
        'Pi',
        'Rho',
        'Sigma',
        'Tau',
        'Upsilon',
        'Phi', 
        'Chi',
        'Psi',
        'Omega'
        ],
    latinChar: /[a-zA-Z]/,
    basicOperatorChar: /[\+\-\/\*\=]/,
    indexChar: /[\_]/,
    expChar: /[\^]/,
    delimiterChar: /[\(\)\[\]\{\}]/,
    separatorChar: /[\.\,\:]/
});

//Format functions return objects in the format {type:'objectType', attributes: {key1: '...', key2: '...', etc}}

function formatBloc(data) {
    var output = []
    data.forEach(elmt => output.push(elmt[1]))
    return output
}

function formatDecimal(data) {
    var decimal = parseFloat(data[0].value)
    return {
        type: 'decimal',
        attributes: {
            value: decimal
        }
    }
}

function formatGreekChar(data) {
    return {
        type: 'greekChar',
        attributes: {
            value: data[0].value
        }
    }
}

function formatLatinChar(data) {
    return {
        type: 'latinChar',
        attributes: {
            value: data[0].value
        }
    }
}

function formatDelimiterChar(data) {
    return {
        type: 'delimiterChar',
        attributes: {
            value: data[0].value
        }
    }
}

function formatSymbolChar(symbol) {
    let infini = [
        'infini',
        'infty',
        'infinity',
    ]
    let dans = [
        'dans',
        'in',
        'un',
    ]
    if (infini.includes(symbol)) {
        return {
            type: 'symbolChar',
            attributes: {
                value: 'infinity'
            }
        }
    } else if (dans.includes(symbol)) {
        return {
            type: 'symbolChar',
            attributes: {
                value: 'in'
            }
        }
    }
    
}

function formatNumberSetChar(numberSet) {
    let real = [
        'réel',
        'reel',
        'réels',
        'reels',
    ]
    let complex = [
        'complexes',
        'complexe',
        'complex',
        'complexs',
    ]
    let decimal = [
        'decimal',
        'décimal',
        'decimaux',
        'décimaux',
    ]
    let rational = [
        'rationel',
        'rationels',
        'rationnel',
        'rationnels'
    ]
    if (real.includes(numberSet)) {
        return {
            type: 'numberSetChar',
            attributes: {
                value: 'real'
            }
        }
    } else if (complex.includes(numberSet)) {
        return {
            type: 'numberSetChar',
            attributes: {
                value: 'complex'
            }
        }
    } else if (decimal.includes(numberSet)) {
        return {
            type: 'numberSetChar',
            attributes: {
                value: 'decimal'
            }
        }
    } else if (rational.includes(numberSet)) {
        return {
            type: 'numberSetChar',
            attributes: {
                value: 'rational'
            }
        }
    }
    
}

function formatBasicOperatorChar(data) {
    return {
        type: 'basicOperatorChar',
        attributes: {
            value: data[0].value
        }
    }
}

function formatIndexChar(data) {
    return {
        type: 'indexChar',
        attributes: {
            value: data[0].value
        }
    }
}

function formatExpChar(data) {
    return {
        type: 'expChar',
        attributes: {
            value: data[0].value
        }
    }
}

function formatSeparatorChar(data) {
    return {
        type: 'separatorChar',
        attributes: {
            value: data[0].value
        }
    }
}

function formatSumTypeOperator(data) {

    var kw = data[0].value
    var start = data[3]
    var end = data[6]
    var content = data[9]

    let sum = [
        'somme',
        'somm',
        'som',
    ]
    let product = [
        'produit',
        'produi',
        'produ',
        'prod',
        'pro',
    ]
    let union = [
        'union',
        'unio',
        'uni',
    ]
    let intersection = [
        'intersection',
        'intersectio',
        'intersecti',
        'intersect'
    ]
    if (sum.includes(kw)) {
        return {
            type: 'sum',
            attributes: {
                start: start,
                end: end,
                content: content
            }
        }
    } else if (product.includes(kw)) {
        return {
            type: 'product',
            attributes: {
                start: start,
                end: end,
                content: content
            }
        }
    } else if (union.includes(kw)) {
        return {
            type: 'union',
            attributes: {
                start: start,
                end: end,
                content: content
            }
        }
    } else if (intersection.includes(kw)) {
        return {
            type: 'intersection',
            attributes: {
                start: start,
                end: end,
                content: content
            }
        }
    }
}
%}

@lexer lexer

input -> (%ws:* bloc):+ {% (data) => formatBloc(data[0]) %}

bloc ->
        mathChar {% id %}
    |   sumTypeOperator {% id %}

sumTypeOperator -> 
        %sumTypeOperatorKW %ws %ws sumTypeOperatorStart %ws %ws sumTypeOperatorEnd %ws %ws sumTypeOperatorContent %ws %ws %envEndKW {% (data) => formatSumTypeOperator(data) %}

sumTypeOperatorStart -> 
        %sumTypeOperatorStartKW "(" (%ws:* bloc):+ ")" {% (data) => formatBloc(data[2]) %} #Optional complete syntax
    |   (%ws:* bloc):+ {% (data) => formatBloc(data[0]) %} #Short handy syntax

sumTypeOperatorEnd -> 
        %sumTypeOperatorEndKW "(" (%ws:* bloc):+ ")" {% (data) => formatBloc(data[2]) %} #Optional complete syntax
    |   (%ws:* bloc):+ {% (data) => formatBloc(data[0]) %} #Short handy syntax

sumTypeOperatorContent -> 
        %sumTypeOperatorContentKW "(" (%ws:* bloc):+ ")" {% (data) => formatBloc(data[2]) %} #Optional complete syntax
    |   (%ws:* bloc):+ {% (data) => formatBloc(data[0]) %} #Short handy syntax

mathChar -> #Look at the moo.compile for characters reference
        variable {% id %}
    |   %decimal {% (data) => formatDecimal(data) %}
    |   %delimiterChar {% (data) => formatDelimiterChar(data) %}
    |   %symbolChar {% (data) => formatSymbolChar(data[0].value) %}
    |   %basicOperatorChar {% (data) => formatBasicOperatorChar(data) %}
    |   %numberSetChar {% (data) => formatNumberSetChar(data[0].value) %}
    |   %indexChar {% (data) => formatIndexChar(data) %}
    |   %expChar {% (data) => formatExpChar(data) %}
    |   %expChar {% (data) => formatSeparatorChar(data) %}
    |   %nullKW {% (data) => null %}

variable -> 
        %greekChar {% (data) => formatGreekChar(data) %}
    |   %latinChar {% (data) => formatLatinChar(data) %}

