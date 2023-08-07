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
const Config_1 = require("../../utilities/Config");
const Eyebrow_1 = __importDefault(require("../../elements/Eyebrow"));
const Form_1 = __importDefault(require("../../forms/Form"));
const PreviewButton_1 = __importDefault(require("../../elements/PreviewButton"));
const Save_1 = require("../../elements/Save");
const RenderFields_1 = __importDefault(require("../../forms/RenderFields"));
const CopyToClipboard_1 = __importDefault(require("../../elements/CopyToClipboard"));
const field_types_1 = __importDefault(require("../../forms/field-types"));
const RenderTitle_1 = __importDefault(require("../../elements/RenderTitle"));
const LeaveWithoutSaving_1 = __importDefault(require("../../modals/LeaveWithoutSaving"));
const Meta_1 = __importDefault(require("../../utilities/Meta"));
const Auth_1 = __importDefault(require("../collections/Edit/Auth"));
const OperationProvider_1 = require("../../utilities/OperationProvider");
const ToggleTheme_1 = require("./ToggleTheme");
const Gutter_1 = require("../../elements/Gutter");
const ReactSelect_1 = __importDefault(require("../../elements/ReactSelect"));
const Label_1 = __importDefault(require("../../forms/Label"));
const Loading_1 = require("../../elements/Loading");
const formatDate_1 = require("../../../utilities/formatDate");
const Auth_2 = require("../../utilities/Auth");
require("./index.scss");
const baseClass = 'account';
const DefaultAccount = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const { collection, data, permissions, hasSavePermission, apiURL, initialState, isLoading, action, onSave: onSaveFromProps, } = props;
    const { slug, fields, admin: { useAsTitle, preview, }, timestamps, auth, } = collection;
    const { refreshCookieAsync } = (0, Auth_2.useAuth)();
    const { admin: { dateFormat }, routes: { admin } } = (0, Config_1.useConfig)();
    const { t, i18n } = (0, react_i18next_1.useTranslation)('authentication');
    const languageOptions = Object.entries(i18n.options.resources).map(([language, resource]) => ({ label: resource.general.thisLanguage, value: language }));
    const onSave = (0, react_1.useCallback)(async () => {
        await refreshCookieAsync();
        if (typeof onSaveFromProps === 'function') {
            onSaveFromProps();
        }
    }, [onSaveFromProps, refreshCookieAsync]);
    const classes = [
        baseClass,
    ].filter(Boolean).join(' ');
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Loading_1.LoadingOverlayToggle, { name: "account", show: isLoading, type: "withoutNav" }),
        react_1.default.createElement("div", { className: classes }, !isLoading && (react_1.default.createElement(OperationProvider_1.OperationContext.Provider, { value: "update" },
            react_1.default.createElement(Form_1.default, { className: `${baseClass}__form`, method: "patch", action: action, onSuccess: onSave, initialState: initialState, disabled: !hasSavePermission },
                react_1.default.createElement("div", { className: `${baseClass}__main` },
                    react_1.default.createElement(Meta_1.default, { title: t('account'), description: t('accountOfCurrentUser'), keywords: t('account') }),
                    react_1.default.createElement(Eyebrow_1.default, null),
                    !(((_a = collection.versions) === null || _a === void 0 ? void 0 : _a.drafts) && ((_c = (_b = collection.versions) === null || _b === void 0 ? void 0 : _b.drafts) === null || _c === void 0 ? void 0 : _c.autosave)) && (react_1.default.createElement(LeaveWithoutSaving_1.default, null)),
                    react_1.default.createElement("div", { className: `${baseClass}__edit` },
                        react_1.default.createElement(Gutter_1.Gutter, { className: `${baseClass}__header` },
                            react_1.default.createElement("h1", null,
                                react_1.default.createElement(RenderTitle_1.default, { data: data, collection: collection, useAsTitle: useAsTitle, fallback: `[${t('general:untitled')}]` })),
                            react_1.default.createElement(Auth_1.default, { useAPIKey: auth.useAPIKey, collection: collection, email: data === null || data === void 0 ? void 0 : data.email, operation: "update", readOnly: !hasSavePermission }),
                            react_1.default.createElement(RenderFields_1.default, { permissions: permissions.fields, readOnly: !hasSavePermission, filter: (field) => { var _a; return ((_a = field === null || field === void 0 ? void 0 : field.admin) === null || _a === void 0 ? void 0 : _a.position) !== 'sidebar'; }, fieldTypes: field_types_1.default, fieldSchema: fields })),
                        react_1.default.createElement(Gutter_1.Gutter, { className: `${baseClass}__payload-settings` },
                            react_1.default.createElement("h3", null, t('general:payloadSettings')),
                            react_1.default.createElement("div", { className: `${baseClass}__language` },
                                react_1.default.createElement(Label_1.default, { label: t('general:language') }),
                                react_1.default.createElement(ReactSelect_1.default, { value: languageOptions.find((language) => (language.value === i18n.language)), options: languageOptions, onChange: ({ value }) => (i18n.changeLanguage(value)) })),
                            react_1.default.createElement(ToggleTheme_1.ToggleTheme, null)))),
                react_1.default.createElement("div", { className: `${baseClass}__sidebar-wrap` },
                    react_1.default.createElement("div", { className: `${baseClass}__sidebar` },
                        react_1.default.createElement("div", { className: `${baseClass}__sidebar-sticky-wrap` },
                            react_1.default.createElement("ul", { className: `${baseClass}__collection-actions` }, ((_d = permissions === null || permissions === void 0 ? void 0 : permissions.create) === null || _d === void 0 ? void 0 : _d.permission) && (react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("li", null,
                                    react_1.default.createElement(react_router_dom_1.Link, { to: `${admin}/collections/${slug}/create` }, t('general:createNew')))))),
                            react_1.default.createElement("div", { className: `${baseClass}__document-actions${preview ? ` ${baseClass}__document-actions--with-preview` : ''}` },
                                (preview && (!((_e = collection.versions) === null || _e === void 0 ? void 0 : _e.drafts) || ((_g = (_f = collection.versions) === null || _f === void 0 ? void 0 : _f.drafts) === null || _g === void 0 ? void 0 : _g.autosave))) && (react_1.default.createElement(PreviewButton_1.default, { generatePreviewURL: preview, CustomComponent: (_k = (_j = (_h = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _h === void 0 ? void 0 : _h.components) === null || _j === void 0 ? void 0 : _j.edit) === null || _k === void 0 ? void 0 : _k.PreviewButton })),
                                hasSavePermission && (react_1.default.createElement(Save_1.Save, { CustomComponent: (_o = (_m = (_l = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _l === void 0 ? void 0 : _l.components) === null || _m === void 0 ? void 0 : _m.edit) === null || _o === void 0 ? void 0 : _o.SaveButton }))),
                            react_1.default.createElement("div", { className: `${baseClass}__sidebar-fields` },
                                react_1.default.createElement(RenderFields_1.default, { permissions: permissions.fields, readOnly: !hasSavePermission, filter: (field) => { var _a; return ((_a = field === null || field === void 0 ? void 0 : field.admin) === null || _a === void 0 ? void 0 : _a.position) === 'sidebar'; }, fieldTypes: field_types_1.default, fieldSchema: fields })),
                            react_1.default.createElement("ul", { className: `${baseClass}__meta` },
                                react_1.default.createElement("li", { className: `${baseClass}__api-url` },
                                    react_1.default.createElement("span", { className: `${baseClass}__label` },
                                        "API URL",
                                        ' ',
                                        react_1.default.createElement(CopyToClipboard_1.default, { value: apiURL })),
                                    react_1.default.createElement("a", { href: apiURL, target: "_blank", rel: "noopener noreferrer" }, apiURL)),
                                react_1.default.createElement("li", null,
                                    react_1.default.createElement("div", { className: `${baseClass}__label` }, "ID"),
                                    react_1.default.createElement("div", null, data === null || data === void 0 ? void 0 : data.id)),
                                timestamps && (react_1.default.createElement(react_1.default.Fragment, null,
                                    data.updatedAt && (react_1.default.createElement("li", null,
                                        react_1.default.createElement("div", { className: `${baseClass}__label` }, t('general:lastModified')),
                                        react_1.default.createElement("div", null, (0, formatDate_1.formatDate)(data.updatedAt, dateFormat, i18n === null || i18n === void 0 ? void 0 : i18n.language)))),
                                    data.createdAt && (react_1.default.createElement("li", null,
                                        react_1.default.createElement("div", { className: `${baseClass}__label` }, t('general:created')),
                                        react_1.default.createElement("div", null, (0, formatDate_1.formatDate)(data.createdAt, dateFormat, i18n === null || i18n === void 0 ? void 0 : i18n.language))))))))))))))));
};
exports.default = DefaultAccount;
//# sourceMappingURL=Default.js.map