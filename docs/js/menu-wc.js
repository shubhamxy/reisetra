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
                                            'data-target="#controllers-links-module-AddressModule-7a4322f068c8e03fe4d4e9a865582c00f02776aecae139dd6986b29b809dc7eb154db098ad7e2c4b6db3991877a460fdcf909f40d09441241cdbe3c32b86a7d1"' : 'data-target="#xs-controllers-links-module-AddressModule-7a4322f068c8e03fe4d4e9a865582c00f02776aecae139dd6986b29b809dc7eb154db098ad7e2c4b6db3991877a460fdcf909f40d09441241cdbe3c32b86a7d1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AddressModule-7a4322f068c8e03fe4d4e9a865582c00f02776aecae139dd6986b29b809dc7eb154db098ad7e2c4b6db3991877a460fdcf909f40d09441241cdbe3c32b86a7d1"' :
                                            'id="xs-controllers-links-module-AddressModule-7a4322f068c8e03fe4d4e9a865582c00f02776aecae139dd6986b29b809dc7eb154db098ad7e2c4b6db3991877a460fdcf909f40d09441241cdbe3c32b86a7d1"' }>
                                            <li class="link">
                                                <a href="controllers/AddressController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AddressModule-7a4322f068c8e03fe4d4e9a865582c00f02776aecae139dd6986b29b809dc7eb154db098ad7e2c4b6db3991877a460fdcf909f40d09441241cdbe3c32b86a7d1"' : 'data-target="#xs-injectables-links-module-AddressModule-7a4322f068c8e03fe4d4e9a865582c00f02776aecae139dd6986b29b809dc7eb154db098ad7e2c4b6db3991877a460fdcf909f40d09441241cdbe3c32b86a7d1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AddressModule-7a4322f068c8e03fe4d4e9a865582c00f02776aecae139dd6986b29b809dc7eb154db098ad7e2c4b6db3991877a460fdcf909f40d09441241cdbe3c32b86a7d1"' :
                                        'id="xs-injectables-links-module-AddressModule-7a4322f068c8e03fe4d4e9a865582c00f02776aecae139dd6986b29b809dc7eb154db098ad7e2c4b6db3991877a460fdcf909f40d09441241cdbe3c32b86a7d1"' }>
                                        <li class="link">
                                            <a href="injectables/AddressService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppTestModule.html" data-type="entity-link" >AppTestModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-269da1f3513ceb204dacf7193a58d18b7b0b3cf5ba5f7d8ca82878d0d977c32bedcf45c5f133dfeae7a4794589d012cae3bc9848e6179d599d432dabe3e25553"' : 'data-target="#xs-controllers-links-module-AuthModule-269da1f3513ceb204dacf7193a58d18b7b0b3cf5ba5f7d8ca82878d0d977c32bedcf45c5f133dfeae7a4794589d012cae3bc9848e6179d599d432dabe3e25553"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-269da1f3513ceb204dacf7193a58d18b7b0b3cf5ba5f7d8ca82878d0d977c32bedcf45c5f133dfeae7a4794589d012cae3bc9848e6179d599d432dabe3e25553"' :
                                            'id="xs-controllers-links-module-AuthModule-269da1f3513ceb204dacf7193a58d18b7b0b3cf5ba5f7d8ca82878d0d977c32bedcf45c5f133dfeae7a4794589d012cae3bc9848e6179d599d432dabe3e25553"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-269da1f3513ceb204dacf7193a58d18b7b0b3cf5ba5f7d8ca82878d0d977c32bedcf45c5f133dfeae7a4794589d012cae3bc9848e6179d599d432dabe3e25553"' : 'data-target="#xs-injectables-links-module-AuthModule-269da1f3513ceb204dacf7193a58d18b7b0b3cf5ba5f7d8ca82878d0d977c32bedcf45c5f133dfeae7a4794589d012cae3bc9848e6179d599d432dabe3e25553"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-269da1f3513ceb204dacf7193a58d18b7b0b3cf5ba5f7d8ca82878d0d977c32bedcf45c5f133dfeae7a4794589d012cae3bc9848e6179d599d432dabe3e25553"' :
                                        'id="xs-injectables-links-module-AuthModule-269da1f3513ceb204dacf7193a58d18b7b0b3cf5ba5f7d8ca82878d0d977c32bedcf45c5f133dfeae7a4794589d012cae3bc9848e6179d599d432dabe3e25553"' }>
                                        <li class="link">
                                            <a href="injectables/AWSService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AWSService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CacheService</a>
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
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AWSModule.html" data-type="entity-link" >AWSModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AWSModule-9df1f71df3b2da58346fd92398036f5888f346f33ab8c3fd836c648d0f83b68641bd2ad0c578a18bab512941d9963229befc1e027875514b871914fe1d43bb55"' : 'data-target="#xs-injectables-links-module-AWSModule-9df1f71df3b2da58346fd92398036f5888f346f33ab8c3fd836c648d0f83b68641bd2ad0c578a18bab512941d9963229befc1e027875514b871914fe1d43bb55"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AWSModule-9df1f71df3b2da58346fd92398036f5888f346f33ab8c3fd836c648d0f83b68641bd2ad0c578a18bab512941d9963229befc1e027875514b871914fe1d43bb55"' :
                                        'id="xs-injectables-links-module-AWSModule-9df1f71df3b2da58346fd92398036f5888f346f33ab8c3fd836c648d0f83b68641bd2ad0c578a18bab512941d9963229befc1e027875514b871914fe1d43bb55"' }>
                                        <li class="link">
                                            <a href="injectables/AWSService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AWSService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BrandModule.html" data-type="entity-link" >BrandModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BrandModule-593e23572f7b25171358bcc0e2b114f3a575bd2ca6cff57b81e2b96d329b90d15bd18b0ab8c6564f54ad37aff4c4eff7a4a19b0c7301b3b4c7a6b0f2db67b254"' : 'data-target="#xs-controllers-links-module-BrandModule-593e23572f7b25171358bcc0e2b114f3a575bd2ca6cff57b81e2b96d329b90d15bd18b0ab8c6564f54ad37aff4c4eff7a4a19b0c7301b3b4c7a6b0f2db67b254"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BrandModule-593e23572f7b25171358bcc0e2b114f3a575bd2ca6cff57b81e2b96d329b90d15bd18b0ab8c6564f54ad37aff4c4eff7a4a19b0c7301b3b4c7a6b0f2db67b254"' :
                                            'id="xs-controllers-links-module-BrandModule-593e23572f7b25171358bcc0e2b114f3a575bd2ca6cff57b81e2b96d329b90d15bd18b0ab8c6564f54ad37aff4c4eff7a4a19b0c7301b3b4c7a6b0f2db67b254"' }>
                                            <li class="link">
                                                <a href="controllers/BrandController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BrandModule-593e23572f7b25171358bcc0e2b114f3a575bd2ca6cff57b81e2b96d329b90d15bd18b0ab8c6564f54ad37aff4c4eff7a4a19b0c7301b3b4c7a6b0f2db67b254"' : 'data-target="#xs-injectables-links-module-BrandModule-593e23572f7b25171358bcc0e2b114f3a575bd2ca6cff57b81e2b96d329b90d15bd18b0ab8c6564f54ad37aff4c4eff7a4a19b0c7301b3b4c7a6b0f2db67b254"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BrandModule-593e23572f7b25171358bcc0e2b114f3a575bd2ca6cff57b81e2b96d329b90d15bd18b0ab8c6564f54ad37aff4c4eff7a4a19b0c7301b3b4c7a6b0f2db67b254"' :
                                        'id="xs-injectables-links-module-BrandModule-593e23572f7b25171358bcc0e2b114f3a575bd2ca6cff57b81e2b96d329b90d15bd18b0ab8c6564f54ad37aff4c4eff7a4a19b0c7301b3b4c7a6b0f2db67b254"' }>
                                        <li class="link">
                                            <a href="injectables/BrandService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CacheModule.html" data-type="entity-link" >CacheModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CacheModule-5205c24e607c13b9da89cbaecd037423f386d27e02387ba506a24207c3fac142a28fb7f7e9087561b2d3d33bb777f30de13b1d4a3571cf6e53e63cfc97b595f4"' : 'data-target="#xs-injectables-links-module-CacheModule-5205c24e607c13b9da89cbaecd037423f386d27e02387ba506a24207c3fac142a28fb7f7e9087561b2d3d33bb777f30de13b1d4a3571cf6e53e63cfc97b595f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CacheModule-5205c24e607c13b9da89cbaecd037423f386d27e02387ba506a24207c3fac142a28fb7f7e9087561b2d3d33bb777f30de13b1d4a3571cf6e53e63cfc97b595f4"' :
                                        'id="xs-injectables-links-module-CacheModule-5205c24e607c13b9da89cbaecd037423f386d27e02387ba506a24207c3fac142a28fb7f7e9087561b2d3d33bb777f30de13b1d4a3571cf6e53e63cfc97b595f4"' }>
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
                                            'data-target="#controllers-links-module-CartModule-bcc66c4d0738684fba0ee593d49c7e9694b29a41bba9e902b239017d8b87e0fb8b3e5eb1a29da4708b005f7070f37afb41fac757d2266d59d8488151b3056502"' : 'data-target="#xs-controllers-links-module-CartModule-bcc66c4d0738684fba0ee593d49c7e9694b29a41bba9e902b239017d8b87e0fb8b3e5eb1a29da4708b005f7070f37afb41fac757d2266d59d8488151b3056502"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CartModule-bcc66c4d0738684fba0ee593d49c7e9694b29a41bba9e902b239017d8b87e0fb8b3e5eb1a29da4708b005f7070f37afb41fac757d2266d59d8488151b3056502"' :
                                            'id="xs-controllers-links-module-CartModule-bcc66c4d0738684fba0ee593d49c7e9694b29a41bba9e902b239017d8b87e0fb8b3e5eb1a29da4708b005f7070f37afb41fac757d2266d59d8488151b3056502"' }>
                                            <li class="link">
                                                <a href="controllers/CartController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CartModule-bcc66c4d0738684fba0ee593d49c7e9694b29a41bba9e902b239017d8b87e0fb8b3e5eb1a29da4708b005f7070f37afb41fac757d2266d59d8488151b3056502"' : 'data-target="#xs-injectables-links-module-CartModule-bcc66c4d0738684fba0ee593d49c7e9694b29a41bba9e902b239017d8b87e0fb8b3e5eb1a29da4708b005f7070f37afb41fac757d2266d59d8488151b3056502"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CartModule-bcc66c4d0738684fba0ee593d49c7e9694b29a41bba9e902b239017d8b87e0fb8b3e5eb1a29da4708b005f7070f37afb41fac757d2266d59d8488151b3056502"' :
                                        'id="xs-injectables-links-module-CartModule-bcc66c4d0738684fba0ee593d49c7e9694b29a41bba9e902b239017d8b87e0fb8b3e5eb1a29da4708b005f7070f37afb41fac757d2266d59d8488151b3056502"' }>
                                        <li class="link">
                                            <a href="injectables/CartService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoryModule-4467e722f08245600389ee2d3828cc2a68c1411ba758f8b22741db41fe353677d80f2f9e3268a80ba4977e1665750222121ec4b3aaecb07c77f290eb29bd9825"' : 'data-target="#xs-controllers-links-module-CategoryModule-4467e722f08245600389ee2d3828cc2a68c1411ba758f8b22741db41fe353677d80f2f9e3268a80ba4977e1665750222121ec4b3aaecb07c77f290eb29bd9825"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-4467e722f08245600389ee2d3828cc2a68c1411ba758f8b22741db41fe353677d80f2f9e3268a80ba4977e1665750222121ec4b3aaecb07c77f290eb29bd9825"' :
                                            'id="xs-controllers-links-module-CategoryModule-4467e722f08245600389ee2d3828cc2a68c1411ba758f8b22741db41fe353677d80f2f9e3268a80ba4977e1665750222121ec4b3aaecb07c77f290eb29bd9825"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-4467e722f08245600389ee2d3828cc2a68c1411ba758f8b22741db41fe353677d80f2f9e3268a80ba4977e1665750222121ec4b3aaecb07c77f290eb29bd9825"' : 'data-target="#xs-injectables-links-module-CategoryModule-4467e722f08245600389ee2d3828cc2a68c1411ba758f8b22741db41fe353677d80f2f9e3268a80ba4977e1665750222121ec4b3aaecb07c77f290eb29bd9825"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-4467e722f08245600389ee2d3828cc2a68c1411ba758f8b22741db41fe353677d80f2f9e3268a80ba4977e1665750222121ec4b3aaecb07c77f290eb29bd9825"' :
                                        'id="xs-injectables-links-module-CategoryModule-4467e722f08245600389ee2d3828cc2a68c1411ba758f8b22741db41fe353677d80f2f9e3268a80ba4977e1665750222121ec4b3aaecb07c77f290eb29bd9825"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ConfigModule-e4de49e14fd8a2118589b58f370aede84cd543402fcc3bdc2db20e96c4fc75b92c6bd59a31d8ad24b14694be0021521f4a4139b82789e871edc6431afeb6cd87"' : 'data-target="#xs-injectables-links-module-ConfigModule-e4de49e14fd8a2118589b58f370aede84cd543402fcc3bdc2db20e96c4fc75b92c6bd59a31d8ad24b14694be0021521f4a4139b82789e871edc6431afeb6cd87"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConfigModule-e4de49e14fd8a2118589b58f370aede84cd543402fcc3bdc2db20e96c4fc75b92c6bd59a31d8ad24b14694be0021521f4a4139b82789e871edc6431afeb6cd87"' :
                                        'id="xs-injectables-links-module-ConfigModule-e4de49e14fd8a2118589b58f370aede84cd543402fcc3bdc2db20e96c4fc75b92c6bd59a31d8ad24b14694be0021521f4a4139b82789e871edc6431afeb6cd87"' }>
                                        <li class="link">
                                            <a href="injectables/ConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-7dd22f7adfc4419a4072d2d3e8096aaf1cd78c3d1c163f24e7712a809bd083a62d07999c5e5ee72bff4e3d517389734751ebd4383cc89c7f1284be4066c92e0a"' : 'data-target="#xs-injectables-links-module-CoreModule-7dd22f7adfc4419a4072d2d3e8096aaf1cd78c3d1c163f24e7712a809bd083a62d07999c5e5ee72bff4e3d517389734751ebd4383cc89c7f1284be4066c92e0a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-7dd22f7adfc4419a4072d2d3e8096aaf1cd78c3d1c163f24e7712a809bd083a62d07999c5e5ee72bff4e3d517389734751ebd4383cc89c7f1284be4066c92e0a"' :
                                        'id="xs-injectables-links-module-CoreModule-7dd22f7adfc4419a4072d2d3e8096aaf1cd78c3d1c163f24e7712a809bd083a62d07999c5e5ee72bff4e3d517389734751ebd4383cc89c7f1284be4066c92e0a"' }>
                                        <li class="link">
                                            <a href="injectables/CoreService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoreService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DbModule.html" data-type="entity-link" >DbModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FileModule.html" data-type="entity-link" >FileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FileModule-2887fff6186a04fdb795db336aff3829e6224dd287e6fcb4305fb46ccf16e1f5f26d6d4233e4d3464416d3b18251076cd4326b3aaba4213e2bdb308c3a87eabf"' : 'data-target="#xs-controllers-links-module-FileModule-2887fff6186a04fdb795db336aff3829e6224dd287e6fcb4305fb46ccf16e1f5f26d6d4233e4d3464416d3b18251076cd4326b3aaba4213e2bdb308c3a87eabf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FileModule-2887fff6186a04fdb795db336aff3829e6224dd287e6fcb4305fb46ccf16e1f5f26d6d4233e4d3464416d3b18251076cd4326b3aaba4213e2bdb308c3a87eabf"' :
                                            'id="xs-controllers-links-module-FileModule-2887fff6186a04fdb795db336aff3829e6224dd287e6fcb4305fb46ccf16e1f5f26d6d4233e4d3464416d3b18251076cd4326b3aaba4213e2bdb308c3a87eabf"' }>
                                            <li class="link">
                                                <a href="controllers/FileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FileModule-2887fff6186a04fdb795db336aff3829e6224dd287e6fcb4305fb46ccf16e1f5f26d6d4233e4d3464416d3b18251076cd4326b3aaba4213e2bdb308c3a87eabf"' : 'data-target="#xs-injectables-links-module-FileModule-2887fff6186a04fdb795db336aff3829e6224dd287e6fcb4305fb46ccf16e1f5f26d6d4233e4d3464416d3b18251076cd4326b3aaba4213e2bdb308c3a87eabf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileModule-2887fff6186a04fdb795db336aff3829e6224dd287e6fcb4305fb46ccf16e1f5f26d6d4233e4d3464416d3b18251076cd4326b3aaba4213e2bdb308c3a87eabf"' :
                                        'id="xs-injectables-links-module-FileModule-2887fff6186a04fdb795db336aff3829e6224dd287e6fcb4305fb46ccf16e1f5f26d6d4233e4d3464416d3b18251076cd4326b3aaba4213e2bdb308c3a87eabf"' }>
                                        <li class="link">
                                            <a href="injectables/FileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormModule.html" data-type="entity-link" >FormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FormModule-36ac0db69ecc80f590bd7d54f160d285264f97c9ce8f795503cf4cad523e9e11dd98a07d6bf29c5901b2a2d7b1b064ce0ef32cc8c11436611e34f79afae04264"' : 'data-target="#xs-controllers-links-module-FormModule-36ac0db69ecc80f590bd7d54f160d285264f97c9ce8f795503cf4cad523e9e11dd98a07d6bf29c5901b2a2d7b1b064ce0ef32cc8c11436611e34f79afae04264"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FormModule-36ac0db69ecc80f590bd7d54f160d285264f97c9ce8f795503cf4cad523e9e11dd98a07d6bf29c5901b2a2d7b1b064ce0ef32cc8c11436611e34f79afae04264"' :
                                            'id="xs-controllers-links-module-FormModule-36ac0db69ecc80f590bd7d54f160d285264f97c9ce8f795503cf4cad523e9e11dd98a07d6bf29c5901b2a2d7b1b064ce0ef32cc8c11436611e34f79afae04264"' }>
                                            <li class="link">
                                                <a href="controllers/FormController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FormModule-36ac0db69ecc80f590bd7d54f160d285264f97c9ce8f795503cf4cad523e9e11dd98a07d6bf29c5901b2a2d7b1b064ce0ef32cc8c11436611e34f79afae04264"' : 'data-target="#xs-injectables-links-module-FormModule-36ac0db69ecc80f590bd7d54f160d285264f97c9ce8f795503cf4cad523e9e11dd98a07d6bf29c5901b2a2d7b1b064ce0ef32cc8c11436611e34f79afae04264"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FormModule-36ac0db69ecc80f590bd7d54f160d285264f97c9ce8f795503cf4cad523e9e11dd98a07d6bf29c5901b2a2d7b1b064ce0ef32cc8c11436611e34f79afae04264"' :
                                        'id="xs-injectables-links-module-FormModule-36ac0db69ecc80f590bd7d54f160d285264f97c9ce8f795503cf4cad523e9e11dd98a07d6bf29c5901b2a2d7b1b064ce0ef32cc8c11436611e34f79afae04264"' }>
                                        <li class="link">
                                            <a href="injectables/FormService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthCheckModule.html" data-type="entity-link" >HealthCheckModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HealthCheckModule-bcb346387464e32de22f85fbc2ab5c9e4e3fad2ed6c9f9f314bd18d0b795d3b395a5e14cac2ffa02ded3a847ed6b92a75a8bbec6bb425ff26e9cef43912b301e"' : 'data-target="#xs-controllers-links-module-HealthCheckModule-bcb346387464e32de22f85fbc2ab5c9e4e3fad2ed6c9f9f314bd18d0b795d3b395a5e14cac2ffa02ded3a847ed6b92a75a8bbec6bb425ff26e9cef43912b301e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthCheckModule-bcb346387464e32de22f85fbc2ab5c9e4e3fad2ed6c9f9f314bd18d0b795d3b395a5e14cac2ffa02ded3a847ed6b92a75a8bbec6bb425ff26e9cef43912b301e"' :
                                            'id="xs-controllers-links-module-HealthCheckModule-bcb346387464e32de22f85fbc2ab5c9e4e3fad2ed6c9f9f314bd18d0b795d3b395a5e14cac2ffa02ded3a847ed6b92a75a8bbec6bb425ff26e9cef43912b301e"' }>
                                            <li class="link">
                                                <a href="controllers/HealthCheckController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthCheckController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HealthCheckModule-bcb346387464e32de22f85fbc2ab5c9e4e3fad2ed6c9f9f314bd18d0b795d3b395a5e14cac2ffa02ded3a847ed6b92a75a8bbec6bb425ff26e9cef43912b301e"' : 'data-target="#xs-injectables-links-module-HealthCheckModule-bcb346387464e32de22f85fbc2ab5c9e4e3fad2ed6c9f9f314bd18d0b795d3b395a5e14cac2ffa02ded3a847ed6b92a75a8bbec6bb425ff26e9cef43912b301e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HealthCheckModule-bcb346387464e32de22f85fbc2ab5c9e4e3fad2ed6c9f9f314bd18d0b795d3b395a5e14cac2ffa02ded3a847ed6b92a75a8bbec6bb425ff26e9cef43912b301e"' :
                                        'id="xs-injectables-links-module-HealthCheckModule-bcb346387464e32de22f85fbc2ab5c9e4e3fad2ed6c9f9f314bd18d0b795d3b395a5e14cac2ffa02ded3a847ed6b92a75a8bbec6bb425ff26e9cef43912b301e"' }>
                                        <li class="link">
                                            <a href="injectables/HealthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InventoryModule.html" data-type="entity-link" >InventoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-InventoryModule-4990363057b78b1d3a9c2640720a0972398f66a9f40ff3d83da2fc109e33d3799855035753fd86ecf9f34aa1b50f315bc808f885bc9882cb151520e1c5217623"' : 'data-target="#xs-controllers-links-module-InventoryModule-4990363057b78b1d3a9c2640720a0972398f66a9f40ff3d83da2fc109e33d3799855035753fd86ecf9f34aa1b50f315bc808f885bc9882cb151520e1c5217623"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InventoryModule-4990363057b78b1d3a9c2640720a0972398f66a9f40ff3d83da2fc109e33d3799855035753fd86ecf9f34aa1b50f315bc808f885bc9882cb151520e1c5217623"' :
                                            'id="xs-controllers-links-module-InventoryModule-4990363057b78b1d3a9c2640720a0972398f66a9f40ff3d83da2fc109e33d3799855035753fd86ecf9f34aa1b50f315bc808f885bc9882cb151520e1c5217623"' }>
                                            <li class="link">
                                                <a href="controllers/InventoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InventoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-InventoryModule-4990363057b78b1d3a9c2640720a0972398f66a9f40ff3d83da2fc109e33d3799855035753fd86ecf9f34aa1b50f315bc808f885bc9882cb151520e1c5217623"' : 'data-target="#xs-injectables-links-module-InventoryModule-4990363057b78b1d3a9c2640720a0972398f66a9f40ff3d83da2fc109e33d3799855035753fd86ecf9f34aa1b50f315bc808f885bc9882cb151520e1c5217623"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InventoryModule-4990363057b78b1d3a9c2640720a0972398f66a9f40ff3d83da2fc109e33d3799855035753fd86ecf9f34aa1b50f315bc808f885bc9882cb151520e1c5217623"' :
                                        'id="xs-injectables-links-module-InventoryModule-4990363057b78b1d3a9c2640720a0972398f66a9f40ff3d83da2fc109e33d3799855035753fd86ecf9f34aa1b50f315bc808f885bc9882cb151520e1c5217623"' }>
                                        <li class="link">
                                            <a href="injectables/InventoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InventoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OfferModule.html" data-type="entity-link" >OfferModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OfferModule-3d8a03bb2094243c66e036f7bf830cd9029144b2ce769930117c7b169efff28a8a66a834c1937aa9f4a9dd12461ec7bd05cf01a68ee8f39c552e3c302ceb8dce"' : 'data-target="#xs-controllers-links-module-OfferModule-3d8a03bb2094243c66e036f7bf830cd9029144b2ce769930117c7b169efff28a8a66a834c1937aa9f4a9dd12461ec7bd05cf01a68ee8f39c552e3c302ceb8dce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OfferModule-3d8a03bb2094243c66e036f7bf830cd9029144b2ce769930117c7b169efff28a8a66a834c1937aa9f4a9dd12461ec7bd05cf01a68ee8f39c552e3c302ceb8dce"' :
                                            'id="xs-controllers-links-module-OfferModule-3d8a03bb2094243c66e036f7bf830cd9029144b2ce769930117c7b169efff28a8a66a834c1937aa9f4a9dd12461ec7bd05cf01a68ee8f39c552e3c302ceb8dce"' }>
                                            <li class="link">
                                                <a href="controllers/OfferController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OfferModule-3d8a03bb2094243c66e036f7bf830cd9029144b2ce769930117c7b169efff28a8a66a834c1937aa9f4a9dd12461ec7bd05cf01a68ee8f39c552e3c302ceb8dce"' : 'data-target="#xs-injectables-links-module-OfferModule-3d8a03bb2094243c66e036f7bf830cd9029144b2ce769930117c7b169efff28a8a66a834c1937aa9f4a9dd12461ec7bd05cf01a68ee8f39c552e3c302ceb8dce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OfferModule-3d8a03bb2094243c66e036f7bf830cd9029144b2ce769930117c7b169efff28a8a66a834c1937aa9f4a9dd12461ec7bd05cf01a68ee8f39c552e3c302ceb8dce"' :
                                        'id="xs-injectables-links-module-OfferModule-3d8a03bb2094243c66e036f7bf830cd9029144b2ce769930117c7b169efff28a8a66a834c1937aa9f4a9dd12461ec7bd05cf01a68ee8f39c552e3c302ceb8dce"' }>
                                        <li class="link">
                                            <a href="injectables/OfferService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrderModule.html" data-type="entity-link" >OrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OrderModule-434cd278ccffad8f1b71ba9f171909e30103f4b6f10775984c8f0e28009effbd7c621da1abee9f905e40fa7d4a2ed835443abafc41f67d20a317388c6d64e98f"' : 'data-target="#xs-controllers-links-module-OrderModule-434cd278ccffad8f1b71ba9f171909e30103f4b6f10775984c8f0e28009effbd7c621da1abee9f905e40fa7d4a2ed835443abafc41f67d20a317388c6d64e98f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-434cd278ccffad8f1b71ba9f171909e30103f4b6f10775984c8f0e28009effbd7c621da1abee9f905e40fa7d4a2ed835443abafc41f67d20a317388c6d64e98f"' :
                                            'id="xs-controllers-links-module-OrderModule-434cd278ccffad8f1b71ba9f171909e30103f4b6f10775984c8f0e28009effbd7c621da1abee9f905e40fa7d4a2ed835443abafc41f67d20a317388c6d64e98f"' }>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrderModule-434cd278ccffad8f1b71ba9f171909e30103f4b6f10775984c8f0e28009effbd7c621da1abee9f905e40fa7d4a2ed835443abafc41f67d20a317388c6d64e98f"' : 'data-target="#xs-injectables-links-module-OrderModule-434cd278ccffad8f1b71ba9f171909e30103f4b6f10775984c8f0e28009effbd7c621da1abee9f905e40fa7d4a2ed835443abafc41f67d20a317388c6d64e98f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-434cd278ccffad8f1b71ba9f171909e30103f4b6f10775984c8f0e28009effbd7c621da1abee9f905e40fa7d4a2ed835443abafc41f67d20a317388c6d64e98f"' :
                                        'id="xs-injectables-links-module-OrderModule-434cd278ccffad8f1b71ba9f171909e30103f4b6f10775984c8f0e28009effbd7c621da1abee9f905e40fa7d4a2ed835443abafc41f67d20a317388c6d64e98f"' }>
                                        <li class="link">
                                            <a href="injectables/OrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductModule-d2fffca69267104e3694292235b5c1d5e703d080a532e825bf3e80d2fae33eb4ad941d97bd205e0f12b04d181a34cafe0f15781926bf4d3a0848120796f44384"' : 'data-target="#xs-controllers-links-module-ProductModule-d2fffca69267104e3694292235b5c1d5e703d080a532e825bf3e80d2fae33eb4ad941d97bd205e0f12b04d181a34cafe0f15781926bf4d3a0848120796f44384"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-d2fffca69267104e3694292235b5c1d5e703d080a532e825bf3e80d2fae33eb4ad941d97bd205e0f12b04d181a34cafe0f15781926bf4d3a0848120796f44384"' :
                                            'id="xs-controllers-links-module-ProductModule-d2fffca69267104e3694292235b5c1d5e703d080a532e825bf3e80d2fae33eb4ad941d97bd205e0f12b04d181a34cafe0f15781926bf4d3a0848120796f44384"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-d2fffca69267104e3694292235b5c1d5e703d080a532e825bf3e80d2fae33eb4ad941d97bd205e0f12b04d181a34cafe0f15781926bf4d3a0848120796f44384"' : 'data-target="#xs-injectables-links-module-ProductModule-d2fffca69267104e3694292235b5c1d5e703d080a532e825bf3e80d2fae33eb4ad941d97bd205e0f12b04d181a34cafe0f15781926bf4d3a0848120796f44384"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-d2fffca69267104e3694292235b5c1d5e703d080a532e825bf3e80d2fae33eb4ad941d97bd205e0f12b04d181a34cafe0f15781926bf4d3a0848120796f44384"' :
                                        'id="xs-injectables-links-module-ProductModule-d2fffca69267104e3694292235b5c1d5e703d080a532e825bf3e80d2fae33eb4ad941d97bd205e0f12b04d181a34cafe0f15781926bf4d3a0848120796f44384"' }>
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
                                            'data-target="#controllers-links-module-ReviewModule-abb4bd489a3982ecb2b785e260e3cc3f243ef0a4a9a6400ea3cf79ba8b85b1a7ba2fc6953e06c2e70808c14e071aaa16fbb2a1318b60f821509953341d26ec24"' : 'data-target="#xs-controllers-links-module-ReviewModule-abb4bd489a3982ecb2b785e260e3cc3f243ef0a4a9a6400ea3cf79ba8b85b1a7ba2fc6953e06c2e70808c14e071aaa16fbb2a1318b60f821509953341d26ec24"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewModule-abb4bd489a3982ecb2b785e260e3cc3f243ef0a4a9a6400ea3cf79ba8b85b1a7ba2fc6953e06c2e70808c14e071aaa16fbb2a1318b60f821509953341d26ec24"' :
                                            'id="xs-controllers-links-module-ReviewModule-abb4bd489a3982ecb2b785e260e3cc3f243ef0a4a9a6400ea3cf79ba8b85b1a7ba2fc6953e06c2e70808c14e071aaa16fbb2a1318b60f821509953341d26ec24"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewModule-abb4bd489a3982ecb2b785e260e3cc3f243ef0a4a9a6400ea3cf79ba8b85b1a7ba2fc6953e06c2e70808c14e071aaa16fbb2a1318b60f821509953341d26ec24"' : 'data-target="#xs-injectables-links-module-ReviewModule-abb4bd489a3982ecb2b785e260e3cc3f243ef0a4a9a6400ea3cf79ba8b85b1a7ba2fc6953e06c2e70808c14e071aaa16fbb2a1318b60f821509953341d26ec24"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewModule-abb4bd489a3982ecb2b785e260e3cc3f243ef0a4a9a6400ea3cf79ba8b85b1a7ba2fc6953e06c2e70808c14e071aaa16fbb2a1318b60f821509953341d26ec24"' :
                                        'id="xs-injectables-links-module-ReviewModule-abb4bd489a3982ecb2b785e260e3cc3f243ef0a4a9a6400ea3cf79ba8b85b1a7ba2fc6953e06c2e70808c14e071aaa16fbb2a1318b60f821509953341d26ec24"' }>
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
                                            'data-target="#controllers-links-module-StoryModule-e8afde3769cdfd4db50a307ac73f681b4a900ee8d93313bbd5e7bff91ef5675af69be6676691c704c9c034a9c2a6984937e09ef34f90d04472af58ba39c7907e"' : 'data-target="#xs-controllers-links-module-StoryModule-e8afde3769cdfd4db50a307ac73f681b4a900ee8d93313bbd5e7bff91ef5675af69be6676691c704c9c034a9c2a6984937e09ef34f90d04472af58ba39c7907e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StoryModule-e8afde3769cdfd4db50a307ac73f681b4a900ee8d93313bbd5e7bff91ef5675af69be6676691c704c9c034a9c2a6984937e09ef34f90d04472af58ba39c7907e"' :
                                            'id="xs-controllers-links-module-StoryModule-e8afde3769cdfd4db50a307ac73f681b4a900ee8d93313bbd5e7bff91ef5675af69be6676691c704c9c034a9c2a6984937e09ef34f90d04472af58ba39c7907e"' }>
                                            <li class="link">
                                                <a href="controllers/StoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StoryModule-e8afde3769cdfd4db50a307ac73f681b4a900ee8d93313bbd5e7bff91ef5675af69be6676691c704c9c034a9c2a6984937e09ef34f90d04472af58ba39c7907e"' : 'data-target="#xs-injectables-links-module-StoryModule-e8afde3769cdfd4db50a307ac73f681b4a900ee8d93313bbd5e7bff91ef5675af69be6676691c704c9c034a9c2a6984937e09ef34f90d04472af58ba39c7907e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StoryModule-e8afde3769cdfd4db50a307ac73f681b4a900ee8d93313bbd5e7bff91ef5675af69be6676691c704c9c034a9c2a6984937e09ef34f90d04472af58ba39c7907e"' :
                                        'id="xs-injectables-links-module-StoryModule-e8afde3769cdfd4db50a307ac73f681b4a900ee8d93313bbd5e7bff91ef5675af69be6676691c704c9c034a9c2a6984937e09ef34f90d04472af58ba39c7907e"' }>
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
                                            'data-target="#controllers-links-module-SupportModule-2d72a3841746b172beadf8edb80dc422ae0e79120b718b96deb4e554f3fe3e9c5e06638de33f17b2309081c329d95151808197efbeffbb537f23ff30e759bbb0"' : 'data-target="#xs-controllers-links-module-SupportModule-2d72a3841746b172beadf8edb80dc422ae0e79120b718b96deb4e554f3fe3e9c5e06638de33f17b2309081c329d95151808197efbeffbb537f23ff30e759bbb0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SupportModule-2d72a3841746b172beadf8edb80dc422ae0e79120b718b96deb4e554f3fe3e9c5e06638de33f17b2309081c329d95151808197efbeffbb537f23ff30e759bbb0"' :
                                            'id="xs-controllers-links-module-SupportModule-2d72a3841746b172beadf8edb80dc422ae0e79120b718b96deb4e554f3fe3e9c5e06638de33f17b2309081c329d95151808197efbeffbb537f23ff30e759bbb0"' }>
                                            <li class="link">
                                                <a href="controllers/SupportController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupportController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SupportModule-2d72a3841746b172beadf8edb80dc422ae0e79120b718b96deb4e554f3fe3e9c5e06638de33f17b2309081c329d95151808197efbeffbb537f23ff30e759bbb0"' : 'data-target="#xs-injectables-links-module-SupportModule-2d72a3841746b172beadf8edb80dc422ae0e79120b718b96deb4e554f3fe3e9c5e06638de33f17b2309081c329d95151808197efbeffbb537f23ff30e759bbb0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SupportModule-2d72a3841746b172beadf8edb80dc422ae0e79120b718b96deb4e554f3fe3e9c5e06638de33f17b2309081c329d95151808197efbeffbb537f23ff30e759bbb0"' :
                                        'id="xs-injectables-links-module-SupportModule-2d72a3841746b172beadf8edb80dc422ae0e79120b718b96deb4e554f3fe3e9c5e06638de33f17b2309081c329d95151808197efbeffbb537f23ff30e759bbb0"' }>
                                        <li class="link">
                                            <a href="injectables/SupportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagModule.html" data-type="entity-link" >TagModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TagModule-194d296808d6ec09d5e76b28933a241ad3f652a02952afc4be886e56a7c9b3aa74745658e7032f96e2fbcf0359ea27ad21d07ebad7a658af1be99849aac32a48"' : 'data-target="#xs-controllers-links-module-TagModule-194d296808d6ec09d5e76b28933a241ad3f652a02952afc4be886e56a7c9b3aa74745658e7032f96e2fbcf0359ea27ad21d07ebad7a658af1be99849aac32a48"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagModule-194d296808d6ec09d5e76b28933a241ad3f652a02952afc4be886e56a7c9b3aa74745658e7032f96e2fbcf0359ea27ad21d07ebad7a658af1be99849aac32a48"' :
                                            'id="xs-controllers-links-module-TagModule-194d296808d6ec09d5e76b28933a241ad3f652a02952afc4be886e56a7c9b3aa74745658e7032f96e2fbcf0359ea27ad21d07ebad7a658af1be99849aac32a48"' }>
                                            <li class="link">
                                                <a href="controllers/TagController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TagModule-194d296808d6ec09d5e76b28933a241ad3f652a02952afc4be886e56a7c9b3aa74745658e7032f96e2fbcf0359ea27ad21d07ebad7a658af1be99849aac32a48"' : 'data-target="#xs-injectables-links-module-TagModule-194d296808d6ec09d5e76b28933a241ad3f652a02952afc4be886e56a7c9b3aa74745658e7032f96e2fbcf0359ea27ad21d07ebad7a658af1be99849aac32a48"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagModule-194d296808d6ec09d5e76b28933a241ad3f652a02952afc4be886e56a7c9b3aa74745658e7032f96e2fbcf0359ea27ad21d07ebad7a658af1be99849aac32a48"' :
                                        'id="xs-injectables-links-module-TagModule-194d296808d6ec09d5e76b28933a241ad3f652a02952afc4be886e56a7c9b3aa74745658e7032f96e2fbcf0359ea27ad21d07ebad7a658af1be99849aac32a48"' }>
                                        <li class="link">
                                            <a href="injectables/TagService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionModule.html" data-type="entity-link" >TransactionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TransactionModule-b3ce745805b867bb83794deb07169ec7f99a7843da565223ab62a92043535ad2835193768e39cb80e768ae098bd19d529ef8843a25fca72c332f0efdce0adfdd"' : 'data-target="#xs-controllers-links-module-TransactionModule-b3ce745805b867bb83794deb07169ec7f99a7843da565223ab62a92043535ad2835193768e39cb80e768ae098bd19d529ef8843a25fca72c332f0efdce0adfdd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TransactionModule-b3ce745805b867bb83794deb07169ec7f99a7843da565223ab62a92043535ad2835193768e39cb80e768ae098bd19d529ef8843a25fca72c332f0efdce0adfdd"' :
                                            'id="xs-controllers-links-module-TransactionModule-b3ce745805b867bb83794deb07169ec7f99a7843da565223ab62a92043535ad2835193768e39cb80e768ae098bd19d529ef8843a25fca72c332f0efdce0adfdd"' }>
                                            <li class="link">
                                                <a href="controllers/TransactionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TransactionModule-b3ce745805b867bb83794deb07169ec7f99a7843da565223ab62a92043535ad2835193768e39cb80e768ae098bd19d529ef8843a25fca72c332f0efdce0adfdd"' : 'data-target="#xs-injectables-links-module-TransactionModule-b3ce745805b867bb83794deb07169ec7f99a7843da565223ab62a92043535ad2835193768e39cb80e768ae098bd19d529ef8843a25fca72c332f0efdce0adfdd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransactionModule-b3ce745805b867bb83794deb07169ec7f99a7843da565223ab62a92043535ad2835193768e39cb80e768ae098bd19d529ef8843a25fca72c332f0efdce0adfdd"' :
                                        'id="xs-injectables-links-module-TransactionModule-b3ce745805b867bb83794deb07169ec7f99a7843da565223ab62a92043535ad2835193768e39cb80e768ae098bd19d529ef8843a25fca72c332f0efdce0adfdd"' }>
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
                                            'data-target="#controllers-links-module-UserModule-eb1a43323b4143f1e3691255f7b81667bd42242f5dd7cf17a675b254e48f8e20b74f5388a0d277352d9f3314c9ea63b3e8eaaa77f63fec7174d5998621b9d226"' : 'data-target="#xs-controllers-links-module-UserModule-eb1a43323b4143f1e3691255f7b81667bd42242f5dd7cf17a675b254e48f8e20b74f5388a0d277352d9f3314c9ea63b3e8eaaa77f63fec7174d5998621b9d226"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-eb1a43323b4143f1e3691255f7b81667bd42242f5dd7cf17a675b254e48f8e20b74f5388a0d277352d9f3314c9ea63b3e8eaaa77f63fec7174d5998621b9d226"' :
                                            'id="xs-controllers-links-module-UserModule-eb1a43323b4143f1e3691255f7b81667bd42242f5dd7cf17a675b254e48f8e20b74f5388a0d277352d9f3314c9ea63b3e8eaaa77f63fec7174d5998621b9d226"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-eb1a43323b4143f1e3691255f7b81667bd42242f5dd7cf17a675b254e48f8e20b74f5388a0d277352d9f3314c9ea63b3e8eaaa77f63fec7174d5998621b9d226"' : 'data-target="#xs-injectables-links-module-UserModule-eb1a43323b4143f1e3691255f7b81667bd42242f5dd7cf17a675b254e48f8e20b74f5388a0d277352d9f3314c9ea63b3e8eaaa77f63fec7174d5998621b9d226"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-eb1a43323b4143f1e3691255f7b81667bd42242f5dd7cf17a675b254e48f8e20b74f5388a0d277352d9f3314c9ea63b3e8eaaa77f63fec7174d5998621b9d226"' :
                                        'id="xs-injectables-links-module-UserModule-eb1a43323b4143f1e3691255f7b81667bd42242f5dd7cf17a675b254e48f8e20b74f5388a0d277352d9f3314c9ea63b3e8eaaa77f63fec7174d5998621b9d226"' }>
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
                                <a href="modules/UtilsModule.html" data-type="entity-link" >UtilsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UtilsModule-b9d65247915ccc9bf712c8098131279409fb5a928eef2575e847a007b13f16e2121b6b69fdf88799ef4a3c58587df1a3874748db42d0a12a555c83ba1dd66a25"' : 'data-target="#xs-controllers-links-module-UtilsModule-b9d65247915ccc9bf712c8098131279409fb5a928eef2575e847a007b13f16e2121b6b69fdf88799ef4a3c58587df1a3874748db42d0a12a555c83ba1dd66a25"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UtilsModule-b9d65247915ccc9bf712c8098131279409fb5a928eef2575e847a007b13f16e2121b6b69fdf88799ef4a3c58587df1a3874748db42d0a12a555c83ba1dd66a25"' :
                                            'id="xs-controllers-links-module-UtilsModule-b9d65247915ccc9bf712c8098131279409fb5a928eef2575e847a007b13f16e2121b6b69fdf88799ef4a3c58587df1a3874748db42d0a12a555c83ba1dd66a25"' }>
                                            <li class="link">
                                                <a href="controllers/UtilsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UtilsModule-b9d65247915ccc9bf712c8098131279409fb5a928eef2575e847a007b13f16e2121b6b69fdf88799ef4a3c58587df1a3874748db42d0a12a555c83ba1dd66a25"' : 'data-target="#xs-injectables-links-module-UtilsModule-b9d65247915ccc9bf712c8098131279409fb5a928eef2575e847a007b13f16e2121b6b69fdf88799ef4a3c58587df1a3874748db42d0a12a555c83ba1dd66a25"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UtilsModule-b9d65247915ccc9bf712c8098131279409fb5a928eef2575e847a007b13f16e2121b6b69fdf88799ef4a3c58587df1a3874748db42d0a12a555c83ba1dd66a25"' :
                                        'id="xs-injectables-links-module-UtilsModule-b9d65247915ccc9bf712c8098131279409fb5a928eef2575e847a007b13f16e2121b6b69fdf88799ef4a3c58587df1a3874748db42d0a12a555c83ba1dd66a25"' }>
                                        <li class="link">
                                            <a href="injectables/UtilsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
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
                                <a href="classes/AddressDTO.html" data-type="entity-link" >AddressDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddressesDTO.html" data-type="entity-link" >AddressesDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllAddressDTO.html" data-type="entity-link" >AllAddressDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllTicketsDTO.html" data-type="entity-link" >AllTicketsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthUserDTO.html" data-type="entity-link" >AuthUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BounceDTO.html" data-type="entity-link" >BounceDTO</a>
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
                                <a href="classes/Category-1.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckoutDTO.html" data-type="entity-link" >CheckoutDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDTO.html" data-type="entity-link" >CreateCategoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDTO.html" data-type="entity-link" >CreateCompanyDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFormDataDTO.html" data-type="entity-link" >CreateFormDataDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFormDataDTO-1.html" data-type="entity-link" >CreateFormDataDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInventoryDTO.html" data-type="entity-link" >CreateInventoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOauthUserDTO.html" data-type="entity-link" >CreateOauthUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferDTO.html" data-type="entity-link" >CreateOfferDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDTO.html" data-type="entity-link" >CreateProductDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReviewDTO.html" data-type="entity-link" >CreateReviewDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStoryDTO.html" data-type="entity-link" >CreateStoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDTO.html" data-type="entity-link" >CreateTagDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransactionDTO.html" data-type="entity-link" >CreateTransactionDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDTO.html" data-type="entity-link" >CreateUserDTO</a>
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
                                <a href="classes/DeleteOfferDTO.html" data-type="entity-link" >DeleteOfferDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailDTO.html" data-type="entity-link" >EmailDTO</a>
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
                                <a href="classes/Form-1.html" data-type="entity-link" >Form</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormResponse.html" data-type="entity-link" >FormResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormResponse-1.html" data-type="entity-link" >FormResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllCartsDTO.html" data-type="entity-link" >GetAllCartsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllInventoryDTO.html" data-type="entity-link" >GetAllInventoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllOffersDTO.html" data-type="entity-link" >GetAllOffersDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllOffersDTO-1.html" data-type="entity-link" >GetAllOffersDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllOrdersDocumentsDTO.html" data-type="entity-link" >GetAllOrdersDocumentsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllOrdersDTO.html" data-type="entity-link" >GetAllOrdersDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllProductsDTO.html" data-type="entity-link" >GetAllProductsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllReviewsDTO.html" data-type="entity-link" >GetAllReviewsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllStoriesDTO.html" data-type="entity-link" >GetAllStoriesDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllTagsDTO.html" data-type="entity-link" >GetAllTagsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllTransactionsDTO.html" data-type="entity-link" >GetAllTransactionsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllUsersDTO.html" data-type="entity-link" >GetAllUsersDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetFormDataDTO.html" data-type="entity-link" >GetFormDataDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetFormDataDTO-1.html" data-type="entity-link" >GetFormDataDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetStoriesDTO.html" data-type="entity-link" >GetStoriesDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Inventory.html" data-type="entity-link" >Inventory</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDTO.html" data-type="entity-link" >LoginUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Offer.html" data-type="entity-link" >Offer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderDTO.html" data-type="entity-link" >OrderDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDTO.html" data-type="entity-link" >ResetPasswordDTO</a>
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
                                <a href="classes/Tag-1.html" data-type="entity-link" >Tag</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ticket.html" data-type="entity-link" >Ticket</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketDTO.html" data-type="entity-link" >TicketDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketsDTO.html" data-type="entity-link" >TicketsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Transaction.html" data-type="entity-link" >Transaction</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCartItemDTO.html" data-type="entity-link" >UpdateCartItemDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDTO.html" data-type="entity-link" >UpdateCategoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInventoryDTO.html" data-type="entity-link" >UpdateInventoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOfferDTO.html" data-type="entity-link" >UpdateOfferDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePasswordDTO.html" data-type="entity-link" >UpdatePasswordDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDTO.html" data-type="entity-link" >UpdateProductDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReviewDTO.html" data-type="entity-link" >UpdateReviewDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStoryDTO.html" data-type="entity-link" >UpdateStoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTagDTO.html" data-type="entity-link" >UpdateTagDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTransactionDTO.html" data-type="entity-link" >UpdateTransactionDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDTO.html" data-type="entity-link" >UpdateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationPipe.html" data-type="entity-link" >ValidationPipe</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyEmailDTO.html" data-type="entity-link" >VerifyEmailDTO</a>
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
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link" >GoogleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthService.html" data-type="entity-link" >HealthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshGuard.html" data-type="entity-link" >JwtRefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" >JwtRefreshStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Middleware.html" data-type="entity-link" >Middleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
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
                                <a href="interfaces/UploadUrlParams.html" data-type="entity-link" >UploadUrlParams</a>
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