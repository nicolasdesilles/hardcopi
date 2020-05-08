<template>
  <v-card>
    <quill-editor
      ref="myQuillEditor"
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
      @focus="onEditorFocus($event)"
    />
  </v-card>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import katex from "katex";
import "katex/dist/katex.js";

export default {
  components: {
    // quill,
    quillEditor
  },
  data() {
    return {
      content: "<h2>I am an example</h2>",
      editorOption: {
        modules: {
          toolbar: ""
        }
      }
    };
  },
  methods: {
    onEditorBlur() {
      console.log("editor blur!");
    },
    onEditorFocus() {
      console.log("editor focus!");
      this.updateActiveStylesButton();
    },
    onEditorReady() {
      console.log("editor ready!");
    },
    onEditorChange({ html, text }) {
      this.$store.commit("UPDATE_EDITOR_STATE", this.$refs.myQuillEditor.quill);
      this.content = html;
      this.updateActiveStylesButton();
      this.$store.commit("LISTEN_FOR_MATHMODE_COMMAND", text);
    },
    updateActiveStylesButton() {
      this.$store.commit("UPDATE_EDITOR_TOOLBAR_STATE");
    }
  },
  mounted() {
    window.katex = katex;
    console.log("Editor mounted. Sending editor to Vuex state...");
    this.$store.commit("UPDATE_EDITOR_STATE", this.$refs.myQuillEditor.quill);
    this.editor.insertEmbed(20, "formula", "\\displaystyle \\sum_{i=0}^n u_n");
  },
  computed: {
    editor() {
      console.log("Fetching editor from Vuex state...");
      return this.$store.state.editor;
    }
  }
};
</script>
