import { addCollection } from "@iconify/vue";

// Only import the absolutely necessary icons for the initial view (Header/Footer/Banner)
// This dramatically reduces the initial bundle size.

import heroicons from "@iconify-json/heroicons/icons.json";
import ph from "@iconify-json/ph/icons.json";
import letsIcons from "@iconify-json/lets-icons/icons.json";
import gravityUi from "@iconify-json/gravity-ui/icons.json";
import antDesign from "@iconify-json/ant-design/icons.json";

export default defineNuxtPlugin(() => {
  // Common UI icons
  addCollection(heroicons);
  addCollection(ph);
  addCollection(letsIcons);
  addCollection(gravityUi);
  addCollection(antDesign);

  // Other icon sets should be loaded dynamically or only on specific pages.
  // For now, we omit the massive collections like 'carbon', 'logos', 'tabler' etc.
  // which were adding 20MB+ to your entry bundle.
});
