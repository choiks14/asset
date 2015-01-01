var UserList = ( function( window, undefined ) {
  function init() {
    console.log('init')
  }

  // explicitly return public methods when this object is instantiated
  return {
    init : init
  };
} )( window );