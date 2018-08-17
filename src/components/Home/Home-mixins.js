export default {
  data() {
    return {
      asideList: [],
      iconList: ['icon-user', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'],
      collapse: false
    }
  },
  created() {
    this.getasideList()
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    async getasideList() {
      const {
        data: res
      } = await this.$ajax.get('menus')
      if (res.meta.status !== 200) return this.$message.error('获取列表失败!')
      this.asideList = res.data
    }
  }
}
