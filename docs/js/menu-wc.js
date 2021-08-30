'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@reisetra/soda documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AddressModule.html" data-type="entity-link" >AddressModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AddressModule-713c014c23f7ba7ecf77c1b7982458517befbdee11566f7dd2e02f5b723bc17a1528744c114bb67c6c2eb8c21ee03551b7b61dc5cf4716d2e26ec64477b689e0"' : 'data-target="#xs-controllers-links-module-AddressModule-713c014c23f7ba7ecf77c1b7982458517befbdee11566f7dd2e02f5b723bc17a1528744c114bb67c6c2eb8c21ee03551b7b61dc5cf4716d2e26ec64477b689e0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AddressModule-713c014c23f7ba7ecf77c1b7982458517befbdee11566f7dd2e02f5b723bc17a1528744c114bb67c6c2eb8c21ee03551b7b61dc5cf4716d2e26ec64477b689e0"' :
                                            'id="xs-controllers-links-module-AddressModule-713c014c23f7ba7ecf77c1b7982458517befbdee11566f7dd2e02f5b723bc17a1528744c114bb67c6c2eb8c21ee03551b7b61dc5cf4716d2e26ec64477b689e0"' }>
                                            <li class="link">
                                                <a href="controllers/AddressController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AddressModule-713c014c23f7ba7ecf77c1b7982458517befbdee11566f7dd2e02f5b723bc17a1528744c114bb67c6c2eb8c21ee03551b7b61dc5cf4716d2e26ec64477b689e0"' : 'data-target="#xs-injectables-links-module-AddressModule-713c014c23f7ba7ecf77c1b7982458517befbdee11566f7dd2e02f5b723bc17a1528744c114bb67c6c2eb8c21ee03551b7b61dc5cf4716d2e26ec64477b689e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AddressModule-713c014c23f7ba7ecf77c1b7982458517befbdee11566f7dd2e02f5b723bc17a1528744c114bb67c6c2eb8c21ee03551b7b61dc5cf4716d2e26ec64477b689e0"' :
                                        'id="xs-injectables-links-module-AddressModule-713c014c23f7ba7ecf77c1b7982458517befbdee11566f7dd2e02f5b723bc17a1528744c114bb67c6c2eb8c21ee03551b7b61dc5cf4716d2e26ec64477b689e0"' }>
                                        <li class="link">
                                            <a href="injectables/AddressService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-94c3c4c4625ecdb65345ca734132878f871090fc9c28cd8ef3a987733279dcbb2cc7d36cff57060b6e685eaf801879e84ac8d6c1a781c0e0b36e714e504aca78"' : 'data-target="#xs-controllers-links-module-AuthModule-94c3c4c4625ecdb65345ca734132878f871090fc9c28cd8ef3a987733279dcbb2cc7d36cff57060b6e685eaf801879e84ac8d6c1a781c0e0b36e714e504aca78"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-94c3c4c4625ecdb65345ca734132878f871090fc9c28cd8ef3a987733279dcbb2cc7d36cff57060b6e685eaf801879e84ac8d6c1a781c0e0b36e714e504aca78"' :
                                            'id="xs-controllers-links-module-AuthModule-94c3c4c4625ecdb65345ca734132878f871090fc9c28cd8ef3a987733279dcbb2cc7d36cff57060b6e685eaf801879e84ac8d6c1a781c0e0b36e714e504aca78"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-94c3c4c4625ecdb65345ca734132878f871090fc9c28cd8ef3a987733279dcbb2cc7d36cff57060b6e685eaf801879e84ac8d6c1a781c0e0b36e714e504aca78"' : 'data-target="#xs-injectables-links-module-AuthModule-94c3c4c4625ecdb65345ca734132878f871090fc9c28cd8ef3a987733279dcbb2cc7d36cff57060b6e685eaf801879e84ac8d6c1a781c0e0b36e714e504aca78"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-94c3c4c4625ecdb65345ca734132878f871090fc9c28cd8ef3a987733279dcbb2cc7d36cff57060b6e685eaf801879e84ac8d6c1a781c0e0b36e714e504aca78"' :
                                        'id="xs-injectables-links-module-AuthModule-94c3c4c4625ecdb65345ca734132878f871090fc9c28cd8ef3a987733279dcbb2cc7d36cff57060b6e685eaf801879e84ac8d6c1a781c0e0b36e714e504aca78"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CacheModule.html" data-type="entity-link" >CacheModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CacheModule-fce21b42f4574ac7d11ed626e480ede4c0fb77b15feeceb7498c2343d1f97fb41d60224ce91e7578044873bfe1dcd719105ab8ca82648b776d4772b7be547311"' : 'data-target="#xs-injectables-links-module-CacheModule-fce21b42f4574ac7d11ed626e480ede4c0fb77b15feeceb7498c2343d1f97fb41d60224ce91e7578044873bfe1dcd719105ab8ca82648b776d4772b7be547311"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CacheModule-fce21b42f4574ac7d11ed626e480ede4c0fb77b15feeceb7498c2343d1f97fb41d60224ce91e7578044873bfe1dcd719105ab8ca82648b776d4772b7be547311"' :
                                        'id="xs-injectables-links-module-CacheModule-fce21b42f4574ac7d11ed626e480ede4c0fb77b15feeceb7498c2343d1f97fb41d60224ce91e7578044873bfe1dcd719105ab8ca82648b776d4772b7be547311"' }>
                                        <li class="link">
                                            <a href="injectables/CacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CacheService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CartModule.html" data-type="entity-link" >CartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CartModule-75185d1e16297b1d8ffd300a4d2ed1500c4dc585df1d0a829af9ea85021fe02a7396f6c45ad07abb17edc68c5f94a4c0bec95229700aed258f8a9ffe837f1b4d"' : 'data-target="#xs-controllers-links-module-CartModule-75185d1e16297b1d8ffd300a4d2ed1500c4dc585df1d0a829af9ea85021fe02a7396f6c45ad07abb17edc68c5f94a4c0bec95229700aed258f8a9ffe837f1b4d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CartModule-75185d1e16297b1d8ffd300a4d2ed1500c4dc585df1d0a829af9ea85021fe02a7396f6c45ad07abb17edc68c5f94a4c0bec95229700aed258f8a9ffe837f1b4d"' :
                                            'id="xs-controllers-links-module-CartModule-75185d1e16297b1d8ffd300a4d2ed1500c4dc585df1d0a829af9ea85021fe02a7396f6c45ad07abb17edc68c5f94a4c0bec95229700aed258f8a9ffe837f1b4d"' }>
                                            <li class="link">
                                                <a href="controllers/CartController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CartModule-75185d1e16297b1d8ffd300a4d2ed1500c4dc585df1d0a829af9ea85021fe02a7396f6c45ad07abb17edc68c5f94a4c0bec95229700aed258f8a9ffe837f1b4d"' : 'data-target="#xs-injectables-links-module-CartModule-75185d1e16297b1d8ffd300a4d2ed1500c4dc585df1d0a829af9ea85021fe02a7396f6c45ad07abb17edc68c5f94a4c0bec95229700aed258f8a9ffe837f1b4d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CartModule-75185d1e16297b1d8ffd300a4d2ed1500c4dc585df1d0a829af9ea85021fe02a7396f6c45ad07abb17edc68c5f94a4c0bec95229700aed258f8a9ffe837f1b4d"' :
                                        'id="xs-injectables-links-module-CartModule-75185d1e16297b1d8ffd300a4d2ed1500c4dc585df1d0a829af9ea85021fe02a7396f6c45ad07abb17edc68c5f94a4c0bec95229700aed258f8a9ffe837f1b4d"' }>
                                        <li class="link">
                                            <a href="injectables/CartService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FilesModule-8e7e7ab38c884a89e2c2412f52a8a8c4712ee9efb7061bc0aca72129b25c90bbc39b745b11e32fe691301cf1fd9c1f2102d704377e6ed2a15f7bd1d27b5c7c20"' : 'data-target="#xs-controllers-links-module-FilesModule-8e7e7ab38c884a89e2c2412f52a8a8c4712ee9efb7061bc0aca72129b25c90bbc39b745b11e32fe691301cf1fd9c1f2102d704377e6ed2a15f7bd1d27b5c7c20"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-8e7e7ab38c884a89e2c2412f52a8a8c4712ee9efb7061bc0aca72129b25c90bbc39b745b11e32fe691301cf1fd9c1f2102d704377e6ed2a15f7bd1d27b5c7c20"' :
                                            'id="xs-controllers-links-module-FilesModule-8e7e7ab38c884a89e2c2412f52a8a8c4712ee9efb7061bc0aca72129b25c90bbc39b745b11e32fe691301cf1fd9c1f2102d704377e6ed2a15f7bd1d27b5c7c20"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesModule-8e7e7ab38c884a89e2c2412f52a8a8c4712ee9efb7061bc0aca72129b25c90bbc39b745b11e32fe691301cf1fd9c1f2102d704377e6ed2a15f7bd1d27b5c7c20"' : 'data-target="#xs-injectables-links-module-FilesModule-8e7e7ab38c884a89e2c2412f52a8a8c4712ee9efb7061bc0aca72129b25c90bbc39b745b11e32fe691301cf1fd9c1f2102d704377e6ed2a15f7bd1d27b5c7c20"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-8e7e7ab38c884a89e2c2412f52a8a8c4712ee9efb7061bc0aca72129b25c90bbc39b745b11e32fe691301cf1fd9c1f2102d704377e6ed2a15f7bd1d27b5c7c20"' :
                                        'id="xs-injectables-links-module-FilesModule-8e7e7ab38c884a89e2c2412f52a8a8c4712ee9efb7061bc0aca72129b25c90bbc39b745b11e32fe691301cf1fd9c1f2102d704377e6ed2a15f7bd1d27b5c7c20"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthCheckModule.html" data-type="entity-link" >HealthCheckModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HealthCheckModule-c964cf63353e013fe567f1eef2c164ad1253d77fd0e5631244376a5e5f7df381ba129de1e7bd8d281133759361c65dbdd3dae49d4404603de2b8ea9b8126243c"' : 'data-target="#xs-controllers-links-module-HealthCheckModule-c964cf63353e013fe567f1eef2c164ad1253d77fd0e5631244376a5e5f7df381ba129de1e7bd8d281133759361c65dbdd3dae49d4404603de2b8ea9b8126243c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthCheckModule-c964cf63353e013fe567f1eef2c164ad1253d77fd0e5631244376a5e5f7df381ba129de1e7bd8d281133759361c65dbdd3dae49d4404603de2b8ea9b8126243c"' :
                                            'id="xs-controllers-links-module-HealthCheckModule-c964cf63353e013fe567f1eef2c164ad1253d77fd0e5631244376a5e5f7df381ba129de1e7bd8d281133759361c65dbdd3dae49d4404603de2b8ea9b8126243c"' }>
                                            <li class="link">
                                                <a href="controllers/HealthCheckController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthCheckController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HealthCheckModule-c964cf63353e013fe567f1eef2c164ad1253d77fd0e5631244376a5e5f7df381ba129de1e7bd8d281133759361c65dbdd3dae49d4404603de2b8ea9b8126243c"' : 'data-target="#xs-injectables-links-module-HealthCheckModule-c964cf63353e013fe567f1eef2c164ad1253d77fd0e5631244376a5e5f7df381ba129de1e7bd8d281133759361c65dbdd3dae49d4404603de2b8ea9b8126243c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HealthCheckModule-c964cf63353e013fe567f1eef2c164ad1253d77fd0e5631244376a5e5f7df381ba129de1e7bd8d281133759361c65dbdd3dae49d4404603de2b8ea9b8126243c"' :
                                        'id="xs-injectables-links-module-HealthCheckModule-c964cf63353e013fe567f1eef2c164ad1253d77fd0e5631244376a5e5f7df381ba129de1e7bd8d281133759361c65dbdd3dae49d4404603de2b8ea9b8126243c"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InventoryModule.html" data-type="entity-link" >InventoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-InventoryModule-59d8d9180ce8b8813a9db43db5a2f7b4218c5fa013fc0df25347f2c2f60c51672825b7b4b27cba2b91f4e16cad9d2a7e3a195cc503cb85547f22b9753aed9b01"' : 'data-target="#xs-controllers-links-module-InventoryModule-59d8d9180ce8b8813a9db43db5a2f7b4218c5fa013fc0df25347f2c2f60c51672825b7b4b27cba2b91f4e16cad9d2a7e3a195cc503cb85547f22b9753aed9b01"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InventoryModule-59d8d9180ce8b8813a9db43db5a2f7b4218c5fa013fc0df25347f2c2f60c51672825b7b4b27cba2b91f4e16cad9d2a7e3a195cc503cb85547f22b9753aed9b01"' :
                                            'id="xs-controllers-links-module-InventoryModule-59d8d9180ce8b8813a9db43db5a2f7b4218c5fa013fc0df25347f2c2f60c51672825b7b4b27cba2b91f4e16cad9d2a7e3a195cc503cb85547f22b9753aed9b01"' }>
                                            <li class="link">
                                                <a href="controllers/InventoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InventoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-InventoryModule-59d8d9180ce8b8813a9db43db5a2f7b4218c5fa013fc0df25347f2c2f60c51672825b7b4b27cba2b91f4e16cad9d2a7e3a195cc503cb85547f22b9753aed9b01"' : 'data-target="#xs-injectables-links-module-InventoryModule-59d8d9180ce8b8813a9db43db5a2f7b4218c5fa013fc0df25347f2c2f60c51672825b7b4b27cba2b91f4e16cad9d2a7e3a195cc503cb85547f22b9753aed9b01"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InventoryModule-59d8d9180ce8b8813a9db43db5a2f7b4218c5fa013fc0df25347f2c2f60c51672825b7b4b27cba2b91f4e16cad9d2a7e3a195cc503cb85547f22b9753aed9b01"' :
                                        'id="xs-injectables-links-module-InventoryModule-59d8d9180ce8b8813a9db43db5a2f7b4218c5fa013fc0df25347f2c2f60c51672825b7b4b27cba2b91f4e16cad9d2a7e3a195cc503cb85547f22b9753aed9b01"' }>
                                        <li class="link">
                                            <a href="injectables/InventoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InventoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrderModule.html" data-type="entity-link" >OrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OrderModule-bfd31f5e541f5d0d6976b25a8a7e5ce44e4124597fc019e02bcc2d85927a0b0830939890f33a69694f501820baafd9aad261f168820cc9759f8f45ec0b91608b"' : 'data-target="#xs-controllers-links-module-OrderModule-bfd31f5e541f5d0d6976b25a8a7e5ce44e4124597fc019e02bcc2d85927a0b0830939890f33a69694f501820baafd9aad261f168820cc9759f8f45ec0b91608b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-bfd31f5e541f5d0d6976b25a8a7e5ce44e4124597fc019e02bcc2d85927a0b0830939890f33a69694f501820baafd9aad261f168820cc9759f8f45ec0b91608b"' :
                                            'id="xs-controllers-links-module-OrderModule-bfd31f5e541f5d0d6976b25a8a7e5ce44e4124597fc019e02bcc2d85927a0b0830939890f33a69694f501820baafd9aad261f168820cc9759f8f45ec0b91608b"' }>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrderModule-bfd31f5e541f5d0d6976b25a8a7e5ce44e4124597fc019e02bcc2d85927a0b0830939890f33a69694f501820baafd9aad261f168820cc9759f8f45ec0b91608b"' : 'data-target="#xs-injectables-links-module-OrderModule-bfd31f5e541f5d0d6976b25a8a7e5ce44e4124597fc019e02bcc2d85927a0b0830939890f33a69694f501820baafd9aad261f168820cc9759f8f45ec0b91608b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-bfd31f5e541f5d0d6976b25a8a7e5ce44e4124597fc019e02bcc2d85927a0b0830939890f33a69694f501820baafd9aad261f168820cc9759f8f45ec0b91608b"' :
                                        'id="xs-injectables-links-module-OrderModule-bfd31f5e541f5d0d6976b25a8a7e5ce44e4124597fc019e02bcc2d85927a0b0830939890f33a69694f501820baafd9aad261f168820cc9759f8f45ec0b91608b"' }>
                                        <li class="link">
                                            <a href="injectables/OrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductModule-ae36aad3681ed904e631bb659ccd9b39e6c9c5052adbde8da4e114b4f5c0b39984f0d95f40b65582ceeb3bee6b0f82cd0699d714ed224ac290ed6ebb5c75e41d"' : 'data-target="#xs-controllers-links-module-ProductModule-ae36aad3681ed904e631bb659ccd9b39e6c9c5052adbde8da4e114b4f5c0b39984f0d95f40b65582ceeb3bee6b0f82cd0699d714ed224ac290ed6ebb5c75e41d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-ae36aad3681ed904e631bb659ccd9b39e6c9c5052adbde8da4e114b4f5c0b39984f0d95f40b65582ceeb3bee6b0f82cd0699d714ed224ac290ed6ebb5c75e41d"' :
                                            'id="xs-controllers-links-module-ProductModule-ae36aad3681ed904e631bb659ccd9b39e6c9c5052adbde8da4e114b4f5c0b39984f0d95f40b65582ceeb3bee6b0f82cd0699d714ed224ac290ed6ebb5c75e41d"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-ae36aad3681ed904e631bb659ccd9b39e6c9c5052adbde8da4e114b4f5c0b39984f0d95f40b65582ceeb3bee6b0f82cd0699d714ed224ac290ed6ebb5c75e41d"' : 'data-target="#xs-injectables-links-module-ProductModule-ae36aad3681ed904e631bb659ccd9b39e6c9c5052adbde8da4e114b4f5c0b39984f0d95f40b65582ceeb3bee6b0f82cd0699d714ed224ac290ed6ebb5c75e41d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-ae36aad3681ed904e631bb659ccd9b39e6c9c5052adbde8da4e114b4f5c0b39984f0d95f40b65582ceeb3bee6b0f82cd0699d714ed224ac290ed6ebb5c75e41d"' :
                                        'id="xs-injectables-links-module-ProductModule-ae36aad3681ed904e631bb659ccd9b39e6c9c5052adbde8da4e114b4f5c0b39984f0d95f40b65582ceeb3bee6b0f82cd0699d714ed224ac290ed6ebb5c75e41d"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewModule.html" data-type="entity-link" >ReviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReviewModule-84eeebf4cf514a7a4ee0eca758e883f6299fcc7c7ae5693928879d811b1c965adea5f91ac71da946debedcb351582504634f6d26d8dca6740186aa745d7bc02b"' : 'data-target="#xs-controllers-links-module-ReviewModule-84eeebf4cf514a7a4ee0eca758e883f6299fcc7c7ae5693928879d811b1c965adea5f91ac71da946debedcb351582504634f6d26d8dca6740186aa745d7bc02b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewModule-84eeebf4cf514a7a4ee0eca758e883f6299fcc7c7ae5693928879d811b1c965adea5f91ac71da946debedcb351582504634f6d26d8dca6740186aa745d7bc02b"' :
                                            'id="xs-controllers-links-module-ReviewModule-84eeebf4cf514a7a4ee0eca758e883f6299fcc7c7ae5693928879d811b1c965adea5f91ac71da946debedcb351582504634f6d26d8dca6740186aa745d7bc02b"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewModule-84eeebf4cf514a7a4ee0eca758e883f6299fcc7c7ae5693928879d811b1c965adea5f91ac71da946debedcb351582504634f6d26d8dca6740186aa745d7bc02b"' : 'data-target="#xs-injectables-links-module-ReviewModule-84eeebf4cf514a7a4ee0eca758e883f6299fcc7c7ae5693928879d811b1c965adea5f91ac71da946debedcb351582504634f6d26d8dca6740186aa745d7bc02b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewModule-84eeebf4cf514a7a4ee0eca758e883f6299fcc7c7ae5693928879d811b1c965adea5f91ac71da946debedcb351582504634f6d26d8dca6740186aa745d7bc02b"' :
                                        'id="xs-injectables-links-module-ReviewModule-84eeebf4cf514a7a4ee0eca758e883f6299fcc7c7ae5693928879d811b1c965adea5f91ac71da946debedcb351582504634f6d26d8dca6740186aa745d7bc02b"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReviewService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoryModule.html" data-type="entity-link" >StoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StoryModule-d10926803047da00f44714d893317b51703c61c7863b1a171e91aa0a82ee898fe9bf640fea5294091a089fab8ff9a86eb3d5dc10d925a178834b96f28ebd1ecf"' : 'data-target="#xs-controllers-links-module-StoryModule-d10926803047da00f44714d893317b51703c61c7863b1a171e91aa0a82ee898fe9bf640fea5294091a089fab8ff9a86eb3d5dc10d925a178834b96f28ebd1ecf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StoryModule-d10926803047da00f44714d893317b51703c61c7863b1a171e91aa0a82ee898fe9bf640fea5294091a089fab8ff9a86eb3d5dc10d925a178834b96f28ebd1ecf"' :
                                            'id="xs-controllers-links-module-StoryModule-d10926803047da00f44714d893317b51703c61c7863b1a171e91aa0a82ee898fe9bf640fea5294091a089fab8ff9a86eb3d5dc10d925a178834b96f28ebd1ecf"' }>
                                            <li class="link">
                                                <a href="controllers/StoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StoryModule-d10926803047da00f44714d893317b51703c61c7863b1a171e91aa0a82ee898fe9bf640fea5294091a089fab8ff9a86eb3d5dc10d925a178834b96f28ebd1ecf"' : 'data-target="#xs-injectables-links-module-StoryModule-d10926803047da00f44714d893317b51703c61c7863b1a171e91aa0a82ee898fe9bf640fea5294091a089fab8ff9a86eb3d5dc10d925a178834b96f28ebd1ecf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StoryModule-d10926803047da00f44714d893317b51703c61c7863b1a171e91aa0a82ee898fe9bf640fea5294091a089fab8ff9a86eb3d5dc10d925a178834b96f28ebd1ecf"' :
                                        'id="xs-injectables-links-module-StoryModule-d10926803047da00f44714d893317b51703c61c7863b1a171e91aa0a82ee898fe9bf640fea5294091a089fab8ff9a86eb3d5dc10d925a178834b96f28ebd1ecf"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SupportModule.html" data-type="entity-link" >SupportModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SupportModule-40679b9e0ce1d3db0826c697c61ea0381b440c3bb0be49967534e632df3bd040571825da680219f3c15975e707bde1e825d343135ef5a6f61dc0d219cf71ebb3"' : 'data-target="#xs-controllers-links-module-SupportModule-40679b9e0ce1d3db0826c697c61ea0381b440c3bb0be49967534e632df3bd040571825da680219f3c15975e707bde1e825d343135ef5a6f61dc0d219cf71ebb3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SupportModule-40679b9e0ce1d3db0826c697c61ea0381b440c3bb0be49967534e632df3bd040571825da680219f3c15975e707bde1e825d343135ef5a6f61dc0d219cf71ebb3"' :
                                            'id="xs-controllers-links-module-SupportModule-40679b9e0ce1d3db0826c697c61ea0381b440c3bb0be49967534e632df3bd040571825da680219f3c15975e707bde1e825d343135ef5a6f61dc0d219cf71ebb3"' }>
                                            <li class="link">
                                                <a href="controllers/SupportController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupportController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SupportModule-40679b9e0ce1d3db0826c697c61ea0381b440c3bb0be49967534e632df3bd040571825da680219f3c15975e707bde1e825d343135ef5a6f61dc0d219cf71ebb3"' : 'data-target="#xs-injectables-links-module-SupportModule-40679b9e0ce1d3db0826c697c61ea0381b440c3bb0be49967534e632df3bd040571825da680219f3c15975e707bde1e825d343135ef5a6f61dc0d219cf71ebb3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SupportModule-40679b9e0ce1d3db0826c697c61ea0381b440c3bb0be49967534e632df3bd040571825da680219f3c15975e707bde1e825d343135ef5a6f61dc0d219cf71ebb3"' :
                                        'id="xs-injectables-links-module-SupportModule-40679b9e0ce1d3db0826c697c61ea0381b440c3bb0be49967534e632df3bd040571825da680219f3c15975e707bde1e825d343135ef5a6f61dc0d219cf71ebb3"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SupportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionModule.html" data-type="entity-link" >TransactionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TransactionModule-f5d245a06361f90da962c777d5f0d0de012f0ec08e9e15298ca93822b14a990dd94ffc2bba36d4d9a2ab41096cab1ede099dbcbbb309011b1e71b5f2002701b9"' : 'data-target="#xs-controllers-links-module-TransactionModule-f5d245a06361f90da962c777d5f0d0de012f0ec08e9e15298ca93822b14a990dd94ffc2bba36d4d9a2ab41096cab1ede099dbcbbb309011b1e71b5f2002701b9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TransactionModule-f5d245a06361f90da962c777d5f0d0de012f0ec08e9e15298ca93822b14a990dd94ffc2bba36d4d9a2ab41096cab1ede099dbcbbb309011b1e71b5f2002701b9"' :
                                            'id="xs-controllers-links-module-TransactionModule-f5d245a06361f90da962c777d5f0d0de012f0ec08e9e15298ca93822b14a990dd94ffc2bba36d4d9a2ab41096cab1ede099dbcbbb309011b1e71b5f2002701b9"' }>
                                            <li class="link">
                                                <a href="controllers/TransactionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TransactionModule-f5d245a06361f90da962c777d5f0d0de012f0ec08e9e15298ca93822b14a990dd94ffc2bba36d4d9a2ab41096cab1ede099dbcbbb309011b1e71b5f2002701b9"' : 'data-target="#xs-injectables-links-module-TransactionModule-f5d245a06361f90da962c777d5f0d0de012f0ec08e9e15298ca93822b14a990dd94ffc2bba36d4d9a2ab41096cab1ede099dbcbbb309011b1e71b5f2002701b9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransactionModule-f5d245a06361f90da962c777d5f0d0de012f0ec08e9e15298ca93822b14a990dd94ffc2bba36d4d9a2ab41096cab1ede099dbcbbb309011b1e71b5f2002701b9"' :
                                        'id="xs-injectables-links-module-TransactionModule-f5d245a06361f90da962c777d5f0d0de012f0ec08e9e15298ca93822b14a990dd94ffc2bba36d4d9a2ab41096cab1ede099dbcbbb309011b1e71b5f2002701b9"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransactionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-26a604eca05af5dce9982c450e90aab33bb5e5af08caeb3869c24e25cd86157003b237a41aa67a60c3b59309e9b714328b1aa71cd57f20189d55a9be6f8c47d7"' : 'data-target="#xs-controllers-links-module-UserModule-26a604eca05af5dce9982c450e90aab33bb5e5af08caeb3869c24e25cd86157003b237a41aa67a60c3b59309e9b714328b1aa71cd57f20189d55a9be6f8c47d7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-26a604eca05af5dce9982c450e90aab33bb5e5af08caeb3869c24e25cd86157003b237a41aa67a60c3b59309e9b714328b1aa71cd57f20189d55a9be6f8c47d7"' :
                                            'id="xs-controllers-links-module-UserModule-26a604eca05af5dce9982c450e90aab33bb5e5af08caeb3869c24e25cd86157003b237a41aa67a60c3b59309e9b714328b1aa71cd57f20189d55a9be6f8c47d7"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-26a604eca05af5dce9982c450e90aab33bb5e5af08caeb3869c24e25cd86157003b237a41aa67a60c3b59309e9b714328b1aa71cd57f20189d55a9be6f8c47d7"' : 'data-target="#xs-injectables-links-module-UserModule-26a604eca05af5dce9982c450e90aab33bb5e5af08caeb3869c24e25cd86157003b237a41aa67a60c3b59309e9b714328b1aa71cd57f20189d55a9be6f8c47d7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-26a604eca05af5dce9982c450e90aab33bb5e5af08caeb3869c24e25cd86157003b237a41aa67a60c3b59309e9b714328b1aa71cd57f20189d55a9be6f8c47d7"' :
                                        'id="xs-injectables-links-module-UserModule-26a604eca05af5dce9982c450e90aab33bb5e5af08caeb3869c24e25cd86157003b237a41aa67a60c3b59309e9b714328b1aa71cd57f20189d55a9be6f8c47d7"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthUserDto.html" data-type="entity-link" >AuthUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cart.html" data-type="entity-link" >Cart</a>
                            </li>
                            <li class="link">
                                <a href="classes/CartItem.html" data-type="entity-link" >CartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckoutDto.html" data-type="entity-link" >CheckoutDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAddressDto.html" data-type="entity-link" >CreateAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFormDataDto.html" data-type="entity-link" >CreateFormDataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInventoryDto.html" data-type="entity-link" >CreateInventoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOauthUserDto.html" data-type="entity-link" >CreateOauthUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferDto.html" data-type="entity-link" >CreateOfferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderDto.html" data-type="entity-link" >CreateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReviewDto.html" data-type="entity-link" >CreateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStoryDto.html" data-type="entity-link" >CreateStoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSupportTicketDto.html" data-type="entity-link" >CreateSupportTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransactionDto.html" data-type="entity-link" >CreateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CursorPagination.html" data-type="entity-link" >CursorPagination</a>
                            </li>
                            <li class="link">
                                <a href="classes/CursorPaginationDTO.html" data-type="entity-link" >CursorPaginationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomException.html" data-type="entity-link" >CustomException</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataTransformInterceptor.html" data-type="entity-link" >DataTransformInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteOfferDto.html" data-type="entity-link" >DeleteOfferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailParams.html" data-type="entity-link" >EmailParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnviromentVars.html" data-type="entity-link" >EnviromentVars</a>
                            </li>
                            <li class="link">
                                <a href="classes/Exception.html" data-type="entity-link" >Exception</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileDTO.html" data-type="entity-link" >FileDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesDTO.html" data-type="entity-link" >FilesDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUploadDTO.html" data-type="entity-link" >FileUploadDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForbiddenException.html" data-type="entity-link" >ForbiddenException</a>
                            </li>
                            <li class="link">
                                <a href="classes/Form.html" data-type="entity-link" >Form</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormResponse.html" data-type="entity-link" >FormResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAddressesDto.html" data-type="entity-link" >GetAddressesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllAddressDto.html" data-type="entity-link" >GetAllAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllCartsDto.html" data-type="entity-link" >GetAllCartsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllInventoryDto.html" data-type="entity-link" >GetAllInventoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllOffersDto.html" data-type="entity-link" >GetAllOffersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllOrdersDocumentsDto.html" data-type="entity-link" >GetAllOrdersDocumentsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllOrdersDto.html" data-type="entity-link" >GetAllOrdersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllProductsDto.html" data-type="entity-link" >GetAllProductsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllReviewsDto.html" data-type="entity-link" >GetAllReviewsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllStoriesDto.html" data-type="entity-link" >GetAllStoriesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllTagsDto.html" data-type="entity-link" >GetAllTagsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllTransactionsDto.html" data-type="entity-link" >GetAllTransactionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllUsersDto.html" data-type="entity-link" >GetAllUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetFormDataDto.html" data-type="entity-link" >GetFormDataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetStoriesDto.html" data-type="entity-link" >GetStoriesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Inventory.html" data-type="entity-link" >Inventory</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Offer.html" data-type="entity-link" >Offer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link" >ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Review.html" data-type="entity-link" >Review</a>
                            </li>
                            <li class="link">
                                <a href="classes/Story.html" data-type="entity-link" >Story</a>
                            </li>
                            <li class="link">
                                <a href="classes/SuccessResponseDTO.html" data-type="entity-link" >SuccessResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tag.html" data-type="entity-link" >Tag</a>
                            </li>
                            <li class="link">
                                <a href="classes/Transaction.html" data-type="entity-link" >Transaction</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAddressDto.html" data-type="entity-link" >UpdateAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCartItemDto.html" data-type="entity-link" >UpdateCartItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInventoryDto.html" data-type="entity-link" >UpdateInventoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOfferDto.html" data-type="entity-link" >UpdateOfferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrderDto.html" data-type="entity-link" >UpdateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePasswordDto.html" data-type="entity-link" >UpdatePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReviewDto.html" data-type="entity-link" >UpdateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStoryDto.html" data-type="entity-link" >UpdateStoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTagDto.html" data-type="entity-link" >UpdateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTransactionDto.html" data-type="entity-link" >UpdateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationPipe.html" data-type="entity-link" >ValidationPipe</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyEmailParams.html" data-type="entity-link" >VerifyEmailParams</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ErrorsInterceptor.html" data-type="entity-link" >ErrorsInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthGuard.html" data-type="entity-link" >GoogleAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshGuard.html" data-type="entity-link" >JwtRefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Middleware.html" data-type="entity-link" >Middleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidationPipe.html" data-type="entity-link" >ValidationPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppEnv.html" data-type="entity-link" >AppEnv</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthEnv.html" data-type="entity-link" >AuthEnv</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthResponse.html" data-type="entity-link" >AuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthTokenPayload.html" data-type="entity-link" >AuthTokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CacheEnv.html" data-type="entity-link" >CacheEnv</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CursorPaginationOptionsInterface.html" data-type="entity-link" >CursorPaginationOptionsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CursorPaginationResultInterface.html" data-type="entity-link" >CursorPaginationResultInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DBEnv.html" data-type="entity-link" >DBEnv</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GoogleUser.html" data-type="entity-link" >GoogleUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IData.html" data-type="entity-link" >IData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IError.html" data-type="entity-link" >IError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IErrorResponse.html" data-type="entity-link" >IErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMeta.html" data-type="entity-link" >IMeta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IParams.html" data-type="entity-link" >IParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISuccessResponse.html" data-type="entity-link" >ISuccessResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OffsetPaginationOptionsInterface.html" data-type="entity-link" >OffsetPaginationOptionsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OffsetPaginationResultInterface.html" data-type="entity-link" >OffsetPaginationResultInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageCursorsType.html" data-type="entity-link" >PageCursorsType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageCursorType.html" data-type="entity-link" >PageCursorType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationType.html" data-type="entity-link" >PaginationType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Props.html" data-type="entity-link" >Props</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Props-1.html" data-type="entity-link" >Props</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Props-2.html" data-type="entity-link" >Props</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Props-3.html" data-type="entity-link" >Props</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RazororpayOrderResponse.html" data-type="entity-link" >RazororpayOrderResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServicesEnv.html" data-type="entity-link" >ServicesEnv</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsEnv.html" data-type="entity-link" >SettingsEnv</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadUrlProps.html" data-type="entity-link" >UploadUrlProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserAuthPayload.html" data-type="entity-link" >UserAuthPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationPipeOptions.html" data-type="entity-link" >ValidationPipeOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});