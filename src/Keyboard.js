/** Keyboard related functionality.
  *
  * A key name is computed by either taking the ASCII representation or
  * using the `keycodes` array to assign a name. To get corresponding code
  * use `original.which` in event handler.
  *
  * Properties:
  * - keys: associative array that maps key names to either true or false
  *   if a key is not in this array it was never pressed
  * - preventDefault: stop event propagation
  * - bypassKeys: `preventDefault` will not act on these keys
  * - keydownEvent: caches information about last key down event
  *     - key: name of the key
  *     - original: original event
  * - keyupEvent: caches information about last key up event
  *     - key: name of the key
  *     - original: original event
  *
  * Events generated by this object:
  * - keydown: a key was pressed (handler receives `keydownEvent` object)
  * - keyup: a key was released (handler receives `keyupEvent` object)
  *
  * Reference: http://playgroundjs.com/playground-keyboard
  */

 PLAYGROUND.Keyboard = function() {

   PLAYGROUND.Events.call(this);

   this.keys = {};

   document.addEventListener("keydown", this.keydown.bind(this));
   document.addEventListener("keyup", this.keyup.bind(this));
   document.addEventListener("keypress", this.keypress.bind(this));

   this.keydownEvent = {};
   this.keyupEvent = {};

   this.preventDefault = true;

   this.enabled = true;

 };

 PLAYGROUND.Keyboard.prototype = {

   keycodes: {
     37: "left",
     38: "up",
     39: "right",
     40: "down",
     45: "insert",
     46: "delete",
     8: "backspace",
     9: "tab",
     13: "enter",
     16: "shift",
     17: "ctrl",
     18: "alt",
     19: "pause",
     20: "capslock",
     27: "escape",
     32: "space",
     33: "pageup",
     34: "pagedown",
     35: "end",
     36: "home",
     112: "f1",
     113: "f2",
     114: "f3",
     115: "f4",
     116: "f5",
     117: "f6",
     118: "f7",
     119: "f8",
     120: "f9",
     121: "f10",
     122: "f11",
     123: "f12",
     144: "numlock",
     145: "scrolllock",
     186: "semicolon",
     187: "equal",
     188: "comma",
     189: "dash",
     190: "period",
     191: "slash",
     192: "graveaccent",
     219: "openbracket",
     220: "backslash",
     221: "closebraket",
     222: "singlequote"
   },

   keypress: function(e) {

   },

   bypassKeys: ["f12", "f5", "ctrl", "alt", "shift"],

   keydown: function(e) {

     if (!this.enabled) return;

     if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
     else var keyName = this.keycodes[e.which];

     if (this.keys[keyName]) return;

     this.keydownEvent.key = keyName;
     this.keydownEvent.original = e;

     this.keys[keyName] = true;

     this.trigger("keydown", this.keydownEvent);

     if (this.preventDefault && document.activeElement === document.body) {

       var bypass = e.metaKey;

       if (!bypass) {
         for (var i = 0; i < this.bypassKeys.length; i++) {

           if (this.keys[this.bypassKeys[i]]) {
             bypass = true;
             break
           }

         }
       }

       if (!bypass) {
         // e.returnValue = false;
         // e.keyCode = 0;
         e.preventDefault();
         e.stopPropagation();
       }

     }

   },

   keyup: function(e) {

     if (!this.enabled) return;

     if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
     else var keyName = this.keycodes[e.which];

     this.keyupEvent.key = keyName;
     this.keyupEvent.original = e;

     this.keys[keyName] = false;

     this.trigger("keyup", this.keyupEvent);

   }

 };

 PLAYGROUND.Utils.extend(PLAYGROUND.Keyboard.prototype, PLAYGROUND.Events.prototype);