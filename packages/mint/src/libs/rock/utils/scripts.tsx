import { config } from "../config";

export function GoogleSignInScript() {
  /* Google Login Script */
  return config.googleOAuthOptions.enableGoogleSignIn ? (
    <script src="https://accounts.google.com/gsi/client" async />
  ) : null;
}

export function GTagScript() {
  /* Global Site Tag (gtag.js) - Google Analytics */
  return config.analytics.enableGTag ? (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${config.analytics.gtmId}');`,
      }}
    />
  ) : null;
}

export function GTagNoscript() {
  return config.analytics.enableGTag ? (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.analytics.gtmId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
  ) : null;
}

export function FBChat() {
  return config.fb.enableFBChatPlugin ? (
    <>
      {/* <!-- Messenger Chat plugin Code --> */}
      <div id="fb-root"></div>
      {/* <!-- Your Chat plugin code --> */}
      <div id="fb-customer-chat" className="fb-customerchat"></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
      var chatbox = document.getElementById('fb-customer-chat');
      chatbox.setAttribute("page_id", "${config.fb.fbCustomerChatPageId}");
      chatbox.setAttribute("attribution", "biz_inbox");

      window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v12.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      `,
        }}
      ></script>
    </>
  ) : null;
}

export function ThirdPartyHeadTags() {
  return (
    <>
      <GoogleSignInScript />
      <GTagScript />
    </>
  );
}

export function ThirdPartyBodyTags() {
  return (
    <>
      <GTagNoscript />
    </>
  );
}
