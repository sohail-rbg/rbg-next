/**
 * Boot helpers for the ReBrand Gurus brand preloader.
 *
 * This module is intentionally free of React / "use client" directives so that
 * it can be imported from the server layout (for the inline blocking script)
 * as well as from the client component.
 */

/** sessionStorage flag: has the preloader already played in this session? */
export const PRELOADER_SEEN_KEY = "rbg:preloader-played";

/** Set on <html> while the preloader is on screen (locks scroll, hides the page). */
export const PRELOADER_ACTIVE_CLASS = "rbg-preloading";

/** Set on <html> when the preloader should not render at all. */
export const PRELOADER_SKIP_CLASS = "rbg-preloader-skip";

/** Set on <html> the moment the site is handed back (drives the page fade-in). */
export const PRELOADER_REVEAL_CLASS = "rbg-preloader-reveal";

/** Marks that the React preloader mounted (used by the boot script failsafe). */
export const PRELOADER_MOUNT_ATTR = "data-rbg-preloader";

/** "0" = first play of the session, "1" = already played (shorter run). */
export const PRELOADER_VISIT_ATTR = "data-rbg-preloader-visit";

/**
 * Runs before first paint so the page never flashes behind the preloader and
 * so a refresh can never leave the site locked if the bundle fails to boot.
 */
export const preloaderBootScript = `(function(){try{
var d=document.documentElement;
var q=window.location.search||"";
var force=/[?&]preloader=(1|on|true|force)/i.test(q);
var skip=!force&&/[?&]preloader=(0|off|false|skip|none)/i.test(q);
if(skip){d.classList.add("${PRELOADER_SKIP_CLASS}");return;}
var seen=false;
try{seen=window.sessionStorage.getItem("${PRELOADER_SEEN_KEY}")==="1";}catch(e){seen=false;}
d.setAttribute("${PRELOADER_VISIT_ATTR}",force?"0":(seen?"1":"0"));
d.classList.add("${PRELOADER_ACTIVE_CLASS}");
try{window.sessionStorage.setItem("${PRELOADER_SEEN_KEY}","1");}catch(e){}
window.setTimeout(function(){
if(!d.hasAttribute("${PRELOADER_MOUNT_ATTR}")){d.classList.remove("${PRELOADER_ACTIVE_CLASS}");d.removeAttribute("${PRELOADER_VISIT_ATTR}");}
},6000);
}catch(e){document.documentElement.classList.remove("${PRELOADER_ACTIVE_CLASS}");}})();`;

/** Nothing works without JS: never trap the site behind the overlay. */
export const preloaderNoScriptStyle = `html.${PRELOADER_ACTIVE_CLASS},html.${PRELOADER_ACTIVE_CLASS} body{overflow:auto!important;height:auto!important}
.rbg-preloader{display:none!important}
html.${PRELOADER_ACTIVE_CLASS} .mainContentWrp,html.${PRELOADER_ACTIVE_CLASS} .header__area,html.${PRELOADER_ACTIVE_CLASS} .customFooter{opacity:1!important;transform:none!important}`;
