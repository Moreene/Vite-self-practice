<template>
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-info text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ tempProduct.title ? tempProduct.title : '新增新品項' }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearInput"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">新增主圖</label>
                  <input type="text" class="form-control" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <!-- 如果tempProduct.imagesUrl不為空，顯示以下資訊 -->
              <div class="mb-2" v-if="tempProduct.imagesUrl">
                <div class="mb-3" v-for="(item, idx) in tempProduct.imagesUrl" :key="'img' + idx">
                  <label for="imageURL" class="form-label">圖片{{ idx + 1 }}</label>
                  <input v-model="tempProduct.imagesUrl[idx]" type="text" class="form-control" placeholder="請輸入圖片連結">
                  <!-- v-if="item.length"：檢查目前item（圖像 URL）的屬性是否為真
                      - 如果item是undefined或空字串，則條件計算結果為假，則不渲染影像 -->
                  <img class="img-fluid" v-if="item.length" :src="item">
                </div>
                <!-- 若陣列為空或最後一個元素為真，則顯示「新增圖片」按鈕；否則，顯示“刪除圖片”按鈕 -->
                <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl.at(-1)">
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.imagesUrl.push('')">
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                    刪除圖片
                  </button>
                </div>
              </div>
              <!-- 如果tempProduct.imagesUrl為空，則顯示此按鈕，允許新增第一張圖像。 -->
              <!-- tempProduct.imagesUrl=['']替換了數組引用 -->
              <div v-else>
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.imagesUrl = ['']">
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                    v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                    v-model.number="tempProduct.price">
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                  v-model="tempProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                  v-model="tempProduct.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="clearInput">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateProduct">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['tempProduct', 'isNew', 'clearInput'],
  // data() {
  //   return {
  //     productModal: null,
  //   }
  // },
  methods: {
    updateProduct() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
      let http = 'put';

      if (this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
        http = 'post'
      };
      axios[http](url, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.$emit('update');
        }).catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  // mounted() {
  //   this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
  //     keyboard: false,
  //     backdrop: 'static'
  //   });
  // }
}
</script>
