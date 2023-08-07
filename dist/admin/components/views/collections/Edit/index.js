"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_i18next_1 = require("react-i18next");
const Config_1 = require("../../../utilities/Config");
const Auth_1 = require("../../../utilities/Auth");
const usePayloadAPI_1 = __importDefault(require("../../../../hooks/usePayloadAPI"));
const RenderCustomComponent_1 = __importDefault(require("../../../utilities/RenderCustomComponent"));
const Default_1 = __importDefault(require("./Default"));
const formatFields_1 = __importDefault(require("./formatFields"));
const buildStateFromSchema_1 = __importDefault(require("../../../forms/Form/buildStateFromSchema"));
const Locale_1 = require("../../../utilities/Locale");
const DocumentInfo_1 = require("../../../utilities/DocumentInfo");
const EditDepth_1 = require("../../../utilities/EditDepth");
const EditView = (props) => {
    var _a, _b;
    const { collection: incomingCollection, isEditing } = props;
    const { slug, admin: { components: { views: { Edit: CustomEdit, } = {}, } = {}, } = {}, } = incomingCollection;
    const [fields] = (0, react_1.useState)(() => (0, formatFields_1.default)(incomingCollection, isEditing));
    const [collection] = (0, react_1.useState)(() => ({ ...incomingCollection, fields }));
    const [redirect, setRedirect] = (0, react_1.useState)();
    const locale = (0, Locale_1.useLocale)();
    const { serverURL, routes: { admin, api } } = (0, Config_1.useConfig)();
    const { params: { id } = {} } = (0, react_router_dom_1.useRouteMatch)();
    const history = (0, react_router_dom_1.useHistory)();
    const [internalState, setInternalState] = (0, react_1.useState)();
    const [updatedAt, setUpdatedAt] = (0, react_1.useState)();
    const { user } = (0, Auth_1.useAuth)();
    const userRef = (0, react_1.useRef)(user);
    const { getVersions, getDocPermissions, docPermissions, getDocPreferences } = (0, DocumentInfo_1.useDocumentInfo)();
    const { t } = (0, react_i18next_1.useTranslation)('general');
    const [{ data, isLoading: isLoadingData, isError }] = (0, usePayloadAPI_1.default)((isEditing ? `${serverURL}${api}/${slug}/${id}` : null), { initialParams: { 'fallback-locale': 'null', depth: 0, draft: 'true' }, initialData: null });
    const buildState = (0, react_1.useCallback)(async (doc, overrides) => {
        const preferences = await getDocPreferences();
        const state = await (0, buildStateFromSchema_1.default)({
            fieldSchema: overrides.fieldSchema,
            preferences,
            data: doc || {},
            user: userRef.current,
            id,
            operation: 'update',
            locale,
            t,
            ...overrides,
        });
        setInternalState(state);
    }, [getDocPreferences, id, locale, t]);
    const onSave = (0, react_1.useCallback)(async (json) => {
        var _a, _b;
        getVersions();
        getDocPermissions();
        setUpdatedAt((_a = json === null || json === void 0 ? void 0 : json.doc) === null || _a === void 0 ? void 0 : _a.updatedAt);
        if (!isEditing) {
            setRedirect(`${admin}/collections/${collection.slug}/${(_b = json === null || json === void 0 ? void 0 : json.doc) === null || _b === void 0 ? void 0 : _b.id}`);
        }
        else {
            buildState(json.doc, {
                fieldSchema: collection.fields,
            });
        }
    }, [admin, getVersions, isEditing, buildState, getDocPermissions, collection]);
    (0, react_1.useEffect)(() => {
        if (fields && (isEditing ? data : true)) {
            const awaitInternalState = async () => {
                setUpdatedAt(data === null || data === void 0 ? void 0 : data.updatedAt);
                buildState(data, {
                    operation: isEditing ? 'update' : 'create',
                    fieldSchema: fields,
                });
            };
            awaitInternalState();
        }
    }, [isEditing, data, buildState, fields]);
    (0, react_1.useEffect)(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [history, redirect]);
    if (isError) {
        return (react_1.default.createElement(react_router_dom_1.Redirect, { to: `${admin}/not-found` }));
    }
    const apiURL = `${serverURL}${api}/${slug}/${id}?locale=${locale}${collection.versions.drafts ? '&draft=true' : ''}`;
    const action = `${serverURL}${api}/${slug}${isEditing ? `/${id}` : ''}?locale=${locale}&depth=0&fallback-locale=null`;
    const hasSavePermission = (isEditing && ((_a = docPermissions === null || docPermissions === void 0 ? void 0 : docPermissions.update) === null || _a === void 0 ? void 0 : _a.permission)) || (!isEditing && ((_b = docPermissions === null || docPermissions === void 0 ? void 0 : docPermissions.create) === null || _b === void 0 ? void 0 : _b.permission));
    const isLoading = !internalState || !docPermissions || isLoadingData;
    return (react_1.default.createElement(EditDepth_1.EditDepthContext.Provider, { value: 1 },
        react_1.default.createElement(RenderCustomComponent_1.default, { DefaultComponent: Default_1.default, CustomComponent: CustomEdit, componentProps: {
                id,
                isLoading,
                data,
                collection,
                permissions: docPermissions,
                isEditing,
                onSave,
                internalState,
                hasSavePermission,
                apiURL,
                action,
                updatedAt: updatedAt || (data === null || data === void 0 ? void 0 : data.updatedAt),
            } })));
};
exports.default = EditView;
//# sourceMappingURL=index.js.map