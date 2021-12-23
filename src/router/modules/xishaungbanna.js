export default [
  {
    path: "/bpxishuangbanna",
    name: "bpxishuangbanna",
    component: () => import('@/components/baopan/xishuang/index.vue')
  },
  {
    path: "/bpxishuangbannacanjian",
    name: "bpxishuangbannacanjian",
    component: () => import('@/components/baopan/xishuang/canjian.vue')
  },
  {
    path: "/bpxishuangbannabanzu",
    name: "bpxishuangbannabanzu",
    component: () => import('@/components/baopan/xishuang/banzu.vue')
  }
];