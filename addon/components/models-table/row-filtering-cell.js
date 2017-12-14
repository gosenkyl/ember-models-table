import Component from '@ember/component';
import {get, set, computed} from '@ember/object';
import {debounce} from '@ember/runloop';
import layout from '../../templates/components/models-table/row-filtering-cell';

/**
 * Filter-row cell used within [models-table/row-filtering](Components.ModelsTableRowFiltering.html).
 *
 * ```hbs
 * {{#models-table data=data columns=columns as |mt|}}
 *   {{#mt.table as |table|}}
 *     {{#table.header as |header|}}
 *       {{#header.row-filtering as |rf|}}
 *         {{#each rs.visibleProcessedColumns as |column|}}
 *           {{rf.row-filtering-cell column=column}}
 *         {{/each}}
 *       {{/header.row-filtering}}
 *       {{! ... }}
 *     {{/table.header}}
 *     {{! ... }}
 *   {{/mt.table}}
 *   {{! .... }}
 * {{/models-table}}
 * ```
 *
 * @namespace Components
 * @class ModelsTableRowFilteringCell
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'th',
  classNameBindings: ['themeInstance.theadCell', 'column.className', 'filteringClassName'],

  filteringClassName: computed('column.useFilter', 'themeInstance.theadCellNoFiltering', function () {
    return get(this, 'column.useFilter') ? '' : get(this, 'themeInstance.theadCellNoFiltering');
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
   * @property column
   * @default null
   * @type ModelsTableColumn
   */
  column: null,

  /**
   * Closure action {{#crossLink "Components.ModelsTable/actions.sendAction:method"}}ModelsTable.actions.sendAction{{/crossLink}}
   *
   * @event sendAction
   */
  sendAction: null,

  /**
   * Bound from {{#crossLink "Components.ModelsTable/_selectedItems:property"}}ModelsTable._selectedItems{{/crossLink}}
   *
   * @property selectedItems
   * @default null
   * @type object[]
   */
  selectedItems: null,

  /**
   * Bound from {{#crossLink "Components.ModelsTable/_expandedItems:property"}}ModelsTable._expandedItems{{/crossLink}}
   *
   * @property expandedItems
   * @default null
   * @type object[]
   */
  expandedItems: null,

  /**
   * Bound from {{#crossLink "Components.ModelsTable/debounceFilterTime:property"}}ModelsTable.debounceFilterTime{{/crossLink}}
   *
   * @property debounceFilterTime
   * @type number
   * @default 0
   */
  debounceFilterTime: 0,

  /**
   * Closure action {{#crossLink "Components.ModelsTable/actions.expandAllRows:method"}}ModelsTable.actions.expandAllRows{{/crossLink}}
   *
   * @event expandAllRows
   */
  expandAllRows: null,

  /**
   * Closure action {{#crossLink "Components.ModelsTable/actions.collapseAllRows:method"}}ModelsTable.actions.collapseAllRows{{/crossLink}}
   *
   * @event collapseAllRows
   */
  collapseAllRows: null,

  /**
   * Closure action {{#crossLink "Components.ModelsTable/actions.toggleAllSelection:method"}}ModelsTable.actions.toggleAllSelection{{/crossLink}}
   *
   * @event toggleAllSelection
   */
  toggleAllSelection: null,

  _value: computed('column.filterString', {
    get(){
      return get(this, 'column.filterString');
    },
    set(k, v){
      return v;
    }
  }),

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
    set(this, 'column.filterString', value);
  }

});
