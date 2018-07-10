<template>
    <div class="btn-group" v-click-outside="outside">
        <div @click="toggleMenu()" class="dropdown-toggle" v-if="selected !== ''">
          <h4>{{ selected}}</h4>
          <span class="caret"></span>
        </div>

        <div @click="toggleMenu()" class="dropdown-toggle" v-if="selected === ''">
          <h4>{{placeholderText}}</h4>
          <span class="caret"></span>
        </div>

        <ul class="dropdown-menu" v-if="showMenu">
            <li v-for="option in options" :key="option.value" >
                <a href="javascript:void(0)" @click="updateOption(option)" @mouseover="updateHoverValue(option.name)">
                    {{ option.name }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedOption: {
                  name: '',
                },
                showMenu: false,
                placeholderText: 'Bezirk auswälen',
            }
        },
        props: {
            options: {
                type: [Array, Object]
            },
            selected: {},
            placeholder: [String]
        },

        mounted() {
            this.selectedOption = this.selected;
            if (this.placeholder)
            {
                this.placeholderText = this.placeholder;
            }
        },
        // watch: {
        //   selected: function (val) {
        //     this.selected = this.selected;
        //     console.log("chnageddsdadasdas");
        //     // selectedOption.name = this.selected;
        //   }
        // },
        methods: {
            updateOption(option) {
                this.selectedOption = option;
                this.showMenu = false;
                this.$emit('updateOption', this.selectedOption);
            },

            toggleMenu() {
              this.showMenu = !this.showMenu;
            },
            outside: function(e) {
              if(this.showMenu){
                this.showMenu = false;
              }
              this.$emit('updateHoverValue', '');
            },
            updateHoverValue(val){
              this.$emit('updateHoverValue', val);
            }
        },
        directives: {
          'click-outside': {
            bind: function(el, binding, vNode) {

              // Provided expression must evaluate to a function.
              if (typeof binding.value !== 'function') {
                const compName = vNode.context.name
                let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
                if (compName) { warn += `Found in component '${compName}'` }
                
                console.warn(warn)
              }
              // Define Handler and cache it on the element
              const bubble = binding.modifiers.bubble
              const handler = (e) => {
                if (bubble || (!el.contains(e.target) && el !== e.target)) {
                  binding.value(e)
                }
              }
              el.__vueClickOutside__ = handler

              // add Event Listeners
              document.addEventListener('click', handler)
            },
            
            unbind: function(el, binding) {
              // Remove Event Listeners
              document.removeEventListener('click', el.__vueClickOutside__)
              el.__vueClickOutside__ = null

            }
          }
        }
    }
</script>

<style lang="scss" scoped>

  @import "~@/assets/style/variables";

    .btn-group {
        min-width: 160px;
        height: 40px;
        position: relative;
        margin: 10px 1px;
        display: inline-block;
        vertical-align: middle;
        a {
            &:hover {
                text-decoration: none;
                border-bottom: 0px solid;

            }
        }
    }

    .dropdown-toggle {
        color: #000;
        min-width: 160px;
        padding: 10px;
        text-transform: none;
        font-weight: 300;
        margin-bottom: 7px;
        border: 0;
        background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
        background-size: 0 2px, 100% 1px;
        background-repeat: no-repeat;
        background-position: center bottom, center calc(100% - 1px);
        background-color: transparent;
        transition: background 0s ease-out;
        float: none;
        box-shadow: none;
        border-radius: 0;
        // font-family: $font-family-bold;

        &:hover {
          background: #e1e1e1;
          cursor: pointer;
        }

        h4{
          display: inline-block;
        }
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      float: left;
      min-width: 160px;
      padding: 5px 0;
      margin: 2px 0 0;
      list-style: none;
      font-size: 14px;
      text-align: left;
      background-color: #fff;
      border: 1px solid #ccc;
      // border-radius: 4px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
      background-clip: padding-box;
    }

    .dropdown-menu > li > a {
        padding: 10px 30px;
        display: block;
        clear: both;
        font-weight: normal;
        line-height: 1.6;
        color: #333333;
        white-space: nowrap;
        text-decoration: none;

        &:hover {
            background: #efefef;
            color: $tsb-darkblue;
        }
    }

    .dropdown-menu > li {
      overflow: hidden;
      width: 100%;
      position: relative;
      margin: 0
    }

    .caret {
      display: relative;
      width: 0;
      position: relative;
      top: 10px;
      height: 0;
      margin-left: 5px;
      vertical-align: middle;
      border-top: 4px dashed;
      border-top: 4px solid \9;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
      float: right;
    }
</style>
