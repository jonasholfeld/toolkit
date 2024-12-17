import { reactive } from "vue";

export const store = reactive({
  selectedCategory: "",
  bigImage: false,
  bigImageCaption: "",
  mobileMenuOpen: false,
  aboutPostPath: null,
  pageTitle: "",
  previousRoute: "",
});
