<template>
  <div class="home">
    <el-container>
      <el-aside width="300px">
        <el-button type="default" @click="setActiveValue('恒大')">恒大</el-button>
        <el-button type="default" @click="setActiveValue('二手房')">二手房</el-button>
      </el-aside>
      <el-main>
        <quill-editor ref="myQuillEditor" v-model="content"></quill-editor>
        <el-button type="primary" @click="getText">get text</el-button>
        <el-button type="primary" @click="getContent">get contents</el-button>
        <el-button type="primary" @click="insert">insert</el-button>
        <el-button @click="dialogVisible = true" type="text">Open Dialog</el-button>
      </el-main>
    </el-container>
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
  import Delta from 'quill-delta'
  import Quill from 'quill'
  Quill.register('modules/counter', function(quill, options) {
    debugger
    var container = document.querySelector('#counter');
    quill.on('text-change', function() {
      var text = quill.getText();
      console.log(text)
      //用这种方法计算字数有几个问题，我们以后会解决
      container.innerText = text.split(/\s+/).length;
    });
  });

  export default {
    name: 'home',
    components: {
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    data() {
      return {
        dialogVisible: false,
        lastRangeIndex: 0,
        content:''
      };
    },
    created() {

    },
    mounted() {
      const _this = this

      this.editor.on('selection-change', function(range, oldRange, source) {
        if (range) {
          this.lastRangeIndex = range.index
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
      setActiveValue(text) {
        this.activeValue = text
        console.log(this.lastRangeIndex)
        this.editor.updateContents(new Delta()
            .insert(text)
        )
      },
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
