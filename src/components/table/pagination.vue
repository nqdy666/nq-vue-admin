<template>
  <div class="inner-box" @click.self="hideSelect">
    <div class="pagination-info">
      <span class="mr10" @click="hideSelect">总计 ：{{pagination.total}}</span>
      <span @click="hideSelect">每页显示：</span>
      <div class="size-select">
        <div @click.prevent="selectClick">
          <div class="select_select"></div>
          <div class="select_tags">
            <input type="text" v-model="pagination.size" disabled />
          </div>
        </div>
        <ul v-show="selectShow" class="select_content">
          <li v-for="option in sizeOptions" @click.prevent="sizeChange(option)">
            {{option}}
          </li>
        </ul>
      </div>
      <span @click="hideSelect">条，总页数：{{Math.ceil(pagination.total / pagination.size)}}</span>
      <div class="page-num">
        <span>跳至</span>
        <input type="text" name="pagenum"
           v-model="current"
           @keyup.enter="handleClickJump">
        <span>页</span>
        <button class="button is-outlined" @click.prevent="handleClickJump">跳转</button>
      </div>
    </div>
    <nav class="right-page-nav">
      <ul class="pagination">
        <li v-if="pagination.page > 1">
          <a aria-label="Previous" @click.prevent="changePage(pagination.page - 1)">
            <span aria-hidden="true" class="black">上一页</span>
          </a>
        </li>
        <li v-for="num in array" :class="{'active': num == pagination.page}">
          <a @click.prevent="changePage(num)">{{ num }}</a>
        </li>
        <li v-if="pagination.page < _lastPage">
          <a aria-label="Next" @click.prevent="changePage(pagination.page + 1)">
            <span aria-hidden="true" class="black">下一页</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        sizeOptions: ['5', '10', '20', '50'],
        selectShow: false,
        current: 1
      }
    },
    computed: {
      _lastPage () {
        return Math.ceil(this.pagination.total / this.pagination.size)
      },
      _offset () {
        return this.pagination.offset || 5
      },
      _curPage () {
        return this.pagination.page || 1
      },
      array () {
        const { page } = this.pagination
        let from, to
        const lOffset = this._offset % 2 === 0
          ? Math.ceil((this._offset - 1) / 2)
          : (this._offset - 1) / 2

        // 当页码为1或最后一页时
        if (page === 1 || page === this._lastPage) {
          // 当页码为1时，直接将to置为_offset
          if (page === 1) {
            from = 1
            to = this._offset
            if (to > this._lastPage) {
              to = this._lastPage
            }
          }
          // 当页码为最后一页时，直接将to置为_lastPage from置为to-_offset+1
          if (page === this._lastPage) {
            to = this._lastPage
            from = to - this._offset + 1
            if (from < 1) {
              from = 1
            }
          }
        } else {
          // 2, 3
          from = page - lOffset
          to = page + lOffset
          if (from < 1) {
            from = 1
            to = from + this._offset - 1
            if (to > this._lastPage) {
              to = this._lastPage
            }
          } else {
            if (to > this._lastPage) {
              to = this._lastPage
            }
          }
        }

        const arr = []
        while (from <= to) {
          arr.push(from)
          from++
        }
        return arr
      }
    },
    methods: {
      changePage (page) {
        this.pagination.page = page
        this.current = page
        this.callback()
      },
      hideSelect () {
        this.selectShow = false
      },
      selectClick () {
        this.selectShow = !this.selectShow
      },
      sizeChange (newSize) {
        if (this.pagination.size !== newSize) {
          this.pagination.page = 1
          this.pagination.size = newSize
          this.callback()
        }
        this.selectShow = false
      },
      handleClickJump (e) {
        let val
        const _val = this.current

        if (_val === '') {
          val = _val
        } else if (this.pageValid(_val)) {
          val = this._curPage
        } else {
          val = Number(_val)
        }
        this.current = val
        this.changePage(val)
      },
      pageValid (val) {
        return isNaN(Number(val)) || Number(val) < 1 || Number(val) > this._lastPage
      }
    },
    watch: {
      pagination (val) {
        this.current = (val && val.page) || 1
      }
    },
    props: {
      pagination: {
        type: Object,
        required: true
      },
      callback: {
        type: Function,
        required: true
      }
    }
  }
</script>
<style lang="less">
  .pagination-box {
    width: 100%;
    background-color: #fafafa;
    box-sizing: border-box;

    .page-num {
      margin-left: 20px;
      input {
        max-width: 100px;
        width: 50px;
        box-sizing: border-box;
        text-align: center;
      }
      button {
        margin-top: -6px;
      }
    }

    .inner-box {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex-direction: row;
    }
    .pagination-info {
      display: inline-flex;
      margin-left: 5px;
      margin-top: 14px;
      font-size: 14px;
      color: #5a5959;
      .mr10 {
        margin-right: 10px;
      }
      .size-select {
        box-sizing: content-box;
        display: block;
        position: relative;
        width: 100%;
        background-color: #FFF;
        text-align: left;
        color: #35495e;
        max-width: 65px;
        top: -5px;
        .select_select {
          width: 30px;
          height: 30px;
          line-height: 16px;
          box-sizing: border-box;
          display: block;
          margin: 0;
          text-decoration: none;
          cursor: pointer;
          position: absolute;
          right: 1px;
          top: 1px;
          padding: 4px 8px;
          text-align: center;
          &:before {
            position: relative;
            right: 0;
            top: 65%;
            color: #999;
            margin-top: 4px;
            border-style: solid;
            border-width: 5px 5px 0;
            border-color: #999 transparent transparent;
            content: "";
          }
        }
        .select_tags {
          min-height: 30px;
          padding: 0 30px 0 8px;
          input {
            width: 30px;
            height: 30px;
            border: none;
            line-height: 30px;
            &:disabled {
              background-color: #fff;
            }
          }
        }
        .select_content {
          bottom: 30px;
          position: absolute;
          list-style: none;
          display: block;
          background: #fff;
          width: 100%;
          max-height: 240px;
          overflow: auto;
          padding: 0;
          margin: 0;
          z-index: 50;
          li {
            background: #e6e6e6;
            border-bottom: 1px solid #fff;
            border-top: none;
            padding: 2px 0 2px 8px;
            color: #000;
            cursor: pointer;
          }
        }
      }
    }
    .pagination {
      margin-top: 4px;
    }
    .pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus {
      color: #9c9c9c;
      background-color: #e6e6e6;
      border-color: #adadad;
    }
    .pagination > li > a, .pagination > li > span {
      padding: 8px 10px;
      font-size: 14px;
      color: #737373;
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #ccc;
    }
    .black {
      color: black;
    }
    .right-page-nav {
      margin-top: 6px;
      margin-right: 8px;
    }
  }
</style>
