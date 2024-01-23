<template>
    <nav aria-label="Page navigation" class="my-4 d-flex justify-content-center">
        <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': currentPage === 0 }">
                <a class="page-link" href="#" @click.prevent="prePage">&laquo;</a>
            </li>
            <li class="page-item" v-for="n in pageNum" :key="n" :class="{ 'active': n === currentPage + 1 }">
                <a class="page-link" href="#" @click.prevent="page(n)">{{ n }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === pageNum - 1 }">
                <a class="page-link" href="#" @click.prevent="nextPage">&raquo;</a>
            </li>
        </ul>
    </nav>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
    props: ['products'],
    data() {
        return {
            allData: [],// props進來的資料
            totalPage: [],// 所有被slice完的資料集
            showData: [],// 要顯示的資料
            pageSize: 5,// 每頁幾筆資料
            currentPage: 0// 當前頁面索引
        }
    },
    methods: {
        updateShowData() {
            for (let i = 0; i < this.pageNum; i++) {
                this.totalPage[i] = this.allData.slice(this.pageSize * i, this.pageSize * (i + 1));
            };
            this.showData = this.totalPage[this.currentPage];
            // 調用父層的updateProduct的方法並傳遞參數
            this.$parent.updateProduct(this.showData);
        },
        prePage() {
            if (this.currentPage === 0) {
                return;
            } else {
                this.currentPage--;
                this.showData = this.totalPage[this.currentPage];
                this.updateShowData();
            }
        },
        nextPage() {
            if (this.currentPage === this.pageNum - 1) {
                return;
            } else {
                this.currentPage++;
                this.showData = this.totalPage[this.currentPage];
                this.updateShowData();
            }
        },
        page(num) {
            this.currentPage = num - 1;
            this.showData = this.totalPage[this.currentPage];
            this.updateShowData();
        }
    },
    computed: {
        pageNum() {
            return Math.ceil(this.allData.length / this.pageSize);
        }
    },
    watch: {
        // 為了確保獲取到正確的this.allData，使用watch監聽products的變化，然後在watch中更新allData
        products: {
            handler(newVal) {
                this.allData = newVal;
                this.updateShowData();
            },
            immediate: true
        }
    }
}
</script>