import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'

// Cross-browser support (https://github.com/karol-f/vue-custom-element#optional-polyfill)
import 'document-register-element/build/document-register-element';

import Grader from './Grader.vue'

Vue.use(VueCustomElement);
Vue.customElement('htw-grader', Grader);
