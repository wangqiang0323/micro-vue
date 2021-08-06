<template>
  <div class="home">
    <quill-editor ref="myQuillEditor"></quill-editor>
    <el-button type="primary" @click="getText">get text</el-button>
    <el-button type="primary" @click="getContent">get contents</el-button>
    <el-button type="primary" @click="insert">insert</el-button>
    <el-button @click="dialogVisible = true" type="text">Open Dialog</el-button>
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      title="Dialog"
      width="30%">
      <span>dialog message</span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button @click="dialogVisible = false" type="primary">ok</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue';
  import Delta from 'quill-delta';

  export default {
    name: 'home',
    components: {
      HelloWorld,
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
    mounted() {
      const _this = this
      this.editor.on('selection-change', function(range, oldRange, source) {
        debugger
        if (range) {
          if (range.length === 0) {
            console.log('User cursor is on', range.index);
          } else {
            var text = _this.editor.getText(range.index, range.length);
            _this.editor.updateContents(new Delta().insert('Quill'))
            console.log('User has highlighted', text);
          }
        } else {
          console.log('Cursor not in the editor');
        }
      });
    },
    methods: {
      handleClose(done) {
        this.$confirm('Sure to close？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      getText() {
        console.log(this.editor.getText(0, 10))
      },
      getContent() {
        console.log(this.editor.getContents())
      },
      insert() {
        this.editor.insertEmbed(10, 'text', 'https://quilljs.com/images/cloud.png')
      }
    },
  };
</script>
