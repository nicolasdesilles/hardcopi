export function convertHardmathToLatex(input) {
  var output = ' '; //Init the output string

  //Iterating over the input array, that should be made of hardmath blocs
  input.forEach(bloc => {
    if (bloc === null) {
      output = output + ' ';
    } else if (bloc.type === 'greekChar') {
      output = output + '\\' + bloc.attributes.value + ' ';
    } else if (bloc.type === 'decimal') {
      output = output + bloc.attributes.value + ' ';
    } else if (bloc.type === 'latinChar') {
      output = output + bloc.attributes.value + ' ';
    } else if (bloc.type === 'delimiterChar') {
      if (bloc.attributes.value === '{') {
        output = output + '\\left{ ';
      }
      if (bloc.attributes.value === '}') {
        output = output + '\\right} ';
      }
      if (bloc.attributes.value === '(') {
        output = output + '\\left( ';
      }
      if (bloc.attributes.value === ')') {
        output = output + '\\right) ';
      }
      if (bloc.attributes.value === '[') {
        output = output + '\\left[ ';
      }
      if (bloc.attributes.value === ']') {
        output = output + '\\right] ';
      }
    } else if (bloc.type === 'symbolChar') {
      if (bloc.attributes.value === 'infinity') {
        output = output + '\\infty ';
      }
      if (bloc.attributes.value === 'in') {
        output = output + '\\in ';
      }
    } else if (bloc.type === 'numberSetChar') {
      if (bloc.attributes.value === 'real') {
        output = output + '\\mathbb{R} ';
      }
      if (bloc.attributes.value === 'complex') {
        output = output + '\\mathbb{C} ';
      }
      if (bloc.attributes.value === 'decimal') {
        output = output + '\\mathbb{D} ';
      }
      if (bloc.attributes.value === 'rational') {
        output = output + '\\mathbb{Q} ';
      }
    } else if (bloc.type === 'basicOperatorChar') {
      if (bloc.attributes.value === '*') {
        output = output + '\\times ';
      } else {
        output = output + bloc.attributes.value;
      }
    } else if (bloc.type === 'indexChar') {
      output = output + '_';
    } else if (bloc.type === 'expChar') {
      output = output + '^';
    } else if (bloc.type === 'separatorChar') {
      output = output + bloc.attributes.value;
    } else if (bloc.type === 'sum') {
      output =
        output +
        '\\sum_{' +
        convertHardmathToLatex(bloc.attributes.start) +
        '}^{' +
        convertHardmathToLatex(bloc.attributes.end) +
        '}' +
        convertHardmathToLatex(bloc.attributes.content);
    } else if (bloc.type === 'product') {
      output =
        output +
        '\\prod_{' +
        convertHardmathToLatex(bloc.attributes.start) +
        '}^{' +
        convertHardmathToLatex(bloc.attributes.end) +
        '}' +
        convertHardmathToLatex(bloc.attributes.content);
    } else if (bloc.type === 'union') {
      output =
        output +
        '\\bigcup_{' +
        convertHardmathToLatex(bloc.attributes.start) +
        '}^{' +
        convertHardmathToLatex(bloc.attributes.end) +
        '}' +
        convertHardmathToLatex(bloc.attributes.content);
    } else if (bloc.type === 'intersection') {
      output =
        output +
        '\\bigcap_{' +
        convertHardmathToLatex(bloc.attributes.start) +
        '}^{' +
        convertHardmathToLatex(bloc.attributes.end) +
        '}' +
        convertHardmathToLatex(bloc.attributes.content);
    }
  });
  //Return the converted string
  return output;
}
