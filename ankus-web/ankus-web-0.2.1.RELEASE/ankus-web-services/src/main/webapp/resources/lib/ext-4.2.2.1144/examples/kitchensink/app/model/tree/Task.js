Ext.define('KitchenSink.model.tree.Task', {
    extend: 'Ext.data.TreeModel',
    fields: [
        {
            name: 'task',
            type: 'string'
        },
        {
            name: 'user',
            type: 'string'
        },
        {
            name: 'duration',
            type: 'float'
        },
        {
            name: 'done',
            type: 'boolean'
        }
    ]
}); 