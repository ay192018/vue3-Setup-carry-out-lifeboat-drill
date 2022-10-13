import _$ from "./index";
export function $Searchdefault(params) {
    return _$({
        url: "/search/default",
        params,
    });
}
export function $HotDefault(params) {
    return _$({
        url: "/search/hot/detail",
        params,
    });
}
export function $SearchSuggest(params) {
    return _$({
        url: "/search/suggest",
        params,
    });
}
export function $SearchMultimatch(params) {
    return _$({
        url: "/cloudsearch",
        params,
    });
}