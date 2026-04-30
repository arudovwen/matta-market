import { addCollection } from "@iconify/vue";

// Import icon data from locally installed @iconify-json packages.
// This prevents @iconify/vue from fetching icons from external APIs at runtime,
// which would be blocked by the Content Security Policy.

// --- Icon sets confirmed used in this project ---

// Social icons (AppFooter)
import antDesign from "@iconify-json/ant-design/icons.json";
import akarIcons from "@iconify-json/akar-icons/icons.json";
import lineMd from "@iconify-json/line-md/icons.json";
import fe from "@iconify-json/fe/icons.json";

// General UI icons
import fa6Solid from "@iconify-json/fa6-solid/icons.json";
import faSolid from "@iconify-json/fa-solid/icons.json";
import faRegular from "@iconify-json/fa-regular/icons.json";
import ph from "@iconify-json/ph/icons.json";

// Heroicons — modern prefix (heroicons:) and legacy v1 prefixes (heroicons-outline:, heroicons-solid:)
import heroicons from "@iconify-json/heroicons/icons.json";
import heroiconsOutline from "@iconify-json/heroicons-outline/icons.json";
import heroiconsSolid from "@iconify-json/heroicons-solid/icons.json";

// Additional icon sets used across components
import flatColorIcons from "@iconify-json/flat-color-icons/icons.json";
import gravityUi from "@iconify-json/gravity-ui/icons.json";
import iconParkOutline from "@iconify-json/icon-park-outline/icons.json";
import letsIcons from "@iconify-json/lets-icons/icons.json";
import pepIconsPencil from "@iconify-json/pepicons-pencil/icons.json";
import pepIconsPop from "@iconify-json/pepicons-pop/icons.json";
import simpleLineIcons from "@iconify-json/simple-line-icons/icons.json";
import fluentMdl2 from "@iconify-json/fluent-mdl2/icons.json";

// Pre-installed sets (carbon, logos, ri, tabler)
import carbon from "@iconify-json/carbon/icons.json";
import logos from "@iconify-json/logos/icons.json";
import ri from "@iconify-json/ri/icons.json";
import tabler from "@iconify-json/tabler/icons.json";

export default defineNuxtPlugin(() => {
  // Social
  addCollection(antDesign);
  addCollection(akarIcons);
  addCollection(lineMd);
  addCollection(fe);

  // FA icons
  addCollection(fa6Solid);
  addCollection(faSolid);
  addCollection(faRegular);

  // General UI
  addCollection(ph);

  // Heroicons (all prefixes)
  addCollection(heroicons);
  addCollection(heroiconsOutline);
  addCollection(heroiconsSolid);

  // Additional sets
  addCollection(flatColorIcons);
  addCollection(gravityUi);
  addCollection(iconParkOutline);
  addCollection(letsIcons);
  addCollection(pepIconsPencil);
  addCollection(pepIconsPop);
  addCollection(simpleLineIcons);
  addCollection(fluentMdl2);

  // Pre-installed sets
  addCollection(carbon);
  addCollection(logos);
  addCollection(ri);
  addCollection(tabler);
});
