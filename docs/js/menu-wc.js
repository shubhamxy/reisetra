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
                                            'data-target="#controllers-links-module-AddressModule-6509ffecb25903ee3552bc9f0b082b8e723b06c58c4563733500e1be261fb14656689a2f441506f06e5d0209cd088f52b33536fabe5d0b9b19a04635ced60deb"' : 'data-target="#xs-controllers-links-module-AddressModule-6509ffecb25903ee3552bc9f0b082b8e723b06c58c4563733500e1be261fb14656689a2f441506f06e5d0209cd088f52b33536fabe5d0b9b19a04635ced60deb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AddressModule-6509ffecb25903ee3552bc9f0b082b8e723b06c58c4563733500e1be261fb14656689a2f441506f06e5d0209cd088f52b33536fabe5d0b9b19a04635ced60deb"' :
                                            'id="xs-controllers-links-module-AddressModule-6509ffecb25903ee3552bc9f0b082b8e723b06c58c4563733500e1be261fb14656689a2f441506f06e5d0209cd088f52b33536fabe5d0b9b19a04635ced60deb"' }>
                                            <li class="link">
                                                <a href="controllers/AddressController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AddressModule-6509ffecb25903ee3552bc9f0b082b8e723b06c58c4563733500e1be261fb14656689a2f441506f06e5d0209cd088f52b33536fabe5d0b9b19a04635ced60deb"' : 'data-target="#xs-injectables-links-module-AddressModule-6509ffecb25903ee3552bc9f0b082b8e723b06c58c4563733500e1be261fb14656689a2f441506f06e5d0209cd088f52b33536fabe5d0b9b19a04635ced60deb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AddressModule-6509ffecb25903ee3552bc9f0b082b8e723b06c58c4563733500e1be261fb14656689a2f441506f06e5d0209cd088f52b33536fabe5d0b9b19a04635ced60deb"' :
                                        'id="xs-injectables-links-module-AddressModule-6509ffecb25903ee3552bc9f0b082b8e723b06c58c4563733500e1be261fb14656689a2f441506f06e5d0209cd088f52b33536fabe5d0b9b19a04635ced60deb"' }>
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
                                            'data-target="#controllers-links-module-AuthModule-c3bc35b77be32c60744fe06cba026e71fc5e5c2648db50c0e81699cc51e951917975f60e2a05c64a7bdef40a5281d7cf3228d7174fc1ebc8f750f86449238e9e"' : 'data-target="#xs-controllers-links-module-AuthModule-c3bc35b77be32c60744fe06cba026e71fc5e5c2648db50c0e81699cc51e951917975f60e2a05c64a7bdef40a5281d7cf3228d7174fc1ebc8f750f86449238e9e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c3bc35b77be32c60744fe06cba026e71fc5e5c2648db50c0e81699cc51e951917975f60e2a05c64a7bdef40a5281d7cf3228d7174fc1ebc8f750f86449238e9e"' :
                                            'id="xs-controllers-links-module-AuthModule-c3bc35b77be32c60744fe06cba026e71fc5e5c2648db50c0e81699cc51e951917975f60e2a05c64a7bdef40a5281d7cf3228d7174fc1ebc8f750f86449238e9e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-c3bc35b77be32c60744fe06cba026e71fc5e5c2648db50c0e81699cc51e951917975f60e2a05c64a7bdef40a5281d7cf3228d7174fc1ebc8f750f86449238e9e"' : 'data-target="#xs-injectables-links-module-AuthModule-c3bc35b77be32c60744fe06cba026e71fc5e5c2648db50c0e81699cc51e951917975f60e2a05c64a7bdef40a5281d7cf3228d7174fc1ebc8f750f86449238e9e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c3bc35b77be32c60744fe06cba026e71fc5e5c2648db50c0e81699cc51e951917975f60e2a05c64a7bdef40a5281d7cf3228d7174fc1ebc8f750f86449238e9e"' :
                                        'id="xs-injectables-links-module-AuthModule-c3bc35b77be32c60744fe06cba026e71fc5e5c2648db50c0e81699cc51e951917975f60e2a05c64a7bdef40a5281d7cf3228d7174fc1ebc8f750f86449238e9e"' }>
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
                                <a href="modules/AWSModule.html" data-type="entity-link" >AWSModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AWSModule-46bd517e1204b42a28bb14bd7c7583dd750e76bdb578aac8eed6b10387ab256413fb3cc319479b1e85dd54a1db16a6217e566ac3ed848d07eb471badd0370cb1"' : 'data-target="#xs-injectables-links-module-AWSModule-46bd517e1204b42a28bb14bd7c7583dd750e76bdb578aac8eed6b10387ab256413fb3cc319479b1e85dd54a1db16a6217e566ac3ed848d07eb471badd0370cb1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AWSModule-46bd517e1204b42a28bb14bd7c7583dd750e76bdb578aac8eed6b10387ab256413fb3cc319479b1e85dd54a1db16a6217e566ac3ed848d07eb471badd0370cb1"' :
                                        'id="xs-injectables-links-module-AWSModule-46bd517e1204b42a28bb14bd7c7583dd750e76bdb578aac8eed6b10387ab256413fb3cc319479b1e85dd54a1db16a6217e566ac3ed848d07eb471badd0370cb1"' }>
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
                                            'data-target="#controllers-links-module-BrandModule-f067914b4afc35ea35959ff14716ab5e6d8c3e788f04f68b28fbc47d2241d6e230eb445a7738b11c8afd41950aceeaea97edfcd26d2730712fc4c983563ca8e9"' : 'data-target="#xs-controllers-links-module-BrandModule-f067914b4afc35ea35959ff14716ab5e6d8c3e788f04f68b28fbc47d2241d6e230eb445a7738b11c8afd41950aceeaea97edfcd26d2730712fc4c983563ca8e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BrandModule-f067914b4afc35ea35959ff14716ab5e6d8c3e788f04f68b28fbc47d2241d6e230eb445a7738b11c8afd41950aceeaea97edfcd26d2730712fc4c983563ca8e9"' :
                                            'id="xs-controllers-links-module-BrandModule-f067914b4afc35ea35959ff14716ab5e6d8c3e788f04f68b28fbc47d2241d6e230eb445a7738b11c8afd41950aceeaea97edfcd26d2730712fc4c983563ca8e9"' }>
                                            <li class="link">
                                                <a href="controllers/BrandController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BrandModule-f067914b4afc35ea35959ff14716ab5e6d8c3e788f04f68b28fbc47d2241d6e230eb445a7738b11c8afd41950aceeaea97edfcd26d2730712fc4c983563ca8e9"' : 'data-target="#xs-injectables-links-module-BrandModule-f067914b4afc35ea35959ff14716ab5e6d8c3e788f04f68b28fbc47d2241d6e230eb445a7738b11c8afd41950aceeaea97edfcd26d2730712fc4c983563ca8e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BrandModule-f067914b4afc35ea35959ff14716ab5e6d8c3e788f04f68b28fbc47d2241d6e230eb445a7738b11c8afd41950aceeaea97edfcd26d2730712fc4c983563ca8e9"' :
                                        'id="xs-injectables-links-module-BrandModule-f067914b4afc35ea35959ff14716ab5e6d8c3e788f04f68b28fbc47d2241d6e230eb445a7738b11c8afd41950aceeaea97edfcd26d2730712fc4c983563ca8e9"' }>
                                        <li class="link">
                                            <a href="injectables/BrandService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
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
                                            'data-target="#controllers-links-module-CartModule-4236a02a6bf783aa34bd787419d0688b3644436c22b9440c7ff1cbbd1b6d0aea015f866acff45f1c12474b176ee46886a149cb4e1a85004053004dc8de95715c"' : 'data-target="#xs-controllers-links-module-CartModule-4236a02a6bf783aa34bd787419d0688b3644436c22b9440c7ff1cbbd1b6d0aea015f866acff45f1c12474b176ee46886a149cb4e1a85004053004dc8de95715c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CartModule-4236a02a6bf783aa34bd787419d0688b3644436c22b9440c7ff1cbbd1b6d0aea015f866acff45f1c12474b176ee46886a149cb4e1a85004053004dc8de95715c"' :
                                            'id="xs-controllers-links-module-CartModule-4236a02a6bf783aa34bd787419d0688b3644436c22b9440c7ff1cbbd1b6d0aea015f866acff45f1c12474b176ee46886a149cb4e1a85004053004dc8de95715c"' }>
                                            <li class="link">
                                                <a href="controllers/CartController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CartModule-4236a02a6bf783aa34bd787419d0688b3644436c22b9440c7ff1cbbd1b6d0aea015f866acff45f1c12474b176ee46886a149cb4e1a85004053004dc8de95715c"' : 'data-target="#xs-injectables-links-module-CartModule-4236a02a6bf783aa34bd787419d0688b3644436c22b9440c7ff1cbbd1b6d0aea015f866acff45f1c12474b176ee46886a149cb4e1a85004053004dc8de95715c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CartModule-4236a02a6bf783aa34bd787419d0688b3644436c22b9440c7ff1cbbd1b6d0aea015f866acff45f1c12474b176ee46886a149cb4e1a85004053004dc8de95715c"' :
                                        'id="xs-injectables-links-module-CartModule-4236a02a6bf783aa34bd787419d0688b3644436c22b9440c7ff1cbbd1b6d0aea015f866acff45f1c12474b176ee46886a149cb4e1a85004053004dc8de95715c"' }>
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
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoryModule-c03f114844db96403eba2ae73d546defef5445db882b645a87c3feb666b388d872308ae473009d681258f8c0c4cd1805dbac57cf39c4bfe4189e922686bf3181"' : 'data-target="#xs-controllers-links-module-CategoryModule-c03f114844db96403eba2ae73d546defef5445db882b645a87c3feb666b388d872308ae473009d681258f8c0c4cd1805dbac57cf39c4bfe4189e922686bf3181"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-c03f114844db96403eba2ae73d546defef5445db882b645a87c3feb666b388d872308ae473009d681258f8c0c4cd1805dbac57cf39c4bfe4189e922686bf3181"' :
                                            'id="xs-controllers-links-module-CategoryModule-c03f114844db96403eba2ae73d546defef5445db882b645a87c3feb666b388d872308ae473009d681258f8c0c4cd1805dbac57cf39c4bfe4189e922686bf3181"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-c03f114844db96403eba2ae73d546defef5445db882b645a87c3feb666b388d872308ae473009d681258f8c0c4cd1805dbac57cf39c4bfe4189e922686bf3181"' : 'data-target="#xs-injectables-links-module-CategoryModule-c03f114844db96403eba2ae73d546defef5445db882b645a87c3feb666b388d872308ae473009d681258f8c0c4cd1805dbac57cf39c4bfe4189e922686bf3181"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-c03f114844db96403eba2ae73d546defef5445db882b645a87c3feb666b388d872308ae473009d681258f8c0c4cd1805dbac57cf39c4bfe4189e922686bf3181"' :
                                        'id="xs-injectables-links-module-CategoryModule-c03f114844db96403eba2ae73d546defef5445db882b645a87c3feb666b388d872308ae473009d681258f8c0c4cd1805dbac57cf39c4bfe4189e922686bf3181"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FilesModule-c4513747fc5843a49579cc73beff96e3282f01a404c850a70718a65e658987e9da1f8d77749a86b4977ab61959643d67bb420af43b6c3f7c2355100093b86894"' : 'data-target="#xs-controllers-links-module-FilesModule-c4513747fc5843a49579cc73beff96e3282f01a404c850a70718a65e658987e9da1f8d77749a86b4977ab61959643d67bb420af43b6c3f7c2355100093b86894"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-c4513747fc5843a49579cc73beff96e3282f01a404c850a70718a65e658987e9da1f8d77749a86b4977ab61959643d67bb420af43b6c3f7c2355100093b86894"' :
                                            'id="xs-controllers-links-module-FilesModule-c4513747fc5843a49579cc73beff96e3282f01a404c850a70718a65e658987e9da1f8d77749a86b4977ab61959643d67bb420af43b6c3f7c2355100093b86894"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesModule-c4513747fc5843a49579cc73beff96e3282f01a404c850a70718a65e658987e9da1f8d77749a86b4977ab61959643d67bb420af43b6c3f7c2355100093b86894"' : 'data-target="#xs-injectables-links-module-FilesModule-c4513747fc5843a49579cc73beff96e3282f01a404c850a70718a65e658987e9da1f8d77749a86b4977ab61959643d67bb420af43b6c3f7c2355100093b86894"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-c4513747fc5843a49579cc73beff96e3282f01a404c850a70718a65e658987e9da1f8d77749a86b4977ab61959643d67bb420af43b6c3f7c2355100093b86894"' :
                                        'id="xs-injectables-links-module-FilesModule-c4513747fc5843a49579cc73beff96e3282f01a404c850a70718a65e658987e9da1f8d77749a86b4977ab61959643d67bb420af43b6c3f7c2355100093b86894"' }>
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
                                <a href="modules/FormModule.html" data-type="entity-link" >FormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FormModule-d51c04a17794d5564b788f17db01d12fb4d04307dbd0dae0f5e2e7f5fbb451f207ebd7717217f32ce0309583ae9a59236b7a432b389e62050c6b238e8de865f2"' : 'data-target="#xs-controllers-links-module-FormModule-d51c04a17794d5564b788f17db01d12fb4d04307dbd0dae0f5e2e7f5fbb451f207ebd7717217f32ce0309583ae9a59236b7a432b389e62050c6b238e8de865f2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FormModule-d51c04a17794d5564b788f17db01d12fb4d04307dbd0dae0f5e2e7f5fbb451f207ebd7717217f32ce0309583ae9a59236b7a432b389e62050c6b238e8de865f2"' :
                                            'id="xs-controllers-links-module-FormModule-d51c04a17794d5564b788f17db01d12fb4d04307dbd0dae0f5e2e7f5fbb451f207ebd7717217f32ce0309583ae9a59236b7a432b389e62050c6b238e8de865f2"' }>
                                            <li class="link">
                                                <a href="controllers/FormController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FormModule-d51c04a17794d5564b788f17db01d12fb4d04307dbd0dae0f5e2e7f5fbb451f207ebd7717217f32ce0309583ae9a59236b7a432b389e62050c6b238e8de865f2"' : 'data-target="#xs-injectables-links-module-FormModule-d51c04a17794d5564b788f17db01d12fb4d04307dbd0dae0f5e2e7f5fbb451f207ebd7717217f32ce0309583ae9a59236b7a432b389e62050c6b238e8de865f2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FormModule-d51c04a17794d5564b788f17db01d12fb4d04307dbd0dae0f5e2e7f5fbb451f207ebd7717217f32ce0309583ae9a59236b7a432b389e62050c6b238e8de865f2"' :
                                        'id="xs-injectables-links-module-FormModule-d51c04a17794d5564b788f17db01d12fb4d04307dbd0dae0f5e2e7f5fbb451f207ebd7717217f32ce0309583ae9a59236b7a432b389e62050c6b238e8de865f2"' }>
                                        <li class="link">
                                            <a href="injectables/FormService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormService</a>
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
                                            'data-target="#controllers-links-module-HealthCheckModule-2d3ec87b8f2dcf14af315d3b2cf3f9fdcaef4aabd89a958480c7ea539ae3942731b2839feb279fbb1d2744c7149888db96d3f022a7e1d0099af81a6a12e0fdc7"' : 'data-target="#xs-controllers-links-module-HealthCheckModule-2d3ec87b8f2dcf14af315d3b2cf3f9fdcaef4aabd89a958480c7ea539ae3942731b2839feb279fbb1d2744c7149888db96d3f022a7e1d0099af81a6a12e0fdc7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthCheckModule-2d3ec87b8f2dcf14af315d3b2cf3f9fdcaef4aabd89a958480c7ea539ae3942731b2839feb279fbb1d2744c7149888db96d3f022a7e1d0099af81a6a12e0fdc7"' :
                                            'id="xs-controllers-links-module-HealthCheckModule-2d3ec87b8f2dcf14af315d3b2cf3f9fdcaef4aabd89a958480c7ea539ae3942731b2839feb279fbb1d2744c7149888db96d3f022a7e1d0099af81a6a12e0fdc7"' }>
                                            <li class="link">
                                                <a href="controllers/HealthCheckController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthCheckController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HealthCheckModule-2d3ec87b8f2dcf14af315d3b2cf3f9fdcaef4aabd89a958480c7ea539ae3942731b2839feb279fbb1d2744c7149888db96d3f022a7e1d0099af81a6a12e0fdc7"' : 'data-target="#xs-injectables-links-module-HealthCheckModule-2d3ec87b8f2dcf14af315d3b2cf3f9fdcaef4aabd89a958480c7ea539ae3942731b2839feb279fbb1d2744c7149888db96d3f022a7e1d0099af81a6a12e0fdc7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HealthCheckModule-2d3ec87b8f2dcf14af315d3b2cf3f9fdcaef4aabd89a958480c7ea539ae3942731b2839feb279fbb1d2744c7149888db96d3f022a7e1d0099af81a6a12e0fdc7"' :
                                        'id="xs-injectables-links-module-HealthCheckModule-2d3ec87b8f2dcf14af315d3b2cf3f9fdcaef4aabd89a958480c7ea539ae3942731b2839feb279fbb1d2744c7149888db96d3f022a7e1d0099af81a6a12e0fdc7"' }>
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
                                            'data-target="#controllers-links-module-InventoryModule-4343b6302ea4f5339253c8639baaff47b8855ef3f7029d71f8b3f16af6f130536431b30ec001f3dd7942752ef1a845773ec38719ca2737b42ae02b820dbf9b87"' : 'data-target="#xs-controllers-links-module-InventoryModule-4343b6302ea4f5339253c8639baaff47b8855ef3f7029d71f8b3f16af6f130536431b30ec001f3dd7942752ef1a845773ec38719ca2737b42ae02b820dbf9b87"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InventoryModule-4343b6302ea4f5339253c8639baaff47b8855ef3f7029d71f8b3f16af6f130536431b30ec001f3dd7942752ef1a845773ec38719ca2737b42ae02b820dbf9b87"' :
                                            'id="xs-controllers-links-module-InventoryModule-4343b6302ea4f5339253c8639baaff47b8855ef3f7029d71f8b3f16af6f130536431b30ec001f3dd7942752ef1a845773ec38719ca2737b42ae02b820dbf9b87"' }>
                                            <li class="link">
                                                <a href="controllers/InventoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InventoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-InventoryModule-4343b6302ea4f5339253c8639baaff47b8855ef3f7029d71f8b3f16af6f130536431b30ec001f3dd7942752ef1a845773ec38719ca2737b42ae02b820dbf9b87"' : 'data-target="#xs-injectables-links-module-InventoryModule-4343b6302ea4f5339253c8639baaff47b8855ef3f7029d71f8b3f16af6f130536431b30ec001f3dd7942752ef1a845773ec38719ca2737b42ae02b820dbf9b87"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InventoryModule-4343b6302ea4f5339253c8639baaff47b8855ef3f7029d71f8b3f16af6f130536431b30ec001f3dd7942752ef1a845773ec38719ca2737b42ae02b820dbf9b87"' :
                                        'id="xs-injectables-links-module-InventoryModule-4343b6302ea4f5339253c8639baaff47b8855ef3f7029d71f8b3f16af6f130536431b30ec001f3dd7942752ef1a845773ec38719ca2737b42ae02b820dbf9b87"' }>
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
                                <a href="modules/OfferModule.html" data-type="entity-link" >OfferModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OfferModule-893c94632739315de96acc5f74a3abca370f5cd814df2647e5354a3523394734d44b956db0e68eaa12e5a40258b512f14c7234153363efffe279c10a0f41dfa6"' : 'data-target="#xs-controllers-links-module-OfferModule-893c94632739315de96acc5f74a3abca370f5cd814df2647e5354a3523394734d44b956db0e68eaa12e5a40258b512f14c7234153363efffe279c10a0f41dfa6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OfferModule-893c94632739315de96acc5f74a3abca370f5cd814df2647e5354a3523394734d44b956db0e68eaa12e5a40258b512f14c7234153363efffe279c10a0f41dfa6"' :
                                            'id="xs-controllers-links-module-OfferModule-893c94632739315de96acc5f74a3abca370f5cd814df2647e5354a3523394734d44b956db0e68eaa12e5a40258b512f14c7234153363efffe279c10a0f41dfa6"' }>
                                            <li class="link">
                                                <a href="controllers/OfferController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OfferModule-893c94632739315de96acc5f74a3abca370f5cd814df2647e5354a3523394734d44b956db0e68eaa12e5a40258b512f14c7234153363efffe279c10a0f41dfa6"' : 'data-target="#xs-injectables-links-module-OfferModule-893c94632739315de96acc5f74a3abca370f5cd814df2647e5354a3523394734d44b956db0e68eaa12e5a40258b512f14c7234153363efffe279c10a0f41dfa6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OfferModule-893c94632739315de96acc5f74a3abca370f5cd814df2647e5354a3523394734d44b956db0e68eaa12e5a40258b512f14c7234153363efffe279c10a0f41dfa6"' :
                                        'id="xs-injectables-links-module-OfferModule-893c94632739315de96acc5f74a3abca370f5cd814df2647e5354a3523394734d44b956db0e68eaa12e5a40258b512f14c7234153363efffe279c10a0f41dfa6"' }>
                                        <li class="link">
                                            <a href="injectables/OfferService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferService</a>
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
                                <a href="modules/OrderModule.html" data-type="entity-link" >OrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OrderModule-c4ec505ce43adc01d702d35dfa5cdfc074b4323729e51e3d0a7ed3a64826f0a94fb0c04561476e823166fd0f5182bf2ae74ea73a8959215a60d4fdbbd4eea35c"' : 'data-target="#xs-controllers-links-module-OrderModule-c4ec505ce43adc01d702d35dfa5cdfc074b4323729e51e3d0a7ed3a64826f0a94fb0c04561476e823166fd0f5182bf2ae74ea73a8959215a60d4fdbbd4eea35c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-c4ec505ce43adc01d702d35dfa5cdfc074b4323729e51e3d0a7ed3a64826f0a94fb0c04561476e823166fd0f5182bf2ae74ea73a8959215a60d4fdbbd4eea35c"' :
                                            'id="xs-controllers-links-module-OrderModule-c4ec505ce43adc01d702d35dfa5cdfc074b4323729e51e3d0a7ed3a64826f0a94fb0c04561476e823166fd0f5182bf2ae74ea73a8959215a60d4fdbbd4eea35c"' }>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrderModule-c4ec505ce43adc01d702d35dfa5cdfc074b4323729e51e3d0a7ed3a64826f0a94fb0c04561476e823166fd0f5182bf2ae74ea73a8959215a60d4fdbbd4eea35c"' : 'data-target="#xs-injectables-links-module-OrderModule-c4ec505ce43adc01d702d35dfa5cdfc074b4323729e51e3d0a7ed3a64826f0a94fb0c04561476e823166fd0f5182bf2ae74ea73a8959215a60d4fdbbd4eea35c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-c4ec505ce43adc01d702d35dfa5cdfc074b4323729e51e3d0a7ed3a64826f0a94fb0c04561476e823166fd0f5182bf2ae74ea73a8959215a60d4fdbbd4eea35c"' :
                                        'id="xs-injectables-links-module-OrderModule-c4ec505ce43adc01d702d35dfa5cdfc074b4323729e51e3d0a7ed3a64826f0a94fb0c04561476e823166fd0f5182bf2ae74ea73a8959215a60d4fdbbd4eea35c"' }>
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
                                            'data-target="#controllers-links-module-ProductModule-cdf2bfa9899eb0715f7e68207e2dbe00809b3086c3a680b15c7b6b4f2a8087dff1497d3f192eedb4fc6d16537a2b2e34ec80882611206c091c6ff2ba5817135e"' : 'data-target="#xs-controllers-links-module-ProductModule-cdf2bfa9899eb0715f7e68207e2dbe00809b3086c3a680b15c7b6b4f2a8087dff1497d3f192eedb4fc6d16537a2b2e34ec80882611206c091c6ff2ba5817135e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-cdf2bfa9899eb0715f7e68207e2dbe00809b3086c3a680b15c7b6b4f2a8087dff1497d3f192eedb4fc6d16537a2b2e34ec80882611206c091c6ff2ba5817135e"' :
                                            'id="xs-controllers-links-module-ProductModule-cdf2bfa9899eb0715f7e68207e2dbe00809b3086c3a680b15c7b6b4f2a8087dff1497d3f192eedb4fc6d16537a2b2e34ec80882611206c091c6ff2ba5817135e"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-cdf2bfa9899eb0715f7e68207e2dbe00809b3086c3a680b15c7b6b4f2a8087dff1497d3f192eedb4fc6d16537a2b2e34ec80882611206c091c6ff2ba5817135e"' : 'data-target="#xs-injectables-links-module-ProductModule-cdf2bfa9899eb0715f7e68207e2dbe00809b3086c3a680b15c7b6b4f2a8087dff1497d3f192eedb4fc6d16537a2b2e34ec80882611206c091c6ff2ba5817135e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-cdf2bfa9899eb0715f7e68207e2dbe00809b3086c3a680b15c7b6b4f2a8087dff1497d3f192eedb4fc6d16537a2b2e34ec80882611206c091c6ff2ba5817135e"' :
                                        'id="xs-injectables-links-module-ProductModule-cdf2bfa9899eb0715f7e68207e2dbe00809b3086c3a680b15c7b6b4f2a8087dff1497d3f192eedb4fc6d16537a2b2e34ec80882611206c091c6ff2ba5817135e"' }>
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
                                            'data-target="#controllers-links-module-ReviewModule-28ff2875354717b2712107b06ae863adb2a2af681f1525d4a7ff7c4202f3c1d7aee6d2cf5a111343dcb03773a3d7df2329986890305a948266a79419a0c2a5d4"' : 'data-target="#xs-controllers-links-module-ReviewModule-28ff2875354717b2712107b06ae863adb2a2af681f1525d4a7ff7c4202f3c1d7aee6d2cf5a111343dcb03773a3d7df2329986890305a948266a79419a0c2a5d4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewModule-28ff2875354717b2712107b06ae863adb2a2af681f1525d4a7ff7c4202f3c1d7aee6d2cf5a111343dcb03773a3d7df2329986890305a948266a79419a0c2a5d4"' :
                                            'id="xs-controllers-links-module-ReviewModule-28ff2875354717b2712107b06ae863adb2a2af681f1525d4a7ff7c4202f3c1d7aee6d2cf5a111343dcb03773a3d7df2329986890305a948266a79419a0c2a5d4"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewModule-28ff2875354717b2712107b06ae863adb2a2af681f1525d4a7ff7c4202f3c1d7aee6d2cf5a111343dcb03773a3d7df2329986890305a948266a79419a0c2a5d4"' : 'data-target="#xs-injectables-links-module-ReviewModule-28ff2875354717b2712107b06ae863adb2a2af681f1525d4a7ff7c4202f3c1d7aee6d2cf5a111343dcb03773a3d7df2329986890305a948266a79419a0c2a5d4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewModule-28ff2875354717b2712107b06ae863adb2a2af681f1525d4a7ff7c4202f3c1d7aee6d2cf5a111343dcb03773a3d7df2329986890305a948266a79419a0c2a5d4"' :
                                        'id="xs-injectables-links-module-ReviewModule-28ff2875354717b2712107b06ae863adb2a2af681f1525d4a7ff7c4202f3c1d7aee6d2cf5a111343dcb03773a3d7df2329986890305a948266a79419a0c2a5d4"' }>
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
                                            'data-target="#controllers-links-module-StoryModule-fea2f4bf97ad307caea5973c13d87507dca08dc2d0598fafeff84289e57f32106f4d997f97c10577991364d1e1c7d324bc700d9decb17fc179652b7e630f424c"' : 'data-target="#xs-controllers-links-module-StoryModule-fea2f4bf97ad307caea5973c13d87507dca08dc2d0598fafeff84289e57f32106f4d997f97c10577991364d1e1c7d324bc700d9decb17fc179652b7e630f424c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StoryModule-fea2f4bf97ad307caea5973c13d87507dca08dc2d0598fafeff84289e57f32106f4d997f97c10577991364d1e1c7d324bc700d9decb17fc179652b7e630f424c"' :
                                            'id="xs-controllers-links-module-StoryModule-fea2f4bf97ad307caea5973c13d87507dca08dc2d0598fafeff84289e57f32106f4d997f97c10577991364d1e1c7d324bc700d9decb17fc179652b7e630f424c"' }>
                                            <li class="link">
                                                <a href="controllers/StoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StoryModule-fea2f4bf97ad307caea5973c13d87507dca08dc2d0598fafeff84289e57f32106f4d997f97c10577991364d1e1c7d324bc700d9decb17fc179652b7e630f424c"' : 'data-target="#xs-injectables-links-module-StoryModule-fea2f4bf97ad307caea5973c13d87507dca08dc2d0598fafeff84289e57f32106f4d997f97c10577991364d1e1c7d324bc700d9decb17fc179652b7e630f424c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StoryModule-fea2f4bf97ad307caea5973c13d87507dca08dc2d0598fafeff84289e57f32106f4d997f97c10577991364d1e1c7d324bc700d9decb17fc179652b7e630f424c"' :
                                        'id="xs-injectables-links-module-StoryModule-fea2f4bf97ad307caea5973c13d87507dca08dc2d0598fafeff84289e57f32106f4d997f97c10577991364d1e1c7d324bc700d9decb17fc179652b7e630f424c"' }>
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
                                            'data-target="#controllers-links-module-SupportModule-f992a86db64f8a01d9bd5e54cdaa87988e4fe3808273dcdd899df5c142151101d118bed7620fbaeac83c945e48d47de1cd26ff8feb9024f7f7ca604e9ea0d0c0"' : 'data-target="#xs-controllers-links-module-SupportModule-f992a86db64f8a01d9bd5e54cdaa87988e4fe3808273dcdd899df5c142151101d118bed7620fbaeac83c945e48d47de1cd26ff8feb9024f7f7ca604e9ea0d0c0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SupportModule-f992a86db64f8a01d9bd5e54cdaa87988e4fe3808273dcdd899df5c142151101d118bed7620fbaeac83c945e48d47de1cd26ff8feb9024f7f7ca604e9ea0d0c0"' :
                                            'id="xs-controllers-links-module-SupportModule-f992a86db64f8a01d9bd5e54cdaa87988e4fe3808273dcdd899df5c142151101d118bed7620fbaeac83c945e48d47de1cd26ff8feb9024f7f7ca604e9ea0d0c0"' }>
                                            <li class="link">
                                                <a href="controllers/SupportController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupportController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SupportModule-f992a86db64f8a01d9bd5e54cdaa87988e4fe3808273dcdd899df5c142151101d118bed7620fbaeac83c945e48d47de1cd26ff8feb9024f7f7ca604e9ea0d0c0"' : 'data-target="#xs-injectables-links-module-SupportModule-f992a86db64f8a01d9bd5e54cdaa87988e4fe3808273dcdd899df5c142151101d118bed7620fbaeac83c945e48d47de1cd26ff8feb9024f7f7ca604e9ea0d0c0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SupportModule-f992a86db64f8a01d9bd5e54cdaa87988e4fe3808273dcdd899df5c142151101d118bed7620fbaeac83c945e48d47de1cd26ff8feb9024f7f7ca604e9ea0d0c0"' :
                                        'id="xs-injectables-links-module-SupportModule-f992a86db64f8a01d9bd5e54cdaa87988e4fe3808273dcdd899df5c142151101d118bed7620fbaeac83c945e48d47de1cd26ff8feb9024f7f7ca604e9ea0d0c0"' }>
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
                                <a href="modules/TagModule.html" data-type="entity-link" >TagModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TagModule-5e5aabeacb4699b5202645e9e0fbf25e2bcd324f52cb0a286b2f90210e1b31ea082376afaf6cd9a761c53067f18dfc33c1e7fdb30f1959780a4f119f8387a5e9"' : 'data-target="#xs-controllers-links-module-TagModule-5e5aabeacb4699b5202645e9e0fbf25e2bcd324f52cb0a286b2f90210e1b31ea082376afaf6cd9a761c53067f18dfc33c1e7fdb30f1959780a4f119f8387a5e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagModule-5e5aabeacb4699b5202645e9e0fbf25e2bcd324f52cb0a286b2f90210e1b31ea082376afaf6cd9a761c53067f18dfc33c1e7fdb30f1959780a4f119f8387a5e9"' :
                                            'id="xs-controllers-links-module-TagModule-5e5aabeacb4699b5202645e9e0fbf25e2bcd324f52cb0a286b2f90210e1b31ea082376afaf6cd9a761c53067f18dfc33c1e7fdb30f1959780a4f119f8387a5e9"' }>
                                            <li class="link">
                                                <a href="controllers/TagController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TagModule-5e5aabeacb4699b5202645e9e0fbf25e2bcd324f52cb0a286b2f90210e1b31ea082376afaf6cd9a761c53067f18dfc33c1e7fdb30f1959780a4f119f8387a5e9"' : 'data-target="#xs-injectables-links-module-TagModule-5e5aabeacb4699b5202645e9e0fbf25e2bcd324f52cb0a286b2f90210e1b31ea082376afaf6cd9a761c53067f18dfc33c1e7fdb30f1959780a4f119f8387a5e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagModule-5e5aabeacb4699b5202645e9e0fbf25e2bcd324f52cb0a286b2f90210e1b31ea082376afaf6cd9a761c53067f18dfc33c1e7fdb30f1959780a4f119f8387a5e9"' :
                                        'id="xs-injectables-links-module-TagModule-5e5aabeacb4699b5202645e9e0fbf25e2bcd324f52cb0a286b2f90210e1b31ea082376afaf6cd9a761c53067f18dfc33c1e7fdb30f1959780a4f119f8387a5e9"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
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
                                            'data-target="#controllers-links-module-TransactionModule-a1f9cc74c63bdd6205206838af0c22c956570f29ff93bbe1677db99ee194c9a97501d3cc48132a5d3ab198523a875a25121e72b53c0d8a7f3c99853fdaa1bd71"' : 'data-target="#xs-controllers-links-module-TransactionModule-a1f9cc74c63bdd6205206838af0c22c956570f29ff93bbe1677db99ee194c9a97501d3cc48132a5d3ab198523a875a25121e72b53c0d8a7f3c99853fdaa1bd71"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TransactionModule-a1f9cc74c63bdd6205206838af0c22c956570f29ff93bbe1677db99ee194c9a97501d3cc48132a5d3ab198523a875a25121e72b53c0d8a7f3c99853fdaa1bd71"' :
                                            'id="xs-controllers-links-module-TransactionModule-a1f9cc74c63bdd6205206838af0c22c956570f29ff93bbe1677db99ee194c9a97501d3cc48132a5d3ab198523a875a25121e72b53c0d8a7f3c99853fdaa1bd71"' }>
                                            <li class="link">
                                                <a href="controllers/TransactionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TransactionModule-a1f9cc74c63bdd6205206838af0c22c956570f29ff93bbe1677db99ee194c9a97501d3cc48132a5d3ab198523a875a25121e72b53c0d8a7f3c99853fdaa1bd71"' : 'data-target="#xs-injectables-links-module-TransactionModule-a1f9cc74c63bdd6205206838af0c22c956570f29ff93bbe1677db99ee194c9a97501d3cc48132a5d3ab198523a875a25121e72b53c0d8a7f3c99853fdaa1bd71"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransactionModule-a1f9cc74c63bdd6205206838af0c22c956570f29ff93bbe1677db99ee194c9a97501d3cc48132a5d3ab198523a875a25121e72b53c0d8a7f3c99853fdaa1bd71"' :
                                        'id="xs-injectables-links-module-TransactionModule-a1f9cc74c63bdd6205206838af0c22c956570f29ff93bbe1677db99ee194c9a97501d3cc48132a5d3ab198523a875a25121e72b53c0d8a7f3c99853fdaa1bd71"' }>
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
                                            'data-target="#controllers-links-module-UserModule-9be91687bb210e84b9f1383cb7f9f907c49a40c159cf4035ffefb5a2203cbe4b0a33514727d3bf4cd2d780460f29d3831b1e4ecf08df912b7a5b2092d01668b0"' : 'data-target="#xs-controllers-links-module-UserModule-9be91687bb210e84b9f1383cb7f9f907c49a40c159cf4035ffefb5a2203cbe4b0a33514727d3bf4cd2d780460f29d3831b1e4ecf08df912b7a5b2092d01668b0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-9be91687bb210e84b9f1383cb7f9f907c49a40c159cf4035ffefb5a2203cbe4b0a33514727d3bf4cd2d780460f29d3831b1e4ecf08df912b7a5b2092d01668b0"' :
                                            'id="xs-controllers-links-module-UserModule-9be91687bb210e84b9f1383cb7f9f907c49a40c159cf4035ffefb5a2203cbe4b0a33514727d3bf4cd2d780460f29d3831b1e4ecf08df912b7a5b2092d01668b0"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-9be91687bb210e84b9f1383cb7f9f907c49a40c159cf4035ffefb5a2203cbe4b0a33514727d3bf4cd2d780460f29d3831b1e4ecf08df912b7a5b2092d01668b0"' : 'data-target="#xs-injectables-links-module-UserModule-9be91687bb210e84b9f1383cb7f9f907c49a40c159cf4035ffefb5a2203cbe4b0a33514727d3bf4cd2d780460f29d3831b1e4ecf08df912b7a5b2092d01668b0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-9be91687bb210e84b9f1383cb7f9f907c49a40c159cf4035ffefb5a2203cbe4b0a33514727d3bf4cd2d780460f29d3831b1e4ecf08df912b7a5b2092d01668b0"' :
                                        'id="xs-injectables-links-module-UserModule-9be91687bb210e84b9f1383cb7f9f907c49a40c159cf4035ffefb5a2203cbe4b0a33514727d3bf4cd2d780460f29d3831b1e4ecf08df912b7a5b2092d01668b0"' }>
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
                                <a href="classes/CreateOrderDTO.html" data-type="entity-link" >CreateOrderDTO</a>
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
                                <a href="classes/UpdateOrderDTO.html" data-type="entity-link" >UpdateOrderDTO</a>
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