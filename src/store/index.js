import Vue from 'vue';
import Vuex from 'vuex';
import * as diff from 'diff';

const nearley = require('nearley');
const grammar = require('./modules/hardmath/hardmathGrammar.js');
const interpreter = require('./modules/hardmath/hardmathInterpreter.js');

Vue.config.devtools = process.env.NODE_ENV === 'development';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editor: {},
    editorToolbarState: {
      activeTextAlign: 1,
      activeStylesButtons: [],
      activeTextSize: 1
    },
    oldText: '',
    firstCharOfMathModeCommand: false,
    mathMode: false,
    mathModeStartIndex: 0,
    mathModeEndIndex: 0
  },
  mutations: {
    UPDATE_EDITOR_STATE(state, editor) {
      state.editor = editor;
    },
    UPDATE_EDITOR_TOOLBAR_STATE(state) {
      let currentFormat = state.editor.getFormat();

      var newStyles = [];
      var newActiveTextAlign;
      var newActiveTextSize;
      if (currentFormat.bold) {
        newStyles.push(1);
      }
      if (currentFormat.italic) {
        newStyles.push(2);
      }
      if (currentFormat.underline) {
        newStyles.push(3);
      }
      if (currentFormat.align === 'center') {
        newActiveTextAlign = 2;
      } else if (currentFormat.align === 'right') {
        newActiveTextAlign = 3;
      } else if (currentFormat.align === 'justify') {
        newActiveTextAlign = 4;
      } else {
        newActiveTextAlign = 1;
      }
      if (currentFormat.header === 2) {
        newActiveTextSize = 3;
      } else if (currentFormat.header === 1) {
        newActiveTextSize = 2;
      } else {
        newActiveTextSize = 1;
      }

      state.editorToolbarState.activeTextAlign = newActiveTextAlign;
      state.editorToolbarState.activeStylesButtons = newStyles;
      state.editorToolbarState.activeTextSize = newActiveTextSize;
    },
    LISTEN_FOR_COMMANDS(state, newText) {
      //Looking for differences in text
      var delta = diff.diffChars(state.oldText, newText);

      delta.forEach(change => {
        //Looking for mathModeChar
        if (change.value === '$' && change.added) {
          if (state.firstCharOfMathModeCommand && state.mathMode === false) {
            //Opening mathMode

            var startSelection = state.editor.getSelection();
            console.log('MathMode opened at index ', startSelection.index);

            state.mathModeStartIndex = startSelection.index;
            state.mathMode = true;
            state.firstCharOfMathModeCommand = false;
          } else if (
            state.firstCharOfMathModeCommand &&
            state.mathMode === true
          ) {
            //Closing mathMode

            var endSelection = state.editor.getSelection();
            state.mathModeEndIndex = endSelection.index - 2;
            console.log('MathMode closed');

            //Fetching the content to parse
            var mathModeContent = state.editor.getText(
              state.mathModeStartIndex,
              state.mathModeEndIndex - state.mathModeStartIndex
            );

            //Creating a Parser object from hardmath grammar
            const parser = new nearley.Parser(
              nearley.Grammar.fromCompiled(grammar)
            );

            //Parsing the mathModeContent with hardmath
            parser.feed(mathModeContent);

            var convertedContent = interpreter.convertHardmathToLatex(
              parser.results[0]
            );

            console.log('TextContent : ', mathModeContent);
            console.log('ConvertedContent : ', convertedContent);

            //deleting the text in mathMode
            state.editor.deleteText(
              state.mathModeStartIndex - 2,
              state.mathModeEndIndex + 4 - state.mathModeStartIndex
            );
            //Rendering LaTeX
            state.editor.insertEmbed(
              state.mathModeStartIndex - 2,
              'formula',
              '\\displaystyle ' + convertedContent
            );

            //Reset the booleans
            state.mathMode = false;
            state.firstCharOfMathModeCommand = false;
          } else {
            //Listening for another mathModeCommand char
            state.firstCharOfMathModeCommand = true;
          }
        }
        //Looking for open parenthesis
        if (change.value === '(' && change.added) {
          let selection = state.editor.getSelection();
          console.log('Parenthesis opened at index ', selection.index);

          //Inserting parenthesis
          state.editor.insertText(selection.index, ')');
        }

        //Looking for open bracket
        if (change.value === '[' && change.added) {
          let selection = state.editor.getSelection();
          console.log('Bracket opened at index ', selection.index);

          //Inserting parenthesis
          state.editor.insertText(selection.index, ']');
        }

        //Looking for open bracket
        if (change.value === '{' && change.added) {
          let selection = state.editor.getSelection();
          console.log('Bracket opened at index ', selection.index);

          //Inserting parenthesis
          state.editor.insertText(selection.index, '}');
        }
      });
      state.oldText = newText;
    }
  },
  actions: {},
  modules: {}
});
