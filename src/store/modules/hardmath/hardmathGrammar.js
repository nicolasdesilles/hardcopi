/* eslint-disable */
// Generated automatically by nearley, version 2.19.3
// http://github.com/Hardmath123/nearley
(function() {
  function id(x) {
    return x[0];
  }

  const moo = require('moo');

  const lexer = moo.compile({
    ws: /[ \t]/,
    decimal: /[0-9]+(?:(?:\.)?[0-9]*)/,
    nullKW: ['null', 'vide'],
    symbolChar: ['infini', 'infty', 'infinity', 'in', 'dans'],
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
    sumTypeOperatorStartKW: ['bas', 'bottom'],
    sumTypeOperatorEndKW: ['haut', 'top'],
    sumTypeOperatorContentKW: ['de', 'content'],
    envEndKW: ['end', 'fin'],
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
    var output = [];
    data.forEach(elmt => output.push(elmt[1]));
    return output;
  }

  function formatDecimal(data) {
    var decimal = parseFloat(data[0].value);
    return {
      type: 'decimal',
      attributes: {
        value: decimal
      }
    };
  }

  function formatGreekChar(data) {
    return {
      type: 'greekChar',
      attributes: {
        value: data[0].value
      }
    };
  }

  function formatLatinChar(data) {
    return {
      type: 'latinChar',
      attributes: {
        value: data[0].value
      }
    };
  }

  function formatDelimiterChar(data) {
    return {
      type: 'delimiterChar',
      attributes: {
        value: data[0].value
      }
    };
  }

  function formatSymbolChar(symbol) {
    let infini = ['infini', 'infty', 'infinity'];
    let dans = ['dans', 'in', 'un'];
    if (infini.includes(symbol)) {
      return {
        type: 'symbolChar',
        attributes: {
          value: 'infinity'
        }
      };
    } else if (dans.includes(symbol)) {
      return {
        type: 'symbolChar',
        attributes: {
          value: 'in'
        }
      };
    }
  }

  function formatNumberSetChar(numberSet) {
    let real = ['réel', 'reel', 'réels', 'reels'];
    let complex = ['complexes', 'complexe', 'complex', 'complexs'];
    let decimal = ['decimal', 'décimal', 'decimaux', 'décimaux'];
    let rational = ['rationel', 'rationels', 'rationnel', 'rationnels'];
    if (real.includes(numberSet)) {
      return {
        type: 'numberSetChar',
        attributes: {
          value: 'real'
        }
      };
    } else if (complex.includes(numberSet)) {
      return {
        type: 'numberSetChar',
        attributes: {
          value: 'complex'
        }
      };
    } else if (decimal.includes(numberSet)) {
      return {
        type: 'numberSetChar',
        attributes: {
          value: 'decimal'
        }
      };
    } else if (rational.includes(numberSet)) {
      return {
        type: 'numberSetChar',
        attributes: {
          value: 'rational'
        }
      };
    }
  }

  function formatBasicOperatorChar(data) {
    return {
      type: 'basicOperatorChar',
      attributes: {
        value: data[0].value
      }
    };
  }

  function formatIndexChar(data) {
    return {
      type: 'indexChar',
      attributes: {
        value: data[0].value
      }
    };
  }

  function formatExpChar(data) {
    return {
      type: 'expChar',
      attributes: {
        value: data[0].value
      }
    };
  }

  function formatSeparatorChar(data) {
    return {
      type: 'separatorChar',
      attributes: {
        value: data[0].value
      }
    };
  }

  function formatSumTypeOperator(data) {
    var kw = data[0].value;
    var start = data[3];
    var end = data[6];
    var content = data[9];

    let sum = ['somme', 'somm', 'som'];
    let product = ['produit', 'produi', 'produ', 'prod', 'pro'];
    let union = ['union', 'unio', 'uni'];
    let intersection = [
      'intersection',
      'intersectio',
      'intersecti',
      'intersect'
    ];
    if (sum.includes(kw)) {
      return {
        type: 'sum',
        attributes: {
          start: start,
          end: end,
          content: content
        }
      };
    } else if (product.includes(kw)) {
      return {
        type: 'product',
        attributes: {
          start: start,
          end: end,
          content: content
        }
      };
    } else if (union.includes(kw)) {
      return {
        type: 'union',
        attributes: {
          start: start,
          end: end,
          content: content
        }
      };
    } else if (intersection.includes(kw)) {
      return {
        type: 'intersection',
        attributes: {
          start: start,
          end: end,
          content: content
        }
      };
    }
  }
  var grammar = {
    Lexer: lexer,
    ParserRules: [
      { name: 'input$ebnf$1$subexpression$1$ebnf$1', symbols: [] },
      {
        name: 'input$ebnf$1$subexpression$1$ebnf$1',
        symbols: [
          'input$ebnf$1$subexpression$1$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'input$ebnf$1$subexpression$1',
        symbols: ['input$ebnf$1$subexpression$1$ebnf$1', 'bloc']
      },
      { name: 'input$ebnf$1', symbols: ['input$ebnf$1$subexpression$1'] },
      { name: 'input$ebnf$1$subexpression$2$ebnf$1', symbols: [] },
      {
        name: 'input$ebnf$1$subexpression$2$ebnf$1',
        symbols: [
          'input$ebnf$1$subexpression$2$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'input$ebnf$1$subexpression$2',
        symbols: ['input$ebnf$1$subexpression$2$ebnf$1', 'bloc']
      },
      {
        name: 'input$ebnf$1',
        symbols: ['input$ebnf$1', 'input$ebnf$1$subexpression$2'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'input',
        symbols: ['input$ebnf$1'],
        postprocess: data => formatBloc(data[0])
      },
      { name: 'bloc', symbols: ['mathChar'], postprocess: id },
      { name: 'bloc', symbols: ['sumTypeOperator'], postprocess: id },
      {
        name: 'sumTypeOperator',
        symbols: [
          lexer.has('sumTypeOperatorKW')
            ? { type: 'sumTypeOperatorKW' }
            : sumTypeOperatorKW,
          lexer.has('ws') ? { type: 'ws' } : ws,
          lexer.has('ws') ? { type: 'ws' } : ws,
          'sumTypeOperatorStart',
          lexer.has('ws') ? { type: 'ws' } : ws,
          lexer.has('ws') ? { type: 'ws' } : ws,
          'sumTypeOperatorEnd',
          lexer.has('ws') ? { type: 'ws' } : ws,
          lexer.has('ws') ? { type: 'ws' } : ws,
          'sumTypeOperatorContent',
          lexer.has('ws') ? { type: 'ws' } : ws,
          lexer.has('ws') ? { type: 'ws' } : ws,
          lexer.has('envEndKW') ? { type: 'envEndKW' } : envEndKW
        ],
        postprocess: data => formatSumTypeOperator(data)
      },
      {
        name: 'sumTypeOperatorStart$ebnf$1$subexpression$1$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorStart$ebnf$1$subexpression$1$ebnf$1',
        symbols: [
          'sumTypeOperatorStart$ebnf$1$subexpression$1$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorStart$ebnf$1$subexpression$1',
        symbols: ['sumTypeOperatorStart$ebnf$1$subexpression$1$ebnf$1', 'bloc']
      },
      {
        name: 'sumTypeOperatorStart$ebnf$1',
        symbols: ['sumTypeOperatorStart$ebnf$1$subexpression$1']
      },
      {
        name: 'sumTypeOperatorStart$ebnf$1$subexpression$2$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorStart$ebnf$1$subexpression$2$ebnf$1',
        symbols: [
          'sumTypeOperatorStart$ebnf$1$subexpression$2$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorStart$ebnf$1$subexpression$2',
        symbols: ['sumTypeOperatorStart$ebnf$1$subexpression$2$ebnf$1', 'bloc']
      },
      {
        name: 'sumTypeOperatorStart$ebnf$1',
        symbols: [
          'sumTypeOperatorStart$ebnf$1',
          'sumTypeOperatorStart$ebnf$1$subexpression$2'
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorStart',
        symbols: [
          lexer.has('sumTypeOperatorStartKW')
            ? { type: 'sumTypeOperatorStartKW' }
            : sumTypeOperatorStartKW,
          { literal: '(' },
          'sumTypeOperatorStart$ebnf$1',
          { literal: ')' }
        ],
        postprocess: data => formatBloc(data[2])
      },
      {
        name: 'sumTypeOperatorStart$ebnf$2$subexpression$1$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorStart$ebnf$2$subexpression$1$ebnf$1',
        symbols: [
          'sumTypeOperatorStart$ebnf$2$subexpression$1$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorStart$ebnf$2$subexpression$1',
        symbols: ['sumTypeOperatorStart$ebnf$2$subexpression$1$ebnf$1', 'bloc']
      },
      {
        name: 'sumTypeOperatorStart$ebnf$2',
        symbols: ['sumTypeOperatorStart$ebnf$2$subexpression$1']
      },
      {
        name: 'sumTypeOperatorStart$ebnf$2$subexpression$2$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorStart$ebnf$2$subexpression$2$ebnf$1',
        symbols: [
          'sumTypeOperatorStart$ebnf$2$subexpression$2$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorStart$ebnf$2$subexpression$2',
        symbols: ['sumTypeOperatorStart$ebnf$2$subexpression$2$ebnf$1', 'bloc']
      },
      {
        name: 'sumTypeOperatorStart$ebnf$2',
        symbols: [
          'sumTypeOperatorStart$ebnf$2',
          'sumTypeOperatorStart$ebnf$2$subexpression$2'
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorStart',
        symbols: ['sumTypeOperatorStart$ebnf$2'],
        postprocess: data => formatBloc(data[0])
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$1$subexpression$1$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$1$subexpression$1$ebnf$1',
        symbols: [
          'sumTypeOperatorEnd$ebnf$1$subexpression$1$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$1$subexpression$1',
        symbols: ['sumTypeOperatorEnd$ebnf$1$subexpression$1$ebnf$1', 'bloc']
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$1',
        symbols: ['sumTypeOperatorEnd$ebnf$1$subexpression$1']
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$1$subexpression$2$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$1$subexpression$2$ebnf$1',
        symbols: [
          'sumTypeOperatorEnd$ebnf$1$subexpression$2$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$1$subexpression$2',
        symbols: ['sumTypeOperatorEnd$ebnf$1$subexpression$2$ebnf$1', 'bloc']
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$1',
        symbols: [
          'sumTypeOperatorEnd$ebnf$1',
          'sumTypeOperatorEnd$ebnf$1$subexpression$2'
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorEnd',
        symbols: [
          lexer.has('sumTypeOperatorEndKW')
            ? { type: 'sumTypeOperatorEndKW' }
            : sumTypeOperatorEndKW,
          { literal: '(' },
          'sumTypeOperatorEnd$ebnf$1',
          { literal: ')' }
        ],
        postprocess: data => formatBloc(data[2])
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$2$subexpression$1$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$2$subexpression$1$ebnf$1',
        symbols: [
          'sumTypeOperatorEnd$ebnf$2$subexpression$1$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$2$subexpression$1',
        symbols: ['sumTypeOperatorEnd$ebnf$2$subexpression$1$ebnf$1', 'bloc']
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$2',
        symbols: ['sumTypeOperatorEnd$ebnf$2$subexpression$1']
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$2$subexpression$2$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$2$subexpression$2$ebnf$1',
        symbols: [
          'sumTypeOperatorEnd$ebnf$2$subexpression$2$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$2$subexpression$2',
        symbols: ['sumTypeOperatorEnd$ebnf$2$subexpression$2$ebnf$1', 'bloc']
      },
      {
        name: 'sumTypeOperatorEnd$ebnf$2',
        symbols: [
          'sumTypeOperatorEnd$ebnf$2',
          'sumTypeOperatorEnd$ebnf$2$subexpression$2'
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorEnd',
        symbols: ['sumTypeOperatorEnd$ebnf$2'],
        postprocess: data => formatBloc(data[0])
      },
      {
        name: 'sumTypeOperatorContent$ebnf$1$subexpression$1$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorContent$ebnf$1$subexpression$1$ebnf$1',
        symbols: [
          'sumTypeOperatorContent$ebnf$1$subexpression$1$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorContent$ebnf$1$subexpression$1',
        symbols: [
          'sumTypeOperatorContent$ebnf$1$subexpression$1$ebnf$1',
          'bloc'
        ]
      },
      {
        name: 'sumTypeOperatorContent$ebnf$1',
        symbols: ['sumTypeOperatorContent$ebnf$1$subexpression$1']
      },
      {
        name: 'sumTypeOperatorContent$ebnf$1$subexpression$2$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorContent$ebnf$1$subexpression$2$ebnf$1',
        symbols: [
          'sumTypeOperatorContent$ebnf$1$subexpression$2$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorContent$ebnf$1$subexpression$2',
        symbols: [
          'sumTypeOperatorContent$ebnf$1$subexpression$2$ebnf$1',
          'bloc'
        ]
      },
      {
        name: 'sumTypeOperatorContent$ebnf$1',
        symbols: [
          'sumTypeOperatorContent$ebnf$1',
          'sumTypeOperatorContent$ebnf$1$subexpression$2'
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorContent',
        symbols: [
          lexer.has('sumTypeOperatorContentKW')
            ? { type: 'sumTypeOperatorContentKW' }
            : sumTypeOperatorContentKW,
          { literal: '(' },
          'sumTypeOperatorContent$ebnf$1',
          { literal: ')' }
        ],
        postprocess: data => formatBloc(data[2])
      },
      {
        name: 'sumTypeOperatorContent$ebnf$2$subexpression$1$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorContent$ebnf$2$subexpression$1$ebnf$1',
        symbols: [
          'sumTypeOperatorContent$ebnf$2$subexpression$1$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorContent$ebnf$2$subexpression$1',
        symbols: [
          'sumTypeOperatorContent$ebnf$2$subexpression$1$ebnf$1',
          'bloc'
        ]
      },
      {
        name: 'sumTypeOperatorContent$ebnf$2',
        symbols: ['sumTypeOperatorContent$ebnf$2$subexpression$1']
      },
      {
        name: 'sumTypeOperatorContent$ebnf$2$subexpression$2$ebnf$1',
        symbols: []
      },
      {
        name: 'sumTypeOperatorContent$ebnf$2$subexpression$2$ebnf$1',
        symbols: [
          'sumTypeOperatorContent$ebnf$2$subexpression$2$ebnf$1',
          lexer.has('ws') ? { type: 'ws' } : ws
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorContent$ebnf$2$subexpression$2',
        symbols: [
          'sumTypeOperatorContent$ebnf$2$subexpression$2$ebnf$1',
          'bloc'
        ]
      },
      {
        name: 'sumTypeOperatorContent$ebnf$2',
        symbols: [
          'sumTypeOperatorContent$ebnf$2',
          'sumTypeOperatorContent$ebnf$2$subexpression$2'
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      {
        name: 'sumTypeOperatorContent',
        symbols: ['sumTypeOperatorContent$ebnf$2'],
        postprocess: data => formatBloc(data[0])
      },
      { name: 'mathChar', symbols: ['variable'], postprocess: id },
      {
        name: 'mathChar',
        symbols: [lexer.has('decimal') ? { type: 'decimal' } : decimal],
        postprocess: data => formatDecimal(data)
      },
      {
        name: 'mathChar',
        symbols: [
          lexer.has('delimiterChar') ? { type: 'delimiterChar' } : delimiterChar
        ],
        postprocess: data => formatDelimiterChar(data)
      },
      {
        name: 'mathChar',
        symbols: [
          lexer.has('symbolChar') ? { type: 'symbolChar' } : symbolChar
        ],
        postprocess: data => formatSymbolChar(data[0].value)
      },
      {
        name: 'mathChar',
        symbols: [
          lexer.has('basicOperatorChar')
            ? { type: 'basicOperatorChar' }
            : basicOperatorChar
        ],
        postprocess: data => formatBasicOperatorChar(data)
      },
      {
        name: 'mathChar',
        symbols: [
          lexer.has('numberSetChar') ? { type: 'numberSetChar' } : numberSetChar
        ],
        postprocess: data => formatNumberSetChar(data[0].value)
      },
      {
        name: 'mathChar',
        symbols: [lexer.has('indexChar') ? { type: 'indexChar' } : indexChar],
        postprocess: data => formatIndexChar(data)
      },
      {
        name: 'mathChar',
        symbols: [lexer.has('expChar') ? { type: 'expChar' } : expChar],
        postprocess: data => formatExpChar(data)
      },
      {
        name: 'mathChar',
        symbols: [lexer.has('expChar') ? { type: 'expChar' } : expChar],
        postprocess: data => formatSeparatorChar(data)
      },
      {
        name: 'mathChar',
        symbols: [lexer.has('nullKW') ? { type: 'nullKW' } : nullKW],
        postprocess: data => null
      },
      {
        name: 'variable',
        symbols: [lexer.has('greekChar') ? { type: 'greekChar' } : greekChar],
        postprocess: data => formatGreekChar(data)
      },
      {
        name: 'variable',
        symbols: [lexer.has('latinChar') ? { type: 'latinChar' } : latinChar],
        postprocess: data => formatLatinChar(data)
      }
    ],
    ParserStart: 'input'
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
