import Component from '@ember/component';
import layout from '../../templates/components/models-table/global-filter';
import {get, set, computed} from '@ember/object';
import {debounce} from '@ember/runloop';

/**
 * Global filter element used within [models-table](Components.ModelsTable.html).
 *
 * Its value is used for all data-items and for each columns `propertyName`.
 *
 * Usage example:
 *
 * ```hbs
 * {{#models-table data=data columns=columns as |mt|}}
 *   {{mt.global-filter}}
 *   {{! .... }}
 * {{/models-table}}
 * ```
 *
 * @namespace Components
 * @class ModelsTableGlobalFilter
 * @extends Ember.Component
 */
export default Component.extend({
  layout,

  /**
   * Bound from {{#crossLink "Components.ModelsTable/filterString:property"}}ModelsTable.filterString{{/crossLink}}
   *
   * @property value
   * @type string
   * @default null
   */
  value: null,

  /**
   * Internal value passed to the input.
   *
   * @property _value
   * @type string
   * @default value
   */
  _value: computed("value", {
    get(){
      return get(this, 'value');
    },
    set(k, v){
      return v;
    }
  }),

  /**
   * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
   *
   * @property themeInstance
   * @type object
   * @default null
   */
  themeInstance: null,

  /**
   * Bound from {{#crossLink "Components.ModelsTable/globalFilterUsed:property"}}ModelsTable.globalFilterUsed{{/crossLink}}
   *
   * @property globalFilterUsed
   * @type boolean
   * @default null
   */
  globalFilterUsed: null,

  /**
   * Bound from {{#crossLink "Components.ModelsTable/messages:property"}}ModelsTable.messages{{/crossLink}}
   *
   * @property messages
   * @type object
   * @default null
   */
  messages: null,

  /**
   * Time in milliseconds the filter should be debounced.
   *
   * @type number
   * @property debounceFilterTime
   * @default 0
   */
  debounceFilterTime: 0,

  /**
   * Closure action {{#crossLink "Components.ModelsTable/actions.sendAction:method"}}ModelsTable.actions.sendAction{{/crossLink}}
   *
   * @event sendAction
   */
  sendAction: null,


  actions: {
    onEnter(){
      let enter = get(this, 'enter');
      if(enter){
        enter();
      }
    },

    onUpdate(value){
      set(this, '_value', value);

      debounce(this, this.debounceFilter, value, get(this, 'debounceFilterTime'));
    }
  },

  debounceFilter(value){
    set(this, 'value', value);
  }

});
