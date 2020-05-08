<template>
  <v-row justify="center">
    <v-col>
      <v-btn-toggle
        v-model="$store.state.editorToolbarState.activeStylesButtons"
        color="primary"
        dense
        group
        multiple
      >
        <v-btn :value="1" text @click="setTextBold">
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>

        <v-btn :value="2" text @click="setTextItalic">
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>

        <v-btn :value="3" text @click="setTextUnderline">
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>
      </v-btn-toggle>

      <div class="mx-4"></div>

      <v-btn-toggle
        v-model="$store.state.editorToolbarState.activeTextSize"
        color="primary"
        dense
        group
        mandatory
      >
        <v-btn :value="1" text @click="setTextSizeNormal">
          <v-icon>mdi-format-text</v-icon>
        </v-btn>

        <v-btn :value="2" text @click="setTextSizeH1">
          <v-icon>mdi-format-header-1</v-icon>
        </v-btn>

        <v-btn :value="3" text @click="setTextSizeH2">
          <v-icon>mdi-format-header-2</v-icon>
        </v-btn>
      </v-btn-toggle>

      <div class="mx-4"></div>

      <v-btn-toggle
        v-model="$store.state.editorToolbarState.activeTextAlign"
        color="primary"
        dense
        group
        mandatory
      >
        <v-btn :value="1" text @click="setTextAlignLeft">
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>

        <v-btn :value="2" text @click="setTextAlignCenter">
          <v-icon>mdi-format-align-center</v-icon>
        </v-btn>

        <v-btn :value="3" text @click="setTextAlignRight">
          <v-icon>mdi-format-align-right</v-icon>
        </v-btn>

        <v-btn :value="4" text @click="setTextAlignJustify">
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>
      </v-btn-toggle>

      <div class="mx-4"></div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      activeTextAlign: this.$store.state.editorToolbarState.activeTextAlign,
      activeStylesButtons: this.$store.state.editorToolbarState
        .activeStylesButtons,
      activeTextSize: this.$store.state.editorToolbarState.activeTextSize,
    };
  },
  methods: {
    setTextBold() {
      if (this.editor.getFormat().bold) {
        this.editor.format("bold", false);
      } else {
        this.editor.format("bold", true);
      }
    },
    setTextItalic() {
      if (this.editor.getFormat().italic) {
        this.editor.format("italic", false);
      } else {
        this.editor.format("italic", true);
      }
    },
    setTextUnderline() {
      if (this.editor.getFormat().underline) {
        this.editor.format("underline", false);
      } else {
        this.editor.format("underline", true);
      }
    },
    setTextAlignLeft() {
      this.editor.format("align", false);
    },
    setTextAlignCenter() {
      this.editor.format("align", "center");
    },
    setTextAlignRight() {
      this.editor.format("align", "right");
    },
    setTextAlignJustify() {
      this.editor.format("align", "justify");
    },
    setTextSizeNormal() {
      this.editor.format("header", false);
    },
    setTextSizeH1() {
      this.editor.format("header", 1);
    },
    setTextSizeH2() {
      this.editor.format("header", 2);
    },
  },
  computed: {
    editor() {
      console.log("Fetching editor from Vuex state...");
      return this.$store.state.editor;
    },
  },
};
</script>

<style>
.v-btn-toggle {
  flex-direction: column;
}
</style>
