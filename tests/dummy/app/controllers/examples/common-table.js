import Controller from '@ember/controller';
import {get, computed} from '@ember/object';

export default Controller.extend({
  showComponentFooter: true,
  showColumnsDropdown: true,
  useFilteringByColumns: true,
  showGlobalFilter: true,
  useNumericPagination: false,
  doFilteringByHiddenColumns: false,
  filteringIgnoreCase: false,
  multipleColumnsSorting: true,
  showPageSize: true,
  debounceFilter: false,
  debounceFilterTime: computed('debounceFilter', {
    get(){
      return get(this, "debounceFilter") ? 750 : 0;
    }
  })
});
