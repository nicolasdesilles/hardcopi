@{%
const moo = require("moo");

const lexer = moo.compile({
    MWS: /[ \t]+/,
    specialSymbol: {match: 'infini', type: moo.keywords({
        'kw-specialSymbol': 'infini',
    })},
    variable: /[a-zA-Z]+/,
    decimal:  /(?:-)?[0-9]+(?:(?:\.)?[0-9]*)/,
    delimiterChar: /[\(\)\[\]\{\}]+/,
    
    
});

function returnDecimal(data) {
    var decimal = parseFloat(data[0].value)
    return {
        type: 'decimal',
        attributes: {
            value: decimal
        }
    }
}

function returnBasicOperator(operator) {
    return {
        type: 'basicOperator',
        attributes: {
            value: operator
        }
    }
}

function returnVariable(variable) {
    let greekChars = [
        "alpha",
        "beta",
        "gamma",
        "delta",
        "epsilon",
        "zeta",
        "eta",
        "theta",
        "iota",
        "kappa",
        "lambda",
        "mu",
        "nu",
        "xi",
        "omikron",
        "pi",
        "rho",
        "sigma",
        "tau",
        "upsilon",
        "phi",
        "chi",
        "psi",
        "omega",
        "Alpha",
        "Beta",
        "Gamma",
        "Delta",
        "Epsilon",
        "Zeta",
        "Eta",
        "Theta",
        "Iota",
        "Kappa",
        "Lambda",
        "Mu",
        "Nu",
        "Xi",
        "Omikron",
        "Pi",
        "Rho",
        "Sigma",
        "Tau",
        "Upsilon",
        "Phi", 
        "Chi",
        "Psi",
        "Omega"
    ]
    if (greekChars.includes(variable.value)) {
        return {
            type: 'variable',
            attributes: {
                alphabet: "greek",
                value: variable.value
            }
        }
    } else {
        return {
            type: 'variable',
            attributes: {
                alphabet: "latin",
                value: variable.value
            }
        }
    }
}

function returnSum(index, start, end) {
    return {
        type: 'sum',
        attributes: {
            index: index,
            start: start,
            end: end
        }
    }
}

function returnNumberSetChar(numberSet) {
    return {
        type: 'numberSet',
        attributes: {
            value: numberSet
        }
    }
}

function returnSpecialSymbol(symbol) {
    return {
        type: 'specialSymbol',
        attributes: {
            value: symbol
        }
    }
}

function returnDelimiterChar(delimiter) {
    return {
        type: 'delimiterChar',
        attributes: {
            value: delimiter
        }
    }
}
%}

@lexer lexer

input -> bloc:* {% id %}

bloc ->
         %MWS mathChar:+ {% (data) => data[1][0] %}
    |    %MWS sum {% (data) => data[1] %}


