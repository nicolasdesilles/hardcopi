<template>
  <v-app>
    <SideMenu />
    <v-content>
      <v-container>
        <v-row align="stretch" justify="space-between">
          <v-col>
            <Editor />
          </v-col>
          <v-col cols="1">
            <div style="position: fixed">
              <EditorToolbar />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Editor from "@/components/Editor.vue";
import EditorToolbar from "@/components/EditorToolbar.vue";
import SideMenu from "@/components/SideMenu.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    SideMenu,
    Editor,
    Footer,
    EditorToolbar,
  },
};
</script>
