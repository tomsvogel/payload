"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFieldSchemaMap = void 0;
/**
 * **Returns Map with array and block field schemas**
 * - Takes entity fields and returns a Map to retrieve field schemas by path without indexes
 *
 * **Accessing field schemas**
 * - array fields: indexes must be removed from path i.e. `array.innerArray` instead of `array.0.innerArray`
 * - block fields: the block slug must be appended to the path `blocksFieldName.blockSlug` instead of `blocksFieldName`
 *
 * @param entityFields
 * @returns Map<string, Field[]>
 */
const buildFieldSchemaMap = (entityFields) => {
    const fieldMap = new Map();
    const buildUpMap = (fields, builtUpPath = '') => {
        fields.forEach((field) => {
            let nextPath = builtUpPath;
            if (nextPath) {
                if ('name' in field && (field === null || field === void 0 ? void 0 : field.name)) {
                    nextPath = `${nextPath}.${field.name}`;
                }
            }
            else if ('name' in field && (field === null || field === void 0 ? void 0 : field.name)) {
                nextPath = field.name;
            }
            switch (field.type) {
                case 'blocks':
                    field.blocks.forEach((block) => {
                        fieldMap.set(`${nextPath}.${block.slug}`, block.fields);
                        buildUpMap(block.fields, nextPath);
                    });
                    break;
                case 'array':
                    fieldMap.set(nextPath, field.fields);
                    buildUpMap(field.fields, nextPath);
                    break;
                case 'row':
                case 'collapsible':
                case 'group':
                    buildUpMap(field.fields, nextPath);
                    break;
                case 'tabs':
                    field.tabs.forEach((tab) => {
                        nextPath = 'name' in tab ? `${nextPath}.${tab.name}` : nextPath;
                        buildUpMap(tab.fields, nextPath);
                    });
                    break;
                default:
                    break;
            }
        });
    };
    buildUpMap(entityFields);
    return fieldMap;
};
exports.buildFieldSchemaMap = buildFieldSchemaMap;
//# sourceMappingURL=buildFieldSchemaMap.js.map