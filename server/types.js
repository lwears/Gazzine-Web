"use strict";
// import { ImageUriType } from './mappers/findImageUri';
Object.defineProperty(exports, "__esModule", { value: true });
var ReferrerType;
(function (ReferrerType) {
    ReferrerType["external"] = "external";
    ReferrerType["internal"] = "internal";
    ReferrerType["list"] = "list";
    ReferrerType["authorList"] = "authorList";
    ReferrerType["strossle"] = "strossle";
})(ReferrerType = exports.ReferrerType || (exports.ReferrerType = {}));
var ElementIdentifierType;
(function (ElementIdentifierType) {
    ElementIdentifierType["paragraph"] = "paragraph";
    ElementIdentifierType["image"] = "image";
    ElementIdentifierType["imageGallery"] = "imageGallery";
    ElementIdentifierType["header"] = "header";
    ElementIdentifierType["quote"] = "quote";
    ElementIdentifierType["listItem"] = "listItem";
    ElementIdentifierType["unknown"] = "unknown";
})(ElementIdentifierType = exports.ElementIdentifierType || (exports.ElementIdentifierType = {}));
// Paragraph
var ModifierType;
(function (ModifierType) {
    ModifierType["strong"] = "strong";
    ModifierType["em"] = "em";
})(ModifierType = exports.ModifierType || (exports.ModifierType = {}));
