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
                                            'data-target="#controllers-links-module-AddressModule-9e832fe6384f129adf11313c510baa830e703fbe248e2a01959b9c5b2899f78e13b84b30921ec921be58e1807c24f154a94e7a3937afa7813baf7b70d56b01dc"' : 'data-target="#xs-controllers-links-module-AddressModule-9e832fe6384f129adf11313c510baa830e703fbe248e2a01959b9c5b2899f78e13b84b30921ec921be58e1807c24f154a94e7a3937afa7813baf7b70d56b01dc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AddressModule-9e832fe6384f129adf11313c510baa830e703fbe248e2a01959b9c5b2899f78e13b84b30921ec921be58e1807c24f154a94e7a3937afa7813baf7b70d56b01dc"' :
                                            'id="xs-controllers-links-module-AddressModule-9e832fe6384f129adf11313c510baa830e703fbe248e2a01959b9c5b2899f78e13b84b30921ec921be58e1807c24f154a94e7a3937afa7813baf7b70d56b01dc"' }>
                                            <li class="link">
                                                <a href="controllers/AddressController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AddressModule-9e832fe6384f129adf11313c510baa830e703fbe248e2a01959b9c5b2899f78e13b84b30921ec921be58e1807c24f154a94e7a3937afa7813baf7b70d56b01dc"' : 'data-target="#xs-injectables-links-module-AddressModule-9e832fe6384f129adf11313c510baa830e703fbe248e2a01959b9c5b2899f78e13b84b30921ec921be58e1807c24f154a94e7a3937afa7813baf7b70d56b01dc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AddressModule-9e832fe6384f129adf11313c510baa830e703fbe248e2a01959b9c5b2899f78e13b84b30921ec921be58e1807c24f154a94e7a3937afa7813baf7b70d56b01dc"' :
                                        'id="xs-injectables-links-module-AddressModule-9e832fe6384f129adf11313c510baa830e703fbe248e2a01959b9c5b2899f78e13b84b30921ec921be58e1807c24f154a94e7a3937afa7813baf7b70d56b01dc"' }>
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
                                            'data-target="#controllers-links-module-AuthModule-d16d6dddfdc7a3bf348cca8a4fcea51c23d4e2209c6eeb8cc0b13902040aeeb25de9cca15b04d9296611978ba0ef86fe5eafce687f46819d12065a710534bc39"' : 'data-target="#xs-controllers-links-module-AuthModule-d16d6dddfdc7a3bf348cca8a4fcea51c23d4e2209c6eeb8cc0b13902040aeeb25de9cca15b04d9296611978ba0ef86fe5eafce687f46819d12065a710534bc39"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d16d6dddfdc7a3bf348cca8a4fcea51c23d4e2209c6eeb8cc0b13902040aeeb25de9cca15b04d9296611978ba0ef86fe5eafce687f46819d12065a710534bc39"' :
                                            'id="xs-controllers-links-module-AuthModule-d16d6dddfdc7a3bf348cca8a4fcea51c23d4e2209c6eeb8cc0b13902040aeeb25de9cca15b04d9296611978ba0ef86fe5eafce687f46819d12065a710534bc39"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-d16d6dddfdc7a3bf348cca8a4fcea51c23d4e2209c6eeb8cc0b13902040aeeb25de9cca15b04d9296611978ba0ef86fe5eafce687f46819d12065a710534bc39"' : 'data-target="#xs-injectables-links-module-AuthModule-d16d6dddfdc7a3bf348cca8a4fcea51c23d4e2209c6eeb8cc0b13902040aeeb25de9cca15b04d9296611978ba0ef86fe5eafce687f46819d12065a710534bc39"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d16d6dddfdc7a3bf348cca8a4fcea51c23d4e2209c6eeb8cc0b13902040aeeb25de9cca15b04d9296611978ba0ef86fe5eafce687f46819d12065a710534bc39"' :
                                        'id="xs-injectables-links-module-AuthModule-d16d6dddfdc7a3bf348cca8a4fcea51c23d4e2209c6eeb8cc0b13902040aeeb25de9cca15b04d9296611978ba0ef86fe5eafce687f46819d12065a710534bc39"' }>
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
                                        'data-target="#injectables-links-module-CacheModule-5b26ac2561f71063e636ef36ac14413d6333fbc1961b015243219e2c8fbfdd482d104c94cc045158a4093ccd7c2e7f516c89c1a23b4ad676fd3dc1ba783218f5"' : 'data-target="#xs-injectables-links-module-CacheModule-5b26ac2561f71063e636ef36ac14413d6333fbc1961b015243219e2c8fbfdd482d104c94cc045158a4093ccd7c2e7f516c89c1a23b4ad676fd3dc1ba783218f5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CacheModule-5b26ac2561f71063e636ef36ac14413d6333fbc1961b015243219e2c8fbfdd482d104c94cc045158a4093ccd7c2e7f516c89c1a23b4ad676fd3dc1ba783218f5"' :
                                        'id="xs-injectables-links-module-CacheModule-5b26ac2561f71063e636ef36ac14413d6333fbc1961b015243219e2c8fbfdd482d104c94cc045158a4093ccd7c2e7f516c89c1a23b4ad676fd3dc1ba783218f5"' }>
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
                                            'data-target="#controllers-links-module-CartModule-8bca90fee551f08462dd05ba07417494646745bd3a57570951b6a473086d20a802688afd0486468c3b2338a9bcc76d5946f84683702678a19044e6e99d7d851b"' : 'data-target="#xs-controllers-links-module-CartModule-8bca90fee551f08462dd05ba07417494646745bd3a57570951b6a473086d20a802688afd0486468c3b2338a9bcc76d5946f84683702678a19044e6e99d7d851b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CartModule-8bca90fee551f08462dd05ba07417494646745bd3a57570951b6a473086d20a802688afd0486468c3b2338a9bcc76d5946f84683702678a19044e6e99d7d851b"' :
                                            'id="xs-controllers-links-module-CartModule-8bca90fee551f08462dd05ba07417494646745bd3a57570951b6a473086d20a802688afd0486468c3b2338a9bcc76d5946f84683702678a19044e6e99d7d851b"' }>
                                            <li class="link">
                                                <a href="controllers/CartController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CartModule-8bca90fee551f08462dd05ba07417494646745bd3a57570951b6a473086d20a802688afd0486468c3b2338a9bcc76d5946f84683702678a19044e6e99d7d851b"' : 'data-target="#xs-injectables-links-module-CartModule-8bca90fee551f08462dd05ba07417494646745bd3a57570951b6a473086d20a802688afd0486468c3b2338a9bcc76d5946f84683702678a19044e6e99d7d851b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CartModule-8bca90fee551f08462dd05ba07417494646745bd3a57570951b6a473086d20a802688afd0486468c3b2338a9bcc76d5946f84683702678a19044e6e99d7d851b"' :
                                        'id="xs-injectables-links-module-CartModule-8bca90fee551f08462dd05ba07417494646745bd3a57570951b6a473086d20a802688afd0486468c3b2338a9bcc76d5946f84683702678a19044e6e99d7d851b"' }>
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
                                            'data-target="#controllers-links-module-FilesModule-58472b2ef9356cc3f2c23a84445a4de1d66ded904b70145aa9487fb1734965f6576e8810d47443c1deaab15e5def6f36bcd525797cdcd1096e950f7c14e14ea0"' : 'data-target="#xs-controllers-links-module-FilesModule-58472b2ef9356cc3f2c23a84445a4de1d66ded904b70145aa9487fb1734965f6576e8810d47443c1deaab15e5def6f36bcd525797cdcd1096e950f7c14e14ea0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-58472b2ef9356cc3f2c23a84445a4de1d66ded904b70145aa9487fb1734965f6576e8810d47443c1deaab15e5def6f36bcd525797cdcd1096e950f7c14e14ea0"' :
                                            'id="xs-controllers-links-module-FilesModule-58472b2ef9356cc3f2c23a84445a4de1d66ded904b70145aa9487fb1734965f6576e8810d47443c1deaab15e5def6f36bcd525797cdcd1096e950f7c14e14ea0"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesModule-58472b2ef9356cc3f2c23a84445a4de1d66ded904b70145aa9487fb1734965f6576e8810d47443c1deaab15e5def6f36bcd525797cdcd1096e950f7c14e14ea0"' : 'data-target="#xs-injectables-links-module-FilesModule-58472b2ef9356cc3f2c23a84445a4de1d66ded904b70145aa9487fb1734965f6576e8810d47443c1deaab15e5def6f36bcd525797cdcd1096e950f7c14e14ea0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-58472b2ef9356cc3f2c23a84445a4de1d66ded904b70145aa9487fb1734965f6576e8810d47443c1deaab15e5def6f36bcd525797cdcd1096e950f7c14e14ea0"' :
                                        'id="xs-injectables-links-module-FilesModule-58472b2ef9356cc3f2c23a84445a4de1d66ded904b70145aa9487fb1734965f6576e8810d47443c1deaab15e5def6f36bcd525797cdcd1096e950f7c14e14ea0"' }>
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
                                            'data-target="#controllers-links-module-HealthCheckModule-e8cd4d38f31db579751a73e908452e5894d42ed5aebfac334e71728d2d8d03284ae0df8b8172e6c5e7018298718db4ecf79f0f4e9f5c7a4d9608e05b31ceb273"' : 'data-target="#xs-controllers-links-module-HealthCheckModule-e8cd4d38f31db579751a73e908452e5894d42ed5aebfac334e71728d2d8d03284ae0df8b8172e6c5e7018298718db4ecf79f0f4e9f5c7a4d9608e05b31ceb273"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthCheckModule-e8cd4d38f31db579751a73e908452e5894d42ed5aebfac334e71728d2d8d03284ae0df8b8172e6c5e7018298718db4ecf79f0f4e9f5c7a4d9608e05b31ceb273"' :
                                            'id="xs-controllers-links-module-HealthCheckModule-e8cd4d38f31db579751a73e908452e5894d42ed5aebfac334e71728d2d8d03284ae0df8b8172e6c5e7018298718db4ecf79f0f4e9f5c7a4d9608e05b31ceb273"' }>
                                            <li class="link">
                                                <a href="controllers/HealthCheckController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthCheckController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HealthCheckModule-e8cd4d38f31db579751a73e908452e5894d42ed5aebfac334e71728d2d8d03284ae0df8b8172e6c5e7018298718db4ecf79f0f4e9f5c7a4d9608e05b31ceb273"' : 'data-target="#xs-injectables-links-module-HealthCheckModule-e8cd4d38f31db579751a73e908452e5894d42ed5aebfac334e71728d2d8d03284ae0df8b8172e6c5e7018298718db4ecf79f0f4e9f5c7a4d9608e05b31ceb273"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HealthCheckModule-e8cd4d38f31db579751a73e908452e5894d42ed5aebfac334e71728d2d8d03284ae0df8b8172e6c5e7018298718db4ecf79f0f4e9f5c7a4d9608e05b31ceb273"' :
                                        'id="xs-injectables-links-module-HealthCheckModule-e8cd4d38f31db579751a73e908452e5894d42ed5aebfac334e71728d2d8d03284ae0df8b8172e6c5e7018298718db4ecf79f0f4e9f5c7a4d9608e05b31ceb273"' }>
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
                                            'data-target="#controllers-links-module-InventoryModule-ed536792fbb0c9f7617c867316819f5ff5a883a9248b21c5627b9763be78bd9ff58da87361e2a2f7336fad6e0ffd5da9dcac8f81077c4b74486e81dfdf1000f1"' : 'data-target="#xs-controllers-links-module-InventoryModule-ed536792fbb0c9f7617c867316819f5ff5a883a9248b21c5627b9763be78bd9ff58da87361e2a2f7336fad6e0ffd5da9dcac8f81077c4b74486e81dfdf1000f1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InventoryModule-ed536792fbb0c9f7617c867316819f5ff5a883a9248b21c5627b9763be78bd9ff58da87361e2a2f7336fad6e0ffd5da9dcac8f81077c4b74486e81dfdf1000f1"' :
                                            'id="xs-controllers-links-module-InventoryModule-ed536792fbb0c9f7617c867316819f5ff5a883a9248b21c5627b9763be78bd9ff58da87361e2a2f7336fad6e0ffd5da9dcac8f81077c4b74486e81dfdf1000f1"' }>
                                            <li class="link">
                                                <a href="controllers/InventoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InventoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-InventoryModule-ed536792fbb0c9f7617c867316819f5ff5a883a9248b21c5627b9763be78bd9ff58da87361e2a2f7336fad6e0ffd5da9dcac8f81077c4b74486e81dfdf1000f1"' : 'data-target="#xs-injectables-links-module-InventoryModule-ed536792fbb0c9f7617c867316819f5ff5a883a9248b21c5627b9763be78bd9ff58da87361e2a2f7336fad6e0ffd5da9dcac8f81077c4b74486e81dfdf1000f1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InventoryModule-ed536792fbb0c9f7617c867316819f5ff5a883a9248b21c5627b9763be78bd9ff58da87361e2a2f7336fad6e0ffd5da9dcac8f81077c4b74486e81dfdf1000f1"' :
                                        'id="xs-injectables-links-module-InventoryModule-ed536792fbb0c9f7617c867316819f5ff5a883a9248b21c5627b9763be78bd9ff58da87361e2a2f7336fad6e0ffd5da9dcac8f81077c4b74486e81dfdf1000f1"' }>
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
                                            'data-target="#controllers-links-module-OrderModule-517c38d1985834f6d86bbade6a367f052527490510b866c35e7cc8be94cef3d5eae0b89caef214d90b2e44b8fab14fe1872a4b37efd4948ce67e938902b938f6"' : 'data-target="#xs-controllers-links-module-OrderModule-517c38d1985834f6d86bbade6a367f052527490510b866c35e7cc8be94cef3d5eae0b89caef214d90b2e44b8fab14fe1872a4b37efd4948ce67e938902b938f6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-517c38d1985834f6d86bbade6a367f052527490510b866c35e7cc8be94cef3d5eae0b89caef214d90b2e44b8fab14fe1872a4b37efd4948ce67e938902b938f6"' :
                                            'id="xs-controllers-links-module-OrderModule-517c38d1985834f6d86bbade6a367f052527490510b866c35e7cc8be94cef3d5eae0b89caef214d90b2e44b8fab14fe1872a4b37efd4948ce67e938902b938f6"' }>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrderModule-517c38d1985834f6d86bbade6a367f052527490510b866c35e7cc8be94cef3d5eae0b89caef214d90b2e44b8fab14fe1872a4b37efd4948ce67e938902b938f6"' : 'data-target="#xs-injectables-links-module-OrderModule-517c38d1985834f6d86bbade6a367f052527490510b866c35e7cc8be94cef3d5eae0b89caef214d90b2e44b8fab14fe1872a4b37efd4948ce67e938902b938f6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-517c38d1985834f6d86bbade6a367f052527490510b866c35e7cc8be94cef3d5eae0b89caef214d90b2e44b8fab14fe1872a4b37efd4948ce67e938902b938f6"' :
                                        'id="xs-injectables-links-module-OrderModule-517c38d1985834f6d86bbade6a367f052527490510b866c35e7cc8be94cef3d5eae0b89caef214d90b2e44b8fab14fe1872a4b37efd4948ce67e938902b938f6"' }>
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
                                            'data-target="#controllers-links-module-ProductModule-715752a891101d686bd735c531401bceea73f387e977713a8b2a4549c53fb523cc815f0c36fb47e86e249945a8ea296e739990fa551fd791ae04f88b11f549bd"' : 'data-target="#xs-controllers-links-module-ProductModule-715752a891101d686bd735c531401bceea73f387e977713a8b2a4549c53fb523cc815f0c36fb47e86e249945a8ea296e739990fa551fd791ae04f88b11f549bd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-715752a891101d686bd735c531401bceea73f387e977713a8b2a4549c53fb523cc815f0c36fb47e86e249945a8ea296e739990fa551fd791ae04f88b11f549bd"' :
                                            'id="xs-controllers-links-module-ProductModule-715752a891101d686bd735c531401bceea73f387e977713a8b2a4549c53fb523cc815f0c36fb47e86e249945a8ea296e739990fa551fd791ae04f88b11f549bd"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-715752a891101d686bd735c531401bceea73f387e977713a8b2a4549c53fb523cc815f0c36fb47e86e249945a8ea296e739990fa551fd791ae04f88b11f549bd"' : 'data-target="#xs-injectables-links-module-ProductModule-715752a891101d686bd735c531401bceea73f387e977713a8b2a4549c53fb523cc815f0c36fb47e86e249945a8ea296e739990fa551fd791ae04f88b11f549bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-715752a891101d686bd735c531401bceea73f387e977713a8b2a4549c53fb523cc815f0c36fb47e86e249945a8ea296e739990fa551fd791ae04f88b11f549bd"' :
                                        'id="xs-injectables-links-module-ProductModule-715752a891101d686bd735c531401bceea73f387e977713a8b2a4549c53fb523cc815f0c36fb47e86e249945a8ea296e739990fa551fd791ae04f88b11f549bd"' }>
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
                                            'data-target="#controllers-links-module-ReviewModule-9e1cc9872928e29da2e2e7e244be385e3fe88c85a497e186c02e4a148c311de16e830474a02c84ac8dd429fc0d1bb0089b22341cf9d3e454e6e06e318f80152f"' : 'data-target="#xs-controllers-links-module-ReviewModule-9e1cc9872928e29da2e2e7e244be385e3fe88c85a497e186c02e4a148c311de16e830474a02c84ac8dd429fc0d1bb0089b22341cf9d3e454e6e06e318f80152f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewModule-9e1cc9872928e29da2e2e7e244be385e3fe88c85a497e186c02e4a148c311de16e830474a02c84ac8dd429fc0d1bb0089b22341cf9d3e454e6e06e318f80152f"' :
                                            'id="xs-controllers-links-module-ReviewModule-9e1cc9872928e29da2e2e7e244be385e3fe88c85a497e186c02e4a148c311de16e830474a02c84ac8dd429fc0d1bb0089b22341cf9d3e454e6e06e318f80152f"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewModule-9e1cc9872928e29da2e2e7e244be385e3fe88c85a497e186c02e4a148c311de16e830474a02c84ac8dd429fc0d1bb0089b22341cf9d3e454e6e06e318f80152f"' : 'data-target="#xs-injectables-links-module-ReviewModule-9e1cc9872928e29da2e2e7e244be385e3fe88c85a497e186c02e4a148c311de16e830474a02c84ac8dd429fc0d1bb0089b22341cf9d3e454e6e06e318f80152f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewModule-9e1cc9872928e29da2e2e7e244be385e3fe88c85a497e186c02e4a148c311de16e830474a02c84ac8dd429fc0d1bb0089b22341cf9d3e454e6e06e318f80152f"' :
                                        'id="xs-injectables-links-module-ReviewModule-9e1cc9872928e29da2e2e7e244be385e3fe88c85a497e186c02e4a148c311de16e830474a02c84ac8dd429fc0d1bb0089b22341cf9d3e454e6e06e318f80152f"' }>
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
                                            'data-target="#controllers-links-module-StoryModule-144d2baf8884d9943ccba6d1ea23da32b3c9466c825ccf5845cfa5c9f2d7885c74013454b408ba7fcdeff2d2a44fc8b8c992612740e0a98a02c8cf727000013f"' : 'data-target="#xs-controllers-links-module-StoryModule-144d2baf8884d9943ccba6d1ea23da32b3c9466c825ccf5845cfa5c9f2d7885c74013454b408ba7fcdeff2d2a44fc8b8c992612740e0a98a02c8cf727000013f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StoryModule-144d2baf8884d9943ccba6d1ea23da32b3c9466c825ccf5845cfa5c9f2d7885c74013454b408ba7fcdeff2d2a44fc8b8c992612740e0a98a02c8cf727000013f"' :
                                            'id="xs-controllers-links-module-StoryModule-144d2baf8884d9943ccba6d1ea23da32b3c9466c825ccf5845cfa5c9f2d7885c74013454b408ba7fcdeff2d2a44fc8b8c992612740e0a98a02c8cf727000013f"' }>
                                            <li class="link">
                                                <a href="controllers/StoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StoryModule-144d2baf8884d9943ccba6d1ea23da32b3c9466c825ccf5845cfa5c9f2d7885c74013454b408ba7fcdeff2d2a44fc8b8c992612740e0a98a02c8cf727000013f"' : 'data-target="#xs-injectables-links-module-StoryModule-144d2baf8884d9943ccba6d1ea23da32b3c9466c825ccf5845cfa5c9f2d7885c74013454b408ba7fcdeff2d2a44fc8b8c992612740e0a98a02c8cf727000013f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StoryModule-144d2baf8884d9943ccba6d1ea23da32b3c9466c825ccf5845cfa5c9f2d7885c74013454b408ba7fcdeff2d2a44fc8b8c992612740e0a98a02c8cf727000013f"' :
                                        'id="xs-injectables-links-module-StoryModule-144d2baf8884d9943ccba6d1ea23da32b3c9466c825ccf5845cfa5c9f2d7885c74013454b408ba7fcdeff2d2a44fc8b8c992612740e0a98a02c8cf727000013f"' }>
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
                                            'data-target="#controllers-links-module-SupportModule-743b39a14920a5fdeb95a91bc34e166148a59573346c5b7c9f1a97afeaed27cf3a6e406ebe5ccc172e732a3d9dc4544363aba4f70bdbd5fdea42fa43c8b68fa3"' : 'data-target="#xs-controllers-links-module-SupportModule-743b39a14920a5fdeb95a91bc34e166148a59573346c5b7c9f1a97afeaed27cf3a6e406ebe5ccc172e732a3d9dc4544363aba4f70bdbd5fdea42fa43c8b68fa3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SupportModule-743b39a14920a5fdeb95a91bc34e166148a59573346c5b7c9f1a97afeaed27cf3a6e406ebe5ccc172e732a3d9dc4544363aba4f70bdbd5fdea42fa43c8b68fa3"' :
                                            'id="xs-controllers-links-module-SupportModule-743b39a14920a5fdeb95a91bc34e166148a59573346c5b7c9f1a97afeaed27cf3a6e406ebe5ccc172e732a3d9dc4544363aba4f70bdbd5fdea42fa43c8b68fa3"' }>
                                            <li class="link">
                                                <a href="controllers/SupportController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupportController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SupportModule-743b39a14920a5fdeb95a91bc34e166148a59573346c5b7c9f1a97afeaed27cf3a6e406ebe5ccc172e732a3d9dc4544363aba4f70bdbd5fdea42fa43c8b68fa3"' : 'data-target="#xs-injectables-links-module-SupportModule-743b39a14920a5fdeb95a91bc34e166148a59573346c5b7c9f1a97afeaed27cf3a6e406ebe5ccc172e732a3d9dc4544363aba4f70bdbd5fdea42fa43c8b68fa3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SupportModule-743b39a14920a5fdeb95a91bc34e166148a59573346c5b7c9f1a97afeaed27cf3a6e406ebe5ccc172e732a3d9dc4544363aba4f70bdbd5fdea42fa43c8b68fa3"' :
                                        'id="xs-injectables-links-module-SupportModule-743b39a14920a5fdeb95a91bc34e166148a59573346c5b7c9f1a97afeaed27cf3a6e406ebe5ccc172e732a3d9dc4544363aba4f70bdbd5fdea42fa43c8b68fa3"' }>
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
                                            'data-target="#controllers-links-module-TransactionModule-2f45ba2b034a572ca1a7ce741e857166ae46040541ab1bf19f50c51376f007b84e346a9ec712cae4ec19e0e36f0a46a6f2b7176a9287ef27e892d83946338ad5"' : 'data-target="#xs-controllers-links-module-TransactionModule-2f45ba2b034a572ca1a7ce741e857166ae46040541ab1bf19f50c51376f007b84e346a9ec712cae4ec19e0e36f0a46a6f2b7176a9287ef27e892d83946338ad5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TransactionModule-2f45ba2b034a572ca1a7ce741e857166ae46040541ab1bf19f50c51376f007b84e346a9ec712cae4ec19e0e36f0a46a6f2b7176a9287ef27e892d83946338ad5"' :
                                            'id="xs-controllers-links-module-TransactionModule-2f45ba2b034a572ca1a7ce741e857166ae46040541ab1bf19f50c51376f007b84e346a9ec712cae4ec19e0e36f0a46a6f2b7176a9287ef27e892d83946338ad5"' }>
                                            <li class="link">
                                                <a href="controllers/TransactionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TransactionModule-2f45ba2b034a572ca1a7ce741e857166ae46040541ab1bf19f50c51376f007b84e346a9ec712cae4ec19e0e36f0a46a6f2b7176a9287ef27e892d83946338ad5"' : 'data-target="#xs-injectables-links-module-TransactionModule-2f45ba2b034a572ca1a7ce741e857166ae46040541ab1bf19f50c51376f007b84e346a9ec712cae4ec19e0e36f0a46a6f2b7176a9287ef27e892d83946338ad5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransactionModule-2f45ba2b034a572ca1a7ce741e857166ae46040541ab1bf19f50c51376f007b84e346a9ec712cae4ec19e0e36f0a46a6f2b7176a9287ef27e892d83946338ad5"' :
                                        'id="xs-injectables-links-module-TransactionModule-2f45ba2b034a572ca1a7ce741e857166ae46040541ab1bf19f50c51376f007b84e346a9ec712cae4ec19e0e36f0a46a6f2b7176a9287ef27e892d83946338ad5"' }>
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
                                            'data-target="#controllers-links-module-UserModule-6c37ce07d206ab7a13beb34d7a82a8f0c45e64fe0bd4aba9019e4525110dc1eb0ee90e3841b29601531f653cc0f91d2c40029799c02d738c0c49c5797bc56e0b"' : 'data-target="#xs-controllers-links-module-UserModule-6c37ce07d206ab7a13beb34d7a82a8f0c45e64fe0bd4aba9019e4525110dc1eb0ee90e3841b29601531f653cc0f91d2c40029799c02d738c0c49c5797bc56e0b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-6c37ce07d206ab7a13beb34d7a82a8f0c45e64fe0bd4aba9019e4525110dc1eb0ee90e3841b29601531f653cc0f91d2c40029799c02d738c0c49c5797bc56e0b"' :
                                            'id="xs-controllers-links-module-UserModule-6c37ce07d206ab7a13beb34d7a82a8f0c45e64fe0bd4aba9019e4525110dc1eb0ee90e3841b29601531f653cc0f91d2c40029799c02d738c0c49c5797bc56e0b"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-6c37ce07d206ab7a13beb34d7a82a8f0c45e64fe0bd4aba9019e4525110dc1eb0ee90e3841b29601531f653cc0f91d2c40029799c02d738c0c49c5797bc56e0b"' : 'data-target="#xs-injectables-links-module-UserModule-6c37ce07d206ab7a13beb34d7a82a8f0c45e64fe0bd4aba9019e4525110dc1eb0ee90e3841b29601531f653cc0f91d2c40029799c02d738c0c49c5797bc56e0b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-6c37ce07d206ab7a13beb34d7a82a8f0c45e64fe0bd4aba9019e4525110dc1eb0ee90e3841b29601531f653cc0f91d2c40029799c02d738c0c49c5797bc56e0b"' :
                                        'id="xs-injectables-links-module-UserModule-6c37ce07d206ab7a13beb34d7a82a8f0c45e64fe0bd4aba9019e4525110dc1eb0ee90e3841b29601531f653cc0f91d2c40029799c02d738c0c49c5797bc56e0b"' }>
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
                                <a href="classes/AddFileDTO.html" data-type="entity-link" >AddFileDTO</a>
                            </li>
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
                                <a href="classes/GetAllFilesDto.html" data-type="entity-link" >GetAllFilesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllInventoryDto.html" data-type="entity-link" >GetAllInventoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllOffersDto.html" data-type="entity-link" >GetAllOffersDto</a>
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
                                <a href="classes/PublicFile.html" data-type="entity-link" >PublicFile</a>
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
                                <a href="classes/UploadFileDTO.html" data-type="entity-link" >UploadFileDTO</a>
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