sum -> 
         %MWS "somme"  %MWS variable  %MWS operatorIndex  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(data[3], data[5], data[7]) %}
    |    %MWS "somm"  %MWS variable  %MWS operatorIndex  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(data[3], data[5], data[7]) %}
    |    %MWS "som"  %MWS variable  %MWS operatorIndex  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(data[3], data[5], data[7]) %}
    |    %MWS "somme"  %MWS variable  %MWS "="  %MWS operatorIndex  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(data[3], data[7], data[9]) %}
    |    %MWS "somm"  %MWS variable  %MWS "="  %MWS operatorIndex  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(data[3], data[7], data[9]) %}
    |    %MWS "som"  %MWS variable  %MWS "="  %MWS operatorIndex  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(data[3], data[7], data[9]) %}
    |    %MWS "somme"  %MWS "de"  %MWS operatorIndex  %MWS "à"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(returnVariable(["latin","k"]), data[5], data[9]) %}
    |    %MWS "somm"  %MWS "de"  %MWS operatorIndex  %MWS "à"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(returnVariable(["latin","k"]), data[5], data[9]) %}
    |    %MWS "som"  %MWS "de"  %MWS operatorIndex  %MWS "à"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(returnVariable(["latin","k"]), data[5], data[9]) %}
    |    %MWS "somme"  %MWS operatorIndex  %MWS "à"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(returnVariable(["latin","k"]), data[3], data[7]) %}
    |    %MWS "somm"  %MWS operatorIndex  %MWS "à"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(returnVariable(["latin","k"]), data[3], data[7]) %}
    |    %MWS "som"  %MWS operatorIndex  %MWS "à"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(returnVariable(["latin","k"]), data[3], data[7]) %}
    |    %MWS "somme"  %MWS operatorIndex  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(returnVariable(["latin","k"]), data[3], data[5]) %}
    |    %MWS "somm"  %MWS operatorIndex  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(returnVariable(["latin","k"]), data[3], data[5]) %}
    |    %MWS "som"  %MWS operatorIndex  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(returnVariable(["latin","k"]), data[3], data[5]) %}
    |    %MWS "somme"  %MWS operatorIndex  %MWS "sur"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(data[3], data[7], null) %}
    |    %MWS "somm"  %MWS operatorIndex  %MWS "sur"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(data[3], data[7], null) %}
    |    %MWS "som"  %MWS operatorIndex  %MWS "sur"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(data[3], data[7], null) %}
    |    %MWS "somme"  %MWS "sur"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(null, data[5], null) %}
    |    %MWS "somm"  %MWS "sur"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(null, data[5], null) %}
    |    %MWS "som"  %MWS "sur"  %MWS operatorIndex  %MWS "de":* {% (data) => returnSum(null, data[5], null) %}

mathChar -> 
        variable {% id %}
    |   decimal {% id %} 
    |   specialSymbol {% id %}
    |   numberSetChar {% id %}
    |   basicOperator {% id %}
    |   delimiterChar {% id %}

basicOperator ->
        "=" {% (data) => returnBasicOperator("equal") %}
    |   "+" {% (data) => returnBasicOperator("plus") %}
    |   "-" {% (data) => returnBasicOperator("minus") %}
    |   "/" {% (data) => returnBasicOperator("division") %}
    |   "*" {% (data) => returnBasicOperator("times") %}
    |   "egal" {% (data) => returnBasicOperator("equal") %}
    |   "égal" {% (data) => returnBasicOperator("equal") %}
    |   "plus" {% (data) => returnBasicOperator("plus") %}
    |   "moins" {% (data) => returnBasicOperator("minus") %}
    |   "fois" {% (data) => returnBasicOperator("times") %}

operatorIndex ->
        mathChar:+ {% (data) => data[0][0] %}

variable -> %variable {% (data) => returnVariable(data[0]) %}

numberSetChar ->
        "reel" {% (data) => returnNumberSetChar("real") %}
    |   "réel" {% (data) => returnNumberSetChar("real") %}
    |   "reels" {% (data) => returnNumberSetChar("real") %}
    |   "réels" {% (data) => returnNumberSetChar("real") %}
    |   "complexe" {% (data) => returnNumberSetChar("complex") %}
    |   "complex" {% (data) => returnNumberSetChar("complex") %}
    |   "complexes" {% (data) => returnNumberSetChar("complex") %}
    |   "complexs" {% (data) => returnNumberSetChar("complex") %}
    |   "decimal" {% (data) => returnNumberSetChar("decimal") %}
    |   "décimal" {% (data) => returnNumberSetChar("decimal") %}
    |   "decimaux" {% (data) => returnNumberSetChar("decimal") %}
    |   "décimaux" {% (data) => returnNumberSetChar("decimal") %}
    |   "rationnel" {% (data) => returnNumberSetChar("rational") %}
    |   "rationel" {% (data) => returnNumberSetChar("rational") %}
    |   "rationels" {% (data) => returnNumberSetChar("rational") %}
    |   "rationels" {% (data) => returnNumberSetChar("rational") %}

specialSymbol -> %specialSymbol {% (data) => returnSpecialSymbol(data[0].value) %}

delimiterChar -> %delimiterChar {% (data) => returnDelimiterChar(data[0].value) %}

decimal -> %decimal {%(data) => returnDecimal(data)%}
