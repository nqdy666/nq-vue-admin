<template>
  <aside class="menu app-sidebar animated" >
    <ul class="menu-list">
      <li v-for="item of menu" :key="item.label">
        <a class="touchable" :to="item.link" :is="item.link ? 'router-link' : 'a'" @click="toggle(item, $event)">
          <span class="icon is-small" v-if="item.icon">
            <i :class="['fa', item.icon]" :style="{ 'color': item.color }"></i>
          </span>
          <span>{{ item.label }}</span>
          <span class="icon is-small is-angle" v-if="item.subMenu">
            <i class="fa fa-angle-down"></i>
          </span>
        </a>
        <ul v-show="item.expanded" transition="menu-expand">
          <li v-for="subItem in item.subMenu">
            <router-link class="touchable" :to="subItem.link">{{ subItem.label }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    menu: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    this.initMenuExpand(this.$route)
  },
  computed: {
  },
  methods: {
    toggle (item, $e) {
      if (this.hasCollapse(item)) {
        $e.preventDefault()
        item.expanded = !item.expanded
      }
    },
    hasCollapse (item) {
      return !!item.subMenu
    },
    initMenuExpand (route) {
      for (const item of this.menu) {
        if (this.hasCollapse(item)) {
          if (item.subMenu.filter(subMenuItem => subMenuItem.link === route.path).length) {
            item.expanded = true
            break
          }
        }
      }
    }
  },
  watch: {
    $route (route) {
      this.initMenuExpand(route)
    }
  }
}
</script>
<style lang="less">

.app-sidebar {
  width: 180px;
  min-width: 45px;
  background: #FFF;
  box-shadow: 2px 1px 3px rgba(18, 18, 18, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  .collapsing {
    position: relative;
    height: 0;
    overflow: hidden;
    transition: height .377s ease;
  }
  .menu-list li {
    overflow: hidden;
  }
  .menu-list li a {
    position: relative;
    white-space: nowrap;
    .is-angle {
      position: absolute;
      right: 10px;
      transition: transform .377s ease;
    }
  }
  .menu-list li ul {
    margin: 0 10px;
    transform: translate3d(0, 0, 0);
    > li:first-child {
      padding-top: 10px;
    }
    > li:last-child {
      padding-bottom: 10px;
    }
  }
}
</style>
