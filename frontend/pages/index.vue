<template>
  <v-layout
    column
    justify-center
    align-center
    ref="content"
    class="content"
  >
    <v-row>
      <v-col
        v-for="(pic, i) in picList"
        :key="i"
        class="col-4 my-16"
        >
      <img :src=pic ref="targetImage" :id=i @click="next(i)" width="300" />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { getAbsolutePosition } from '~/plugins/getAbsolutePosition'
import anime from 'animejs/lib/anime.es.js'
export default {
  data () {
    return {
      picList: ["img01@2x.jpg", "img02@2x.jpg", "img03@2x.jpg", "img04@2x.jpg", "img05@2x.jpeg"],
      picId: null
    }
  },
  components: {
    Logo,
    VuetifyLogo
  },
  methods:{
    next: function(id){
      this.picId = id
      this.$router.push("/"+id)
    },
    setImageData(picId) {
      const node = this.$refs.targetImage;
      node[picId].style.opacity = 0
      console.log("setImageData node[picId]:", node[picId].style)
      // const wrapRect = this.$refs.content.getBoundingClientRect();
      const itemRect = getAbsolutePosition(node[picId])
      console.log("itemRect",itemRect)

      // 遷移後の画像の位置を取得
      const styleObj = {
        top: `${itemRect.top/*  - wrapRect.top */}px`,
        left: `${itemRect.left/*  - wrapRect.left */}px`,
        width: `${node[picId].clientWidth}px`
      }

      //node.style.opacity = 0;

      // ダミー画像に情報を渡す
      Promise.resolve(
        this.$nuxt.$emit('layoutImageMove', {
          styleObj: styleObj,
          node: node[picId]
        })
      ).then(()=>{
        // ページの不透明度を1にする
        anime({
          targets: this.$refs.content,
          opacity: [0, 1],
          easing: 'easeInOutQuart',
          duration: 800,
          complete: ()=>{
            console.log("content show complete")
          }
        });
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    // クリックした記事の情報を取得
    const component = this.$refs.targetImage.find((x) => {
        return x.id === String(this.picId)
    });
    // 遷移前の画像の位置を取得
    const src = component.src;
    console.log("src:",src)
    const pos = getAbsolutePosition(component)
    console.log(pos)
    const styleObj = {
      top: `${pos.top}px`,
      left: `${pos.left}px`,
      width: `${component.clientWidth}px`,
    }
    // ダミー画像に位置と画像のURLを渡す
    this.$nuxt.$emit('layoutImage', {
      src: src,
      styleObj: styleObj
    });
    const scrollElement = window.document.scrollingElement || window.document.body || window.document.documentElement;
    // ページを上部に移動
    anime({
      targets: scrollElement,
      scrollTop: 0,
      easing: 'easeInOutQuart',
      duration: 800,
      complete: () => {
        console.log("scrollTop complete")
      }
    });
    // ページの不透明度を0にアニメーション
    anime({
      targets: this.$refs.content,
      opacity: [1, 0],
      easing: 'easeInOutQuart',
      duration: 800,
      complete: ()=>{
        next()
      }
    });
  },
  beforeRouteEnter(to, from, next) {
    if(from.name === null) {
      next(vm => {
          //vm.styleObj.opacity = 1;
          console.log("this:",vm)
          anime({
            targets: vm.$refs.content,
            opacity: [0, 1],
            easing: 'easeInOutQuart',
            duration: 800,
            complete: ()=>{
              console.log("content show complete")
            }
          })
      });
    }
    else {
      console.log("from.params.id:",from.params.id)
      // 遷移時にアニメーションを実行
      next(vm => vm.setImageData(from.params.id));
    }
  },
}
</script>

<style>
.content{
  opacity: 0;
}
</style>
